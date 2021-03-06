export const canvas = () => {
var canvas = d3.select("#canvas") // D3 uses a jQuery like selector
  .append("svg")
  .attr("height", 500)
  .attr("width", 500);
var circle = canvas.append("circle") // Appending shape elements to the SVG element
  .attr("cx", 250)
  .attr("cy", 250)
  .attr("r", 100)
  .attr("fill", "red");
var rectangle = canvas.append("rect")
  .attr("height", 500)
  .attr("width", 100)
  .attr("fill", "blue")
  .attr("stroke", "blue")
  .attr("stroke-width", 2);
var line = canvas.append("line")
  .attr("x1", 500).attr("y1", 0)
  .attr("x2", 500).attr("y2", 500)
  .attr("stroke-width", 9)
  .attr("stroke", "orange");


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
};
