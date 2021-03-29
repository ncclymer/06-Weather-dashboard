// Api data URLs

var apiKey = '820c7f8138019a10c7af3d05720e11d9'

var userInput = document.querySelector('#search-input').value;


// requestUrl = 'https://api.openweathermap.org/data/2.5/weather/?q=' + userInput + '&units=imperial&appid=820c7f8138019a10c7af3d05720e11d9';

uvIndexUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=39.7392&lon=-104.9847&units=imperial&appid=820c7f8138019a10c7af3d05720e11d9';
// uvIndexUrl = 'https://api.openweathermap.org/data/2.5/onecall?' + lat + '&' + lon + '&units=imperial&appid=820c7f8138019a10c7af3d05720e11d9';

// fiveDayUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + userInput + '&units=imperial&appid=820c7f8138019a10c7af3d05720e11d9';



// function target button
fetchButton = document.querySelector('#fetch-button');

// calls temp, humidity, and wind speed * need to write concat so that user data is entered into the ?q={X} portion of the query string.
function getWeather(event) {
  event.preventDefault();
  var userInput = document.querySelector('#search-input').value;
  var requestUrl = `https://api.openweathermap.org/data/2.5/weather/?q=${userInput}&units=imperial&appid=${apiKey}`;
  
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // document.getElementById('date').textContent = data.name = ' ' + ' ' + moment().format('MMM D, YYYY');
      document.getElementById('city').textContent = 'Current conditions for: ' + data.name;
      document.getElementById('temp').textContent = 'Temperature: ' + data.main.temp + ' °F';
      document.getElementById('humidity').textContent = 'Humidty: ' +  data.main.humidity + '%';
      document.getElementById('wind-speed').textContent = 'Wind Speed: ' + data.wind.speed + ' MPH';
      console.log(data)
    });
}

// function loadData() {

//   var loadData = localStorage.getItem("cities")
//   if (loadData == null || loadData == "") return;

//   var cityButtonArr = JSON.parse(loadData)

//   for (i = 0; i < cityButtonArr.length; i++) {
//       var createBtn = $("<button>")
//       createBtn.attr("class", "btn btn-outline-secondary")
//       createBtn.attr("type", "button")
//       createBtn.attr("id", 'searchCityHistory')
//       createBtn.attr("onclick", submitBtn)
//       createBtn.text(cityButtonArr[i])
//    // createBtn.setAttribute("onclick",submitBtn)
//    // createBtn.addEventListener('click', submitBtn)
//   }
//   $("#cityhistory").append(createBtn)
// }

// calls uvi index * need to pull lat and lon data from first array
function getUvi(event) {
  event.preventDefault();

  fetch(uvIndexUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      document.getElementById('UVindex').textContent = '' + 'UV Index: ' + data.current.uvi + '';
      console.log(data);
    });
}

// calls 5 day forcast
function getFiveDay(event) {
  event.preventDefault();
  var userInput = document.querySelector('#search-input').value;
  fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&units=imperial&appid=${apiKey}`;


  fetch(fiveDayUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      day1Date = document.getElementById('1-date');
      day1Icon = document.getElementById("1-icon");
      day1Date.textContent = moment.unix(data.list[2].dt).format("MMM D, YYYY");
      day1Icon.setAttribute("src", "http://openweathermap.org/img/w/" + data.list[2].weather[0].icon + ".png");
      document.getElementById('1temp').textContent = 'Temp: ' + data.list[2].main.temp + ' °F';
      document.getElementById('1humidity').textContent = 'Humidity: ' + data.list[2].main.humidity + ' %';
      document.getElementById('1wind-speed').textContent = 'Wind: ' + data.list[2].wind.speed + ' MPH';


      day2Date = document.getElementById('2-date');
      day2Icon = document.getElementById("2-icon");
      day2Date.textContent = moment.unix(data.list[2].dt).format("MMM D, YYYY");
      day2Icon.setAttribute("src", "http://openweathermap.org/img/w/" + data.list[10].weather[0].icon + ".png");
      document.getElementById('2temp').textContent = 'Temp: ' + data.list[10].main.temp + ' °F';
      document.getElementById('2humidity').textContent = 'Humidity: ' + data.list[10].main.humidity + ' %';
      document.getElementById('2wind-speed').textContent = 'Wind: ' + data.list[10].wind.speed + ' MPH';


      day3Date = document.getElementById('3-date');
      day3Icon = document.getElementById("3-icon");
      day3Date.textContent = moment.unix(data.list[2].dt).format("MMM D, YYYY");
      day3Icon.setAttribute("src", "http://openweathermap.org/img/w/" + data.list[18].weather[0].icon + ".png");
      document.getElementById('3temp').textContent = 'Temp: ' + data.list[18].main.temp + ' °F';
      document.getElementById('3humidity').textContent = 'Humidity: ' + data.list[18].main.humidity + ' %';
      document.getElementById('3wind-speed').textContent = 'Wind: ' + data.list[18].wind.speed + ' MPH';


      day4Date = document.getElementById('4-date');
      day4Icon = document.getElementById("4-icon");
      day4Date.textContent = moment.unix(data.list[2].dt).format("MMM D, YYYY");
      day4Icon.setAttribute("src", "http://openweathermap.org/img/w/" + data.list[26].weather[0].icon + ".png");
      document.getElementById('4temp').textContent = 'Temp: ' + data.list[26].main.temp + ' °F';
      document.getElementById('4humidity').textContent = 'Humidity: ' + data.list[26].main.humidity + ' %';
      document.getElementById('4wind-speed').textContent = 'Wind: ' + data.list[26].wind.speed + ' MPH';


      day5Date = document.getElementById('5-date');
      day5Icon = document.getElementById("5-icon");
      day5Date.textContent = moment.unix(data.list[2].dt).format("MMM D, YYYY");
      day5Icon.setAttribute("src", "http://openweathermap.org/img/w/" + data.list[34].weather[0].icon + ".png");
      document.getElementById('5temp').textContent = 'Temp: ' + data.list[34].main.temp + ' °F';
      document.getElementById('5humidity').textContent = 'Humidity: ' + data.list[34].main.humidity + ' %';
      document.getElementById('5wind-speed').textContent = 'Wind: ' + data.list[34].wind.speed + ' MPH';
      console.log(data);
    });
}

// user click event for target button
fetchButton.addEventListener('click', getWeather);
fetchButton.addEventListener('click', getUvi);
fetchButton.addEventListener('click', getFiveDay);