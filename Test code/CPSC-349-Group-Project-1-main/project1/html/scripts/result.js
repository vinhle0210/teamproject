// This is a new file that has a function automatically get information from user and put it on to our result page
(function(){
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var firebase_username = firebase.database().ref('users/' + user.uid + '/username');
        var firebase_description = firebase.database().ref('users/' + user.uid + '/description');
        // Change the username box in result.html into the value we got fromm firebase
        firebase_username.on('value', function(snapshot){
         document.getElementById("userName").innerHTML = snapshot.val();
        });
        // Change description
        firebase_description.on('value', function(snapshot){
          document.getElementById("description_box").innerHTML = snapshot.val();
        });
        // Upload image on to the image in result.html-------------------------------------------
        firebase.storage().ref('users/' + user.uid + '/Profile Picture').getDownloadURL()
          .then(function(url){
            var img = document.getElementById('user_profile_pic');
            img.setAttribute('src', url);
          })
          .catch(function(error){ console.log(error);  });  
      } else {
        // No user is signed in.
        console.log('No user is currently logged in');
      }

      // Get social media link--------------------------------------------------------------------
      var firebase_socialmedia = firebase.database().ref('users/' + user.uid +'/Social_media');
      firebase_socialmedia.child('/github').on('value', function(snapshot){
        if(snapshot.val() === ""){
          document.getElementById('github').style.display = 'none';
          console.log("Github link is empty");
        }
        else{
          console.log('Github link is: ' + snapshot.val());
        }
      });
      firebase_socialmedia.child('/facebook').on('value', function(snapshot){
        if(snapshot.val() === ""){
          document.getElementById('facebook').style.display = 'none';
          console.log("Facebook link is empty");
        }
        else{
          console.log('Facebook link is: ' + snapshot.val());
        }
      });
      firebase_socialmedia.child('/twitter').on('value', function(snapshot){
        if(snapshot.val() === ""){
          document.getElementById('twitter').style.display = 'none';
          console.log("Twitter link is empty");
        }
        else{
          console.log('Twitter link is: ' + snapshot.val());
        }
      });
      firebase_socialmedia.child('/instagram').on('value', function(snapshot){
        if(snapshot.val() === ""){
          document.getElementById('instagram').style.display = 'none';
          console.log("Instagram link is empty");
        }
        else{
          console.log('Instagram link is: ' + snapshot.val());
        }
      });
  });
})();
