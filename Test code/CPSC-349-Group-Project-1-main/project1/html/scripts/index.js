// Sign-up function---------------------------------------------
function createAccount(){
  'use strict';
  var email = document.getElementById("inputEmail").value;
  var password = document.getElementById("inputPassword").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(userCredential){ console.log('Create sucessful');  })
    .then(function(){  window.location.href = 'update-profile.html'; })
    .catch(function(error){   window.alert("Error: " + error.message);  
  });
}

// Login function-------------------------------------------------
function sign_user_in(){
  'use strict';
  var userEmail = document.getElementById("inputEmail").value;
  var userPassword = document.getElementById("inputPassword").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
    .then(function(userCredential){   window.location.href = "result.html";   })
    .catch(function(error){  window.alert(error.message);
  });
}

// signout function------------------------------------------
function signOut(){
  firebase.auth().signOut()
  .then(function() {   window.location.href = 'about.html';  })
  .catch(function(error){ console.log(error.message);
  });
}

// This function will call delete data and delete picture above
// Call this function before you remove user in authentication
function delete_user_data(){
  var user = firebase.auth().currentUser;
  // delete picture
  firebase.storage().ref('users/' + user.uid + '/Profile Picture').delete()
    .then(function(){   console.log("delete picture sucessfully");  })
    .catch(function(error){   console.log(error.message);   });
  // delete user data in realtime database
  firebase.database().ref('users/' + user.uid).remove()
    .then(function(){   console.log("delete data sucessfulyy"); })
    .catch(function(error) { console.log(error.message);  });
}

// New update user function
function writeUserData(userId, name, description, github_link, twitter_link, facebook_link, instagram_link) {
  event.preventDefault();
  firebase.database().ref('users/' + userId).set({
    username: name,
    description: description,
    Social_media : {  github : github_link,
                      twitter: twitter_link,
                      facebook : facebook_link,
                      instagram : instagram_link
                    }  
  });
}
function storeUserImage(userId, pictureFile){
  event.preventDefault();
  firebase.storage().ref('users/' + userId + '/Profile Picture').put(pictureFile)
    .then(function(){   console.log('Successfully upload picture');   })
    .catch(function(error){   console.log(error.message);   });
}
function update_user_profile(){
  event.preventDefault();
  var name = document.getElementById("inputName").value;
  var description = document.getElementById("inputDescription").value;
  var file = document.querySelector('input[type=file]').files[0];
  var github = document.getElementById('github').value;
  var twitter = document.getElementById('twitter').value;
  var facebook = document.getElementById('facebook').value;
  var instagram = document.getElementById('instagram').value;

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      writeUserData(user.uid, name, description, github, twitter, facebook, instagram);
      storeUserImage(user.uid, file);
    } 
    else { console.log('No user is currently logged in'); }
  });
}


// show user information
// for debug purpose
function Authentication_checking(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user);
      console.log('currently logged in as ' + user.email);
    } 
    else { console.log('No user is currently logged in'); }
  });
}

// This function is to check if user is currently logged in or not
// I tried to link this function to our login button but i failed
function check_user(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) { window.location.href = 'result.html'; } 
    else {  window.location.href = 'login.html';  }
  });
}
