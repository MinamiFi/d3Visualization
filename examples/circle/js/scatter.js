//数据
let dataset = {};
d3.json("./data/data.json")
    .then(function (data) {
        console.log(data)
        let xmax = d3.max(data, function (d) { return Number(d[0]) })
        let xmin = d3.min(data, function (d) { return Number(d[0]) })
        let ymax = d3.max(data, function (d) { return Number(d[1]) })
        let ymin = d3.min(data, function (d) { return Number(d[1]) })
        console.log(xmax);
        console.log(xmin);
        console.log(ymax);
        console.log(ymin);


        //画布
        let width = document.getElementById("container").offsetWidth;
        let height = document.getElementById("container").offsetHeight;
        let svg = d3.select("#container")
            .append('svg')
            .attr('width', width - 2)
            .attr('height', height)
            .style("background-color", 'beige');

        //比例尺
        let xScale = d3.scaleLinear()
            .domain([xmin, xmax])
            .range([50, width]);

        let yScale = d3.scaleLinear()
            .domain([ymax, ymin])
            .range([0, height - 50])

        //坐标轴
        let xAxis = d3.axisBottom(xScale)
        let yAxis = d3.axisLeft(yScale)

        let xg = svg.append('g')
            .style('transform', "translate(-10px ," + (height / 2 + 30) + "px)")
            .call(xAxis);

        let yg = svg.append('g')
            .style('transform', "translate(40px , 30px)")
            .call(yAxis);

        //循环方式画点
        // for (let i = 0; i < 1000; i++) {
        //     svg.append('circle')
        //         .attr('cx', xScale(dataset[i][0]))
        //         .attr('cy', yScale(dataset[i][1]))
        //         .attr('r', "1px");
        // }

        let color = {
            "0": "red",
            "1": "blue",
            "2": "green",
        }

        //基于数据画点
        svg.selectAll('circle')
            .data(data)
            .enter()
            .append("circle")
            .attr('cx', function (d) { return xScale(d[0]) - 10 })
            .attr('cy', d => yScale(d[1]) + 30)
            .attr('r', '3px')
            .attr("fill", function (d) {
                return color[d[2]];
            })
            .on("mouseover", function (d) {
                d3.select(this)
                    .attr('fill', '#1f1f1f')
                    .style('opacity', 0.5)
            })
            .on("mouseout", function (d) {
                d3.select(this)
                    .attr('fill', d => color[d[2]])
                    .style('opacity', 1);
            })
            .on("click",function(d)
            {
                d3.selectAll("circle").attr("stroke", "none");
                d3.select(this)
                    .attr('stroke',"black")
                    .attr('stroke-width',' 2px')
            })
        // .attr("stroke", "blue");
    })

// console.log(dataset)
// let x = 0, y = 0;
// for (let i = 0; i < 1000; i++) {
//     x = Math.random();
//     y = Math.random();
//     dataset.push([x, y]);
// }
