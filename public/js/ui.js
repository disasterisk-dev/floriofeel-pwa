//render flower options on home screen
const flowers = document.querySelector('.flowers');

const renderFlowerOption = (data, id) => {

    const html = `
        <div class="col s4 l4" data-id="${id}">
            <div id="Rose" class="card" style="border-radius: 10px;">
                <a onclick="highlight('${id}')">
                    <div class="card-content"><img style="opacity: 100%;" class="responsive-img" src="${data.image}" alt=""><span class="black-text hover-text"></span></div>
                </a>
            </div>
        </div>
    `;

    flowers.innerHTML += html;

};