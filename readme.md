# Node Login

[![node-login](./readme.img/node-login.jpg?raw=true)](https://nodejs-login.herokuapp.com)

### A basic account management system built in Node.js with the following features:

* New User Account Creation
* Secure Password Reset via Email
* Ability to Update / Delete Account
* Session Tracking for Logged-In Users
* Local Cookie Storage for Returning Users
* Blowfish-based Scheme Password Encryption

## Live Demo

[https://nodejs-login.herokuapp.com](https://nodejs-login.herokuapp.com)

For testing purposes you can view a [database dump of all accounts here](https://nodejs-login.herokuapp.com/print).<br>Note: This database automatically resets every 24 hours.

## Installation & Setup
1. Install [Node.js](https://nodejs.org/) & [MongoDB](https://www.mongodb.org/) if you haven't already.
2. Clone this repository and install its dependencies.

		> git clone git://github.com/braitsch/node-login.git node-login
		> cd node-login
		> npm install

3. In a separate shell start MongoDB.

		> npm start

## .env File Contents

	`PORT=`
	`MONGO_HOST=`
	`MONGO_USER=`
	`MONGO_PASS=`
	`MONGO_DB=`
	`FRONT_END_URL=`
