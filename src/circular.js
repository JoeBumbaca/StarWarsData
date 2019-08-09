export const circular = () => {
  let margin = { left: 100, right: 100, top: 100, bottom: 100 }

  let width = 1100 - margin.left - margin.right;
  let height = 800 - margin.top - margin.bottom;
  let innerRadius = 10;
  let outerRadius = Math.min(width, height) / 2;

  let circular = d3.select("#circular")
    .append("svg")
      .attr("height", height + margin.top + margin.bottom)
      .attr("width", width + margin.left + margin.right)

  let g = circular.append("g")
    .attr("transform", "translate(" + width / 1.5 + "," + (height / 2 + 100) + ")");


  d3.json("../data/starships.json")
    .then(data => {
      data.forEach(datum => {
        datum.cost_in_credits = + datum.cost_in_credits;
        datum.length = +datum.length;
        datum.max_atmosphering_speed = +datum.max_atmosphering_speed;
        datum.crew = +datum.crew;
        datum.passengers = +datum.passengers;
        datum.cargo_capacity = +datum.cargo_capacity;
        datum.hyperdrive_rating = +datum.hyperdrive_rating;
        datum.MGLT = +datum.MGLT;
      })


      let x = d3.scaleBand()
        .range([0, (2 * Math.PI)])
        .align(0)
        .domain( data.map( (d) => { return d.name }));

      let y = d3.scaleLinear()
        .range([innerRadius, outerRadius])
        .domain([0, 1]);

      g.append("g")
        .selectAll("path")
        .data(data)
        .enter()
        .append("path")
          .attr("fill", "blue")
          .attr("stroke", "white")
          .attr("d", d3.arc()
            .innerRadius(innerRadius)
            .outerRadius( (d) => { return y((d.hyperdrive_rating)); })
            .startAngle( (d) => { return x(d.name); })
            .endAngle( (d) => { return x(d.name) + x.bandwidth(); })
            .padAngle(0.09)
            .padRadius(innerRadius))

    })
}