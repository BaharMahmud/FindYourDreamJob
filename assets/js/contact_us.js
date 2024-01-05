var fullName=$("[name='Name']");
var email=$("[name='Email']");
var subject=$("[name='Subject']");
var message=$("[name='Message']");





$(document).ready(function(){
    $(".w3-button").on("click", function() {
var submittedFormInfo= {
  fullName: fullName.val(),
  email:email.val(),
  subject:subject.val(),
  message:message.val()
};

localStorage.setItem("formInfo", JSON.stringify(submittedFormInfo));



})
});
