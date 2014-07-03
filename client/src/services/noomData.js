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


		// generate the url
		var url = getUrl(accessCode);

		// url = 'data/SK55HNCD.json';

		$.getJSON(url, _.bind(function(data){
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
	},

	getUrl: function(accessCode) {
		var url = 'https://data.noom.com/servlets/HighScoreServer/calorific/download.htm?jsonRequest={%22accessCode%22:%22';
		url += accessCode;
		url += '%22,%22generateNewUuids%22:true,%22lastDownloadedGeneration%22:0}';
		return url;
	}
};

module.exports = NoomData;