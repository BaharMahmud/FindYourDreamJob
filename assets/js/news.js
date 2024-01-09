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
  
 
   
    
    var apiUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+news+"&page="+page+"&api-key=Mx7W0r7TTF6zZe6AsPiDbv2vbta34MmA";

    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data.response.docs);
           
            displayNewsResults(data.response.docs,news);
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
      var newsByPosition = "Title: "+ newsResult[i].snippet ;
      var webUrl=newsResult[i].web_url;
      var newsEl = document.createElement('div');
      newsEl.classList = 'list-item block justify-space-between align-center';
  
      var titleEl = document.createElement('span');
      titleEl.textContent = newsByPosition;
  
var urlForNews=document.createElement('a');
urlForNews.textContent='\n' + webUrl;
        urlForNews.setAttribute('href',webUrl);
        urlForNews.setAttribute("target","_self"); 
        newsEl.appendChild(titleEl);
    newsEl.appendChild(urlForNews);
   
    
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


