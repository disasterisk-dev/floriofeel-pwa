document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
});

window.onload = function() {

    auth.onAuthStateChanged(user => {
        if(user){
            console.log("user logged in: ", user);
            window.location.assign('./pages/home.html');
        } else {
            console.log("user logged out");
        }
    });
};