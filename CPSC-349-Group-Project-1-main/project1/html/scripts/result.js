// This is a new file that has a function automatically get information from user and put it on to our result page
(function(){
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        // get user description and bio
        var firebase_username = firebase.database().ref('users/' + user.uid + '/username');
        var firebase_email = firebase.database().ref('users/' + user.uid + '/email');
        var firebase_description = firebase.database().ref('users/' + user.uid + '/description');

        // Change the username box in result.html into the value we got fromm firebase
        firebase_username.on('value', function(snapshot){
         document.getElementById("userName").innerHTML = snapshot.val();
        });

        // Get the email, if we also want to put email into our website, we can use this
        firebase_email.on('value', function(snapshot){
          document.getElementById("user_email").innerHTML = "Logged in as " + snapshot.val();
        });

        // Change description
        firebase_description.on('value', function(snapshot){
          document.getElementById("description_box").innerHTML = snapshot.val();
        });

        // Upload image on to the image in result.html-------------------------------------------
        var storage = firebase.storage();
        var pathReference = storage.ref('users/' + user.uid + '/profile.jpg');
        pathReference.getDownloadURL()
          .then(function(url){
            var img = document.getElementById('user_profile_pic');
            img.setAttribute('src', url);
          })
          .catch(function(error){
            console.log(error);
          });  
      } else {
        // No user is signed in.
        console.log('No user is currently logged in');
      }
  });
})();
