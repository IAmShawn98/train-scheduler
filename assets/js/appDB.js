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

