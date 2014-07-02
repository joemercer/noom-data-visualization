// Main js file
// this file require all the other js files

// jQuery styling stuff
require('./styles');

// big model

var SunburstAndLineGraphModel = require('./models/sunburstAndLineGraph');

var sunburstAndLineGraphModel = new SunburstAndLineGraphModel({
	accessCode: '!!!accessCode'
});

