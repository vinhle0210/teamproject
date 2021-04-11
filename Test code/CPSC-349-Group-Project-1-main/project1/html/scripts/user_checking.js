(function(){
    logout_btn = document.getElementById('logout');
    update_btn = document.getElementById('update-profile');
    user_email_display = document.getElementById('user_email');
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log(user);
          user_email_display.innerHTML = "Logged in as " + user.email;
        } 
        else {
            logout_btn.style.display = 'none';
            update_btn.style.display = 'none';
            user_email_display.style.display = 'none';
        }
      });
})();