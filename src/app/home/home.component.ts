import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'DataTables.net';
import { Chart } from 'chart.js';
import * as ChartAnnotation from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    let namedChartAnnotation = ChartAnnotation;
    namedChartAnnotation["id"]="annotation";
    Chart.pluginService.register( namedChartAnnotation );

    // This is an empty variable where the median average global temperature will go into
    let avgOne;
    
    //  2 seconds after the page has loaded use the now populated listOfTemps array and calculate the average temperature

    setTimeout(() => {
      sortedListOfTemps.sort((a, b) => a - b);
      let lowMiddle = Math.floor((sortedListOfTemps.length - 1) / 2);
      let highMiddle = Math.ceil((sortedListOfTemps.length - 1) / 2);
      let median = (sortedListOfTemps[lowMiddle] + sortedListOfTemps[highMiddle]) / 2;
      
      /*
          Add the average temperature inside the avgOne variable which will then be used to create the median average global temperature
          Based on the 25 cities and it will also be used as the label for the median average global temperature
          Limit the decimal places to 2
      */
      avgOne = median.toFixed(2);
    }, 2500);
    
  /*
     Wait for the data to load first and then use DataTable()
    Prior to implementing setTimeout() sometimes the data would load just fine
    but other times it would load but just above it there would be a message
    displayed within the database and above the data telling me that there wasn't any available data
    the table was populated after DataTable ran which is where the issue came from
    I have now delayed DataTable by a few seconds to let data load first
  */  
  
  /*
    Initially hide the table, the loading image will be shown by default. 
    After 2 seconds, hide the loading image
    Initialise the table with DataTable()
    Show the table when ready
  */
    
    let dataTable = document.getElementById('data-table');
    dataTable.style.display = 'none';
    let loading = document.getElementById('loading-img');

    setTimeout(() => { 
      loading.style.display = 'none';
      $('#data-table').DataTable({
        "lengthMenu": [ [5, 10, 20, -1], [5, 10, 20, "All"] ],
        "columnDefs": [
          {"className": "dt-center", "targets": "_all"},
          { "width": "20%", "targets": "_all" }
        ]
      }); 
      dataTable.style.display = '';
    }, 2500);
    
    // Table body
    let dataBody = document.getElementById('data-body');
    // A list of the 25 cities which will be displayed in the table
    let listOfCities = ['London', 'New york', 'Tokyo', 'Melbourne', 'Paris', 'Zurich', 'Montreal', 'Seoul', 'Sydney', 'Munich', 'Berlin', 'Vienna', 'Hong Kong', 'Boston', 'Toronto', 'Singapore', 'Edinburgh', 'Vancouver', 'Kyoto', 'Taipei', 'Brisbane', 'Canberra', 'Auckland', 'Manchester', 'Buenos Aires'];
    // This is an empty array where the temperature for each city will be pushed into when available
    let listOfTemps = [];
    let sortedListOfTemps = [];
    
    /*
      iife function/ immediately run the function
      Wait until the data has been received before adding table elements.
    */
    (async function displayData () {
      // Loop through the list of cities and use each city to do fetch request
      for(let i = 0; i < listOfCities.length; i++){
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${listOfCities[i]}&appid=194333f5b09188fbda8c4a3bbfea30b2&units=Metric`);
        const data = await response.json();

        // Push each temperature into the array which will be used in the graph
        listOfTemps.push(data.main.temp);

        // Push each temperature into the array which will then be sorted
        sortedListOfTemps.push(data.main.temp);

        // Create a table row for each city
        let tr = document.createElement('tr');

        // Create table data with the city's name
        let trName = document.createElement('td');
        let trNameText = document.createTextNode(`${data.name}`);
        trName.appendChild(trNameText);

        // Create table data with country of the city
        let trCountry = document.createElement('td');
        let trCountryText = document.createTextNode(`${data.sys.country}`);
        trCountry.appendChild(trCountryText);

        // Create table data for the type of weather
        let trWeather = document.createElement('td');
        let trWeatherText = document.createTextNode(`${data.weather[0].main}`);
        trWeather.appendChild(trWeatherText);

        // Create table data with the city's temperature
        let trTemp = document.createElement('td');
        let trTempText = document.createTextNode(`${data.main.temp}`);
        trTemp.appendChild(trTempText);
        
        // Append all the table data into the row
        tr.appendChild(trName);
        tr.appendChild(trCountry);
        tr.appendChild(trWeather);
        tr.appendChild(trTemp);

        // Append everything into the table body
        dataBody.appendChild(tr);
      }
    })();

   let canvas = <HTMLCanvasElement> document.getElementById("myChart");
   let ctx = canvas.getContext("2d");

   console.log("Sorted List", sortedListOfTemps);
   console.log("Unsorted List", listOfTemps);
   console.log(Chart.plugins);

  setTimeout(() => {
    let myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ['London', 'New york', 'Tokyo', 'Melbourne', 'Paris', 'Zurich', 'Montreal', 'Seoul', 'Sydney', 'Munich', 'Berlin', 'Vienna', 'Hong Kong', 'Boston', 'Toronto', 'Singapore', 'Edinburgh', 'Vancouver', 'Kyoto', 'Taipei', 'Brisbane', 'Canberra', 'Auckland', 'Manchester', 'Buenos Aires'],
          datasets: [{
              label: 'Temperature',
              data: listOfTemps,
              backgroundColor: [
                "lightgrey"
              ],
              borderColor: [
                  '#eb6864',
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  display: true,
                  ticks: {
                      beginAtZero:true,
                  }
              }],
              xAxes: [{
                  display: true,
                  ticks: {
                    autoSkip: false
                  }
              }]
          },
          plugins: {
            annotation: {
              drawTime: 'afterDatasetsDraw',
              events: ['click'],
              dblClickSpeed: 350,
              annotations: [{
                type: 'line',
                id: 'hLine',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: avgOne,  // data-value at which the line is drawn
                borderWidth: 2.5,
                borderColor: 'black',
                label: {
                  content: avgOne,
                  enabled: true,
                  backgroundColor: "#eb6864"
              }
            }]
          }
        }
      }
  });
  }, 2500);
    }
  }
