var tableBody = document.getElementById('repo-table');
var fetchButton = document.getElementById('fetch-button');

function getApi() {
    // fetch request gets current weather information
     var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=dallas&appid=820c7f8138019a10c7af3d05720e11d9';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            //Loop over the data to generate a table, each table row will have a link to the repo url
            for (var i = 0; i < data.length; i++) {
                // Creating elements, tablerow, tabledata, and anchor
                var createTableRow = document.createElement('tr');
                var tableData = document.createElement('td');
                var link = document.createElement('a');

                // Setting the text of link and the href of the link
                link.textContent = data[i].html_url;
                link.href = data[i].html_url;

                // Appending the link to the tabledata and then appending the tabledata to the tablerow
                // The tablerow then gets appended to the tablebody
                tableData.appendChild(link);
                createTableRow.appendChild(tableData);
                tableBody.appendChild(createTableRow);
            }
        });
}

fetchButton.addEventListener('click', getApi);