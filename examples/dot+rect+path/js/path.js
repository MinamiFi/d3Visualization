
let height = document.getElementById("right_bottom").offsetHeight;
let width = document.getElementById("right_bottom").offsetWidth;
const svg = d3.select("#right_bottom").append("svg")
    .attr("width", width).attr("height", height)
let getPath = d3.line().curve(d3.curveBasis);
svg.append("g")
    .append("path")
    .attr("stroke", "black")
    .attr("fill", "none")
    .attr("class", "path");

function clickcircle(id) {
    d3.json("./data/test.json").then(cardata => {
        for (let i = 0; i < cardata.length; i++) {
            if (cardata[i].id == id) {
                let arr = cardata[i].data;
                let max = d3.max(arr);
                let linear = d3.scaleLinear().domain([0, max]).range([0, height - 80]);
                let points = [];
                for (let i = 0; i < arr.length; i++) {
                    points.push([30 + 20 * i, height - linear(arr[i])])
                }
                d3.select(".path").attr("d", getPath(points));
                break;
            }
        }
    })
}