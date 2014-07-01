
var _ = require('lodash');

var NoomData = require('../services/noomData');

var LineGraphModel = require('./lineGraph');

module.exports = {

	// !!! name should be key
	data: {
		name: 'foodEntries',
		color: 'black',
		lineGraph: new LineGraphModel(),
		children: [
			// red, yellow, green
		]
	},

	// current level of the user in the visualization
	level: 'foodEntries',




	init: function(accessCode, cb) {

		NoomData.get('access code', _.bind(function(data){

			_(data.operations).forEach(_.bind(function(item){

				if (item.foodEntry) {
					this.add(item.foodEntry);
				}

			}, this));

			// callback with the model
			cb(this);

		}, this));

		return this;
	},

	add: function(foodEntry) {

		this.data.lineGraph.add(foodEntry);

		var foodType = this._addFoodType(foodEntry);
		foodType.lineGraph.add(foodEntry);

		var foodCatagory = this._addFoodCatagory(foodType, foodEntry);
		foodCatagory.lineGraph.add(foodEntry);

	},

	// returns the new foodType, creates if necessary
	_addFoodType: function(foodEntry) {

		// does this foodType exist yet?
		var foodType = _(this.data.children).find(function(x){
			return x.name === foodEntry.foodType;
		});

		// if this foodType doesn't exist yet then add it
		if (!foodType) {
			foodType = {
				name: foodEntry.foodType,
				color: this.getColor(foodEntry.foodType),
				lineGraph: new LineGraphModel(),
				children: []
			};
			this.data.children.push(foodType);
		}

		return foodType;
	},

	// return the new foodCatagory, creates if necessary
	_addFoodCatagory: function(foodType, foodEntry) {

		// does this foodCatagory exist yet?
		var foodCatagory = _(foodType.children).find(function(x){
			return x.name === foodEntry.foodCategoryCode;
		});

		// if it does then increment the calories coming from that foodCatagory
		// else add it as a new foodCatagory
		if (foodCatagory) {
			foodCatagory.size += foodEntry.calories;
		}
		else {
			foodCatagory = {
				name: foodEntry.foodCategoryCode,
				color: this.getColor(foodEntry.foodCategoryCode),
				lineGraph: new LineGraphModel(),
				size: foodEntry.calories
			};
			foodType.children.push(foodCatagory);
		}

		return foodCatagory;
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