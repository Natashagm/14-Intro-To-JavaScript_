// from data.js
var tableData = data;

// Get a reference to the table body
var tbody = d3.select("tbody");

// Getting a reference to the input element on the page with the id property set to 'datetime'
var inputField = d3.select("#datetime");

var selectObject1 = d3.select("#city");
var selectObject2 = d3.select("#state");

// Getting a reference to the button on the page with the id property set to `click-me`
var button = d3.select("#filter-btn");

var filter_value_init = document.getElementById("datetime").placeholder;
var filter_value = filter_value_init;
var filter_city = ""; 
var filter_state = "";

function displayTable(tableData_){
    //console.log(filter_value);
    var r = d3.selectAll("td").remove(); 
    tableData_.forEach((ufo) => {
      if ( (ufo["datetime"] == filter_value || filter_value == "" )
          && ( ufo["city"] == filter_city || filter_city == "" )
          && ( ufo["state"] == filter_state || filter_state == "" ))
      { var row = tbody.append("tr");
      Object.entries(ufo).forEach(([key, value]) => {
          cell = row.append("td");
          cell.text(value);
      });
    }
    })
  }

function addOptions(tableData_, option_attribute, selectObject, dependencyAtt1, dependencyVal1,dependencyAtt2, dependencyVal2){
 //add options to a Select tag 
    //Select distinct values
    values_=[];
    values_sorted=[];
    prev_value="";
    //add default option - for select all
    x=selectObject.append("option").text("");
    //add other options
    tableData_.forEach((ufo) => {
      if ((  dependencyVal1 == "" || dependencyVal1 == ufo[dependencyAtt1] )
        && (  dependencyVal2 == "" || dependencyVal2 == ufo[dependencyAtt2] )
        )
      values_.push(ufo[option_attribute]); 
    })
    //select distinct values
    values_sorted=values_.sort();
    values_sorted.forEach((a) => {
       if ( a != prev_value ) {
        //generate option tags
        x=selectObject.append("option").text(a);
        prev_value = a;
       }
    });
  }

// Event handlers are just normal functions that can do anything you want
button.on("click", function(){ d3.event.preventDefault(); displayTable(tableData);});

// Input fields can trigger a change event when new text is entered.
inputField.on("change", function() {
  d3.event.preventDefault();
  filter_value = d3.event.target.value;
  if (filter_state == "")
  {
     d3.select("#state").selectAll("option").remove();
     addOptions(tableData, "state", selectObject2, "city", filter_city, "datetime",filter_value);
  }
  if (filter_city == "")
  {
    d3.select("#city").selectAll("option").remove();
    addOptions(tableData, "city", selectObject1, "state", filter_state, "datetime",filter_value);
  }
});


// Input fields can trigger a change event when new text is entered.
//city value
selectObject1.on("change", function() {
  d3.event.preventDefault();
  filter_city = d3.event.target.value;
  if (filter_state == "")
  {
     d3.select("#state").selectAll("option").remove();
     addOptions(tableData, "state", selectObject2, "city", filter_city, "datetime",filter_value);
  }
});

// Input fields can trigger a change event when new text is entered.
//state value
selectObject2.on("change", function() {
  d3.event.preventDefault();
  filter_state = d3.event.target.value;
  if (filter_city == "")
  {
    d3.select("#city").selectAll("option").remove();
    addOptions(tableData, "city", selectObject1, "state", filter_state, "datetime",filter_value);
  }
});

addOptions(tableData, "state", selectObject2, "", "", "", "");
addOptions(tableData, "city", selectObject1, "","","", "");
displayTable(tableData); 
