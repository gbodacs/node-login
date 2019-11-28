
const crypto 		= require('crypto');
const moment 		= require('moment');

// var db, accounts, blockdb, exercise, dailyplan;

const Account = require('../models/account');
const Exercise = require('../models/exercise');
const Block = require('../models/block');
const Dailyplan = require('../models/dailyplan');

const guid = function(){return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});}

/**********************************************
	login validation methods
**********************************************/

exports.autoLogin = function(user, pass, callback)
{
	Account.findOne({user:user}, function(e, o)
	{
		if (o)
		{
			o.pass == pass ? callback(o) : callback(null);
		}	else
		{
			callback(null);
		}
	});
}

exports.manualLogin = function(user, pass, callback)
{
	Account.findOne({user:user}, function(e, o) {
		if (o == null)
		{
			callback('No such user was found in the database');
		}	else
		{
			validatePassword(pass, o.pass, function(err, res)
			{
				if (res)
				{
					callback(null, o);
				}	else
				{
					callback('Incorrect password');
				}
			});
		}
	});
}

exports.generateLoginKey = function(user, ipAddress, callback)
{
	let cookie = guid();
	Account.findOneAndUpdate({user: user}, {ip: ipAddress, cookie: cookie}, {new: true}, callback);
}

exports.validateLoginKey = function(cookie, ipAddress, callback)
{
// ensure the cookie maps to the user's last recorded ip address
	Account.findOne({cookie: cookie, ip: ipAddress}, callback);
}

exports.generatePasswordKey = function(email, ipAddress, callback)
{
	let passKey = guid();
	Account.findOneAndUpdate({email: email}, {$set: {ip: ipAddress, passKey: passKey}, $unset: {cookie: ''}}, {new : true}, function(e, o)
	{
		if (o.value != null)
		{
			callback(null, o.value);
		}	else
		{
			callback(e || 'account not found');
		}
	});
};

exports.validatePasswordKey = function(passKey, ipAddress, callback)
{
// ensure the passKey maps to the user's last recorded ip address
	accounts.findOne({passKey:passKey, ip:ipAddress}, callback);
};

exports.validateAdmin = function(cookie, callback) {
  Account.findOne({cookie: cookie}, function(error, account) {
    if (error) {
      callback(error);
    } else if (account.isAdmin) {
      callback(null, 'ok');
    } else {
      callback('not an admin');
    }
  });
};

/**********************************************
	account insertion, update & deletion methods
 **********************************************/

exports.addNewAccount = function(newData, callback)
{
	Account.findOne({user:newData.user}, function(e, o)
	{
		if (o)
		{
			callback('username-taken');
		}	else
		{
			Account.findOne({email:newData.email}, function(e, o)
			{
				if (o)
				{
					callback('email-taken');
				}	else
				{
					saltAndHash(newData.pass, function(hash)
					{
						newData.pass = hash;
					// append date stamp when record was created //
						newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
						let account = new Account(newData);
            account.save()
              .then(newAccount => {
                callback(null);
              })
							.catch(error => {
								callback(error);
							});
					});
				}
			});
		}
	});
};

exports.updateAccount = function(newData, callback)
{
	let findOneAndUpdate = function(data)
	{
		var o =
		{
			name : data.name,
			email : data.email,
			country : data.country
		}
		if (data.pass)
			o.pass = data.pass;

		accounts.findOneAndUpdate({_id:getObjectId(data.id)}, {$set:o}, {returnOriginal : false}, callback);
	}
	if (newData.pass == '')
	{
		findOneAndUpdate(newData);
	}	else
	{
		saltAndHash( newData.pass, function(hash){newData.pass = hash;findOneAndUpdate(newData);} );
	}
};

exports.updatePassword = function(passKey, newPass, callback)
{
	saltAndHash(newPass, function(hash)
	{
		newPass = hash;
		accounts.findOneAndUpdate({passKey:passKey}, {$set:{pass:newPass}, $unset:{passKey:''}}, {returnOriginal : false}, callback);
	});
};

/**********************************************
	account lookup methods
 **********************************************/

exports.getAllAccounts = function(callback)
{
	Account.find({}, (error, accounts) => {
		if (error)
			callback(error);
		else
			callback(null, accounts);
	});
};

exports.deleteAccount = function(id, callback)
{
	Account.findOneAndDelete({_id: id}, callback);
};

exports.deleteAllAccounts = function(callback)
{
	accounts.deleteMany({}, callback);
};

/**********************************************
	exercise insertion, update & deletion methods
 **********************************************/

exports.addNewExercise = function(newData, callback)
{
	Exercise.findOne({name:newData.name}, function(error, exercise)
	{
		if (exercise)
			callback('exercise-name-taken');
		else {
			// append date stamp when record was created //
			newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
      const exercise = new Exercise(newData);
      exercise.save()
        .then(newExercise => {
          callback(null);
        })
				.catch(error => {
					callback(error);
				});
		}
	});
};

exports.updateExercise = function(newData, callback)
{
	var o =
	{
		name : newData.name2,
		movielink : newData.movielink,
		unit : newData.unit,
		comment : newData.comment
	};

	exercise.findOneAndUpdate({_id:getObjectId(newData.id)}, {$set:o}, {returnOriginal : false}, callback);
};

exports.getAllExercise = function(callback)
{
	Exercise.find({}, (error, exercise) => {
		if (error)
			callback(error);
		else
			callback(null, exercise);
	});
};

exports.deleteExercise = function(id, callback)
{
	exercise.deleteOne({_id:getObjectId(id)}, callback);
};

/**********************************************
	Block insertion, update & deletion methods
 **********************************************/

exports.addNewBlock = function(newData, callback)
{
	Block.findOne({name:newData.name}, (error, block) => {
		if (block) {
			callback('block-name-taken');
		}	else {
			// append date stamp when record was created //
			newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
			const newBlock = new Block(newData);
      newBlock.save()
        .then(newBlock => {
          callback(null);
        })
				.catch(error => {
					callback(error);
				});
		}
	});
};

exports.updateblock = function(newData, callback)
{
	var o =
	{
		name : newData.name,
		unit : newData.unit,
		exercises: newData.exercises,
		done: newData.done
	};

	blockdb.findOneAndUpdate({_id:getObjectId(newData.id)}, {$set:o}, {returnOriginal : false}, callback);
};

exports.deleteBlock = function(id, callback)
{
	blockdb.deleteOne({_id:getObjectId(id)}, callback);
};

exports.getAllBlocks = function(callback)
{
	Block.find({}, (error, block) => {
		if (error)
			callback(error);
		else
			callback(null, block);
	});
};

exports.getAllBlockWithExercise = function(callback)
{
	Block.find({}, (error, block) => {
		if (error)
		{
			callback(error);
		}
		else
		{
			Exercise.find({}).select("name").exec((error, exercises) => {
				if (error)
				{
					callback(error);
				}
				else
				{
					block.push({exercises});
					callback(null, block);
				}
			});
		}
	});
};

/**********************************************
	DailyPlan insertion, update & deletion methods
 **********************************************/

exports.addNewDailyPlan = function(newData, callback)
{
	Dailyplan.findOne(
		{
		$and: [
			{
				$or: [
					{$and: [{startDate: {$lte: new Date(newData.startDate)}}, {endDate: {$gte: new Date(newData.startDate)}}]},
					{$and: [{startDate: {$lte: new Date(newData.endDate)}}, {endDate: {$gte: new Date(newData.endDate)}}]},
					{$and: [{startDate: {$lte: new Date(newData.startDate)}}, {endDate: {$gte: new Date(newData.endDate)}}]},
					{$and: [{startDate: {$gte: new Date(newData.startDate)}}, {endDate: {$lte: new Date(newData.endDate)}}]}
				]
			},
			{userId: newData.userId}
		]
	}, (error, dailyplan) => {
		if (dailyplan) {
			callback('This user already have a dailyplan for the selected date!');
		}	else if (error) {
			callback(error.message.message);
		} else {
			// append date stamp when record was created //
			newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
			const newDailyplan = new Dailyplan(newData);
      newDailyplan.save()
        .then(newDailyplan => {
          callback(null);
        })
				.catch(error => {
					callback(error);
				});
		}
	});
};

