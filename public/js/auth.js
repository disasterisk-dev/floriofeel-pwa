var user;
//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        user = firebase.auth().currentUser;
        //console.log("user logged in: ", user.uid);
        sessionStorage.setItem("UID", user.uid);
        sessionStorage.setItem("UserEmail", user.email);
        //window.location.assign('./pages/home.html');
    } else {
        //console.log("user logged out");
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
            }).then(function () {
                //console.log("document created");
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
        .catch((error) => {

            var errorCode = error.code;

            var html = `<h5>Unknown error with login</h5>`;

            if (errorCode === 'auth/wrong-password') {

                html = `<h5>Incorrect password, please try again</h5>`;
            }
            else if (errorCode === 'auth/user-not-found') {

                html = `<h5>No user found with this email address</h5>`;
            }
            else if (errorCode === 'auth/invalid-email') {

                html = `<h5>The email address is invalid</h5>`;
            }
            else if (errorCode === 'auth/user-disabled') {

                html = `<h5>Your account has been temporarily disabled, if you believe this to be an error please contact Floriofeel support</h5>`;
            }

            document.getElementById("login-warning").innerHTML = html;
            document.getElementById("login-warning").style.display = 'block';

        });
});