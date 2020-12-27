

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