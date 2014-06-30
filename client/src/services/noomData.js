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


			// var timeSlots = {};

			// _(data.operations).forEach(function(item) {
			// 	if (item.foodEntry) {
			// 		if (timeSlots[item.foodEntry.timeSlot]) {
			// 			timeSlots[item.foodEntry.timeSlot]++;
			// 		}
			// 		else {
			// 			timeSlots[item.foodEntry.timeSlot] = 1;
			// 		}
			// 	}
			// });

			// console.log(timeSlots);




			cb(data);
		}, this));
	
		return this;
	}
};

module.exports = NoomData;