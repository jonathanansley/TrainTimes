/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve trains from the database.
// 4. Create a way to calculate the months worked.
//    Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed




// 1. Initialize Firebase
var config = {

  // apiKey: "AIzaSyA_QypGPkcjPtylRDscf7-HQl8ribnFeIs",
  apiKey: "AIzaSyDC7GTBBx-lqdIkR0AhnHJLl3-ZbwXXRKY",  

  // authDomain: "time-sheet-55009.firebaseapp.com",
  authDomain: "testing-firebase-57397.firebaseapp.com",
  
  // databaseURL: "https://time-sheet-55009.firebaseio.com",
  databaseURL: "https://testing-firebase-57397.firebaseio.com",
  
  // storageBucket: "time-sheet-55009.appspot.com"
  storageBucket: "testing-firebase-57397.appspot.com"

};

firebase.initializeApp(config);

var database = firebase.database();




// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainRole = $("#role-input").val().trim();
  var trainStart = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
  var trainRate = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    role: trainRole,
    start: trainStart,
    rate: trainRate
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.role);
  console.log(newTrain.start);
  console.log(newTrain.rate);

  // Alert
  alert("train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});




// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainRole = childSnapshot.val().role;
  var trainStart = childSnapshot.val().start;
  var trainRate = childSnapshot.val().rate;

  // train Info
  console.log(trainName);
  console.log(trainRole);
  console.log(trainStart);
  console.log(trainRate);

  // Prettify the train start
  var trainStartPretty = moment.unix(trainStart).format("MM/DD/YY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var trainMonths = moment().diff(moment.unix(trainStart, "X"), "months");
  console.log(trainMonths);

  // Calculate the total billed rate
  var trainBilled = trainMonths * trainRate;
  console.log(trainBilled);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainRole + "</td><td>" +
  trainStartPretty + "</td><td>" + trainMonths + "</td><td>" + trainRate + "</td><td>" + trainBilled + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume train start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
