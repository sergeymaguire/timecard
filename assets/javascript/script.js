


// Initialize Firebase
var config = {
apiKey: "AIzaSyAdaj-eidUQPCcKYrVK24WpG3IC224ShY8",
authDomain: "timeclockapp-affa7.firebaseapp.com",
databaseURL: "https://timeclockapp-affa7.firebaseio.com",
projectId: "timeclockapp-affa7",
storageBucket: "",
messagingSenderId: "766938401677"
};
firebase.initializeApp(config);

var database = firebase.database();

function addEmployee(){
    //check for validation
    var name = $("#ee-name").val().trim();
    var role = $("#ee-role").val().trim();
    var startDate = $("#start-date").val().trim();
    var monthRate = $("#ee-rate").val().trim();

    if (name && role && startDate && monthRate){
        //push to firebase
        database.ref().push({
            name: name,
            role: role,
            startDate: startDate,
            monthRate: monthRate,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        })

    }

    
}

//Listing out our on click event

$("#addEmployee").on("click", addEmployee)
database.ref().on("child_added", function(snapshot){
    //update dom with snapshot.val()
    
    $("#name-display").text(snapshot.val().name);
$("#email-display").text(snapshot.val().role);
$("#age-display").text(snapshot.val().startDate);
$("#comment-display").text(snapshot.val().monthRate);
$("#comment-display").text(snapshot.val().dateAdded);

}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });



