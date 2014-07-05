
var _ = require('lodash');
var Backbone = require('backbone');
var d3 = require('d3');

var Sunburst = Backbone.View.extend({

	events: {

	},

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);

		this.render();
	},

	render: function() {
		var width = 960,
				height = 700;
		this.radius = Math.min(width, height) / 2;

		this.x = d3.scale.linear()
			.range([0, 2 * Math.PI]);

		this.y = d3.scale.sqrt()
			.range([0, this.radius]);

		var color = d3.scale.category20c();

		var svg = d3.select("body").append("svg")
			.attr("width", width)
			.attr("height", height)
		.append("g")
			.attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

		var partition = d3.layout.partition()
			.value(function(d) { return d.size; });

		this.arc = d3.svg.arc()
			.startAngle(_.bind(function(d) { return Math.max(0, Math.min(2 * Math.PI, this.x(d.x))); }, this))
			.endAngle(_.bind(function(d) { return Math.max(0, Math.min(2 * Math.PI, this.x(d.x + d.dx))); }, this))
			.innerRadius(_.bind(function(d) { return Math.max(0, this.y(d.y)); }, this))
			.outerRadius(_.bind(function(d) { return Math.max(0, this.y(d.y + d.dy)); }, this));

		// set the root to be our data
		root = this.model.get('data');

		this.path = svg.selectAll("path")
			.data(partition.nodes(root))
		.enter().append("path")
			.attr("data-id", function(d){
				return d.name;
			})
			.attr("d", this.arc)
			.style("fill", function(d) {
				return d.color;
			})
			.on("click", _.bind(this.onArcClicked, this));

		d3.select(self.frameElement).style("height", height + "px");

	},

	onArcClicked: function(d) {
		console.log(d.name);

		this.path.transition()
				.duration(750)
				.attrTween("d", this.arcTween(d));
	},

	// Interpolate the scales!
	arcTween: function(d) {
		var xd = d3.interpolate(this.x.domain(), [d.x, d.x + d.dx]),
				yd = d3.interpolate(this.y.domain(), [d.y, 1]),
				yr = d3.interpolate(this.y.range(), [d.y ? 20 : 0, this.radius]);
		return _.bind(function(d, i) {
			return i ? _.bind(function(t) { return this.arc(d); }, this) : _.bind(function(t) { this.x.domain(xd(t)); this.y.domain(yd(t)).range(yr(t)); return this.arc(d); }, this);
		}, this);
	}

});

module.exports = Sunburst;


