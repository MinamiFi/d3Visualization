d3.json('./data/scatter.json').then(data => {
  let div = d3.select('#scatter').node()
  let width = div.getBoundingClientRect().width
  let height = div.getBoundingClientRect().height
  let margin = 50

  // 定义两个比例尺
  let xScale = d3.scaleLinear(d3.extent(data, d => d.temp), [margin, width - margin])
  let yScale = d3.scaleLinear(d3.extent(data, d => d.demand), [height - margin, margin])

  let svg = d3.select('#scatter')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
  let g = svg.append('g')
  // console.log(d3.extent(data, d => d.temp))
  // console.log(d3.extent(data, d => d.demand))
  // console.log(xScale(-18.3))
  // .attr('transform', `translate(${margin},${margin})`)

  // 坐标轴
  g.append('g').call(d3.axisBottom(xScale)).attr('transform', `translate(${0},${height - margin})`)
  g.append('g').call(d3.axisLeft(yScale)).attr('transform', `translate(${margin},${0})`)

  // 定义颜色
  colors = ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"]
  // 散点
  g.selectAll('circle').data(data).enter().append('circle')
    .attr('cx', (d, i) => {
      if (!xScale(d.temp)) {
        return -100
      }
      return xScale(d.temp)
    })
    .attr('cy', d => yScale(d.demand))
    .attr('r', 3)
    .attr('fill', d => colors[d.month])
    // .attr('fill', 'steelblue')
    .attr('stroke', 'white')
    .attr('stroke-width', 0.5)
  // 矩形
  // colors.forEach((e, i) => {
  //   g.append('rect')
  //     .attr('x', i * 70)
  //     .attr('y', 560)
  //     .attr('width', 68)
  //     .attr('height', 8)
  //     .attr('fill', e)
  //     // 添加交互
  //     .on('mouseover', () => {
  //       d3.selectAll('circle')
  //         .sort(d => {
  //           return d.month === i ? 1 : -1
  //         })
  //         .attr('fill', d => {
  //           return d.month === i ? colors[i] : '#EEE'
  //         })
  //     })
  // });
})