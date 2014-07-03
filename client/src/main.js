// Main js file
// this file require all the other js files

// jQuery styling stuff
require('./styles');

var GetAccessCode = require('./views/getAccessCode');

var getAccessCode = new GetAccessCode({

});

// big model
var SunburstAndLineGraphModel = require('./models/sunburstAndLineGraph');

var sunburstAndLineGraphModel = new SunburstAndLineGraphModel({
	accessCode: '!!!accessCode'
});

