


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

    //push to firebase
    
}

//Listing out our on click event

$("#addEmployee").on("click", addEmployee)
