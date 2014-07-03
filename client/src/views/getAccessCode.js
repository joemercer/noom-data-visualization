
var $ = require('jquery');
var Backbone = require('backbone');

var GetAccessCode = Backbone.View.extend({

	template: require('../../templates/partials/getAccessCode.hbs'),

	initialize: function() {
		debugger;
		this.$el = $('#getAccessCode');

		this.render();
	},

	render: function() {
		debugger;
		this.$el.html(this.template());
	}

});

module.exports = GetAccessCode;