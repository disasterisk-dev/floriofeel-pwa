// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyANtOHw7cyhZM0JC3545b1_3CkNA8Hzles",
    authDomain: "floriofeel-pwa.firebaseapp.com",
    projectId: "floriofeel-pwa",
    storageBucket: "floriofeel-pwa.appspot.com",
    messagingSenderId: "650188182160",
    appId: "1:650188182160:web:80f34729f36a4c299bfe15",
    measurementId: "G-3D0PVZ5JDN"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

//update firestore settings
db.settings({ timestampsInSnapshots: true });

//offline data
db.enablePersistence()
    .catch(err => {
        if (err.code = 'failed-precondition') {
            //multiple tabs open
            console.log('persistence failed')
        } else if (error.code == 'unimplemented') {
            //lack of browser support
            console.log('persistence is not available');
        }
    });

//real-time listener
db.collection('flowers').onSnapshot((snapshot) => {
    //console.log(snapshot.docChanges());
    snapshot.docChanges().forEach(change => {
        //console.log(change, change.doc.data(), change.doc.id);
        if (change.type === 'added') {
            //add data to page
            renderFlowerOption(change.doc.data(), change.doc.id);
        }
        if (change.type === 'removed') {
            //remove data from page
        }
    });
});