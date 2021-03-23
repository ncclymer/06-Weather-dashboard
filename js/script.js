var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#fetch-button');

function getParams() {
  // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
  var searchParamsArr = document.location.search.split('&');

  // Get the query and format values
  var query = searchParamsArr[0].split('=').pop();
//   var format = searchParamsArr[1].split('=').pop();

//   add , format to the function below
  searchApi(query);
}

function printResults(resultObj) {
  console.log(resultObj);

  // set up `<div>` to hold result content
  var resultCard = document.createElement('div');
  resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

  var resultBody = document.createElement('div');
  resultBody.classList.add('card-body');
  resultCard.append(resultBody);

  var titleEl = document.createElement('h3');
  titleEl.textContent = resultObj.title;

  var bodyContentEl = document.createElement('p');
  bodyContentEl.innerHTML =
    '<strong>Date:</strong> ' + resultObj.date + '<br/>';

  if (resultObj.subject) {
    bodyContentEl.innerHTML +=
      '<strong>Subjects:</strong> ' + resultObj.subject.join(', ') + '<br/>';
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Subjects:</strong> No subject for this entry.';
  }

  if (resultObj.description) {
    bodyContentEl.innerHTML +=
      '<strong>Description:</strong> ' + resultObj.description[0];
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Description:</strong>  No description for this entry.';
  }

  var linkButtonEl = document.createElement('a');
  linkButtonEl.textContent = 'Read More';
  linkButtonEl.setAttribute('href', resultObj.url);
  linkButtonEl.classList.add('btn', 'btn-dark');

  resultBody.append(titleEl, bodyContentEl, linkButtonEl);

  resultContentEl.append(resultCard);
}
// add , format to below function pass
function searchApi(query) {
  var requestUrl = 'https://api.openweathermap.org/data/2.5/weather/?q=' + query + '&appid=820c7f8138019a10c7af3d05720e11d9';

//   if (format) {
//     requestUrl = 'https://www.api.openweathermap.org/data/2.5/weather' + format + '/?q=&appid=820c7f8138019a10c7af3d05720e11d9';
  

//   requestUrl = requestUrl + '&q=' + query;


  fetch(requestUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (locRes) {
      // write query to page so user knows what they are viewing
      resultTextEl.textContent = locRes.search.query;

      console.log(locRes);

      if (!locRes.results.length) {
        console.log('No results found!');
        resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
      } else {
        resultContentEl.textContent = '';
        for (var i = 0; i < locRes.results.length; i++) {
          printResults(locRes.results[i]);
        }
      }
    })
    .catch(function (error) {
      console.error(error);
    });
 }

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;
//   var formatInputVal = document.querySelector('#format-input').value;

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }
// add , formatInputVal to the function below
  searchApi(searchInputVal);
}

searchFormEl.addEventListener('click', handleSearchFormSubmit);

getParams();


