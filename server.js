'use strict';

// require() is node's way of loading modules
// npm modules should be defined in the package.json

// Express: http://expressjs.com/
var express = require('express');

// utilities for dealing with file paths
var path = require('path');

// http interface
var http = require('http');

// Express previously used Connect middleware
// which is now split up into independent modules
// see https://github.com/senchalabs/connect#middleware

// logging
var morgan = require('morgan');

// error handling
var errorhandler = require('errorhandler');

// automatically parse the body of a res
var bodyParser = require('body-parser');

// set up the Express app
var app = express();

// assign the port
app.set('port', process.env.PORT || 3300);

// load some middleware
// app.use() is Express's way of loading middleware

// log every request
app.use(morgan('dev'));

// parse application/json
app.use(bodyParser.json());

// respond to requests for noom data
app.get('/noom/data/:accessCode', function(req, res1){
	var accessCode = req.params.accessCode;
	if (!accessCode) {
		res1.send({
			error: true,
			message: 'no access code'
		});
		return;
	}

	var url = 'http://data.noom.com/servlets/HighScoreServer/calorific/download.htm?';
	url += 'jsonRequest={';
	url += '"accessCode":"'+accessCode+'",';
	url += '"generateNewUuids":true,"lastDownloadedGeneration":0}';

	http.get(url, function(res2) {
		console.log("Got response from Noom: " + res2.statusCode);
		var output = '';
		res2.setEncoding('utf8');

		res2.on('data', function (chunk) {
			output += chunk;
		});

		res2.on('end', function() {
			var obj = JSON.parse(output);
			console.log('returning data', res2.statusCode);

			res1.send(obj);
		});
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
		res1.send({
			error: true,
			message: 'http on error'
		});
	});

});

// serve back anything in the public directory
// no path (e.g. /) will default to load index.html
app.use('/', express.static(path.join(__dirname, 'public')));

// dump out errors in development only
if (process.env.NODE_ENV === 'development') {
	app.use(errorhandler());
}

// boot up the server and listen on the assigned port
http.createServer(app).listen(app.get('port'), function() {
	console.log('Server up: http://localhost:' + app.get('port'));
});
