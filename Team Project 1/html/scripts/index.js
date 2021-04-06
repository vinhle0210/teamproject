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


let file = {};
function chooseFile(e){
  file = e.target.files[0];
}

// Check if user is currently logged in or not
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.

      // Debug purpose-------------------------
      // console.log(user);
      // console.log(user.displayName);

      // Upload image-------------------------------------------
      var storage = firebase.storage();
      var pathReference = storage.ref('users/' + user.uid + '/profile.jpg');
      pathReference.getDownloadURL()
        .then(function(url){
          console.log(url);
          // img used the id in sign-up.html, but we can change it later
          var img = document.getElementById('profileImage');
          img.setAttribute('src', url);
        })
        .catch(function(error){
          console.log(error);
        });    

    } else {
      // No user is signed in.
    }
  });

//Loggin user ----------------------------------------------------------------
function login(){
    'use strict';
    var userEmail = document.getElementById("inputEmail").value;
    var userPassword = document.getElementById("inputPassword").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
    .then(function(userCredential){
        var user = userCredential.user;
        // location.href redirect user to other pages
        // window.location.href = "account.html";
        console.log(user);
    })
    .catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error: " + errorMessage);
    });

    event.preventDefault();
}

// Create an Account for user---------------------------------------------
function createAccount(){
    'use strict';
    var name = document.getElementById("inputName").value;
    var description = document.getElementById("inputDescription").value;
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(userCredential){
    // Signed in 
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name
    })
    console.log(user.displayName);

    //Store image-----------------------------------------------
    firebase.storage().ref('users/' + user.uid + '/profile.jpg').put(file).then(function(){
      console.log("sucessfully uploaded piture");
    })
    .catch(function(error){
      window.alert("Error: " + error.message);
    });
    // -------------------------------------------------------------
    
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

// function uploadfile(files){
//   var storageRef = firebase.storage().ref();
//   var proRef = storageRef.child('users/profile.jpg');

//   var file = files.item(0);
//   var task = proRef.put(file);

// }