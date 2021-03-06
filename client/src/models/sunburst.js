var _ = require('lodash');
var $ = require('jquery');

var NoomData = require('../services/noomData');

var LineGraphModel = require('./lineGraph');

var SunburstView = require('../views/sunburst');
var LineGraphView = require('../views/lineGraph');

var Sunburst = Backbone.Model.extend({

	defaults: {
		data: {
			name: 'foodEntries',
			color: 'black',
			totalCalories: 0,
			lineGraph: new LineGraphModel(),
			children: [
				// red, yellow, green
			]
		},
		currentLevel: 'foodEntries',
		lineGraphView: null
	},

	initialize: function() {
		var accessCode = this.get('accessCode');

		// if no access code then stop
		if (!accessCode) {
			return;
		}

		// get the data
		NoomData.get(accessCode, _.bind(function(data){

			_(data.operations).forEach(_.bind(function(item){

				if (item.foodEntry) {
					this.add(item.foodEntry);
				}

			}, this));

			// finished getting the data
			console.log('got data', data);
			console.log('transformed to', this.get('data'));

			// START setting up views

			$('.accessCode').addClass('hide');

			$('.visualization').removeClass('hide');

			var sunburstView = new SunburstView({
				model: this
			});

			var sunburstModel = this.get('data');
			var lineGraphView = new LineGraphView({
				model: sunburstModel.lineGraph
			});

			this.set('lineGraphView', lineGraphView);

			// END setting up views

		}, this));

	},

	changeLevel: function(key) {

		var found = null;
		var toRender = null;
		var data = this.get('data');

		if (data.name === key) {
			toRender = data.lineGraph;
			found = data;
		}
		else {
			_(data.children).forEach(function(child1){
				if (child1.name === key) {
					toRender = child1.lineGraph;
					found = child1;
				}
				else {
					_(child1.children).forEach(function(child2){
						if (child2.name === key) {
							toRender = child2.lineGraph;
							found = child2;
						}
					});
				}
			});
		}

		if (toRender) {

			var lineGraphView = new LineGraphView({
				model: toRender
			});

			this.set('lineGraphView', lineGraphView);
			this.set('currentLevel', key);

			// !!! this is an awkward place for this
			var infoTitle = '<h3>All '+found.totalCalories+' '+found.name+' calories binned by day of the week</h3>';
			$('.info-title').html(infoTitle);

		}

	},

	add: function(foodEntry) {

		var foodEntries = this.get('data');

		foodEntries.totalCalories += foodEntry.calories;
		foodEntries.lineGraph.add(foodEntry);

		var foodType = this._addFoodType(foodEntries, foodEntry);
		foodType.totalCalories += foodEntry.calories;
		foodType.lineGraph.add(foodEntry);

		var foodCatagory = this._addFoodCatagory(foodType, foodEntry);
		foodCatagory.totalCalories += foodEntry.calories;
		foodCatagory.lineGraph.add(foodEntry);

		this.set('data', foodEntries);

	},

	// returns the new foodType, creates if necessary
	_addFoodType: function(foodEntries, foodEntry) {

		// does this foodType exist yet?
		var foodType = _(foodEntries.children).find(function(x){
			return x.name === foodEntry.foodType;
		});

		// if this foodType doesn't exist yet then add it
		if (!foodType) {
			foodType = {
				name: foodEntry.foodType,
				color: this.getColor(foodEntry.foodType),
				totalCalories: 0,
				lineGraph: new LineGraphModel(),
				children: []
			};
			foodEntries.children.push(foodType);
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
				totalCalories: 0,
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

});

module.exports = Sunburst;