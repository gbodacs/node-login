const CountryList = require('./modules/country-list');
const AccountManager = require('./modules/account-manager');
// var EM = require('./modules/email-dispatcher');

module.exports = function(app)
{

    /*
    	login & logout
    */

    app.get('/status', (req, res) =>
    {
        res.status(200).json(
        {
            message: 'OK-Running'
        });
    });

    app.get('/login', (req, res) =>
    {
        // check if the user has an auto login key saved in a cookie //
        if (req.cookies.login === undefined)
        {
            res.status(400).json(
            {
                message: `Missing login cookie`
            });
        }
        else
        {
            // attempt automatic login //
            AccountManager.validateLoginKey(req.cookies.login, req.ip, (error, userByCookie) =>
            {
                if (userByCookie)
                {
                    AccountManager.autoLogin(userByCookie.user, userByCookie.pass, (userByName) =>
                    {
                        req.session.user = userByName;
                        res.status(200).json(
                        {
                            cookie: userByName.cookie,
                            '_id': userByName['_id'],
                            name: userByName.name,
                            isAdmin: userByName.isAdmin
                        });
                    });
                }
                else
                {
                    res.status(500).json(
                    {
                        message: `Error` //user not found?
                    });
                }
            });
        }
    });

    app.post('/login', (req, res) =>
    {
        AccountManager.manualLogin(req.body['user'], req.body['pass'], (error, user) =>
        {
            if (!user)
            {
                res.status(400).json(
                {
                    message: error
                });
            }
            else
            {
                req.session.user = user;
                if (req.body['remember-me'] === false)
                {
                    res.status(200).json(
                    {
                        '_id': user['_id'],
                        name: user.name,
                        isAdmin: user.isAdmin
                    });
                }
                else
                {
                    AccountManager.generateLoginKey(user.user, req.ip, (error, updatedUser) =>
                    {
                        if (!updatedUser)
                        {
                            res.status(400).json(
                            {
                                message: error
                            });
                        }
                        else
                        {
                            res.cookie('login', updatedUser.cookie,
                            {
                                maxAge: 900000
                            });
                            res.status(200).json(updatedUser);
                        }
                    });
                }
            }
        });
    });

    app.get('/logout', function(req, res)
    {
        res.clearCookie('login');
        req.session.destroy(function(e)
        {
            res.status(200).send('ok');
        });
    })

    /*
    	ADMIN - Accounts
    */

    app.post('/signup', (req, res) =>
    {
        //TODO: admin check!!
        AccountManager.addNewAccount(
        {
            name: req.body['name'],
            email: req.body['email'],
            user: req.body['user'],
            pass: req.body['pass'],
            country: req.body['country'],
            isAdmin: req.body['isAdmin']
        }, function(error)
        {
            if (error)
            {
                res.status(400).send(
                {
                    message: error
                });
            }
            else
            {
                res.status(201).send('ok');
            }
        });
    });

    app.get('/user_print', function (req, res) {
      AccountManager.getAllAccounts((error, accounts) => {
        if (error) {
          res.status(500).json({
            message: error
          });
        } else {
          res.status(200).json({
            accounts
          })
        }
      })
    });

    app.delete('/user_delete/:id', function(req, res)
    {
        //TODO: admin check!!
        AccountManager.deleteAccount(req.params.id, function(error, obj)
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

    app.get('/admin_dailyplan', function(req, res)
    {
        //TODO: admin check!!
        AccountManager.getAllAccounts((error, accounts) =>
        {
            if (!error)
            {
                let users = accounts;
                AccountManager.getAllBlocks((err, blocks) =>
                {
                    if (!err)
                        res.status(200).json(
                        {
                            users,
                            blocks
                        })
                    else
                        res.status(500).json(
                        {
                            message: err
                        })
                });
            }
            else
            {
                res.status(500).json(
                {
                    message: error
                });
            }
        });
    });

    app.post('/admin_dailyplan', function(req, res)
    {
        //TODO: admin check!!
        let newData = {
            userId: req.body.userId,
            blocks: req.body.blocks,
            comment: req.body.comment,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        };
        if (!newData.comment)
        {
            newData.comment = '';
        }
        AccountManager.addNewDailyPlan(newData, (error, dailyplan) =>
        {
            if (error)
            {
                res.status(500).json(
                {
                    message: error
                });
            }
            else
            {
                res.status(201).send('ok')
            }
        });
    });

    /*
    	ADMIN - Excercise
    */

    app.post('/admin_exercise', (req, res) =>
    {
        //TODO: admin check!!
        AccountManager.addNewExcercise(
        {
            name: req.body.name,
            movielink: req.body.movielink,
            unit: req.body.unit,
            comment: req.body.comment
        }, (error, exercise) =>
        {
            if (error)
            {
                res.status(400).json(
                {
                    message: 'error-adding-excercise'
                });
            }
            else
            {
                res.status(201).send('ok');
            }
        });
    });

    /*
    	ADMIN - Block
    */

    app.get('/admin_block', function(req, res)
    {
        //TODO: admin check!!
        AccountManager.getAllExcercise(function(error, exercises)
        {
            if (!error)
            {
                res.status(200).json(
                {
                    exercises
                });
            }
            else
            {
                res.status(500).json(
                {
                    message: error
                });
            }
        })
    });

    app.post('/admin_block', function(req, res)
    {
        //TODO: admin check!!
        AccountManager.addNewBlock(
        {
            name: req.body.name,
            repeat: req.body.repeat,
            exerciseList: req.body.exerciseIdList,
            // No excercise repeat in block excer_repeat: "1"
        }, (error, block) =>
        {
            if (error)
            {
                res.status(400).json(
                {
                    message: 'error-adding-block'
                });
            }
            else
            {
                res.status(200).send('ok');
            }
        });
    });

    /*
    	User dailyplan
    */

    app.post('/user_all_dailyplan', function(req, res)
    {
        //TODO: user check!!
        AccountManager.getUserAllDailyPlanDates(
        {
            userId: req.body.userId
        }, (error, dailyplanDates) =>
        {
            if (error)
            {
                res.status(400).json(
                {
                    message: error
                });
            }
            else
            {
                res.status(200).send(dailyplanDates);
            }
        });
    });

    app.post('/user_dailyplan', function(req, res)
    {
        //TODO: user check!!
        AccountManager.getUserDailyPlan(
        {
            id: req.body.id,
            date: req.body.date
        }, (error, dailyplan) =>
        {
            if (error)
            {
                res.status(400).json(
                {
                    message: error
                });
            }
            else
            {
                res.status(200).send(dailyplan);
            }
        });
    });

    app.get('*', (req, res) =>
    {
        res.status(404).json(
        {
            message: 'Page Not Found'
        })
    });

};