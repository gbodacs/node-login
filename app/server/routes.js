// var CT = require('./modules/country-list');
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
						res.status(200).send(userByName)
					});
				} else
				{
          res.status(500).json({ message: `Database error` });
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
					res.status(200).json(user);
				} else {
					AccountManager.generateLoginKey(user.user, req.ip, (key) => {
						res.cookie('login', key, {
							maxAge: 900000
						});
						res.status(200).json(user);
					});
				}
			}
		});
	});
//
// 	app.post('/logout', function (req, res) {
// 		res.clearCookie('login');
// 		req.session.destroy(function (e) {
// 			res.status(200).send('ok');
// 		});
// 	})
//
// 	app.get('/logout', function (req, res) {
// 		res.clearCookie('login');
// 		req.session.destroy(function (e) {
// 			//res.status(200).send('ok');
// 			res.redirect('/');
// 		});
// 	})
//
// 	/*
// 		ADMIN - DailyPlan
// 	*/
// 	app.get('/admin_dailyplan', function (req, res) {
// 		if (req.session.user == null) {
// 			res.redirect('/');
// 		} else {
// 			var accer;
//			AM.getAllAccounts( function (e, accs)
//			{
//				accer = accs;
//			})
//			AM.getAllBlocks( function (e, blocks)
//			{
//				res.render('admin_dailyplan', {blo: blocks, acc: accer} );
//			})
// 		}
// 	});
//
// 	app.post('/admin_dailyplan', function (req, res)
// 	{
// 		if (req.session.user == null)
// 		{
// 			res.redirect('/');
// 		} else
// 		{
// 			AM.addNewDailyPlan({
//				block_ids	: req.body['block_id'],
//				repeats		: req.body['repeat'],
//				comment		: req.body['comment'],
//				startdate	: req.body['startdate3'],
//				enddate		: req.body['enddate3']
//			}, function(e, o)
//			{
//				if (e)
//			{
//				res.status(400).send('error-adding-dailyplan');
//			}	else
//			{
//				//req.session.user = o.value;
//				res.status(200).send('ok');
//			}
//		});
// 		}
// 	});
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
// 	/*
// 		ADMIN - Excercise
// 	*/
// 	app.get('/admin_excercise', function (req, res) {
// 		if (req.session.user == null) {
// 			res.redirect('/');
// 		} else {
// 			res.render('admin_excercise', {
// 				countries: CT,
// 				//			udata : req.session.user
// 			});
// 		}
// 	});
//
// 	app.post('/admin_excercise', function (req, res)
// 	{
// 		if (req.session.user == null)
// 		{
// 			res.redirect('/');
// 		} else
// 		{
// 			AM.addNewExcercise({
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
// 			});
// 		}
// 	});
//
// 	/*
// 		ADMIN - Block
// 	*/
//
// 	app.get('/admin_block', function (req, res)
// 	{
// 		if (req.session.user == null)
// 		{
// 			res.redirect('/');
// 		} else
// 		{
// 			AM.getAllExcercise(function (e, excercise)
// 			{
// 				res.render('admin_block', {excers: excercise});
// 			})
// 		}
// 	});
//
// 	app.post('/admin_block', function (req, res)
// 	{
// 		if (req.session.user == null)
// 		{
// 			res.redirect('/');
// 		} else
// 		{
// 			AM.addNewBlock({
// 				name		: req.body['name3'],
// 				repeat		: req.body['repeat'],
// 				excer_id	: req.body['excer_id3'],
// 				// No excercise repeat in block excer_repeat: "1"
// 			}, function(e, o)
// 			{
// 				if (e)
// 				{
// 					res.status(400).send('error-adding-block');
// 				}	else
// 				{
// 					//req.session.user = o.value;
// 					res.status(200).send('ok');
// 				}
// 			});
// 		}
// 	});
//
//
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
//
// 	/*
// 		User dailyplan
// 	*/
//
// 	app.get('/user_dailyplan', function (req, res) {
// 		if (req.session.user == null) {
// 			res.redirect('/');
// 		} else {
// 			res.render('user_dailyplan', {
// 				title: 'Napi terved',
// 				countries: CT,
// 				udata: req.session.user
// 			});
// 		}
// 	});
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
// 			});*/
// 		}
// 	});
//
// 	/*
// 		new accounts
// 	*/
//
// 	app.get('/signup', function (req, res) {
// 		res.render('signup', {
// 			title: 'Signup',
// 			countries: CT
// 		});
// 	});
//
// 	app.post('/signup', function (req, res) {
// 		AM.addNewAccount({
// 			name: req.body['name'],
// 			email: req.body['email'],
// 			user: req.body['user'],
// 			pass: req.body['pass'],
// 			country: req.body['country']
// 		}, function (e) {
// 			if (e) {
// 				res.status(400).send(e);
// 			} else {
//
// 				res.status(200).send('ok');
// 			}
// 		});
// 		console.log(req.body['name']);
// 	});
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
//
// 	/*
// 		view, delete & reset accounts
// 	*/
//
// 	app.get('/user_print', function (req, res)
// 	{
// 		AM.getAllAccounts(function (e, accounts)
// 		{
// 			res.render('user_print', {
// 				title: 'Account List',
// 				accts: accounts
// 			});
// 		})
// 	});
//
// 	app.post('/delete', function (req, res)
// 	{
// 		AM.deleteAccount(req.session.user._id, function (e, obj)
// 		{
// 			if (!e)
// 			{
// 				res.clearCookie('login');
// 				req.session.destroy(function (e)
// 				{
// 					res.status(200).send('ok');
// 				});
// 			} else
// 			{
// 				res.status(400).send('record not found');
// 			}
// 		});
// 	});

	app.get('*', (req, res) => {
    res.status(404).json({message: 'Page Not Found'})
	});

};
