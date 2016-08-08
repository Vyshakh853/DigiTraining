    // set the margin
    var margin = {top: 50,right: 20,bottom: 250,left: 60},
        width = 750 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;


    // set the range
    var x = d3.scale.ordinal().rangeRoundBands([0, width], .3);

    var y = d3.scale.linear().range([height, 0]);

    // X axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")

        //Y axis
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "<strong>Total :</strong> <span style='color:red'>" + d.total + "</span>";
        })
        // SVG element
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    svg.call(tip);
    // read data from json
    d3.json("json/third.json", function(error, data) {

        data.forEach(function(d) {
            d.CountryName = d.CountryName;
            d.total = +d.total;
            console.log(d.total);
        });
        x.domain(data.map(function(d) {
            return d.CountryName;
        }));
        y.domain([0, d3.max(data, function(d) {
            return d.total;
        })]);
        console.log(y.domain());
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-55)");

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 5)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Frequency");


        // Add bar chart
        svg.selectAll("bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) {
                return x(d.CountryName);
            })
            .attr("width", x.rangeBand())
            .attr("y", function(d) {
                return y(d.total);
            })
            .attr("height", function(d) {
                return height - y(d.total);
            })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)

    });