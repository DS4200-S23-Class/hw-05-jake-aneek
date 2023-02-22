// set of frame size
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};


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

        // deal with when a point is clicked
        .on("click", function(d){
          let last_clicked = d3.select(this).attr("id")
          d3.select("#coord").text(last_clicked)
          // Check if stroke exists, and change accordingly
          if(d3.select(this).style('stroke') == 'orange'){
              d3.select(this).style("stroke", "none");
          }
          else{
              d3.select(this).style("stroke-width", "4px");
              d3.select(this).style("stroke", "orange");
          }})

          // change color when point is hovered 
          .on("mouseover", function(d) {
            d3.select(this).style("fill", "lightblue");
          })

          // change color when point is unhovered
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


    d3.selectAll("#butt")
    .on("click", function(d){
    let xVal = document.getElementById("xCoord").value;
    let yVal = document.getElementById("yCoord").value;
    svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
        .attr("class", "circles")
        .attr("id", (d) => {return "(" + xVal + ", " + yVal + ")"} )
        .attr("cx", (d) => { return x(xVal) + MARGINS.left; } )
        .attr("cy", (d) =>{ return y(yVal) + MARGINS.top; } )
        .attr("r", 5)
    });
});


