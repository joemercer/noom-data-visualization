var Backbone = require('backbone');
var _ = require('lodash');



var LineGraph = Backbone.Model.extend({

	defaults: {},

	getPointsForMonth: function() {
		return [
			{
				x: 'Jan',
				y: 0,
				total: 0,
				count: 0
			},
			{
				x: 'Feb',
				y: 0,
				total: 0,
				count: 0
			},
			{
				x: 'Mar',
				y: 0,
				total: 0,
				count: 0
			},
			{
				x: 'Apr',
				y: 0,
				total: 0,
				count: 0
			},
			{
				x: 'May',
				y: 0,
				total: 0,
				count: 0
			},
			{
				x: 'Jun',
				y: 0,
				total: 0,
				count: 0
			},
			{
				x: 'Jul',
				y: 0,
				total: 0,
				count: 0
			},
			{
				x: 'Aug',
				y: 0,
				total: 0,
				count: 0
			},
			{
				x: 'Sep',
				y: 0,
				total: 0,
				count: 0
			},
			{
				x: 'Oct',
				y: 0,
				total: 0,
				count: 0
			},
			{
				x: 'Nov',
				y: 0,
				total: 0,
				count: 0
			},
			{
				x: 'Dec',
				y: 0,
				total: 0,
				count: 0
			}
		];
	},

	getPointsForDayOfWeek: function() {
		return [
			{
				x: 'Sun',
				y: 0,
				total: 0,
				count: 0
			},
			{
				x: 'Mon',
				y: 0,
				total: 0,
				count: 0
			},
			{
				x: 'Tue',
				y: 0,
				total: 0,
				count: 0
			},
			{
				x: 'Wed',
				y: 0,
				total: 0,
				count: 0
			},
			{
				x: 'Thu',
				y: 0,
				total: 0,
				count: 0
			},
			{
				x: 'Fri',
				y: 0,
				total: 0,
				count: 0
			},
			{
				x: 'Sat',
				y: 0,
				total: 0,
				count: 0
			}
		];
	},

	initialize: function() {
		
		var byMonth = _.cloneDeep({
			COMBINED: {
				key: 'COMBINED',
				label: 'Combined',
				points: this.getPointsForMonth()
			},
			BREAKFAST: {
				key: 'BREAKFAST',
				label: 'Breakfast',
				points: this.getPointsForMonth()
			},
			MORNING_SNACK: {
				key: 'MORNING_SNACK',
				label: 'Morning Snack',
				points: this.getPointsForMonth()
			},
			LUNCH: {
				key: 'LUNCH',
				label: 'Lunch',
				points: this.getPointsForMonth()
			},
			AFTERNOON_SNACK: {
				key: 'AFTERNOON_SNACK',
				label: 'Afternoon Snack',
				points: this.getPointsForMonth()
			},
			DINNER: {
				key: 'DINNER',
				label: 'Dinner',
				points: this.getPointsForMonth()
			},
			EVENING_SNACK: {
				key: 'EVENING_SNACK',
				label: 'Evening Snack',
				points: this.getPointsForMonth()
			}
		});

		var byDayOfWeek = _.cloneDeep({
			COMBINED: {
				key: 'COMBINED',
				label: 'Combined',
				points: this.getPointsForDayOfWeek()
			},
			BREAKFAST: {
				key: 'BREAKFAST',
				label: 'Breakfast',
				points: this.getPointsForDayOfWeek()
			},
			MORNING_SNACK: {
				key: 'MORNING_SNACK',
				label: 'Morning Snack',
				points: this.getPointsForDayOfWeek()
			},
			LUNCH: {
				key: 'LUNCH',
				label: 'Lunch',
				points: this.getPointsForDayOfWeek()
			},
			AFTERNOON_SNACK: {
				key: 'AFTERNOON_SNACK',
				label: 'Afternoon Snack',
				points: this.getPointsForDayOfWeek()
			},
			DINNER: {
				key: 'DINNER',
				label: 'Dinner',
				points: this.getPointsForDayOfWeek()
			},
			EVENING_SNACK: {
				key: 'EVENING_SNACK',
				label: 'Evening Snack',
				points: this.getPointsForDayOfWeek()
			}
		});

		this.set('byMonth', byMonth);
		this.set('byDayOfWeek', byDayOfWeek);

	},

	// months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
	// daysOfWeek: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],

	add: function(foodEntry) {

		var date = new Date(foodEntry.dateConsumed);

		// byMonths for both timeSlot and COMBINED
		var month = date.getMonth();
		var byMonth = this.get('byMonth');
		byMonth[foodEntry.timeSlot].points[month].total += foodEntry.calories;
		byMonth[foodEntry.timeSlot].points[month].count += 1;
		byMonth[foodEntry.timeSlot].points[month].y = byMonth[foodEntry.timeSlot].points[month].total;
		byMonth.COMBINED.points[month].total += foodEntry.calories;
		byMonth.COMBINED.points[month].count += 1;
		byMonth.COMBINED.points[month].y = byMonth.COMBINED.points[month].total;
		this.set('byMonth', byMonth);

		// byDayOfWeek for both timeSlot and COMBINED
		var dayOfWeek = date.getDay();
		var byDayOfWeek = this.get('byDayOfWeek');
		byDayOfWeek[foodEntry.timeSlot].points[dayOfWeek].total += foodEntry.calories;
		byDayOfWeek[foodEntry.timeSlot].points[dayOfWeek].count += 1;
		byDayOfWeek[foodEntry.timeSlot].points[dayOfWeek].y = byDayOfWeek[foodEntry.timeSlot].points[dayOfWeek].total;
		byDayOfWeek.COMBINED.points[dayOfWeek].total += foodEntry.calories;
		byDayOfWeek.COMBINED.points[dayOfWeek].count += 1;
		byDayOfWeek.COMBINED.points[dayOfWeek].y = byDayOfWeek.COMBINED.points[dayOfWeek].total;
		this.set('byDayOfWeek', byDayOfWeek);

	}

});

module.exports = LineGraph;