function sign_up(){
    var submit = document.getElementById('form');
    submit.addEventListener('submit',function(e){
        e.preventDefault();
        createAccount();
    });
}

function sign_in(){
    var submit = document.getElementById('form');
    submit.addEventListener('submit', function(e){
        e.preventDefault();
        sign_user_in();
    });
}

function update_Profile(){
    var submit = document.getElementById('form');
    submit.addEventListener('submit', function(e){
        e.preventDefault();
        update_user_profile();
    });
    window.location.href = 'result.html';
}