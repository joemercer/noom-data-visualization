
var _ = require('lodash');

var NoomData = require('./noomData');
var SunburstData = require('./sunburstData');

module.exports = {
	_sunburstData: null,

	init: function(accessCode, cb) {

		NoomData.get('access code', _.bind(function(data){

			_(data.operations).forEach(function(item){

				if (item.foodEntry) {
					SunburstData.add(item.foodEntry);
				}

			});

			this._sunburstData = SunburstData.data;

			cb(this);

		}, this));

		return this;
	}

};