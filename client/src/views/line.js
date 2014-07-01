var d3 = require('d3');
var _ = require('lodash');

module.exports = {

	create: function(data) {

		// i guess we need to do some data cleaning here
		// var lineKeys = data.keys; // these should be hard coded for now
		// var monthKeys = [0,1,2,3,4,5,6,7,8,9,10,11,12];

		var lineKeys = [
			'COMBINED',
			'BREAKFAST',
			'MORNING_SNACK',
			'LUNCH',
			'AFTERNOON_SNACK',
			'DINNER',
			'EVENING_SNACK'
		];

		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

		var daysOfWeek = ['Sun', 'Mon','Tue','Wed','Thu','Fri','Sat'];




		var margin = {top: 20, right: 80, bottom: 30, left: 50},
		    width = 960 - margin.left - margin.right,
		    height = 500 - margin.top - margin.bottom;

		var x = d3.scale.ordinal()
				.domain(months)
		    .rangePoints([0, width], 0);

		var y = d3.scale.linear()
		    .range([height, 0]);

		// set the domain of the different lines
		// distinguished by color
		var color = d3.scale.category10()
				.domain(lineKeys);

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


		// start doing stuff with the data

		series = [
			{
				key: 'BREAKFAST',
				label: 'Breakfast',
				points: [
					{
						x: 'Jan',
						y: 10
					},
					{
						x: 'Feb',
						y: 30
					},
					{
						x: 'Apr',
						y: 20
					}
				]
			},
			{
				key: 'LUNCH',
				label: 'Lunch',
				points: [
					{
						x: 'Jan',
						y: 5
					},
					{
						x: 'Feb',
						y: 20
					},
					{
						x: 'Mar',
						y: 15
					}
				]
			}
		];

	  // var lines = color.domain().map(function(key) {
	  //   return {
	  //     key: key,
	  //     values: data[key]
	  //   };
	  // });

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

};


