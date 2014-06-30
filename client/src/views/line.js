var d3 = require('d3');
var _ = require('lodash');

module.exports = {

	create: function(data) {

		// !!! these should be added to the actual data
		data = {
			labels: {
				xAxis: 'Months',
				yAxis: 'Calories',
				keys: {
					BREAKFAST: 'Breakfast',
					LUNCH: 'Lunch',
					DINNER: 'Dinner',
					TOTAL: 'Total'
				}
			},
			keys: [
				'BREAKFAST',
				'LUNCH',
				'DINNER',
				'TOTAL'
			],
			BREAKFAST: {
				0: {
					x: 0,
					y: 5,
					xAxisLabel: 'January'
				},
				1: {
					x: 1,
					y: 50,
					xAxisLabel: 'February'
				},
				2: {
					x: 2,
					y: 25,
					xAxisLabel: 'February'
				}
			},
			LUNCH: {

			},
			DINNER: {

			},
			TOTAL: {

			}

		};

		// i guess we need to do some data cleaning here
		var lineKeys = data.keys;
		var monthKeys = [0,1,2,3,4,5,6,7,8,9,10,11,12];




		var margin = {top: 20, right: 80, bottom: 30, left: 50},
		    width = 960 - margin.left - margin.right,
		    height = 500 - margin.top - margin.bottom;

		var parseDate = d3.time.format("%Y%m%d").parse;

		var x = d3.scale.ordinal()
				.domain(monthKeys);
		    //.range([0, width]);

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

		// set the domain of the different lines
		// distinguished by color
	  // color.domain(data.keys);



	  // data.forEach(function(d) {
	  //   d.date = parseDate(d.date);
	  // });

	  // var lines = color.domain().map(function(key) {
	  //   return {
	  //     key: key,
	  //     values: data[key]
	  //   };
	  // });

	  y.domain([
	  	5,
	  	50
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
	      .text("Temperature (ºF)");

	  var city = svg.selectAll(".city")
	      .data(cities)
	    .enter().append("g")
	      .attr("class", "city");

	  city.append("path")
	      .attr("class", "line")
	      .attr("d", function(d) { return line(d.values); })
	      .style("stroke", function(d) { return color(d.name); });

	  city.append("text")
	      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
	      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
	      .attr("x", 3)
	      .attr("dy", ".35em")
	      .text(function(d) { return d.name; });

	}

};


