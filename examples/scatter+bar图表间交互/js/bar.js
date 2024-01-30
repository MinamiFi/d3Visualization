d3.json('./data/bar.json').then(data => {
  let div = d3.select('#bar').node()
  let width = div.getBoundingClientRect().width
  let height = div.getBoundingClientRect().height
  let margin = 50
  let m = 1
  let rectWidth = Math.floor((width - 2 * margin) / (data.length)) / m

  let colors = ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"]
  // // 定义两个比例尺
  let xScale = d3.scaleBand()
    .domain(d3.map(data, d => d.month))
    .range([margin, width - margin])
  
  let extent = d3.extent(data, d => d.num)
  let min = extent[0]
  let max = extent[1]
  let yScale = d3.scaleLinear()
    .domain([min - 0.1 * (max - min), max + 0.1 * (max - min)])
    .range([height - margin, margin])

  let svg = d3.select('#bar')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0, ' + (height - margin) + ')')
    .call(d3.axisBottom(xScale))
  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(' + margin + ', 0)')
    .call(d3.axisLeft(yScale))

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => xScale(d.month))
    .attr('y', d => yScale(d.num))
    .attr('width', rectWidth)
    // .transition().duration(1000)
    .attr('height', d => yScale(min - 0.1 * (max - min)) - yScale(d.num))
    .attr('fill', d => colors[d.month])
    .attr('stroke', 'white')
    .attr('rx', 6)
    .on('mouseover', (e, d) => {
      d3.selectAll('circle')
        .sort(circleD => circleD.month === parseInt(d.month) ? 1 : -1)
        .attr('fill', circleD =>
          circleD.month === parseInt(d.month)
            ? colors[d.month]
            : '#EEE'
        )
    })
})