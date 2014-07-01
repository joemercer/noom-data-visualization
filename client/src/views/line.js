// !!! rename to lineGraph.js

var _ = require('lodash');
var Backbone = require('backbone');
var d3 = require('d3');

var LineGraph = Backbone.View.extend({

	seriesKeys: [
		'COMBINED',
		'BREAKFAST',
		'MORNING_SNACK',
		'LUNCH',
		'AFTERNOON_SNACK',
		'DINNER',
		'EVENING_SNACK'
	],
	months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
	daysOfWeek: ['Sun', 'Mon','Tue','Wed','Thu','Fri','Sat'],

	tagName: 'div',
	className: 'line-graph-container',

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);

		this.render();
	},

	render: function() {

		var margin = {top: 20, right: 80, bottom: 30, left: 50},
				width = 960 - margin.left - margin.right,
				height = 500 - margin.top - margin.bottom;

		// !!! this should be dynamic cuz sometimes we don't want months
		var x = d3.scale.ordinal()
				.domain(this.months)
				.rangePoints([0, width], 0);

		var y = d3.scale.linear()
				.range([height, 0]);

		// set the domain of the different lines
		// distinguished by color
		var color = d3.scale.category10()
				.domain(this.seriesKeys);

		var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom");

		var yAxis = d3.svg.axis()
				.scale(y)
				.orient("left");

		var line = d3.svg.line()
				.interpolate("basis")
				.x(function(d) { return x(d.x); })
				.y(function(d) { return y(d.y); });

		var svg = d3.select("body").append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		// !!! don't always want byMonth - should be configurable
		// transform the data into an array
		// !!! this seems hacky
		var series = this.model.get('byMonth');
		series = _(series).map(function(value) { return value; });
		series = series.__wrapped__;

		y.domain([
			0,
			d3.max(series, function(s) { return d3.max(s.points, function(p) { return p.y; }); })
		]);

		svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis);

		svg.append("g")
				.attr("class", "y axis")
				.call(yAxis)
			.append("text")
				.attr("transform", "rotate(-90)")
				.attr("y", 6)
				.attr("dy", ".71em")
				.style("text-anchor", "end")
				.text("Calories");

		var serie = svg.selectAll(".serie")
				.data(series)
			.enter().append("g")
				.attr("class", "serie");

		serie.append("path")
				.attr("class", "line")
				.attr("d", function(d) { return line(d.points); })
				.style("stroke", function(d) { return color(d.key); })
				.style("stroke-width", 4)
				.style("fill", "transparent");

		serie.append("text")
				.datum(function(d) { return {label: d.label, value: d.points[d.points.length - 1]}; })
				.attr("transform", function(d) { return "translate(" + x(d.value.x) + "," + y(d.value.y) + ")"; })
				.attr("x", 3)
				.attr("dy", ".35em")
				.text(function(d) { return d.label; });

	}

});

module.exports = LineGraph;
