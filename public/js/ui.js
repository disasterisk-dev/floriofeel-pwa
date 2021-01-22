//render flower options on home screen
function renderFlowerOption(data, id) {

    const html = `
        <div class="col s4 l4">
            <div class="card" style="border-radius: 10px;" id="flower-${id}">
                <a onclick="showName('${id}','${data.name}','${data.description}','${data.emotion}','${data.clicks}','${data.latin}','${data.image}','${data.info}');">
                    <div class="card-content"><img style="opacity: 100%;" class="responsive-img" src="${data.image}" alt=""></div>
                </a>
            </div>
        </div>
    `;

    document.querySelector('.flowers').innerHTML += html;

}

function showName(id, name, desc, emotion, clicks, latin, image, info) {

    document.querySelector('.highlight').innerHTML = null;

    const html = `
        <h5>${name}</h5>
        <p>${desc}</p>
        <div class="col s8 l8 offset-l2 offset-s2">
            <br>
            <a id="proceed" href="./nudges.html" onclick="SaveData();" class="btn"
                style="-webkit-border-radius: 100px; -moz-border-radius: 100px; border-radius: 100px; width: 100%; background-color: #403038;">
                <span>Next</span>
            </a>
        </div>
    `;

    if(sessionStorage.getItem("id")){
        document.querySelector("#flower-" + sessionStorage.getItem("id")).style.border = "none";
    }
    
    document.querySelector("#flower-" + id).style.border = "solid 3px #CA5B92";

    sessionStorage.setItem("id", id)
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("emotion", emotion);
    sessionStorage.setItem("clicks", clicks);
    sessionStorage.setItem("latin", latin);
    sessionStorage.setItem("image", image);
    sessionStorage.setItem("info", info);

    document.querySelector('.highlight').innerHTML += html;
}


function populateNudges() {

    var html = `
        <h5>You are not alone...</h5>
        <h1>${sessionStorage.getItem("clicks")}</h1>
        <h5>... other Floriofeel ${sessionStorage.getItem("clicks") == "1" ? "user" : "users"} chose the ${sessionStorage.getItem("name")} today.</h5>

        <br>

        <div class="row">
            <div class="col s12 l12">
                <div class="card" style="border-radius: 10px;">
                    <div class="card-content">
                        <h5>If you're feeling ${sessionStorage.getItem("emotion")}, consider...</h5>

                        <ul class="list">
                        </ul>
                    </div>
                </div>
            </div>

            <div class="col s8 l8 offset-l2 offset-s2">
                <br>
                <a href="./info.html" class="btn"
                    style="border-radius: 100px; width: 100%; background-color: #403038;"><span>About the ${sessionStorage.getItem("name")}</span></a>
            </div>

            <div class="col s8 l8 offset-l2 offset-s2">
                <br>
                <a href="./history.html" class="btn"
                    style="border-radius: 100px; width: 100%; background-color: #403038;"><span>View My History</span></a>
            </div>
        </div>
    `;

    document.querySelector('.nudges').innerHTML += html;


    var clicks = Math.floor(sessionStorage.getItem("clicks"));
    clicks += 1;

    db.collection('flowers').doc(sessionStorage.getItem("id")).update({
        clicks: clicks
    });

}

function populateInfo() {

    const html = `
        <div class="row">
            <div class="col s4 l4">
                <img class="responsive-img" src="${sessionStorage.getItem("image")}" alt="">
            </div>
            <div class="col s8 l8 center">
                <h4>${sessionStorage.getItem("name")}</h4>
                <h6><i>${sessionStorage.getItem("latin")}</i></h6>
            </div>
        </div>
        <div class="row">
                <div class="col s12 l12">
                    <div class="card" style="border-radius: 10px;">
                        <div class="card-content info-body">
                            <p>${sessionStorage.getItem("info")}</p>
                        </div>
                    </div>
                </div>
            </div>
        
    `;

    document.querySelector('.info').innerHTML += html
}

