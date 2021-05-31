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
    // Scales
    var xScale = d3.scaleTime()
        .domain([
            d3.min(data, function (d) { return parseDate(d.date); }),
            d3.max(data, function (d) { return parseDate(d.date); })
        ])
        .range([0, width]);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) { return parseInt(d.dosen_differenz_zum_vortag) })])
        .range([height, 0]);

    // Line Generator
    var linefunc = d3.line()
        .x(function (d) { return xScale(parseDate(d.date)); })
        .y(function (d) { return yScale(d.dosen_differenz_zum_vortag); })

    // Area function
    var areafunc = d3.area()
        .x(function (d) { return xScale(parseDate(d.date)); })
        .y0(function () { return yScale.range()[0]; })
        .y1(function (d) { return yScale(d.dosen_differenz_zum_vortag); })

    // Creating the SVGs
    // Line chart
    var svgLineChart = d3.select("#line_chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    // Area chart
    var svgAreaChart = d3.select("#area_chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Creating the axis
    // x-axis
    svgLineChart.append("g")
        .attr("class", "x_axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    // y-axis
    svgLineChart.append("g")
        .attr("class", "y_axis")
        .call(d3.axisLeft(yScale));

    // Create the Line Chart Path
    svgLineChart.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", linefunc)

    // Create the Area Chart Path
    svgAreaChart.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", areafunc)

    svgAreaChart.append("g")
        .attr("class", "x_axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    svgAreaChart.append("g")
        .attr("class", "y_axis")
        .call(d3.axisLeft(yScale));

    // Formating the date to compare it with the dataset date
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    // Mouse Events for Area Chart
    svgAreaChart.select("path")
        .on("mousemove", function (d) {
            // Getting the Mouse xPosition 
            const currentXPosition = d3.mouse(this)[0];
            const xValue = xScale.invert(currentXPosition);

            var currentDate = formatDate(xValue);

            // Searching the dataset for the y Index
            const bisectDate = d3.bisector(element => element.date);
            const dataIndex = bisectDate.right(d, currentDate);

            // Positioning the tooltip
            d3.select("#tooltip")
                .style("top", (event.pageY) + "px")
                .style("left", (event.pageX) + "px")
                .select("#value")
                .text(`${data[dataIndex - 1].dosen_differenz_zum_vortag.toLocaleString()}` + " am " + `${xValue.toLocaleDateString()}`)

            d3.select("#tooltip").classed("hidden", false);
    });

    // Deleting the tooltip
    svgAreaChart.select("path")
        .on("mouseout", function (d) {
        d3.select("#tooltip").classed("hidden", true);
    });

})


