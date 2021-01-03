

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

function SaveData() {

    var d = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var minutes = AddZeroes(d.getMinutes());
    var hours = AddZeroes(d.getHours());

    const entry = {
        name: sessionStorage.getItem("name"),
        emotion: sessionStorage.getItem("emotion"),
        image: sessionStorage.getItem("image"),
        day: d.getDate(),
        month: months[d.getMonth()],
        year: d.getFullYear(),
        time: hours + ":" + minutes,
        timestamp: -d.getTime()
    };

    db.collection("histories").doc(sessionStorage.getItem("UID")).collection("history").add(entry).then(function () {
        console.log("added entry!");
    });
}

function SaveNote(idRef) {

    console.log("form-" + idRef);
    var form = document.getElementById('form-' + idRef);

    var noteValue = document.getElementById(idRef + "-textarea").value;

    console.log("note: ", noteValue);
    db.collection("histories").doc(sessionStorage.getItem("UID")).collection("history").doc(idRef).update({
        note: noteValue
    });

    var html = `
        <div class="col s12 l12">
            <p id="${idRef}-currentNote" style="font-size: medium;">${noteValue}</p>
            <br>
        </div>
        <div>
            <a style="background-color: #403038;" class="btn-floating" onclick="NoteEdit('${idRef}')" id="${idRef}-edit">
                <i class="material-icons">create</i>
            </a>
            <a class="btn-floating red darken-4 white-text" id="${idRef}-delete" onclick="DeleteEntry('${idRef}')">
                <i class="material-icons">delete</i>
            </a>
        </div>
    `;

    document.querySelector('.' + idRef + '-note').innerHTML = html;
}

function DeleteEntry(idRef) {

    db.collection("histories").doc(sessionStorage.getItem("UID")).collection("history").doc(idRef).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });

    window.location.reload();
}

function AddZeroes(num) {

    if(num.toString().length === 1){

        if (num < 10) {
            return "0" + num;
        }
        else {
            return num + "0";
        }

    }
    else{
        return num;
    }
}