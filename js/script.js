var apiKey = '820c7f8138019a10c7af3d05720e11d9'
var userInput = document.querySelector('#search-input').value;
var city_Array = [];
// var searchList = [];



// function target button
fetchButton = document.querySelector('#fetch-button');

// calls temp, humidity, wind speed, and coordinates
function getWeather(event) {
  event.preventDefault();
  var userInput = document.querySelector('#search-input').value;
  var requestUrl = `https://api.openweathermap.org/data/2.5/weather/?q=${userInput}&units=imperial&appid=${apiKey}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      document.getElementById('date').textContent = data.name = ' ' + ' ' + moment().format('MMM D, YYYY');
      document.getElementById('city').textContent = 'Current conditions for: ' + userInput;
      day0Icon = document.getElementById('0-icon')
      day0Icon.setAttribute('src', 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
      document.getElementById('temp').textContent = 'Temperature: ' + data.main.temp + ' °F';
      document.getElementById('humidity').textContent = 'Humidty: ' + data.main.humidity + '%';
      document.getElementById('wind-speed').textContent = 'Wind Speed: ' + data.wind.speed + ' MPH';
      console.log(data)

      var uvIndexUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}&units=imperial`;

      fetch(uvIndexUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          document.getElementById('UVindex').textContent = '' + 'UV Index: ' + data.current.uvi + '';
          console.log(data);

          if (data.current.uvi <= 2) {
            document.getElementById('UVindex').className = 'low';
            console.log(data.current.uvi)
          }
          else if (data.current.uvi > 2 || data.current.uvi < 5) {
            document.getElementById('UVindex').className = 'moderate';
          }
          else if (data.current.uvi > 5 || data.current.uvi < 7) {
            document.getElementById('UVindex').className = 'high';
          }
          else if (data.current.uvi > 7) {
            document.getElementById('UVindex').className = 'very-high'
          }

        });
    })
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
      day1Icon.setAttribute("src", "https://openweathermap.org/img/w/" + data.list[2].weather[0].icon + ".png");
      document.getElementById('1temp').textContent = 'Temp: ' + data.list[2].main.temp + ' °F';
      document.getElementById('1humidity').textContent = 'Humidity: ' + data.list[2].main.humidity + ' %';
      document.getElementById('1wind-speed').textContent = 'Wind: ' + data.list[2].wind.speed + ' MPH';


      day2Date = document.getElementById('2-date');
      day2Icon = document.getElementById("2-icon");
      day2Date.textContent = moment.unix(data.list[2].dt).format("MMM D, YYYY");
      day2Icon.setAttribute("src", "https://openweathermap.org/img/w/" + data.list[10].weather[0].icon + ".png");
      document.getElementById('2temp').textContent = 'Temp: ' + data.list[10].main.temp + '°F';
      document.getElementById('2humidity').textContent = 'Humidity: ' + data.list[10].main.humidity + '%';
      document.getElementById('2wind-speed').textContent = 'Wind: ' + data.list[10].wind.speed + 'MPH';


      day3Date = document.getElementById('3-date');
      day3Icon = document.getElementById("3-icon");
      day3Date.textContent = moment.unix(data.list[2].dt).format("MMM D, YYYY");
      day3Icon.setAttribute("src", "https://openweathermap.org/img/w/" + data.list[18].weather[0].icon + ".png");
      document.getElementById('3temp').textContent = 'Temp: ' + data.list[18].main.temp + '°F';
      document.getElementById('3humidity').textContent = 'Humidity: ' + data.list[18].main.humidity + '%';
      document.getElementById('3wind-speed').textContent = 'Wind: ' + data.list[18].wind.speed + 'MPH';


      day4Date = document.getElementById('4-date');
      day4Icon = document.getElementById("4-icon");
      day4Date.textContent = moment.unix(data.list[2].dt).format("MMM D, YYYY");
      day4Icon.setAttribute("src", "https://openweathermap.org/img/w/" + data.list[26].weather[0].icon + ".png");
      document.getElementById('4temp').textContent = 'Temp: ' + data.list[26].main.temp + '°F';
      document.getElementById('4humidity').textContent = 'Humidity: ' + data.list[26].main.humidity + '%';
      document.getElementById('4wind-speed').textContent = 'Wind: ' + data.list[26].wind.speed + 'MPH';


      day5Date = document.getElementById('5-date');
      day5Icon = document.getElementById("5-icon");
      day5Date.textContent = moment.unix(data.list[2].dt).format("MMM D, YYYY");
      day5Icon.setAttribute("src", "https://openweathermap.org/img/w/" + data.list[34].weather[0].icon + ".png");
      document.getElementById('5temp').textContent = 'Temp: ' + data.list[34].main.temp + '°F';
      document.getElementById('5humidity').textContent = 'Humidity: ' + data.list[34].main.humidity + '%';
      document.getElementById('5wind-speed').textContent = 'Wind: ' + data.list[34].wind.speed + 'MPH';
      console.log(data);
    });
}


function savedCities(searchCity) {
  city_Array.push(searchCity)
  //city_Array = [ searchCity, searchCitySubmit ];
  console.log("city array variable: ", city_Array);
  localStorage.setItem("cities", JSON.stringify(city_Array));

}
function loadData() {

  var loadData = localStorage.getItem("cities")
  if (loadData == null || loadData == "") return;

  var cityButtonArr = JSON.parse(loadData)

  for (i = 0; i < cityButtonArr.length; i++) {
    var createBtn = $("<button>")
    createBtn.attr("class", "btn btn-outline-secondary")
    createBtn.attr("type", "button")
    createBtn.attr("id", 'searchCityHistory')
    createBtn.attr("onclick", submitBtn)
    createBtn.text(cityButtonArr[i])
    // createBtn.setAttribute("onclick",submitBtn)
    // createBtn.addEventListener('click', submitBtn)
  }
  $("#cityhistory").append(createBtn)
}


// user click event for target button
fetchButton.addEventListener('click', getWeather);
fetchButton.addEventListener('click', getFiveDay);
fetchButton.addEventListener('click', searchHistory);
fetchButton.addEventListener('click', oldData);