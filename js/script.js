// Api data URLs
requestUrl = 'https://api.openweathermap.org/data/2.5/weather/?q=denver&units=imperial&appid=820c7f8138019a10c7af3d05720e11d9';
uvIndexUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=39.7392&lon=-104.9847&units=imperial&appid=820c7f8138019a10c7af3d05720e11d9';
fiveDayUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=denver&units=imperial&appid=820c7f8138019a10c7af3d05720e11d9';

// function target button
fetchButton = document.querySelector('#fetch-button');

// function converts URL parameters into an array
function convertParameters() {
var paramArray = document.location.search.split('&');
var query = paramArray[0].split('=').pop();
searchApi(query);
}

// calls temp, humidity, and wind speed * need to write concat so that user data is entered into the ?q={X} portion of the query string.
function getWeather(event) {
    event.preventDefault();

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            document.getElementById('temp').textContent = data.main.temp + ' °F';
            document.getElementById('humidity').textContent = data.main.humidity + '%';
            document.getElementById('wind-speed').textContent = data.wind.speed + ' MPH';
            console.log(data)
            // console.log(data.main.temp);
            // console.log(data.main.humidity);
            // console.log(data.wind.speed);
        });
}

// calls uvi index * need to pull lat and lon data from first array
function getUvi(event) {
    event.preventDefault();

    fetch(uvIndexUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            document.getElementById('UVindex').textContent = data.current.uvi;
            console.log(data);
        });
}

// calls 5 day forcast
function getFiveDay(event) {
    event.preventDefault();

    fetch(fiveDayUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
}

// user click event for target button
fetchButton.addEventListener('click', getWeather);
fetchButton.addEventListener('click', getUvi);
fetchButton.addEventListener('click', getFiveDay);