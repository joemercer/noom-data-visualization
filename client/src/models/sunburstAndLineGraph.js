
var SunburstModel = require('./sunburst');

var SunburstAndLineGraph = Backbone.Model.extend({

	defaults: {
		data: null,
		currentLevel: 'foodEntries'
	},

	initialize: function() {
		var accessCode = this.get('accessCode');

		// if no access code then stop
		if (!accessCode) {
			return;
		}

		var sunburstModel = new SunburstModel({
			accessCode: accessCode
		});

		this.set('data', sunburstModel);
	}

});

module.exports = SunburstAndLineGraph;