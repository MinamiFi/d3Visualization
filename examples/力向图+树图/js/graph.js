d3.csv('./data/network.csv').then(function (data) {
    // console.log(data);

    //数据处理
    let dataset = {};
    dataset.nodes = [];
    dataset.edges = [];
    let flag = [];
    for (let i = 0; i < data.length; i++) {
        //将起点加入数据
        if (flag.indexOf(data[i].source) < 0) {
            flag.push(data[i].source)
            dataset.nodes.push({ name: data[i].source })
        }

        //将终点加入数据
        if (flag.indexOf(data[i].target) < 0) {
            flag.push(data[i].target)
            dataset.nodes.push({ name: data[i].target })
        }
        dataset.edges.push({ source: Number(data[i].source) - 1, target: Number(data[i].target) - 1 })
    }
    // console.log(flag)
    // console.log(dataset)

    var colors = d3.scaleOrdinal(d3.schemeCategory10);
    let width = document.getElementById("left").offsetWidth - 2;
    let height = document.getElementById("left").offsetHeight;
    // console.log(width, height)

    let svg = d3.select('#left')
        .append('svg')
        .attr("width", width)
        .attr("height", height)
        .style("background-color", 'beige')

    //定义一个模拟力
    var force = d3.forceSimulation(dataset.nodes)
        .force("charge", d3.forceManyBody().strength(-100))
        .force("link", d3.forceLink(dataset.edges))
        .force("center", d3.forceCenter().x(width / 2).y(height / 2));

    var edges = svg.selectAll("line")
        .data(dataset.edges)
        .enter()
        .append("line")
        .style("stroke", "#ccc")
        .style("stroke-width", 1);

    var nodes = svg.selectAll("circle")
        .data(dataset.nodes)
        .enter()
        .append("circle")
        .attr("r", 10)
        .style("fill", function (d, i) {
            return colors(i);
        })
        .call(d3.drag()  //Define what to do on drag events
            .on("start", dragStarted)
            .on("drag", dragging)
            .on("end", dragEnded));
    force.on("tick", function () {
        edges.attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });

        nodes.attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; });

    });
    function dragStarted(event) {
        if (!event.active) force.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    // Update the subject (dragged node) position during drag.
    function dragging(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    // Restore the target alpha so the simulation cools after dragging ends.
    // Unfix the subject position now that it’s no longer being dragged.
    function dragEnded(event) {
        if (!event.active) force.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }
})
