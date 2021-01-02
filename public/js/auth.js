var user;
//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        user = firebase.auth().currentUser;
        console.log("user logged in: ", user.uid);
        sessionStorage.setItem("UID", user.uid);
        sessionStorage.setItem("UserEmail", user.email);
        //window.location.assign('./pages/home.html');
    } else {
        console.log("user logged out");
    }
});

//sign up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = signupForm['signup-email'].value;
    const pass = signupForm['signup-password'].value;
    const passConf = signupForm['signup-passwordConfirm'].value;

    //console.log(email, pass, passConf);

    //sign up user
    if (pass === passConf) {
        document.getElementById("pass-warning").style.display = 'none';
        auth.createUserWithEmailAndPassword(email, pass).then(cred => {
            const modal = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            signupForm.reset();
            
            
            user = firebase.auth().currentUser;

            db.collection("histories").doc(user.uid).set({
                email: user.email
            }).then(function() {
                console.log("document created");
            })

            //send verification email
            user.sendEmailVerification().then(function () {
                // Email sent.
            }).catch(function (error) {
                // An error happened.
            });

            //window.location.assign('./pages/home.html');
        });
    }
    else {
        document.getElementById("pass-warning").style.display = 'block';
    }
});

//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        //close login modal
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
        window.location.assign('./pages/home.html');
    })
});