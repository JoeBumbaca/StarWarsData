export const bubble_chart = () => {
  let margin = { left: 100, right: 80, top: 20, bottom: 130 };

  let width = 1300 - margin.left - margin.right;
  let height = 700 - margin.top - margin.bottom;

  let flag = true;

  let bubble_chart = d3.select('#bubble_chart')
    .append('svg')
    .attr("height", height + margin.top, + margin.bottom)
    .attr("width", width + margin.left, margin.right);
  
  let g = bubble_chart.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.json("../data/planets.json")
    .then(data => {
      data.forEach(datum => {
        datum.rotation_period = +datum.rotation_period;
        datum.orbital_period = +datum.orbital_period;
        datum.diameter = +datum.diameter;
        datum.population = +datum.population;
      })

      let circles = g.selectAll("circle")
        .data(data);

      circles.enter()
        .append("circle")
        .attr("cx", d => { return (d.population / 10000) })
        .attr("cy", d => { return (d.orbital_period / 12) })
        .attr("r", d => { return (d.diameter / 1000) })
        .attr("fill", d => {
            switch(true) {
            case (d.rotation_period < 20):
              return "burlywood";
            case (d.rotation_period < 30):
              return "blue";
            case (d.rotation_period < 40):
              return "pink";
            default:
              return "red"
          }
        })
        .attr("opacity", .55);
    })
}