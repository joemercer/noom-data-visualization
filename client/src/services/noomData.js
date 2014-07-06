var $ = require('jquery');
var _ = require('lodash');

var NoomData = {
	// cache the data 
	data: null,

	// get the data
	get: function(accessCode, cb) {

		// return cached data
		if (this.data && this.data.accessCode === accessCode) {
			cb(this.data);
			return this;
		}

		// some logic to get data
		// from api
		// or from localStorage


		// generate the url
		var url = this.getUrl(accessCode);

		console.log('url:', url);

		// url = 'data/SK55HNCD.json';
		$.getJSON(url, _.bind(function(data){
			console.log('got data', data);
			this.data = data;

			cb(data);
		}, this));
	
		return this;
	},

	getUrl: function(accessCode) {
		// var url = 'https://data.noom.com/servlets/HighScoreServer/calorific/download.htm?';
		// url += 'jsonRequest={';
		// url += '"accessCode":"'+accessCode+'",';
		// url += '"generateNewUuids":true,"lastDownloadedGeneration":0}';
		// return url;

		return '/noom/data/'+accessCode;
	}
};

module.exports = NoomData;