function populateHistory(data, id) {

    var html = `
        <div class="col s12 l12">
            <a href="#${id}" class="modal-trigger black-text" style="background-color: #403038;">
                <div class="card" id="${id}" style="border-radius: 10px;">
                    <div class="card-content">
                        <div class="row">
                            <div class="col s4 l4">
                                <img class="responsive-img" src="${data.image}" alt="">
                            </div>
                            <div class="col s8 l8 right-align">
                                <span style="font-size: x-large;">${data.name} </span><br>
                                <span style="font-size: large;">(${data.emotion})</span>
                                <br><br>
                                `;

                                if(data.note){
                                    html += `
                                    <i id="noteIcon-${id}" class="material-icons right" style="color: #401D2E">note</i>
                                    `;
                                } else {
                                    html += `
                                    <i id="noteIcon-${id}" class="material-icons right" style="color: #e0e0e0">note</i>
                                    `;
                                }

                                html += `
                                
                            </div>
                        </div>
                        <p style="font-size: small;" class="right">${data.time} - ${data.day} ${data.month} ${data.year}</p>
                    </div>   
                </div>
            </a>

        </div>
    `;

    document.querySelector('.history').innerHTML += html;

    html = `
        <div class="modal" id="${id}" style="border-radius: 10px;">
            <div class="container">
                <br>
                <div class="row">
                    <div class="col s3 l3">
                        <img class="responsive-img" src="${data.image}" alt="">
                    </div>
                    <div class="col s9 l9">
                        <span style="font-size: x-large;">${data.name}</span>
                        <span style="font-size: large;"> (${data.emotion})</span><br>
                        <span style="font-size: small;"><i>${data.day} ${data.month} ${data.year}</i></span>
                    </div>
                </div>
                <br>
                <div class="row ${id}-note">
    `;

    if (data.note) {
        html += `
            <div class="col s12 l12">
                <p id="${id}-currentNote" style="font-size: medium;">${data.note}</p>
                <br>
            </div>
            <div>
                <a style="background-color: #403038;" class="btn-floating" onclick="NoteEdit('${id}')" id="${id}-edit">
                    <i class="material-icons">create</i>
                </a>
        `;

        // document.getElementById(id + "-edit").style.display = block;
        // document.getElementById(id + "-save").style.display = none;

    } else {
        html += `
        <div class="col s12 l12">
            <form id="form-${id}">
                <div class="input-field">
                    <textarea class="materialize-textarea" id="${id}-textarea" type="text" data-length="250" onKeyPress="if(this.value.length==250) return false;"></textarea>
                    <label for="${id}-textarea">Add a note about this feeling</label>
                </div>
            </form>
        </div>
        <div>
                <a style="background-color: #403038;" class="btn-floating" onclick="SaveNote('${id}')" id="${id}-save">
                    <i class="material-icons">save</i>
                </a>
        `;

        // document.getElementById(id + "-edit").style.display = none;
        // document.getElementById(id + "-save").style.display = block;
    }

    html += `
            
                <a class="btn-floating red darken-4 white-text" id="${id}-delete" onclick="DeleteEntry('${id}')">
                <i class="material-icons">delete</i>
                </a>
                
            </div>
        </div>
    `;

    document.querySelector('.modals').innerHTML += html;
}

function NoteEdit(id) {

    var target = document.getElementById(id + "-currentNote");
    var currentNote = target.childNodes[0].nodeValue;

    //console.log(currentNote);

    const html = `
        <div class="col s12 l12">
            <form id="form-${id}">
                <div class="input-field">
                    <textarea class="materialize-textarea" id="${id}-textarea" type="text" data-length="250" onKeyPress="if(this.value.length==250) return false;"></textarea>
                    <label for="${id}-textarea" class="active">Edit your Note...</label>
                </div>
            </form>
        </div>
        <div>
            <a style="background-color: #403038;" class="btn-floating" onclick="SaveNote('${id}')" id="${id}-save">
                <i class="material-icons">save</i>
            </a>
            <a class="btn-floating red darken-4 white-text" id="${id}-delete" onclick="DeleteEntry('${id}')">
                <i class="material-icons">delete</i>
            </a>
                
            </div>
        </div>
    `;

    document.querySelector('.' + id + "-note").innerHTML = html;


    $('#' + id + '-textarea').val(currentNote);
    M.textareaAutoResize($('#' + id + '-textarea'));
    $(function () {
        $('#' + id + '-textarea').characterCounter();
    });
}

function EnableDarkMode() {

    document.querySelector("body").style.backgroundColor = "#3f3c3c";
    document.querySelector("body").style.color = "#fff";

    document.querySelector(".modal").style.backgroundColor = "#401D2E";

    document.querySelector(".card").style.backgroundColor = "#401D2E";
    document.querySelector(".card").style.color = "#fff";

    document.querySelector("textarea").style.color = "#fff";

    localStorage.setItem("DarkMode", "on");
}

function DisableDarkMode() {

    document.querySelector("body").style.backgroundColor = "#e0e0e0";
    document.querySelector("body").style.color = "#000";

    document.querySelector(".modal").style.backgroundColor = "#fff";

    document.querySelector(".card").style.backgroundColor = "#fff";
    document.querySelector(".card").style.color = "#000";

    document.querySelector("textarea").style.color = "#000";

    localStorage.setItem("DarkMode", null);
}

