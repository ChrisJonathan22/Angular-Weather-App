import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // http://api.openweathermap.org/data/2.5/weather?q=turin&appid=194333f5b09188fbda8c4a3bbfea30b2

    let dataTable = document.getElementById('data-table');
    let listOfCities = ['London', 'Milan','New york', 'Tokyo', 'Melbourne', 'Paris', 'Zurich', 'Montreal', 'Seoul', 'Sydney'];
    let api = 'http://api.openweathermap.org/data/2.5/weather?q=turin&appid=194333f5b09188fbda8c4a3bbfea30b2';

    for(let i = 0; i < listOfCities.length; i++){

      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${listOfCities[i]}&appid=194333f5b09188fbda8c4a3bbfea30b2&units=Metric`)
      .then(res => res.json())
      .then(data => {
      console.log(data.name + " " + data.main.temp);
      let tr = document.createElement('tr');

      let trName = document.createElement('td');
      let trNameText = document.createTextNode(`${data.name}`);
      trName.appendChild(trNameText);

      let trCountry = document.createElement('td');
      let trCountryText = document.createTextNode(`${data.sys.country}`);
      trCountry.appendChild(trCountryText);

      let trTemp = document.createElement('td');
      let trTempText = document.createTextNode(`${data.main.temp}`);
      trTemp.appendChild(trTempText);

      tr.appendChild(trName);
      tr.appendChild(trCountry);
      tr.appendChild(trTemp);
      
      tr.style.border = '1px black solid';
      trName.style.border = '1px black solid';
      trTemp.style.border = '1px black solid';

      dataTable.appendChild(tr);



      // let city = `<tr>
      // <td>${data.name}</td>
      // <td>${data.wind.deg}</td>
      // </tr>`;
      // // cities.insertAfter(city);
      // dataTable.insertAdjacentHTML('afterend', city);
    });

    }
    
    }

