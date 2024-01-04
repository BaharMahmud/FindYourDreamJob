function getArbeitNowApi() {
    // fetch request for arbeitnow API
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://www.arbeitnow.com/api/job-board-api", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
  
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
fetchButton.addEventListener('click', getArbeitNowApi);

var axios = require('axios');

async function getJobListings(apiKey, location, keywords) {
  try {
    var response = await axios.get('https://api.adzuna.com/v1/api/jobs/us/search/1', {
      params: {
        app_id: apiKey,
        app_key: apiKey,
        where: location,
        what: keywords
      }
    });

    // Process the response data
    var jobListings = response.data.results;
    // Do something with the job listings

    return jobListings;
  } catch (error) {
    console.error('Error retrieving job listings:', error);
    throw error;
  }
}

// Usage example
var apiKey = 'YOUR_API_KEY';
var location = '';
var keywords = '';

getJobListings(apiKey, location, keywords)
  .then(jobListings => {
    console.log('Job Listings:', jobListings);
  })
  .catch(error => {
    console.error('Error:', error);
  });