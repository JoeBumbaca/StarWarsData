export const bubble_chart = () => {
  let margin = { left: 100, right: 80, top: 10, bottom: 130 };

  let width = 1300 - margin.left - margin.right;
  let height = 700 - margin.top - margin.bottom;

  let flag = true;

  let bubble_chart = d3.select('#bubble_chart')
    .append('svg')
      .attr("height", height + margin.top + margin.bottom)
      .attr("width", width + margin.left + margin.right)
  
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
    .text("Planet Population")
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

  d3.json("data/planets.json")
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
        .attr("class", "planet")
        .attr("cx", d => { return (x(d.population) + 20 ) })
        .attr("cy", d => { return (y(d.orbital_period) + 20) })
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
        .on("mouseover", showTooltip)
        .on("mousemove", moveTooltip)
        .on("mouseleave", hideTooltip)
        
    })

    let tooltip = d3.select("#bubble_chart")
      .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "lime")
        .style("border-radius", "5px")
        .style("padding", "5px")
        .style("width", "190px")
        .style("color", "black")
        .style("position", "absolute");

    let formatComma = d3.format(",");

    let showTooltip = function(d) {
      tooltip
        .transition()
        .duration(50)
      tooltip
        .style("opacity", .85)
        .html("Name: " + d.name + "<br>" + 
              "Diameter: " + formatComma(d.diameter) + " km" + "<br>" + 
              "Population: " + formatComma(d.population) + "<br>" + 
              "Orbital Period: " + d.orbital_period + " days" + "<br>" + 
              "Rotation Period: " + d.rotation_period + " hours" + "<br>" + 
              "Climate: " + d.climate + "<br>" + 
              "Terrain: " + d.terrain)
        .style("left", (d3.mouse(this)[0] + 125) + "px")
        .style("top", (d3.mouse(this)[1] + 40) + "px")
    }

    let moveTooltip = function() {
      tooltip
        .style("left", (d3.mouse(this)[0] + 125) + "px")
        .style("top", (d3.mouse(this)[1] + 40) + "px")
    }

    let hideTooltip = function() {
      tooltip
        .transition()
        .duration(50)
        .style("opacity", 0)
    }

    let legend = d3.select("#bubble_chart")
      .append("div")
        .style("position", "absolute")
        .style("left", "1000px")
        .style("top", "20px")
        .style("height", "150px")
        .style("width", "190px")
        .style("border", "1px solid lime")
        .style("border-radius", "5px");

    let marker1 = bubble_chart
      .append("circle")
        .style("position", "absolute")
        .attr("cx", 1025)
        .attr("cy", 50)
        .attr("r", 9)
        .style("fill", "lightgreen")
        .style("opacity", .75);

    let marker2 = bubble_chart
      .append("circle")
        .style("position", "absolute")
        .attr("cx", 1025)
        .attr("cy", 80)
        .attr("r", 9)
        .style("fill", "lightblue")
        .style("opacity", .75);

    let marker3 = bubble_chart
      .append("circle")
        .style("position", "absolute")
        .attr("cx", 1025)
        .attr("cy", 110)
        .attr("r", 9)
        .style("fill", "orange")
        .style("opacity", .75);

    let marker4 = bubble_chart
      .append("circle")
        .style("position", "absolute")
        .attr("cx", 1025)
        .attr("cy", 140)
        .attr("r", 9)
        .style("fill", "red")
        .style("opacity", .75);

    let text1 = bubble_chart
      .append("text")
        .style("position", "absolute")
        .attr("x", 1050)
        .attr("y", 56)
        .text("< 20 hour day")
        .style("color", "lime")
        .style("fill", "lime");

    let text2 = bubble_chart
      .append("text")
        .style("position", "absolute")
        .attr("x", 1050)
        .attr("y", 86)
        .text("20 - 29 hour day")
        .style("color", "lime")
        .style("fill", "lime");

    let text3 = bubble_chart
      .append("text")
        .style("position", "absolute")
        .attr("x", 1050)
        .attr("y", 116)
        .text("30 - 39 hour day")
        .style("color", "lime")
        .style("fill", "lime");

    let text4 = bubble_chart
      .append("text")
        .style("position", "absolute")
        .attr("x", 1050)
        .attr("y", 146)
        .text(">= 40 hour day")
        .style("color", "lime")
        .style("fill", "lime");
}