let width = document.getElementById("right").offsetWidth;
let height = document.getElementById("right").offsetHeight;
const svg = d3.select("#right").append("svg")
    .attr("width", width).attr("height", height);
var g = svg.append("g");
let hierarchyData = d3.hierarchy(treedata)
    .sum(function (d, i) {
        return d.value;
    });
let tree = d3.tree()
    .size([width - 30, height - 200])
    .separation(function (a, b) {
        return (a.parent == b.parent ? 1 : 2) / a.depth;//一种更适合于径向布局的变体，可以按比例缩小半径差距:
    });
let treeData = tree(hierarchyData);
let nodes = treeData.descendants();
let links = treeData.links();

var link = d3.linkHorizontal()
    .x(function (d) { return d.y; })
    .y(function (d) { return d.x; });

g.append('g')
    .selectAll('path')
    .data(links)
    .enter()
    .append('path')
    .attr('d', function (d, i) {
        var start = { x: d.source.x, y: d.source.y + 10 };
        var end = { x: d.target.x, y: d.target.y + 10 };
        return link({ source: start, target: end });
    })
    .attr("class", d => "path" + d.source.data.name)
    .attr('stroke', 'pink')
    .attr('stroke-width', 1)
    .attr('fill', 'none');

var colors = d3.scaleOrdinal(d3.schemeCategory10);
g.selectAll('circle')
    .data(nodes)
    .enter()
    .append('circle')
    .attr('r', d => 10 - d.depth * 2)
    .attr('fill', (d, i) => colors(i))
    .attr('stroke-width', 1)
    .attr('stroke', 'pink')
    .attr("cx", d => d.y + 15)
    .attr("cy", d => d.x)
    .on("click", (c, d) => {
        svg.selectAll("path").style('stroke', 'pink')
        d3.selectAll(".path" + d.data.name).style("stroke", "blue")
    })

g.selectAll('text')
    .data(nodes)
    .enter()
    .append('text')
    .attr('x', d => d.y + 30)
    .attr('y', d => d.x - 5)
    .attr('dy', 10)
    .attr("font-size", "13px")
    .text(d => {
        return d.data.name;
    })