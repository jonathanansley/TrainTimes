/* global firebase moment */

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
//    Then update the html + update the database.
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainFirstTime = moment($("#first-time-input").val().trim(), "hh:mm").format("X");
  var trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    first: trainFirstTime,
    frequency: trainFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log('newTrain.name = ' + newTrain.name);
  console.log('newTrain.destination = ' + newTrain.destination);
  console.log('newTrain.first = ' + newTrain.first);
  console.log('newTrain.frequency = ' + newTrain.frequency);

  // Alert
  alert("train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-time-input").val("");
  $("#frequency-input").val("");
});




// 3. Create Firebase event for adding trains
//    to the database and a row in the html when
//    a user adds an entry

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainFirstTime = childSnapshot.val().first;
  var trainFrequency = childSnapshot.val().frequency;

  // train Info
  console.log('trainName = ' + trainName);
  console.log('trainDestination = ' + trainDestination);
  console.log('trainFirstTime = ' + trainFirstTime);
  console.log('trainFrequency = ' + trainFrequency);



// *********************************************

  console.log('trainFirstTime = ' + trainFirstTime);

  // Prettify the train first time
  var trainFirstTimePretty = moment.unix(trainFirstTime).format("hh:mm");
  console.log('trainFirstTimePretty = ' + trainFirstTimePretty);


    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away

    // Solved Mathematically
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21




    // First Time (pushed back 1 year to make sure it comes before current time)
    // var trainFirstTimeConverted = moment(trainFirstTime, "hh:mm").subtract(1, "years");
    // console.log('trainFirstTimeConverted = ' + trainFirstTimeConverted);







    // Current Time
    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(trainFirstTime), "minutes");
    console.log("Difference in Time (diffTime): " + diffTime);
    //The console is saying NaN.

    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequency;
    console.log('tRemainder = ' + tRemainder);
    //The console is saying NaN.

    // Minute Until Train
    var tMinutesTillTrain = trainFrequency - tRemainder;
    console.log("Minutes Until Train: " + tMinutesTillTrain);
    //The console is saying NaN.

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));



  // *********************************************

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td><td>");
});