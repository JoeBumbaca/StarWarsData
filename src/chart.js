export const chart = () => {

  let margin = { left: 100, right: 80, top: 10, bottom: 130 };

  let width = 1300 - margin.left - margin.right;
  let height = 700 - margin.top - margin.bottom;

  let flag = true;

  let t = d3.transition().duration(2500);

  let chart = d3.select('#chart')
    .append("svg")
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right);

  let g = chart.append("g")
    .attr("transform", "translate("+ margin.left + "," + margin.top + ")")

  let xAxisGroup = g.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0, " + height + ")");

  let yAxisGroup = g.append("g")
    .attr("class", "y-axis");

  let y = d3.scaleLinear()
    .range([height, 0]);

  let x = d3.scaleBand()
    .range([0, width])
    .paddingInner(0.3)
    .paddingOuter(0.3)

  let xLabel = g.append("text")
    .attr("class", "xAxisLabel")
    .attr("x", width / 2)
    .attr("y", height + 120)
    .attr("font-size", "30px")
    .attr("text-anchor", "middle")
    .text("Star Wars Characters")
    .attr("stroke", "fuchsia")
    .attr("fill", "fuchsia");

  let yLabel = g.append("text")
    .attr("class", "yAxisLabel")
    .attr("x", - (height / 2))
    .attr("y", -60)
    .attr("font-size", "30px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Height")
    .attr("stroke", "fuchsia")
    .attr("fill", "fuchsia");

  d3.json("./data/people.json")
    .then(data => {
      data.forEach(datum => {
        datum.height = +datum.height;
        datum.mass = +datum.mass;
    })

    

  d3.interval(() => {
    update(data)
    flag = !flag
    }, 3000);
    update(data);
  })

  const update = (data) => {
    let value = flag ? "height" : "mass";
    y.domain([0, d3.max(data, d => { return d[value] })]);
    x.domain(data.map(d => { return d.name }));

    // X Axis
    let xAxisCall = d3.axisBottom(x);
    xAxisGroup.transition(t).call(xAxisCall)
      .selectAll("text")
      .attr("y", "10")
      .attr("x", "-5")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-40)")
      .attr("stroke", "fuchsia");

    // Y Axis
    let yAxisCall = d3.axisLeft(y)
      .ticks(7)
      .tickFormat(d => {
        return d
      });
    yAxisGroup.transition(t).call(yAxisCall)
      .selectAll("text")
      .attr("stroke", "fuchsia");

    // JOIN new data with old elements.
    let rectangles = g.selectAll("rect")
      .data(data);

    // EXIT old elements not present in data.
    rectangles.exit()
      .attr("fill", "yellow")
    .transition(t)
      .attr("y", y(0))
      .attr("height", 0)
      .remove();
    // UPDATE old elements present in new data.
    rectangles.transition(t)
        .attr("y", (d) => { return y(d[value]) })
        .attr("height", (d) => { return height - y(d[value]) })
        .attr("width", x.bandwidth)
        .attr("x", (d, i) => { return x(d.name) })
    // ENTER new elements present in new data.
    rectangles.enter()
      .append("rect")
      .attr("width", x.bandwidth)
      .attr("x", (d, i) => { return x(d.name) })
      .attr("fill", "yellow")
      .attr("y", y(0))
      .attr("height", 0)
    .transition(t)
      .attr("y", (d) => { return y(d[value]) })
      .attr("height", (d) => { return height - y(d[value]) });

    let label = flag ? "Height (cm)" : "Mass (kg)"
    let xlabel = flag ? "Star Wars Character's Height" : "Star Wars Character's Weight"
    yLabel.text(label);
    xLabel.text(xlabel);
  }

};




