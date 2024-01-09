var jobsFormEl = document.querySelector('#jobs-form');
var titleInputEl = document.querySelector('#title');
var jobsContainerEl = document.querySelector('#jobs-container');
var jobsSearchTerm = document.querySelector('#jobs-search-term');
var searchBtn=document.querySelector("#search");
var footerEl=document.querySelector(".footer");
var nextBtnEL=document.querySelector(".waves-effect waves-light btn");
var page=1;
var formSubmitHandler = function (event) {
  event.preventDefault();

  var jobs = titleInputEl.value.trim();

  if (jobs) {
    getJobsLinks(jobs);

    jobsContainerEl.textContent = '';
    titleInputEl.value = '';
  } 
};


var getJobsLinks = function (job) {
  
 
    var query="&title_only="+job;
    var apiUrl = "https://api.adzuna.com/v1/api/jobs/us/search/"+page+"?app_id=fe15ccd9&app_key=7d9de1620ebcf6cd476c7c843c768025"+query;

    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data.results);
           
            displayJobResults(data.results,job);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
          
        alert('Unable to connect to jobs list.');
      });
  };
  


  var displayJobResults = function (jobsResult, searchTerm) {
    if (jobsResult.length === 0) {
      jobsContainerEl.textContent = 'No results found.';
      return;
    }
 
        
    jobsSearchTerm.textContent = searchTerm;
  
    for (var i = 0; i < jobsResult.length; i++) {
      var jobByPosition = "Company: "+ jobsResult[i].company.display_name + "\nJob Title: "+ jobsResult[i].title +"\nJob Location: "+jobsResult[i].location.area+"\n" +" Salary: "+"$"+jobsResult[i].salary_max;
     var webUrl=  jobsResult[i].redirect_url;
      var jobEl = document.createElement('div');
      jobEl.classList = 'list-item flex-row justify-space-between align-center';
  
      var titleEl = document.createElement('span');
      titleEl.textContent = jobByPosition;
  
      var urlForJobs=document.createElement('a');
      urlForJobs.textContent='\n' + "Go to website";
        urlForJobs.setAttribute('href',webUrl);
        urlForJobs.setAttribute("target","_self"); 
    jobEl.appendChild(titleEl);
    jobEl.appendChild(urlForJobs);
    jobsContainerEl.appendChild(jobEl);
   
    
    }
    
    var nextBtnEL=document.createElement("button");    
    nextBtnEL.classList ="waves-effect waves-light btn";
var buttonText= document.createTextNode("More");      
nextBtnEL.appendChild(buttonText);
jobsContainerEl.appendChild(nextBtnEL);
 
nextBtnEL.addEventListener("click",function(){
nextBtnEL.remove();
page++;
jobEl.remove();
setTimeout(3000);
getJobsLinks(jobsSearchTerm.textContent);
   


})

 };
 

  jobsFormEl.addEventListener('click', formSubmitHandler);



   
