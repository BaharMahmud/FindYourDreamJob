var fullName=$("[name='Name']");
var email=$("[name='Email']");
var subject=$("[name='Subject']");
var message=$("[name='Message']");
var body=$("body");
var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];



$(document).ready(function(){
    $(".w3-button").on("click", function() {
var submittedFormInfo= {
  fullName: fullName.val(),
  email:email.val(),
  subject:subject.val(),
  message:message.val()
};

localStorage.setItem("formInfo", JSON.stringify(submittedFormInfo));

renderMessage();
})
});


function renderMessage() {
    
var retrieveFullName=JSON.parse(localStorage.getItem("formInfo"));
if (retrieveFullName !==null){

    var fullNameArray=JSON.parse(localStorage.getItem("formInfo"));
    var nameInStorage=fullNameArray.fullName;
    document.querySelector("#modal-paragraph").textContent=nameInStorage+ " thank you for contacting us. We will get in touch with you within 24 hours. If you don't hear from us within 24 hours please email to findyourdreamjob@gmail.com.";

modal.style.display = "block";


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

}