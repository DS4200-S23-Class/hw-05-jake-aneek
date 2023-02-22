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
        })

        // When the circle is clicked, update lastClicked and the stroke
        .on("click", function(d){
          // Update last clicked in text when circle is clicked
          let last_clicked = d3.select(this).attr("id")
          d3.select("#coordinates").text(last_clicked)
          // Check if stroke exists, and change accordingly
          if(d3.select(this).style('stroke') == 'teal'){
              d3.select(this).style("stroke", "none");
          }
          else{
              d3.select(this).style("stroke-width", "4px");
              d3.select(this).style("stroke", "orange");
          }})

          .on("mouseover", function(d) {
            d3.select(this).style("fill", "lightblue");
          })
          .on("mouseout", function(d) {
            d3.select(this).style("fill", "black");
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
});


