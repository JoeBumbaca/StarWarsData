export const chart = () => {

  let chart = d3.select('#chart')
    .append("svg")
    .attr("height", 700)
    .attr("width", 1000);

  d3.json("../data/people.json")
    .then(data => {
      data.forEach(datum => {
        datum.height = +datum.height;
        datum.mass = +datum.mass;
    })

    var y = d3.scaleLinear()
      .domain([0, d3.max(data, d => {
        return d.height * 2;
      })
    ])
      .range([0, 700]);

    var x = d3.scaleBand()
      .domain(data.map(d => {
        return d.name
      }))
      .range([0, 1000])
      .paddingInner(0.5)
      .paddingOuter(0.2)

    let rectangles = chart.selectAll("rect")
      .data(data);

    rectangles.enter()
      .append("rect")
      .attr("height", (d) => {
        return y(d.height * 2);
      })
      .attr("width", x.bandwidth)
      .attr("x", (d, i) => {
        return x(d.name);
      })
      .attr("fill", "yellow")
  })

};




