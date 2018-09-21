
Date.prototype.isValid = function () {
    // An invalid date object returns NaN for getTime() and NaN is the only
    // object not strictly equal to itself.
    return this.getTime() === this.getTime();
};


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

function addEmployee() {
    event.preventDefault();
    //check for validation
    var name = $("#ee-name").val().trim();
    var role = $("#ee-role").val().trim();
    var startDate = $("#start-date").val().trim();
    var monthRate = $("#ee-rate").val().trim();

    var d = new Date(startDate);
    console.log(d.isValid());
    console.log(d);

    if (isNaN(monthRate)) {
        alert("Invalid monthly rate!");
        return;
    }

    if (!(d.isValid())) {
        alert("Invalid start date!");
        return;
    }

    if (name && role && startDate && monthRate) {
        //push to firebase
        database.ref().push({
            name: name,
            role: role,
            startDate: startDate,
            monthRate: monthRate,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        //clear inputs? done by default
        $("#ee-name").val("");
        $("#ee-role").val("");
        $("#start-date").val("");
        $("#ee-rate").val("");


    }


}

//Listing out our on click event

$("#addEmployee").on("click", addEmployee)
database.ref().orderByChild("dateAdded").on("child_added", function (snapshot) {
    //update dom with snapshot.val()
    var rowDiv = $("<tr>");

    var rowName = snapshot.val().name;
    var rowRole = snapshot.val().role;
    var rowDate = snapshot.val().startDate;
    var rowRate = snapshot.val().monthRate;
    var monthsDif = moment().diff(moment(rowDate), "months");
    // alert (monthsDif);
    // $("#comment-display").text(snapshot.val().dateAdded);
    //add row data in order: Name, Role, Start Date, Months WOrked, Monthly Rate, Total billed
    rowDiv.append($("<td>").text(rowName));
    rowDiv.append($("<td>").text(rowRole));
    rowDiv.append($("<td>").text(rowDate));
    rowDiv.append($("<td>").text(monthsDif));
    rowDiv.append($("<td>").text(rowRate));
    rowDiv.append($("<td>").text(monthsDif * parseInt(rowRate)));

    //append row to table
    $("#data-table").append(rowDiv);


}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


