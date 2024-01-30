d3.csv("./data/data.csv").then(function (data) {
    let width = document.getElementById("center").offsetWidth;
    let height = document.getElementById("center").offsetHeight;
    const svg = d3.select("#center").append("svg")
        .attr("width", width)
        .attr("height", height)
    console.log(data)
    let xmax = d3.max(data, function (d) {
        return Number(d.x);
    });
    let xmin = d3.min(data, function (d) {
        return Number(d.x);
    });
    let ymax = d3.max(data, function (d) {
        return Number(d.y);
    });
    let ymin = d3.min(data, function (d) {
        return Number(d.y);
    });

    let color = {
        "A": "blue",
        "B": "red",
        "C": "yellow",
        "D": "green",
        "E": "pink"
    }
    let xlinear = d3.scaleLinear().domain([xmin, xmax]).range([50, width - 50]);
    let ylinear = d3.scaleLinear([ymin, ymax], [height - 50, 50]);
    let circles = svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return xlinear(d.x);
        })
        .attr("cy", function (d) {
            return ylinear(d.y);
        })
        .attr("r", 5)
        .attr("fill", function (d) {
            return color[d.type];
        })
        .on("click", function (c, d) {
            d3.selectAll("circle").attr("stroke", "none");
            d3.select(this).attr("stroke", "black");
            clickcircle(d.id)
        })

    let axisY = d3.axisLeft(ylinear);
    let axisX = d3.axisBottom(xlinear);
    let a = height - 50;
    svg.append("g")
        .style("transform", "translate(50px,0px)")
        .call(axisY)
    svg.append("g")
        .style("transform", "translate(0px," + a + "px)")
        .call(axisX)
})