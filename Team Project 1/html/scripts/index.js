var firebaseConfig = {
    apiKey: "AIzaSyDXwzhjBRafKkta_SDSsRZHw_7Bvhm28q0",
    authDomain: "team-projec.firebaseapp.com",
    projectId: "team-projec",
    storageBucket: "team-projec.appspot.com",
    messagingSenderId: "434710215462",
    appId: "1:434710215462:web:0b65cc627d33b9d0531fe7",
    measurementId: "G-W72V0CV5W9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Check if user is currently logged in or not
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var email = user.email;
        // window.alert(email + " is logged in");
      // User is signed in.
    } else {
      // No user is signed in.
    }
  });

//Loggin user 
function login(){
    'use strict';
    var userEmail = document.getElementById("inputEmail").value;
    var userPassword = document.getElementById("inputPassword").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
    .then(function(userCredential){
        // var user = userCredential.user;
        window.location.href = "account.html";
    })
    .catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error: " + errorMessage);
    });

    event.preventDefault();
}

// Create an Account for user
function createAccount(){
    'use strict';
    // var user = firebase.auth().currentUser;
    // var name = document.getElementById("inputName").value;
    // var description = document.getElementById("inputDescription").value;
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;

    // window.alert(email + " " + password + " " + name + " " + description);
    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(userCredential){
    // Signed in 
    var user = userCredential.user;
    // ...
  })
  .catch(function(error){
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error: " + errorMessage);
    // ..
  });
  event.preventDefault();
}

// We need Signout button for user to sign out
function signOut(){
    'use strict';
    auth.signOut();
    window.alert('Signed Out');
}