var margin = {top: 50, right: 50, bottom: 50, left: 150};
var width = 800 - margin.left - margin.right;
var height = 800 - margin.top - margin.bottom;
// Data Setup
// date, dosen_kumulativ, dosen_differenz_zum_vortag, dosen_erst_differenz_zum_vortag, dosen_zweit_differenz_zum_vortag, dosen_biontech_kumulativ, dosen_moderna_kumulativ, dosen_astrazeneca_kumulativ
d3.tsv('./ExampleData/exampleData.tsv').then(function(data){
    // if(error) {
    //     console.log(error);
    // }
    var parseDate = d3.timeParse("%Y-%m-%d")
    data.forEach(element => {
        console.log(element.date)
        console.log(parseDate(element.date))
        console.log(element.dosen_differenz_zum_vortag)
    });

    var xScale = d3.scaleTime()
                   .domain([
                        d3.min(data, function (d) { return parseDate(d.date); }),
                        d3.max(data, function (d) { return parseDate(d.date); })
                   ])
                   .rangeRound([0, width])

    var yScale = d3.scaleLinear()
                   .domain([0, d3.max(data, function (d) { return parseInt(d.dosen_differenz_zum_vortag) })])
                   .range([height, 0]);
    //Create SVG element
    var svg = d3.select("#bar_chart")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Create bars
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) {
                return xScale(parseDate(d.date));
        })
        .attr("y", function(d) {
                return yScale(d.dosen_differenz_zum_vortag);
        })
        .attr("width", width/data.length)
        .attr("height", function(d) {
                return height - yScale(d.dosen_differenz_zum_vortag);
        })
        .attr("fill", function(d) {
                return "rgb(0, 0, 150)";
        });

    // x-axis
    svg.append("g")
        .attr("class", "x_axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    // y-axis
    svg.append("g")
        .attr("class", "y_axis")
        .call(d3.axisLeft(yScale));

    // ~~~ Tooltip ~~~
    svg.selectAll("rect").on("mouseover", function (d) {
        var xPosition = parseFloat(d3.select(this).attr("x")) + width / data.length / 2;
        var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + height / 2;

        d3.select("#tooltip")
            .style("left", xPosition + "px")
            .style("top", yPosition + "px")
            .select("#value")
            .text(`${d.dosen_differenz_zum_vortag.toLocaleString()}` + " am " + `${d.date}`);

        d3.select(this).attr("fill", "orange");
        d3.select("#tooltip").classed("hidden", false)
    })

    svg.selectAll("rect").on("mouseout", function (d) {
        d3.select("#tooltip").classed("hidden", true);
        d3.select(this).attr("fill", "rgb(0, 0, 150)");
    })

    // ~~~ Selections ~~~

    // ~~~ 1. Slider

    d3.select("#slider")
        .on("change", function() {
            var threshold = +d3.select(this).node().value;
            console.log(threshold)
            svg.selectAll("rect")
                .attr("fill", function(d) {
                    return "rgb(0, 0, 150)";
                })
                .filter(function(d) {
                    return d.dosen_differenz_zum_vortag <= threshold;
                })
                .attr("fill", "red");
        });


    // ~~~ 2. Random Colors
    d3.selectAll("#button")
      .on("click", function() {
          svg.selectAll("rect").each(changeToRandomColor);
      })

    var changeToRandomColor = function(d, i) {
        var colors = d3.schemeSet3;
        var colorIndex = Math.round(Math.random() * 11);

        d3.select(this)
            .attr("fill", colors[colorIndex]);
    }
})


