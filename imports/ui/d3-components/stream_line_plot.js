/**
 * Created by sladkovm on 01/02/16.
 */

// TODO:This must be wrapped into the function d3plot(selector, dataSet)

lineCanvas = function (selector, data) {
    // Add svg canvas to the selector
    var self = this;
    var svg;

    // Constructor
    var createSvg = function () {
        // Remove existing "svg" from the DOM element
        d3.select(selector).select("svg").remove();
        // Add a new one
        svg = d3.select(selector).append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
    };
    // ---- end constructor -----


    // Prepare the dimensions
    var margin = {top: 0, right: 20, bottom: 30, left: 50},
        labels = {left: 10, bottom:25},
        divWidth = $('.plot-size').width();
    //console.log(divWidth)
    width = divWidth - margin.left - margin.right;
    height = plotHeight - margin.top - margin.bottom;

    // Set the ranges
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    // Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(5);
    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);

    // Create the Svg
    createSvg();

    var area = d3.svg.area()
        .x(function(d) { return x(d.time); })
        .y0(height)
        //.y0(0)
        .y1(function(d) { return y(d.watts); });

    // ----- Data driven part -----------
    // Define the input for the line
    var valueline = d3.svg.line()
        .x(function(d) { return x(d.time); })
        .y(function(d) { return y(d.watts); });

    var yMaxValue = d3.max(data, function(d) { return d.watts; });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.time; }));
    y.domain([0, d3.max(data, function(d) { return d.watts; })]);

    console.log(yMaxValue)

    //svg.append("linearGradient")
    //    .attr("id", "line-gradient")
    //    .attr("gradientUnits", "userSpaceOnUse")
    //    .attr("x1", 0).attr("y1", 0)
    //    .attr("x2", 0).attr("y2", yMaxValue)
    //    .selectAll("stop")
    //    .data([
    //        {offset: "0%", color: "green"},
    //        {offset: "30%", color: "green"},
    //        {offset: "45%", color: "yellow"},
    //        {offset: "55%", color: "yellow"},
    //        {offset: "75%", color: "red"},
    //        {offset: "100%", color: "red"}
    //    ])
    //    .enter().append("stop")
    //    .attr("offset", function(d) { return d.offset; })
    //    .attr("stop-color", function(d) { return d.color; });

    // TODO: How to scale it according to the Training Zones
    svg.append("linearGradient")
        .attr("id", "area-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0).attr("y1", 0)
        .attr("x2", 0).attr("y2", 0.5*374)
        .selectAll("stop")
        .data([
            {offset: "0%", color: "red"},
            {offset: "30%", color: "red"},
            {offset: "45%", color: "yellow"},
            {offset: "55%", color: "yellow"},
            {offset: "60%", color: "lawngreen"},
            {offset: "100%", color: "lawngreen"}
        ])
        .enter().append("stop")
        .attr("offset", function(d) { return d.offset; })
        .attr("stop-color", function(d) { return d.color; });


    // Add area fill
    svg.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area);

    // ---- Append Path, Axis and goodies to the plot -------
    //// Add the valueline path.
    //svg.append("path")
    //    .attr("class", "line")
    //    .attr("d", valueline(data));

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // text label for the x axis

    svg.append("text")
        .attr("x", width/2)
        .attr("y", height + 1.0*margin.bottom)
        .style("text-anchor", "middle")
        .text("time [sec]");


    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - 1.0*margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Power [Watts]");

};