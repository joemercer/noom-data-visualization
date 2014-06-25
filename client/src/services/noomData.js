var $ = require('jquery');
var _ = require('lodash');

var NoomData = {
	// cache the data 
	data: null,

	// get the data
	get: function(accessCode, cb) {
		if (this.data) {
			cb(this.data);
			return this;
		}

		// some logic to get data
		// from api
		// or from localStorage

		$.getJSON('data/SK55HNCD.json', _.bind(function(data){
			this.data = data;
			cb(data);
		}, this));
	
		return this;
	}
};

module.exports = NoomData;