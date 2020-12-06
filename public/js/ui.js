//render flower options on home screen
function renderFlowerOption(data, id) {

    const html = `
        <div class="col s4 l4" data-id="${id}">
            <div class="card" style="border-radius: 10px;">
                <a onclick="showName('${data.name}'), showDesc('${data.description}')">
                    <div class="card-content"><img style="opacity: 100%;" class="responsive-img" src="${data.image}" alt=""><span class="black-text hover-text"></span></div>
                </a>
            </div>
        </div>
    `;

    document.querySelector('.flowers').innerHTML += html;

};

function showName(name) {

    document.querySelector('.highlight-name').innerHTML = null;

    const html = `
        <h4>${name}</h4>
        <br>
    `

    document.querySelector('.highlight-name').innerHTML += html;
}

function showDesc(desc) {

    document.querySelector('.highlight-desc').innerHTML = null;

    const html = `
        <p>${desc}</p>
        <div class="col s8 l8 offset-l2 offset-s2">
            <br>
            <a id="proceed" href="./nudges.html" class="btn"
                style="border-radius: 100px; width: 100%; background-color: #403038;">
                <span style="font-size: x-small;">Proceed</span>
            </a>
        </div>
    `

    document.querySelector('.highlight-desc').innerHTML += html;
}