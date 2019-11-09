const CountryList = require('./modules/country-list');
const AccountManager = require('./modules/account-manager');
// var EM = require('./modules/email-dispatcher');

module.exports = function (app) {

	/*
		login & logout
	*/

  app.get('/', (req, res) => {
    res.status(200).json({ message: 'This should be a homepage' });
  });

	app.get('/login', (req, res) => {
		// check if the user has an auto login key saved in a cookie //
		if (req.cookies.login === undefined)
		{
      res.status(400).json({ message: `Missing login cookie` });
		} else
		{
			// attempt automatic login //
			AccountManager.validateLoginKey(req.cookies.login, req.ip, (error, userByCookie) => {
        if (userByCookie) {
					AccountManager.autoLogin(userByCookie.user, userByCookie.pass, (userByName) => {
						req.session.user = userByName;
						res.status(200).json({cookie: userByName.cookie, '_id': userByName['_id'], name: userByName.name, isAdmin: userByName.isAdmin});
					});
				} else
				{
          res.status(500).json({ message: `Database error valami` });
				}
			});
		}
	});

	app.post('/login', (req, res) => {
		AccountManager.manualLogin(req.body['user'], req.body['pass'], (error, user) => {
			if (!user) {
				res.status(400).json({ message: error });
			} else {
				req.session.user = user;
				if (req.body['remember-me'] === false) {
					res.status(200).json({'_id': user['_id'], name: user.name, isAdmin: user.isAdmin});
				} else {
					AccountManager.generateLoginKey(user.user, req.ip, (error, updatedUser) => {
            if (!updatedUser) {
      				res.status(400).json({ message: error });
      			} else {
              res.cookie('login', updatedUser.cookie, {maxAge: 900000});
              res.status(200).json(updatedUser);
            }
          });
				}
			}
		});
	});

	app.get('/logout', function (req, res) {
		res.clearCookie('login');
		req.session.destroy(function (e) {
			res.status(200).send('ok');
		});
	})

	/*
		ADMIN - Accounts
	*/

	app.get('/signup', (req, res) => {
    AccountManager.validateAdmin(req.cookies.login, (error, valid) => {
      if (!valid && error === 'not an admin') {
        res.status(403).json({message: 'Not an admin user'});
      } else if (!valid) {
        res.status(500).json({message: 'Internal server error'});
      } else {
        res.status(200).json({countryList: CountryList});
      }
    })
	});

	app.post('/signup', (req, res) => {
		AccountManager.addNewAccount({
			name: req.body['name'],
			email: req.body['email'],
			user: req.body['user'],
			pass: req.body['pass'],
			country: req.body['country'],
      isAdmin: req.body['isAdmin']
		}, function (error) {
			if (error) {
				res.status(400).send({message: error});
			} else {
				res.status(201).send('ok');
			}
		});
	});

	app.get('/user_print', function (req, res)
	{
		AccountManager.getAllAccounts((error, accounts) => {
			if (error) {
        res.status(500).json({message: error});
      } else {
        res.status(200).json({accounts})
      }
		})
	});

	app.delete('/user_delete/:id', function (req, res)
	{
		AccountManager.deleteAccount(req.params.id, function (error, obj)
		{
			if (!error)
				res.status(204).send('ok');
			else
				res.status(400).send('record not found');
		});
	});

	/*
		ADMIN - DailyPlan
	*/

	app.get('/admin_dailyplan', function (req, res) {
		AccountManager.getAllAccounts((error, accounts) => {
      if (!error) {
			  let users = accounts;
        AccountManager.getAllBlocks((err, blocks) => {
          if (!err)
          res.status(200).json({users, blocks})
          else
          res.status(500).json({message: err})
        });
      } else {
        res.status(500).json({message: error});
      }
		});
	});

	app.post('/admin_dailyplan', function (req, res)
	{
		AccountManager.addNewDailyPlan({
      userId: req.body.userId,
			blocks: req.body.blocks,
			comment: req.body.comment,
			startDate: req.body.startDate,
			endDate: req.body.endDate
		}, (error, dailyplan) => {
      if (error) {
        res.status(500).json({message: error});
      } else {
        res.status(201).send('ok')
      }
    });
	});
//
// 	/*
// 		ADMIN - Users
// 	*/
// 	app.get('/admin_users', function (req, res) {
// 		if (req.session.user == null) {
// 			res.redirect('/');
// 		} else {
// 			res.render('admin_users', {excers: excercise});
// 		}
// 	});
//
// 	app.post('/admin_users', function (req, res)
// 	{
// 		if (req.session.user == null)
// 		{
// 			res.redirect('/');
// 		} else
// 		{
// 			/*AM.addNewExcercise({
// 				name		: req.body['name2'],
// 				movielink	: req.body['movielink'],
// 				unit		: req.body['unit'],
// 				comment		: req.body['comment']
// 			}, function(e, o)
// 			{
// 				if (e)
// 				{
// 					res.status(400).send('error-adding-excercise');
// 				}	else
// 				{
// 					//req.session.user = o.value;
// 					res.status(200).send('ok');
// 				}
// 			});*/
// 		}
// 	});
//
	/*
		ADMIN - Excercise
	*/

  app.post('/admin_exercise', (req, res) => {
    AccountManager.addNewExcercise({
      name: req.body.name,
      movielink: req.body.movielink,
      unit: req.body.unit,
      comment: req.body.comment
    }, (error, exercise) => {
      if (error) {
        res.status(400).json({message: 'error-adding-excercise'});
      } else {
        res.status(201).send('ok');
      }
    });
  });

	/*
		ADMIN - Block
	*/

	app.get('/admin_block', function (req, res)
	{
		AccountManager.getAllExcercise(function (error, exercises)
		{
			if (!error) {
        res.status(200).json({exercises});
      } else {
        res.status(500).json({message: error});
      }
		})
	});

	app.post('/admin_block', function (req, res)
	{
		AccountManager.addNewBlock({
			name: req.body.name,
			repeat: req.body.repeat,
			exerciseList: req.body.exerciseIdList,
			// No excercise repeat in block excer_repeat: "1"
		}, (error, block) => {
			if (error) {
				res.status(400).json({message: 'error-adding-block'});
			}	else {
				res.status(200).send('ok');
			}
		});
	});
//
// 	/*
// 		Settings
// 	*/
//
// 	app.get('/user_settings', function (req, res) {
// 		if (req.session.user == null) {
// 			res.redirect('/');
// 		} else {
// 			res.render('user_settings', {
// 				title: 'Beállítások',
// 				countries: CT,
// 				udata: req.session.user
// 			});
// 		}
// 	});
//
// 	app.post('/user_settings', function (req, res) {
// 		if (req.session.user == null) {
// 			res.redirect('/');
// 		} else {
// 			AM.updateAccount({
// 				id: req.session.user._id,
// 				name: req.body['name'],
// 				email: req.body['email'],
// 				pass: req.body['pass'],
// 				country: req.body['country']
// 			}, function (e, o) {
// 				if (e) {
// 					res.status(400).send('error-updating-account');
// 				} else {
// 					req.session.user = o.value;
// 					res.status(200).send('ok');
// 				}
// 			});
// 		}
// 	});
//
// 	/*
// 		User history
// 	*/
//
// 	app.get('/user_history', function (req, res) {
// 		if (req.session.user == null) {
// 			res.redirect('/');
// 		} else {
// 			res.render('user_history', {
// 				title: 'Napi terved',
// 				countries: CT,
// 				udata: req.session.user
// 			});
// 		}
// 	});
//
// 	app.post('/user_history', function (req, res) {
// 		if (req.session.user == null) {
// 			res.redirect('/');
// 		} else {
// 			/*AM.updateAccount({
// 				id: req.session.user._id,
// 				name: req.body['name'],
// 				email: req.body['email'],
// 				pass: req.body['pass'],
// 				country: req.body['country']
// 			}, function (e, o) {
// 				if (e) {
// 					res.status(400).send('error-updating-account');
// 				} else {
// 					req.session.user = o.value;
// 					res.status(200).send('ok');
// 				}
// 			});*/
// 		}
// 	});

	/*
		User dailyplan
	*/

	app.post('/user_dailyplan', function (req, res) {
    AccountManager.getUserDailyPlan({
			id: req.body.id,
      date: req.body.date
		}, (error, dailyplan) => {
			if (error) {
				res.status(400).json({message: error});
			}	else {
				res.status(200).send(dailyplan);
			}
		});
	});
//
// 	app.post('/user_dailyplan', function (req, res) {
// 		if (req.session.user == null) {
// 			res.redirect('/');
// 		} else {
// 			/*AM.updateAccount({
// 				id: req.session.user._id,
// 				name: req.body['name'],
// 				email: req.body['email'],
// 				pass: req.body['pass'],
// 				country: req.body['country']
// 			}, function (e, o) {
// 				if (e) {
// 					res.status(400).send('error-updating-account');
// 				} else {
// 					req.session.user = o.value;
// 					res.status(200).send('ok');
// 				}
// 			});
// 		}
// 	});
//

//
// 	/*
// 		password reset
// 	*/
//
// 	app.post('/lost-password', function (req, res) {
// 		let email = req.body['email'];
// 		AM.generatePasswordKey(email, req.ip, function (e, account) {
// 			if (e) {
// 				res.status(400).send(e);
// 			} else {
// 				EM.dispatchResetPasswordLink(account, function (e, m) {
// 					// TODO this callback takes a moment to return, add a loader to give user feedback //
// 					if (!e) {
// 						res.status(200).send('ok');
// 					} else {
// 						for (k in e) console.log('ERROR : ', k, e[k]);
// 						res.status(400).send('unable to dispatch password reset');
// 					}
// 				});
// 			}
// 		});
// 	});
//
// 	app.get('/reset-password', function (req, res) {
// 		AM.validatePasswordKey(req.query['key'], req.ip, function (e, o) {
// 			if (e || o == null) {
// 				res.redirect('/');
// 			} else {
// 				req.session.passKey = req.query['key'];
// 				res.render('reset', {
// 					title: 'Reset Password'
// 				});
// 			}
// 		})
// 	});
//
// 	app.post('/reset-password', function (req, res) {
// 		let newPass = req.body['pass'];
// 		let passKey = req.session.passKey;
// 		// destory the session immediately after retrieving the stored passkey //
// 		req.session.destroy();
// 		AM.updatePassword(passKey, newPass, function (e, o) {
// 			if (o) {
// 				res.status(200).send('ok');
// 			} else {
// 				res.status(400).send('unable to update password');
// 			}
// 		})
// 	});

	app.get('*', (req, res) => {
    res.status(404).json({message: 'Page Not Found'})
	});

};
