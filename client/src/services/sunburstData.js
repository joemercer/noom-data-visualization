var $ = require('jquery');
var _ = require('lodash');

var SunburstData = {

	// cache the data
	data: {
		name: 'foodItems',
		color: 'black',
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
				color: this.getColor(item.foodType),
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
				color: this.getColor(item.foodCategoryCode),
				size: item.calories
			};
			foodType.children.push(foodCatagory);
		}

	},

	_colors: [
		'purple',
		'yellow',
		'orange',
		'teal',
		'pink',
		'azure',
		'maroon'
	],

	_colorsMap: {
		'RED': 'red',
		'YELLOW': 'yellow',
		'GREEN': 'green',
		'WATER': 'blue'
	},

	getColor: function(name) {
		if (!this._colorsMap[name]) {
			var index = Math.floor(Math.random() * this._colors.length);
			this._colorsMap[name] = this._colors[index];
		}
		return this._colorsMap[name];
	}

};

module.exports = SunburstData;

