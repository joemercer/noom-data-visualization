// Main js file
// this file require all the other js files

// jQuery styling stuff
require('./styles');

// require d3
var d3 = require('d3');

var SunburstView = require('./views/sunburst');
var LineView = require('./views/line');

var SunburstAndLineGraphModel = require('./models/sunburstAndLineGraph');

SunburstAndLineGraphModel.init('accessCode', function(model){
	console.log('data', model);

	SunburstView.create(model.data);
	LineView.create(model.data.lineGraph.COMBINED.points.byMonth);

	// LineView.create(null);


});