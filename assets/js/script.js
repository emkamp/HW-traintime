// moment.js
moment().format();

// cursor
var iCaretPos = 0;

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

var recentTrain;

// GET DATA ONCE THE FIRST TIME AND EVERY TIME A NEW TRAIN IS ADDED
database.on("child_added", function(childSnapshot, prevChildKey) {
    console.log("prevChildKey: " + prevChildKey);

    if (prevChildKey) {
        recentTrain = parseInt(prevChildKey.slice(5)) + 1;
        console.log("recentTrain: " + recentTrain);
        // THIS ^ WILL SHOW PREV, NOT CURRENT, SO CHOP THE STRING TO GET THE #, convert to integer, and add one.
    }

    var snapshot = childSnapshot.val();
    //for #items in object, build 1 row for each
    dep = snapshot.dep;
    dest = snapshot.dest;
    freq = snapshot.freq;
    name = snapshot.name;
    warn = snapshot.warn;

    /* loading ---------------- */

    if (warn === undefined) {
        warn = "";
    } else {}

    if (name === "Wasteland Regional Rail") {
        name = '<span class="glyphicon glyphicon-registration-mark"></span> Wasteland Regional Rail';
    } else if (name === "Mojave Express") {
        name = '<span class="glyphicon glyphicon-flash"></span> Mojave Express';
    } else {}

    newRow = $("<tr><td class='name'>" + name + "</td><td class='dest'>" + dest + "</td><td class='freq'>" + freq + "</td><td class='arv'>" + arv + "</td><td class='wait'>" + wait + "</td><td class='warn'>" + warn + "</tr>");

    $("#schedule tbody").append(newRow);

    /* updating ---------------- */

    console.log("SOMETHING CHANGED!");
    //console.log(trainRef);
});

function newTrainEntry(event) {
    console.log("newTrainItem");
    console.log(event);
    // grab data from fields to variables, put variables into object, push object to firebase.

    var newTrainNumber = recentTrain + 1; //add one to recentTrain

    var newTrainName = $("#name").val();
    var newTrainDest = $("#dest").val();
    var newTrainFirstDep = $("#first-dep").val();
    var newTrainFreq = $("#frequency").val();
    var newTrainWarn = $("#warn").val();

    console.log("newTrainName: " + newTrainName);

    firebase.database().ref('train' + newTrainNumber).set({
        dep: newTrainFirstDep,
        dest: newTrainDest,
        freq: newTrainFreq,
        name: newTrainName,
        warn: newTrainWarn,
    });
}


/* ================================================================================================================== */
/* CURSOR STUFF ==================================================================================================== */
/* ================================================================================================================ */

/*
 ** Returns the caret (cursor) position of the specified text field.
 ** Return value range is 0-oField.value.length.
 ** from http://stackoverflow.com/questions/2897155/get-cursor-position-in-characters-within-a-text-input-field
 */

function doGetCaretPosition(oField) {

    // Initialize
    var newMargin;
    var charWidth = 8.4;

    // IE Support
    if (document.selection) {

        // Set focus on the element
        oField.focus();

        // To get cursor position, get empty selection range
        var oSel = document.selection.createRange();

        // Move selection start to 0 position
        oSel.moveStart('character', -oField.value.length);

        // The caret position is selection length
        iCaretPos = oSel.text.length;
    }

    // Firefox support
    else if (oField.selectionStart || oField.selectionStart == '0') {
        iCaretPos = oField.selectionStart;
    }

    newMargin = (charWidth * iCaretPos) + 28;

    if (newMargin >= 28 && newMargin <= 498) {
        var marginString = newMargin + "px";
        $(oField).siblings(".cursor").css("left", marginString);
        console.log("left: " + marginString);
    } else {}

    // Return results
    return iCaretPos;
}

$(document).ready(function() {
    // CURSOR
    $(".cursor").hide();

    $("input").focus(function() {
        $(this).siblings(".cursor").show();
    });

    $("input").focusout(function() {
        $(this).siblings(".cursor").hide();
    });

    $("input").on('keyup', function() {
        doGetCaretPosition(this);
    });

    $("input").mouseup(function() {
        doGetCaretPosition(this);
    });

    $("#btn-add").on("click", newTrainEntry);
});