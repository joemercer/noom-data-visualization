
var _ = require('lodash');

var NoomData = require('../services/noomData');

var LineGraphModel = require('./lineGraph');

module.exports = {

	// data for the sunburst and line graph visualization
	// data: {
	// 	name: 'foodEntries',
	// 	color: 'black',
	// 	line: [
	// 		{
	// 			name: 'combined',
	// 			color: 'black',
	// 			points: {
	// 				byMonth: [{
	// 					x: 'date',
	// 					y: 'calories'
	// 				}],
	// 				byDayOfWeek: [{
	// 					x: 'date',
	// 					y: 'calories'
	// 				}],
	// 				byDayOfMonth: [{
	// 					x: 'date',
	// 					y: 'calories'
	// 				}]
	// 			}
	// 		}
	// 		// ... (breakfast, lunch, dinner)
	// 	]
	// 	children: [
	// 		// ...
	// 	]
	// },
	data: {
		name: 'foodEntries',
		color: 'black',
		lineGraph: _(LineGraphModel).extend(),
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

		this._addToLine(this.data.lineGraph, foodEntry);

		var foodType = this._addFoodType(foodEntry);
		this._addToLine(foodType.lineGraph, foodEntry);

		var foodCatagory = this._addFoodCatagory(foodType, foodEntry);
		this._addToLine(foodCatagory.lineGraph, foodEntry);

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
				// lineGraph: getLineGraphModel(),
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
				// lineGraph: getLineGraphModel(),
				size: foodEntry.calories
			};
			foodType.children.push(foodCatagory);
		}

		return foodCatagory;
	},

	_addToLine: function(line, foodEntry) {

		var date = new Date(foodEntry.dateConsumed);
		var month = date.getMonth();

		// month for specific timeslot
		var foundMonth = _(line[foodEntry.timeSlot].points.byMonth).find(function(point){
			return point.x === month;
		});

		if (!foundMonth) {
			line[foodEntry.timeSlot].points.byMonth.push({
				x: month,
				y: foodEntry.calories
			});
		}
		else {
			foundMonth.y += foodEntry.calories;
		}

		// combined month
		var foundCombinedMonth = _(line.COMBINED.points.byMonth).find(function(point){
			return point.x === month;
		});

		if (!foundCombinedMonth) {
			line.COMBINED.points.byMonth.push({
				x: month,
				y: foodEntry.calories
			});
		}
		else {
			foundCombinedMonth.y += foodEntry.calories;
		}

		// repeat for day of week and day of month

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