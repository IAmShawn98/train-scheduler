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

// Defined Variables.
function updateTime() {
    // Moment time display.
    var sTime = document.getElementById("sTime");
    // Get and store the current time.
    var currentTime = moment().format("hh:mm A");
    // Populate the time display.
    sTime.textContent = currentTime;
}

// Set updater for our live time.
setInterval(updateTime, 0);

// DATA SUBMISSION FUNCTION.

// When the user clicks on the submit button, process the user data.
$("#btnSubmit").on("click", function (e) {
    // Prevents the page from reloading.
    e.preventDefault();

    // Defined DOM form elements.
    var sName = $("#sName").val().trim();
    var sDestination = $("#sDestination").val().trim();
    var sFirstTime = $("#sFirstTime").val().trim();
    var sFrequency = $("#sFrequency").val().trim();




    // Validate that the data being sent is legit.
    if (sName, sDestination, sFirstTime, sFrequency === "") {
        $("#dataSentEmpty").show();
    } else {
        // If the user previously entered invalid data, remove last error message.
        $("#dataSentEmpty").hide();
        // Push User Data to Firebase.
        var db = schedulerDB.ref().push();
        db.set({
            sName,
            sDestination,
            sFirstTime,
            sFrequency
        });
        // Since the data is now saved, clear the values of the form input fields.
        $("#sName").val("");
        $("#sDestination").val("");
        $("#sFirstTime").val("");
        $("#sFrequency").val("");

        // Let the user know that their data was successfully sent to the database.
        $("#dataSentSuccess").show();

        // Hide Success Alert.
        setTimeout(function () {
            $("#dataSentSuccess").hide();
        }, 3000)
    }
});

// Build out our HTML table body data.
schedulerDB.ref().on('value', function (snapshot) {
    // Variable containing our JS-built table.
    var content = '';

    // Loop through our data and build our table.
    snapshot.forEach(function (childSnapshot) {
        // Holds a childs unique key.
        var key = childSnapshot.key;
        // Holds the value of our DB children.
        var val = childSnapshot.val();

        var currentTime = moment().format("hh:mm");

        // Subtract a year to make sure time is accurate.
        var startTimeConverted = moment(val.sFirstTime, "hh:mm").add(sFrequency, "minutes");
        // Get the difference between the first time given and 
        var timeDiff = moment().add(moment(startTimeConverted), "minutes");
        var timeRemain = timeDiff % val.sFrequency;
        var minToArrival = val.sFrequency % timeRemain;
        var nextTrain = moment().add(minToArrival, "minutes");

        // Format our data into a table.
        content += '<tr>';
        // Train Name.
        content += '<td>' + val.sName + '</td>';
        // Train Destination
        content += '<td>' + val.sDestination + '</td>';
        // How often the train frequents a stop.
        content += '<td>' + val.sFrequency + '</td>';
        // First Time
        content += '<td>' + nextTrain + '</td>';
        // How many minutes away the train is from it's stop.
        content += '<td>PH</td>';
        content += '</tr>';
    });

    // Populate table with built data.
    $('#trainDataPopulation').append(content);

});