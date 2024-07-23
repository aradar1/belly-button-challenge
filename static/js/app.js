// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let filteredData = metadata.filter((meta) => meta.id == sample);

    // Use d3 to select the panel with id of `#sample-metadata`
    d3.select("#sample-metadata").html("");

    // Use `.html("") to clear any existing metadata
    result = filteredData[0]
    entry = Object.entries(result);
    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    entry.forEach(([key,value]) =>{
      d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
    });

  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let filteredData = samples.filter((obj)=>obj.id == sample);

    // Get the otu_ids, otu_labels, and sample_values
    let otu_id = filteredData[0].otu_ids;
    let otu_label = filteredData[0].otu_labels;
    let sample_values = filteredData[0].sample_values;
    // Build a Bubble Chart
    let bubble_data = [{
      x: otu_id,
      y: sample_values,
      text: otu_label,
      mode: 'markers',
      marker: {
        color: otu_id,
        colorscale: 'Earth',
        size: sample_values
      }
    }];

    // Render the Bubble Chart
    Plotly.newPlot('bubble', bubble_data);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    
    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let bar_data = [{
      type: 'bar',
      x: sample_values.slice(0,10).reverse(),
      y: otu_id.slice(0,10).map(id=>`OTU ${id}`).reverse(),
      text: otu_label.slice(0,10).reverse(),
      orientation: 'h'
    }]


    // Render the Bar Chart
    Plotly.newPlot('bar',bar_data)
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdownMenu = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    names.forEach((name)=> {
        dropdownMenu.append("option").text(name).property("value",name);
    });

    // Get the first sample from the list
    let name = names[0];

    // Build charts and metadata panel with the first sample
    buildCharts(name);
    buildMetadata(name);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
buildCharts(newSample);
buildMetadata(newSample);
}

// Initialize the dashboard
init();
