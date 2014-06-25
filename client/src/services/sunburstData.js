var $ = require('jquery');
var _ = require('lodash');

var SunburstData = {

	// cache the data
	data: {
		name: 'foodItems',
		children: []
	},

	// add a data item
	add: function(item) {

		// does this foodType exist yet?
		var foodType = _(this.data.children).find(function(x){
			return x.name === item.foodType;
		});

		// if this foodType doesn't exist yet then add it
		if (!foodType) {
			foodType = {
				name: item.foodType,
				children: []
			};
			this.data.children.push(foodType);
		}

		// does this foodCatagory exist yet?
		foodCatagory = _(foodType.children).find(function(x){
			return x.name === item.foodCategoryCode;
		});

		// if it does then increment the calories coming from that foodCatagory
		// else add it as a new foodCatagory
		if (foodCatagory) {
			foodCatagory.size += item.calories;
		}
		else {
			var foodCatagory = {
				name: item.foodCategoryCode,
				size: item.calories
			};
			foodType.children.push(foodCatagory);
		}

	}

};

module.exports = SunburstData;

