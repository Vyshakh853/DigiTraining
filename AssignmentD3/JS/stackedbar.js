/*Initialise the xdata*/
var xData=["femaleValue","maleValue"];
/*Margin*/
var margin = {top: 50,right: 20,bottom: 250,left: 60},
		width = 960 - margin.left - margin.right,
	height = 700 - margin.top - margin.bottom; 
/*Range for x and y */
var x=d3.scale.ordinal().rangeRoundBands([0,width],0.3);
var y=d3.scale.linear().rangeRound([height,0]);
/*Color - category 10*/
var color=d3.scale.category10();
/*Initialise the xAxis*/
var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left")
	.ticks(10);
/*Svg creation*/
var svg=d3.select("body")
	.append("svg")
	.attr("width",width+margin.left+margin.right)
	.attr("height",height+margin.top+margin.bottom)
	.append('g')
	.attr("transform","translate("+margin.left+","+margin.top+")");
/*Reading the json data*/
d3.json("JSON/first.json",function(data){
	var dataIntermediate=xData.map(function(c){
		return data.map(function(d){
			return {x: d.Year, y:d[c]};
		});
	});//end of dataIntermediate
	var dataStackLayout=d3.layout.stack()(dataIntermediate);

	x.domain(dataStackLayout[0].map(function(d){
		return d.x;
	}));

	y.domain([0,d3.max(dataStackLayout[dataStackLayout.length-1],function(d){
			return parseFloat(d.y0)+parseFloat(d.y);
			})
		])
		.nice();

	var layer=svg.selectAll(".stack")
		.data(dataStackLayout)
		.enter().append('g')
		.attr("class","stack")
		.style("fill",function(d,i){
			return color(i);
		});

	layer.selectAll("rect")
		.data(function(d){
			return d;
		})	
		.enter().append("rect")
		.attr("x",function(d){
			return x(d.x);
		})
		.attr("y",function(d){
			return y(parseFloat(d.y)+parseFloat(d.y0));
		})
		.attr("height",function(d){
			return y(parseFloat(d.y0))-y(parseFloat(d.y)+parseFloat(d.y0));
		})
		.attr("width",x.rangeBand());

	svg.append('g')
		.attr("class","axis")
		.attr("transform","translate(0,"+height+")")
		.call(xAxis);
	svg.append("g")
			.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
		.selectAll("text")
		.style("text-anchor", "end")
		.attr("dx", "-.8em")
		.attr("dy", "-.55em")
		.attr("transform", "rotate(-55)")


	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 5)
		.attr("dy", ".71em")
		//.style("text-anchor", "end")
		.text("Value");
});//end of reading json file