// var socket = io();
// $("#messageform").submit(function(e) {
//   e.preventDefault(); // prevents page reloading
//   socket.emit("chat message", $("#m").val());
//   $("#m").val("");
//   return false;
// });
// socket.on("user joined", function(msg) {
//   $("#messages").append($("<li>").text(msg));
// });
// socket.on("chat message", function(msg) {
//   $("#messages").append($("<li>").text(msg));
// });
var loginform = document.getElementById("loginform");
var radiobuttons = document.getElementsByName("poolselect");
var selectedratiobutton = null;
var username = null;
loginform.onsubmit = ev => {
  ev.preventDefault();

  for (var i in radiobuttons) {
    if (radiobuttons[i].value && radiobuttons[i].checked) {
      selectedratiobutton = radiobuttons[i];
    }
  }
  username = $("#username").val();

  fetch()
  return false;
};

// $("#loginform").submit(function(e) {
//   e.preventDefault(); // prevents page reloading

//   console.log($("meaagepool").val());
//   console.log($("#username").val());
//   return false;
// });
