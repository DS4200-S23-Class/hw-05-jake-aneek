// Set up the SVG container
const svg = d3.select("#scatterplot")
  .append("svg")
  .attr("width", 500)
  .attr("height", 500);

// Load the data from the CSV file
d3.csv("data/scatter-data.csv").then(function(data) {

  // Define the scales for the x and y axes
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.x)])
    .range([50, 450]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.y)])
    .range([450, 50]);

  // Create a circle for each data point
  svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
        .attr("cx", d => xScale(d.x))
        .attr("cy", d => yScale(d.y))
        .attr("r", 10)
        .attr("class", "point")
        //https://stackoverflow.com/questions/31381129/assign-new-id-attribute-to-each-element-created
        .attr("id", d => d.x + "," + d.y)
        // Onclick: https://stackoverflow.com/questions/22584060/d3js-how-to-toggle-css-class-after-clicking-on-anelement
        .on("click", function() { 
            d3.select(this).classed("addStroke", !d3.select(this).classed("addStroke"))

            // last clicked
            let last_clicked = d3.select(this).attr("id")
            d3.select("#coord").text("Last Point Clicked: (" + last_clicked + ")")
        })

          // change color when point is hovered 
          .on("mouseover", function(d) {
            d3.select(this).style("fill", "#f5a742");
          })

          // change color when point is unhovered
          .on("mouseout", function(d) {
            d3.select(this).style("fill", "#34baeb");
          });

    // https://d3-graph-gallery.com/intro_d3js.html
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
    .attr("transform", "translate(0,450)")
    .call(xAxis);

    svg.append("g")
    .attr("transform", "translate(50,0)")
    .call(yAxis);


    d3.selectAll("#butt")
  .on("click", function(d){
    let xVal = document.getElementById("xCoord").value;
    let yVal = document.getElementById("yCoord").value;
    console.log(xVal, yVal)
    
    // Create a new data object with the user-entered values
    const newData = { x: xVal, y: yVal };
    
    // Append a new circle element to the SVG
    svg.append("circle")
      // Using datum for singular point
      .datum(newData)
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", 10)
      .attr("class", "point")
      .attr("id", d => d.x + "," + d.y)
      .on("click", function() { 
        d3.select(this).classed("addStroke", !d3.select(this).classed("addStroke"))
        let last_clicked = d3.select(this).attr("id")
        d3.select("#coord").text("Last Point Clicked: (" + last_clicked + ")")
      })
      .on("mouseover", function(d) {
        d3.select(this).style("fill", "#f5a742");
      })
      .on("mouseout", function(d) {
        d3.select(this).style("fill", "#34baeb");
      });
  });
});

const svg_Bar = d3.select("#barchart")
  .append("svg")
  .attr("width", 500)
  .attr("height", 500);

d3.csv("data/bar-data.csv").then(function(data) {
  // Removing headers as they were messing up height attribute for rect
  // https://stackoverflow.com/questions/50902683/how-to-skip-or-ignore-rows-above-header
  data = data.slice(1); 
  
  // Converting amount (y-values) from string to int 
  data.forEach(d => +d.amount);
  
  // Using scaleband because it is categorical data 
  // https://observablehq.com/@d3/d3-scaleband
  const xScale = d3.scaleBand()
    .domain(data.map((d) => d.category))
    .range([50, 450])
    .padding(0.5);

  // From Scatter Plot
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.amount)])
    .range([450, 50]);

  //https://d3-graph-gallery.com/graph/interactivity_tooltip.html
  const tooltip = d3.select("#barchart")
                    .append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);  

  svg_Bar.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => xScale(d.category))
    .attr("y", (d) => yScale(d.amount))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => 450 - yScale(d.amount))
    .attr("fill", "#34baeb")
    .on("mouseover", function(d) {
      d3.select(this).style("fill", "#f5a742");
    })
    // change color when point is unhovered
    .on("mouseout", function(d) {
      d3.select(this).style("fill", "#34baeb");
    });

  // https://d3-graph-gallery.com/intro_d3js.html
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  svg_Bar.append("g")
    .attr("transform", "translate(0,450)")
    .call(xAxis);

  svg_Bar.append("g")
    .attr("transform", "translate(50,0)")
    .call(yAxis);

});
















