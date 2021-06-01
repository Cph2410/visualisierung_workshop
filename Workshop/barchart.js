var margin = {top: 50, right: 50, bottom: 50, left: 150};
var width = 800 - margin.left - margin.right;
var height = 800- margin.top - margin.bottom;
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

    var xScale = d3.scaleBand()
                   .domain(data.map((d) => d.date))
                   .rangeRound([0, width])
                   .paddingInner(0.05);

    var yScale = d3.scaleLinear()
                   .domain([0, d3.max(data, function (d) { return parseInt(d.dosen_differenz_zum_vortag) })])
                   .range([0, height]);
    //Create SVG element
    var svg = d3.select("#bar_chart")
                .append("svg")
                .attr("width", width)
                .attr("height", height);

    //Create bars
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) {
                return xScale(d.date);
        })
        .attr("y", function(d) {
                return height - yScale(d.dosen_differenz_zum_vortag);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {
                return yScale(d.dosen_differenz_zum_vortag);
        })
        .attr("fill", function(d) {
                return "rgb(0, 0, 150)";
        });

    // x-axis
    svg.append("g")
        .attr("class", "x_axis")
        .attr("transform", "translate(0," + (height-50) + ")")
        .call(d3.axisBottom(xScale).ticks(d3.utcMonth).tickFormat(d3.timeFormat("%m")));

    // y-axis
    svg.append("g")
        .attr('transform', 'translate(' + [margin.left, margin.top] + ')')
        .attr("class", "y_axis")
        .call(d3.axisLeft(yScale));
})


