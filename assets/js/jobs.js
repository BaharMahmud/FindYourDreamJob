var salariesForm = document.getElementById('search-salaries-form')

function getArbeitNowApi(event) {
  event.preventDefault()
  // Construct the URL with query parameters
  // var apiUrl = "https://www.arbeitnow.com/api/job-board-api";
     var apiUrl = "https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=fe15ccd9&app_key=7d9de1620ebcf6cd476c7c843c768025"
  // var queryParams = {
  //   where: location,
  //   what: keywords
  //   // Add more query parameters as needed
  // };
  // var queryString = new URLSearchParams(queryParams).toString();
  // var requestUrl = apiUrl + "?" + queryString;
  //   // fetch request for arbeitnow API
  //   var requestOptions = {
  //       method: 'GET',
  //       redirect: 'follow'
  //     };
      
      // fetch("https://www.arbeitnow.com/api/job-board-api", requestOptions)
      //   .then(response => response.json())
      //   .then(result => console.log(result))
      //   .catch(error => console.log('error', error));
  
    fetch(apiUrl)
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
salariesForm.addEventListener('submit', getArbeitNowApi);



// var axios = require('axios');

// async function getJobListings(apiKey, location, keywords) {
//   try {
//     var response = await axios.get('https://api.adzuna.com/v1/api/jobs/us/search/1', {
//       params: {
//         app_id: apiKey,
//         app_key: apiKey,
//         where: location,
//         what: keywords
//       }
//     });

//     // Process the response data
//     var jobListings = response.data.results;
//     // Do something with the job listings

//     return jobListings;
//   } catch (error) {
//     console.error('Error retrieving job listings:', error);
//     throw error;
//   }
// }

// // Usage example
// var apiKey = '7d9de1620ebcf6cd476c7c843c768025';
// var location = '';
// var keywords = '';

// getJobListings(apiKey, location, keywords)
//   .then(jobListings => {
//     console.log('Job Listings:', jobListings);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

//   // Loop over the job listings to generate a table
// for (var i = 0; i < jobListings.length; i++) {
//   // Creating elements: table row, table data, and anchor
//   var createTableRow = document.createElement('tr');
//   var tableData = document.createElement('td');
//   var link = document.createElement('a');

//   // Setting the text of the link and the href of the link
//   link.textContent = jobListings[i].html_url;
//   link.href = jobListings[i].html_url;

//   // Appending the link to the table data and then appending the table data to the table row
//   // The table row then gets appended to the table body
//   tableData.appendChild(link);
//   createTableRow.appendChild(tableData);
//   tableBody.appendChild(createTableRow);
// }