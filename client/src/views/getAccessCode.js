
var $ = require('jquery');
var Backbone = require('backbone');

var SunburstAndLineGraphModel = require('../models/sunburstAndLineGraph');

var GetAccessCode = Backbone.View.extend({

	template: require('../../templates/partials/getAccessCode.hbs'),

	events: {
    'click #submit-input-access-code': 'submitAccessCode',
  },

	initialize: function() {
		this.$el = $('#getAccessCode');

		this.render();
	},

	render: function() {
		this.$el.html(this.template({}));
	},

	submitAccessCode: function(e) {
		var accessCode = $('#input-access-code').val();

		// if (!accessCode) {
		// 	accessCode = 'SK55HNCD';
		// }

		debugger;

		if (!accessCode) {
			return;
		}

		var sunburstAndLineGraphModel = new SunburstAndLineGraphModel({
			accessCode: accessCode
		});

	}

});

module.exports = GetAccessCode;