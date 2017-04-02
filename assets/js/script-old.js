// moment.js
 moment().format();

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCA2tm3KHnEVfIz7bepElFqDh3-9DJItqw",
    authDomain: "traintime-e8f20.firebaseapp.com",
    databaseURL: "https://traintime-e8f20.firebaseio.com",
    storageBucket: "traintime-e8f20.appspot.com",
    messagingSenderId: "645797474895"
};
firebase.initializeApp(config);
var database = firebase.database().ref();
var dep = "";
var dest = "";
var freq = "";
var name = "";
var warn = "";
var arv = "";
var wait = "";

// GET DATA ONCE THE FIRST TIME
database.once('value').then(function(snapshot) {
    console.log("====BEGIN ONCE=====");
    var snapshot = snapshot.val();
    //for #items in object, loop through this stuff to build 1 row for each
    dep = snapshot.train1.dep;
    dest = snapshot.train1.dest;
    freq = snapshot.train1.freq;
    name = snapshot.train1.name;
    warn = snapshot.train1.warn;
    newRow = $("<tr id='train1'><td class='name'>" + name + "</td><td class='dest'>" + dest + "</td><td class='freq'>" + freq + "</td><td class='arv'>" + arv + "</td><td class='wait'>" + wait + "</td><td class='warn'>" + warn + "</tr>");
    $("#schedule tbody").append(newRow);
    console.log("snapshot.train1 -->");
    console.log(snapshot.train1);
    console.log("====END ONCE=====");
});


//UPDATE PAGE ON DATA CHANGE
database.on("value", function(snapshot) {
    console.log("====BEGIN UPDATER=====");
    var thisTrain = "train1";
    var trainRef = snapshot.val().thisTrain;
    console.log("thisTrain = " + thisTrain);
    console.log("trainRef -->");
    console.log(trainRef);
    console.log("snapshot.val() -->");
    console.log(snapshot.val());
    $("#train1 td.dep").addClass("changed");
    $("#train1 td.dep").html(trainRef.dep);
    setTimeout(function() {
        $("#train1 td.dep").removeClass("changed");
    }, 500);
    console.log("trainRef.dep = " + trainRef.dep);
    //console.log("thisRow -->");
    //console.log(thisRow);
    console.log("====END UPDATER=====");
});
/*
maybe build out a function based on the idea of having train# a variable, to pass thru the function and build each table row?
*/