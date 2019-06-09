// Firebase API Config
var firebaseConfig = {
    apiKey: "AIzaSyDmyhX5D3J_ACq2YtrXr7km7gyzgIA7f3Y", // Come get me, I dare you! (Prepared For Safety Emails from Google? Check!) 
    authDomain: "train-scheduler-a85a2.firebaseapp.com",
    databaseURL: "https://train-scheduler-a85a2.firebaseio.com",
    projectId: "train-scheduler-a85a2",
    storageBucket: "",
    messagingSenderId: "537481549338",
    appId: "1:537481549338:web:360944f262317b81"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to the root of the database.
var schedulerDB = firebase.database();

// DATA SUBMISSION FUNCTION.

// When the user clicks on the submit button, process the user data.
$("#btnSubmit").on("click", function (e) {
    // Prevents the page from reloading.
    e.preventDefault();

    // Defined DOM form elements.
    var sName = $("#sName").val().trim();
    var sDestination = $("#sDestination").val().trim();
    var sFirstTrainTime = $("#sFirstTrainTime").val().trim();
    var sFrequency = $("#sFrequency").val().trim();

    // Validate that the data being sent is legit.
    if (sName, sDestination, sFirstTrainTime, sFrequency === "") {
        $("#dataSentEmpty").show();
    } else {
        // If the user previously entered invalid data, remove last error message.
        $("#dataSentEmpty").hide();
        // Push User Data to Firebase.
        var db = schedulerDB.ref().push();
        db.set({
            sName,
            sDestination,
            sFirstTrainTime,
            sFrequency
        });
        // Since the data is now saved, clear the values of the form input fields.
        $("#sName").val("");
        $("#sDestination").val("");
        $("#sFirstTrainTime").val("");
        $("#sFrequency").val("");

        // Let the user know that their data was successfully sent to the database.
        $("#dataSentSuccess").show();

        // Hide Success Alert.
        setTimeout(function () {
            $("#dataSentSuccess").hide();
        }, 3000)
    }
});

// POPULATE TABLE BODY.

// Build out our HTML table body data.
schedulerDB.ref().on('value', function (snapshot) {
    // Variable containing our JS-built table.
    var content = '';
    // We set a random time to show the moment js library what time looks like.
    var randomTime = "13:00";
    // We pass in the type of time format we want to built (A = AM/PM).
    var randomDateFormat = "HH:mm A";
    //  Pass in our two time format variables so the moment converter knows what to do next.
    var convertedDate = moment(randomTime, randomDateFormat);
    // Hold the new nicely formatted train arrival time.
    console.log(convertedDate.add(20, "minutes").format(randomDateFormat));

    // Loop through our data and build our table.
    snapshot.forEach(function (data) {
        var val = data.val();
        content += '<tr>';
        // Train Name.
        content += '<td>' + val.sName + '</td>';
        // Train Destination
        content += '<td>' + val.sDestination + '</td>';
        // How often the train frequents a stop for this location.
        content += '<td>' + val.sFrequency + '</td>';
        // Train arrival time.
        content += '<td>' + val.sFirstTrainTime + '</td>';
        // How many minutes away the train is from it's stop.
        content += '<td>' + val.sFrequency * val.sFrequency + '</td>';
        content += '</tr>';
    });

    // Populate table with built data.
    $('#trainDataPopulation').append(content);
});

// Experimental - May use this for the process of updating / removing data.
// function updateField() {
//     var updateNow = prompt("Rename sName!");
//     schedulerDB.ref("-LgovWZiLGHiF8WWLrNM").update({ sName: "NewName!" });
// }
