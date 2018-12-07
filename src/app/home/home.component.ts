import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function() {
      $('#data-table').DataTable();
  } );

    // http://api.openweathermap.org/data/2.5/weather?q=turin&appid=194333f5b09188fbda8c4a3bbfea30b2

    let dataBody = document.getElementById('data-body');
    let listOfCities = ['London', 'New york', 'Tokyo', 'Melbourne', 'Paris', 'Zurich', 'Montreal', 'Seoul', 'Sydney', 'Munich', 'Berlin', 'Vienna', 'Hong Kong', 'Boston', 'Toronto', 'Singapore', 'Edinburgh', 'Vancouver', 'Kyoto', 'Taipei', 'Brisbane', 'Canberra', 'Auckland', 'Manchester', 'Buenos Aires'];

    /*
      iife function/ immediately run the function
      Wait until the data has been received before adding table elements.
    */
    (async function displayData () {
      for(let i = 0; i < listOfCities.length; i++){
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${listOfCities[i]}&appid=194333f5b09188fbda8c4a3bbfea30b2&units=Metric`);
        const data = await response.json();

        let tr = document.createElement('tr');

        let trName = document.createElement('td');
        let trNameText = document.createTextNode(`${data.name}`);
        trName.appendChild(trNameText);

        let trCountry = document.createElement('td');
        let trCountryText = document.createTextNode(`${data.sys.country}`);
        trCountry.appendChild(trCountryText);

        let trTemp = document.createElement('td');
        let trTempText = document.createTextNode(`${data.main.temp}℃`);
        trTemp.appendChild(trTempText);

        tr.appendChild(trName);
        tr.appendChild(trCountry);
        tr.appendChild(trTemp);
        
        // tr.style.border = '1px black solid';
        // trName.style.border = '1px black solid';
        // trTemp.style.border = '1px black solid';

        dataBody.appendChild(tr);

      }
    })();
  

    for(let i = 0; i < listOfCities.length; i++){

      

      

    //   fetch(`http://api.openweathermap.org/data/2.5/weather?q=${listOfCities[i]}&appid=194333f5b09188fbda8c4a3bbfea30b2&units=Metric`)
    //   .then(res => res.json())
    //   .then(data => {
    //   // console.log(data);    
    //   // console.log(`City: ${data.name} Country: ${data.sys.country}  Temp: ${data.main.temp}`);
    //   let tr = document.createElement('tr');

    //   let trName = document.createElement('td');
    //   let trNameText = document.createTextNode(`${data.name}`);
    //   trName.appendChild(trNameText);

    //   let trCountry = document.createElement('td');
    //   let trCountryText = document.createTextNode(`${data.sys.country}`);
    //   trCountry.appendChild(trCountryText);

    //   let trTemp = document.createElement('td');
    //   let trTempText = document.createTextNode(`${data.main.temp}`);
    //   trTemp.appendChild(trTempText);

    //   tr.appendChild(trName);
    //   tr.appendChild(trCountry);
    //   tr.appendChild(trTemp);
      
    //   tr.style.border = '1px black solid';
    //   trName.style.border = '1px black solid';
    //   trTemp.style.border = '1px black solid';

    //   dataBody.appendChild(tr);

    // });

    }
    
    }
  }
