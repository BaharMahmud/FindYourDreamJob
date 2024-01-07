var newsFormEl = document.querySelector('#news-form');
var titleInputEl = document.querySelector('#title');
var newsContainerEl = document.querySelector('#news-container');
var newsSearchTerm = document.querySelector('#news-search-term');
var searchBtn=document.querySelector("#search");
var footerEl=document.querySelector(".footer");
var nextBtnEL=document.querySelector(".waves-effect waves-light btn");
var page=1;
var formSubmitHandler = function (event) {
  event.preventDefault();

  var news = titleInputEl.value.trim();

  if (news) {
    getNewsLinks(news);

    newsContainerEl.textContent = '';
    titleInputEl.value = '';
  } 
};


var getNewsLinks = function (news) {
  
 
   
    var apiUrl = "https://newsapi.org/v2/top-headlines?country=us&page="+page+"&category="+news+"&apikey=9dc639adbe46431d8f703739a2b32523";

    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data.articles   );
           
            displayNewsResults(data.articles,news);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
          
        alert('Unable to connect to jobs list.');
      });
  };
  


  var displayNewsResults = function (newsResult, searchTerm) {
    if (newsResult.length === 0) {
      newsContainerEl.textContent = 'No results found.';
      return;
    }
 
        
    newsSearchTerm.textContent = searchTerm;
  
    for (var i = 0; i < newsResult.length; i++) {
      var newsByPosition = "Title: "+ newsResult[i].title + "\n Url: " + newsResult[i].url;
  
      var newsEl = document.createElement('div');
      newsEl.classList = 'list-item block justify-space-between align-center';
  
      var titleEl = document.createElement('span');
      titleEl.textContent = newsByPosition;
  
    newsEl.appendChild(titleEl);
    newsContainerEl.appendChild(newsEl);
   
    
    }
    
    var nextBtnEL=document.createElement("button");    
    nextBtnEL.classList ="waves-effect waves-light btn";
var buttonText= document.createTextNode("More");      
nextBtnEL.appendChild(buttonText);
newsContainerEl.appendChild(nextBtnEL);
 
nextBtnEL.addEventListener("click",function(){
nextBtnEL.remove();
page++;
newsContainerEl.remove();
setTimeout(3000);
getNewsLinks(newsSearchTerm.textContent);
   


})

 };
 

  newsFormEl.addEventListener('click', formSubmitHandler);


