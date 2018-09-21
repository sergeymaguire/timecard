


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
    var rowDiv = $("<tr>");
    
    var rowName = snapshot.val().name;
    var rowRole = snapshot.val().role;
    var rowDate = snapshot.val().startDate;
    var rowRate = snapshot.val().monthRate;
    // $("#comment-display").text(snapshot.val().dateAdded);
    //add row data in order: Name, Role, Start Date, Months WOrked, Monthly Rate, Total billed
    rowDiv.append($("<td>").text(rowName));
    rowDiv.append($("<td>").text(rowRole));
    rowDiv.append($("<td>").text(rowDate));
    rowDiv.append($("<td>").text("Months Worked Here"));
    rowDiv.append($("<td>").text(rowRate));
    rowDiv.append($("<td>").text("Total Billed here"));

    //append row to table
    $("#data-table").append(rowDiv);


}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });



