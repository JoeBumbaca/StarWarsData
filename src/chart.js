export const chart = () => {
  d3.select("body").style("background-color", "lightgrey");

  let chart = d3.select('#chart')
    .append("svg")
    .attr("height", 100)
    .attr("width", 200);

  d3.json("../data/people.json")
    .then(data => {
      data.forEach(datum => {
        datum.height = +datum.height;
        datum.mass = +datum.mass;
    })
  
    
    // let circles = chart.selectAll("circle")
    //   .data(data);

    // circles.enter()
    //   .append("circle")
    //     .attr("cx", (d, i) => {
    //         return (i * 50) + 150;
    //     })
    //     .attr("cy", 100)
    //     .attr("r", (d) => {
    //         return d.mass / 3;
    //     })
    //     .attr("fill", (d) => {
    //       if (d.name === "C-3PO") {
    //         return "blue"
    //       } else {
    //         return "fuchsia"
    //       }
    //     })
    //     .attr("stroke", "yellow")
    //     .attr("stroke-width", 2)

    var y = d3.scaleLinear()
      .domain([0, 334])
      .range([0, 100]);

    var x = d3.scaleBand()
      .domain(data.map(d => {
        return d.name
      }))
      .range([0, 150])
      .paddingInner(0.4)
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
      .attr("stroke", "navy")

  })

};




