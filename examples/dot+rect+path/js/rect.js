d3.json("./data/data.json").then(function (data) {
    let width = document.getElementById("right_top").offsetWidth;
    let height = document.getElementById("right_top").offsetHeight;
    const svg = d3.select("#right_top").append("svg")
        .attr("width", width)
        .attr("height", height)
    let max = d3.max(data, d => Number(d.value));
    let min = d3.min(data, function (d) {
        return Number(d.value);
    });
    let rect_w = (width - 20) / data.length;;
    let linear = d3.scaleLinear().domain([min, max]).range([20, height - 80]);
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => 10 + rect_w * i)
        .attr("y", function (d) {
            return height - 40 - linear(d.value);
        })
        .attr("width", rect_w - 5)
        .attr("height", function (d) {
            return linear(d.value);
        })
        .attr("fill", "blue")
})