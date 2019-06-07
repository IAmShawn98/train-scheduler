
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

// When the user clicks on the submit button, process the user data.
$("#btnSubmit").on("click", function (e) {
    // Prevents the page from reloading.
    e.preventDefault();

    // DEFINED DOM 'FORM' ELEMENTS.
    var sName = $("#sName").val().trim();
    var sDestination = $("#sDestination").val().trim();
    var sFirstTrainTime = $("#sFirstTrainTime").val().trim();
    var sFrequency = $("#sFrequency").val().trim();

    // Push User Data to Firebase.
    schedulerDB.ref().push({
        sName,
        sDestination,
        sFirstTrainTime,
        sFrequency
    })
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
});