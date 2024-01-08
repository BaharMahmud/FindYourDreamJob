var salariesFormEl = document.querySelector('#salaries-form');
var titleInputEl = document.querySelector('#title');
var salariesContainerEl = document.querySelector('#salaries-container');
var salariesSearchTerm = document.querySelector('#salaries-search-term');
var searchBtn=document.querySelector("#search");
var footerEl=document.querySelector(".footer");
var nextBtnEL=document.querySelector(".waves-effect waves-light btn");
var page=1;
var formSubmitHandler = function (event) {
  event.preventDefault();

  var salaries = titleInputEl.value.trim();

  if (salaries) {
    getSalariesLinks(salaries);

    salariesContainerEl.textContent = '';
    titleInputEl.value = '';
  } 
};


var getSalariesLinks = function (salary) {
  
 
    var query="&salary_min="+salary;
    var apiUrl = "https://api.adzuna.com/v1/api/jobs/us/search/"+page+"?app_id=fe15ccd9&app_key=7d9de1620ebcf6cd476c7c843c768025"+query;

    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data.results);
           
            displaySalaryResults(data.results,salary);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
          
        alert('Unable to connect to jobs list.');
      });
  };
  


  var displaySalaryResults = function (salariesResult, searchTerm) {
    if (salariesResult.length === 0) {
      salariesContainerEl.textContent = 'No results found.';
      return;
    }
 
        
    salariesSearchTerm.textContent = searchTerm;
  
    for (var i = 0; i < salariesResult.length; i++) {
      var salaryByPosition = "Company: "+ salariesResult[i].company.display_name + "\nJob Title: "+ salariesResult[i].title +"\nJob Location: "+salariesResult[i].location.area+"\n" +" Salary: "+"$"+salariesResult[i].salary_max;
      var webUrl=salariesResult[i].redirect_url;

      var salaryEl = document.createElement('div');
      salaryEl.classList = 'list-item flex-row justify-space-between align-center';
  
      var titleEl = document.createElement('span');
      titleEl.textContent = salaryByPosition;
  
      var urlForSalaries=document.createElement('a');
      urlForSalaries.textContent='\n' + webUrl;
      urlForSalaries.setAttribute('href',webUrl);
      urlForSalaries.setAttribute("target","_self");

    salaryEl.appendChild(titleEl);
    salaryEl.appendChild(urlForSalaries);
    salariesContainerEl.appendChild(salaryEl);
   
    
    }
    
    var nextBtnEL=document.createElement("button");    
    nextBtnEL.classList ="waves-effect waves-light btn";
var buttonText= document.createTextNode("More");      
nextBtnEL.appendChild(buttonText);
salariesContainerEl.appendChild(nextBtnEL);
 
nextBtnEL.addEventListener("click",function(){
nextBtnEL.remove();
page++;
salaryEl.remove();
setTimeout(3000);
getSalariesLinks(salariesSearchTerm.textContent);
   


})

 };
 

  salariesFormEl.addEventListener('click', formSubmitHandler);



   
