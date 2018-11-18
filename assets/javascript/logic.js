$(document).ready(function () {

    var config = {
      apiKey: "AIzaSyAI21GSLk4GmA0w4ZAn57m0sw8qmwWxJxs",
      authDomain: "train-scheduler-496af.firebaseapp.com",
      databaseURL: "https://train-scheduler-496af.firebaseio.com",
      projectId: "train-scheduler-496af",
      storageBucket: "train-scheduler-496af.appspot.com",
      messagingSenderId: "810871453100"
    };
    firebase.initializeApp(config);
  
    var database = firebase.database();
  
    $("#addTrain").on("click", function (event) {
      event.preventDefault();
  
      var trainName = $("#trainName").val().trim();
      var destination = $("#destination").val().trim();
      var firstTrain = $("#firstTrain").val().trim();
      var freq = $("#interval").val().trim();
  
      database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: freq
        
      });
    });
  
  
    database.ref().on("child_added", function (snapshot) {
  
      var newTrain = snapshot.val().trainName;
      var newLocation = snapshot.val().destination;
      var newFirstTrain = snapshot.val().firstTrain;
      var newFreq = snapshot.val().frequency;
  
      var startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");
  
      var currentTime = moment();
  
      var diffTime = moment().diff(moment(startTimeConverted), "minutes");
  
      var tRemainder = diffTime % newFreq;
  
      var tMinutesTillTrain = newFreq - tRemainder;
  
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      var catchTrain = moment(nextTrain).format("HH:mm");
  
      $("#all-display").append(
        ' <tr><td>' + newTrain +
        ' </td><td>' + newLocation +
        ' </td><td>' + newFreq +
        ' </td><td>' + catchTrain +
        ' </td><td>' + tMinutesTillTrain + ' </td></tr>');
  
      $("#trainName, #destination, #firstTrain, #interval").val("");
      return false;
    });
  });