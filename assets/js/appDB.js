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
    var currentTime = moment().format("h:mm A");
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
    var sFirstTime = moment($("#sFirstTime").val().trim(), "HH:mm").subtract(10, "years").format("X");
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

// Convert Data Into A Readable HTML Table.
schedulerDB.ref().on("child_added", function (snapshot) {
    // Defined Data Snapshots.
    var sName = snapshot.val().sName;
    var sDestination = snapshot.val().sDestination;
    var sFrequency = snapshot.val().sFrequency;
    var sFirstTime = snapshot.val().sFirstTime;

    // Get Unique Keys.
    var key = snapshot.key;

    // Remainder.
    var remainder = moment().diff(moment.unix(sFirstTime), "minutes") % sFrequency;
    // Minutes Until Next Train Arrival.
    var minutes = sFrequency - remainder;
    // Arrival Time.
    var arrival = moment().add(minutes, "m").format("hh:mm A");

    // Append Captured Data Snapshots and Populate DataTable.
    var content = '';

    content += '<tr>';
    // Train Name.
    content += '<td>' + sName + '</td>';
    // Train Destination.
    content += '<td>' + sDestination + '</td>';
    // How often the train frequents a stop.
    content += '<td>' + sFrequency + '</td>';
    // First Time.
    content += '<td>' + arrival + '</td>';
    // How many minutes away the train is from it's stop.
    content += '<td>' + minutes + '</td>';
    // Table Actions.
    content += '<td><i class="fa fa-trash text-danger" id="delRow" aria-hidden="true"></i></td>';
    content += '</tr>';

    // Append Data to Table.
    $('#trainDataPopulation').append(content);

    // Delete Single Table Rows.
    $(".fa-trash").on('click', function () {
        // Loop through unique keys.
        for (var i = 0; i < key.length;) {
            // Delete Key In Row the User Clicked.
            $(this).parents("tr").remove();
            schedulerDB.ref().child(key).remove();
            // alert("Removed " + key);
            // Break Loop.
            if (key === remove()) {
                break;
            };
        }
    });
});