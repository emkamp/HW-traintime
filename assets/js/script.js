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
database.on("child_added", function(childSnapshot, prevChildKey) {
    var snapshot = childSnapshot.val();
    //for #items in object, build 1 row for each
    dep = snapshot.dep;
    dest = snapshot.dest;
    freq = snapshot.freq;
    name = snapshot.name;
    warn = snapshot.warn;

    if (warn === undefined) {
        warn = "";
    } else {}

    if (name === "Wasteland Regional Rail") {
        name = '<span class="glyphicon glyphicon-registration-mark"></span> Wasteland Regional Rail';
    } else if (name === "Mojave Express") {
        name = '<span class="glyphicon glyphicon-flash"></span> Mojave Express';
    } else {}

    newRow = $("<tr id='x'><td class='name'>" + name + "</td><td class='dest'>" + dest + "</td><td class='freq'>" + freq + "</td><td class='arv'>" + arv + "</td><td class='wait'>" + wait + "</td><td class='warn'>" + warn + "</tr>");

    $("#schedule tbody").append(newRow);
});

/*
//UPDATE PAGE ON DATA CHANGE
database.on("value", function(snapshot) {
    var thisTrain = "train1";
    var trainRef = snapshot.val().thisTrain;
    $("#train1 td.dep").addClass("changed");
    $("#train1 td.dep").html(trainRef.dep);
    setTimeout(function() {
        $("#train1 td.dep").removeClass("changed");
    }, 500);
});
*/

/*
 ** Returns the caret (cursor) position of the specified text field.
 ** Return value range is 0-oField.value.length.
 ** from http://stackoverflow.com/questions/2897155/get-cursor-position-in-characters-within-a-text-input-field
 */
function doGetCaretPosition(oField) {

    // Initialize
    var iCaretPos = 0;
    var newMargin;
    var charWidth = 8.95;

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
        console.log("if iCaretPos = " + iCaretPos);
    }

    // Firefox support
    else if (oField.selectionStart || oField.selectionStart == '0') {
        iCaretPos = oField.selectionStart;
    }

    newMargin = (charWidth * iCaretPos) + 28;

    if (newMargin >= 28 && newMargin <= 585) {
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

    $("input").on('keydown', function() {
        var key = event.keyCode || event.charCode;
        doGetCaretPosition(this);
    });

    $("input").mouseup(function() {
        doGetCaretPosition(this);
    });
});