exports.getUserAllDailyPlanDates = function(userData, callback)
{
	Dailyplan
	.find({userId: userData.userId})
	.select('startDate endDate -_id')
	.exec((error, dailyplanDates) => {
		let dates = [];
		let oneDayinMs = 86400000;
		if (error)
			callback(error);
		else
			dailyplanDates.map(dailyplan => {
				let days = Math.round((dailyplan.endDate - dailyplan.startDate)/oneDayinMs);
				let startDate = Math.round(new Date(dailyplan.startDate).getTime()/1000);
				let nextDate = new Date(dailyplan.startDate).getTime();
				dates.push(startDate)
				for (let i = 1; i < days; i++) {
					nextDate += oneDayinMs;
					dates.push(nextDate/1000);
				}
			});
			callback(null, dates);
	});
};

/*exports.updateDailyPlan = function(newData, callback)
{
	var o =
	{
		name : newData.name,
		unit : newData.unit,
		exercises: newData.exercises,
		done: newData.done
	};

	blockdb.findOneAndUpdate({_id:getObjectId(newData.id)}, {$set:o}, {returnOriginal : false}, callback);
};

exports.deleteBlock = function(id, callback)
{
	blockdb.deleteOne({_id:getObjectId(id)}, callback);
};*/

exports.getUserDailyPlan = function(userData, callback) {
	Dailyplan.aggregate([
		{$match: { startDate: { $lte: new Date(userData.date)}, endDate: { $gte: new Date(userData.date)}, userId: userData.id}},
		{
			$lookup: {
				"from": "blocks",
				"localField": "id",
				"foreignField": "id",
				"as": "allBlocks"
			}
		},
		{
			$lookup: {
				"from": "exercises",
				"localField": "exerciseList",
				"foreignField": "id",
				"as": "allExercises"
			}
		}
	])
	.exec(function(error, dailyplan) {
		if (error) {
			callback(error);
		} else {
			callback(null, dailyplan);
		}
	});
};

exports.getAllDailyPlan = function(callback)
{
	Dailyplan.find({}, (error, dailyplan) => {
		if (error)
			callback(error);
		else
			callback(null, dailyplan);
	});
};

exports.getAllDailyPlanWithBlock = function(callback)
{
	Dailyplan.find({}, (error, dailyplan) => {
		if (error)
		{
			callback(error);
		}
		else
		{
			Block.find({}).select("name").exec((error, block) => {
				if (error)
				{
					callback(error);
				}
				else
				{
					dailyplan.push({block});
					callback(null, dailyplan);
				}
			});
		}
	});
};


/**********************************************
	private encryption & validation methods
 ***********************************************/

var generateSalt = function()
{
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	var salt = '';
	for (var i = 0; i < 10; i++)
	{
		var p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	return salt;
}

var sha512 = function(str)
{
	return crypto.createHash('sha512').update(str).digest('hex');
}

var saltAndHash = function(pass, callback)
{
	var salt = generateSalt();
	callback(salt + sha512(pass + salt));
}

var validatePassword = function(plainPass, hashedPass, callback)
{
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + sha512(plainPass + salt);
	callback(null, hashedPass === validHash);
}

// var getObjectId = function(id)
// {
// 	return new require('mongodb').ObjectID(id);
// }

var listIndexes = function()
{
	accounts.indexes(null, function(e, indexes)
	{
		for (var i = 0; i < indexes.length; i++)
			console.log('index:', i, indexes[i]);
	});
}
