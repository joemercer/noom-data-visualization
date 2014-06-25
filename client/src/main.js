// Main js file
// this file require all the other js files

// jQuery styling stuff
require('./styles');

// require d3
var d3 = require('d3');



DataService = require('./services/data');
DataService.init('accessCode', function(data){
	console.log('data', data);
});