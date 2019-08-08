export const bubble_chart = () => {
  let margin = { left: 100, right: 80, top: 10, bottom: 130 };

  let width = 1300 - margin.left - margin.right;
  let height = 700 - margin.top - margin.bottom;

  let flag = true;

  let bubble_chart = d3.select('#bubble_chart')
    .append('svg')
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right);
  
  let g = bubble_chart.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  let xAxis = g.append("g")
    .attr("class", "bubble-x-axis")
    .attr("transform", "translate(0, " + height + ")")

  let yAxis = g.append("g")
    .attr("class", "bubble-y-axis");

    
  g.append("text")
    .attr("class", "xAxisLabel")
    .attr("x", width / 2)
    .attr("y", height + 100)
    .attr("font-size", "30px")
    .attr("text-anchor", "middle")
    .text("Population")
    .attr("stroke", "lime")
    .attr("fill", "lime");

  let yLabel = g.append("text")
    .attr("class", "yAxisLabel")
    .attr("x", - (height / 2))
    .attr("y", -60)
    .attr("font-size", "30px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Orbital Period (days)")
    .attr("stroke", "lime")
    .attr("fill", "lime");

  d3.json("../data/planets.json")
    .then(data => {
      data.forEach(datum => {
        datum.rotation_period = +datum.rotation_period;
        datum.orbital_period = +datum.orbital_period;
        datum.diameter = +datum.diameter;
        datum.population = +datum.population;
      })
  

      let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => { return (d.orbital_period) })])
        .range([height, 0]);

      let x = d3.scaleLinear()
        .domain([0, d3.max(data, d => { return (d.population) })])
        .range([0, (width)]);

      let r = d3.scaleLinear()
        .domain([0, d3.max(data, d => { return d.diameter })])
        .range([10, 90]);

      let xAxisCall = d3.axisBottom(x);
      xAxis.call(xAxisCall)
        .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)")
        .attr("stroke", "lime");

      let yAxisCall = d3.axisLeft(y)
        .ticks(7)
        .tickFormat(d => {
          return d
        });
      yAxis.call(yAxisCall)
        .selectAll("text")
        .attr("stroke", "lime");
      

      let circles = g.selectAll("circle")
        .data(data);

      circles.enter()
        .append("circle")
        .attr("id", "planet")
        .attr("cx", d => { return (x(d.population) + 20 )})
        .attr("cy", d => { return height - (y(d.orbital_period) + 12) })
        .attr("r", d => { return r(d.diameter) })
        .attr("fill", d => {
            switch(true) {
            case (d.rotation_period < 20):
              return "lightgreen";
            case (d.rotation_period < 30):
              return "lightblue";
            case (d.rotation_period < 40):
              return "orange";
            default:
              return "red"
          }
        })
        .attr("opacity", .75)
    })

    let tooltip = d3.select("#bubble_chart")
      .append("div")
        .style("position", "absolute")
        .style("visibility", "visible")
        .style("background-color", "white")
        
        .text("I am a tooltip!");

    d3.select("#planet")
      .on("mouseover", function(){ return tooltip.style("visibility", "visible"); })
      .on("mousemove", function(){ return tooltip.style("top", d3.select(this).attr("cy") + "px")
        .style("left", d3.select(this).attr("cx") + "px"); })
      .on("mouseout", function(){ return tooltip.style("visibility", "hidden"); })
}