var _ = require('lodash');

// by luck of the draw we can array index these correctly
var getPointsForMonths = function() {
	return [
		{
			x: 'Jan',
			y: 0
		},
		{
			x: 'Feb',
			y: 0
		},
		{
			x: 'Mar',
			y: 0
		},
		{
			x: 'Apr',
			y: 0
		},
		{
			x: 'May',
			y: 0
		},
		{
			x: 'Jun',
			y: 0
		},
		{
			x: 'Jul',
			y: 0
		},
		{
			x: 'Aug',
			y: 0
		},
		{
			x: 'Sep',
			y: 0
		},
		{
			x: 'Oct',
			y: 0
		},
		{
			x: 'Nov',
			y: 0
		},
		{
			x: 'Dec',
			y: 0
		}
	];
};
var getPointsForDayOfWeek = function() {
	return [
		{
			x: 'Sun',
			y: 0
		},
		{
			x: 'Mon',
			y: 0
		},
		{
			x: 'Tue',
			y: 0
		},
		{
			x: 'Wed',
			y: 0
		},
		{
			x: 'Thu',
			y: 0
		},
		{
			x: 'Fri',
			y: 0
		},
		{
			x: 'Sat',
			y: 0
		}
	];
};

var getSeries = function(points) {
	return {
		COMBINED: {
			key: 'COMBINED',
			label: 'Combined',
			points: points
		},
		BREAKFAST: {
			key: 'BREAKFAST',
			label: 'Breakfast',
			points: points
		},
		MORNING_SNACK: {
			key: 'MORNING_SNACK',
			label: 'Morning Snack',
			points: points
		},
		LUNCH: {
			key: 'LUNCH',
			label: 'Lunch',
			points: points
		},
		AFTERNOON_SNACK: {
			key: 'AFTERNOON_SNACK',
			label: 'Afternoon Snack',
			points: points
		},
		DINNER: {
			key: 'DINNER',
			label: 'Dinner',
			points: points
		},
		EVENING_SNACK: {
			key: 'EVENING_SNACK',
			label: 'Evening Snack',
			points: points
		}
	};
};

var LineGraph = function() {

};

_.extend(LineGraph, {

	data: {
		byMonth: getSeries(getPointsForMonths()),
		byDayOfWeek: getSeries(getPointsForDayOfWeek())
	},

	months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
	daysOfWeek: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],

	getData: function() {
		var data = {};
		data.byMonth = _(this.data).map(function(value) { return value; });
		data.byDayOfWeek = _(this.data).map(function(value) { return value; });

		return data;
	},

	add: function(foodEntry) {

		var date = new Date(foodEntry.dateConsumed);

		// byMonths
		var month = date.getMonth();
		// increment the calories for the food slot
		this.data.byMonth[foodEntry.timeSlot][month].y += foodEntry.calories;
		// increment the calories for the combined
		this.data.byMonth.COMBINED[month].y += foodEntry.calories;

		// byDayOfWeek
		var dayOfWeek = date.getDay();
		// increment the calories for the food slot
		this.data.byDayOfWeek[foodEntry.timeSlot][dayOfWeek].y += foodEntry.calories;
		// increment the calories for the combined
		this.data.byDayOfWeek.COMBINED[month].y += foodEntry.calories;

	}

});

module.exports = LineGraph;