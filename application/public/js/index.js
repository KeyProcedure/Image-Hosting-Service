fetchProducts();
let count = 0;

function fetchProducts() {
    fetch("https://picsum.photos/v2/list?page=2&limit=100")
    //fetch("https://jsonplaceholder.typicode.com/albums/2/photos")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            let container = document.getElementById('object-list');
            data.forEach(function(object) {
                buildCardsUsingDOMAPI(container, object);
                count++;
                document.querySelector('.counter').innerHTML = "" + count;
            });
    });
}

function buildCardsUsingDOMAPI(container, object) {
    let cardDiv = document.createElement('div');
    cardDiv.addEventListener('click', removeElement);
    cardDiv.setAttribute('class', 'object-card');

    let imgElement = document.createElement('img');
    imgElement.setAttribute('src', object.download_url);
    //imgElement.setAttribute('src', object.url);
    imgElement.setAttribute('class', 'object-image');

    let imgTitle = document.createElement('p');
    imgTitle.setAttribute('class', 'object-title');
    imgTitle.appendChild(document.createTextNode(object.author));
    //imgTitle.appendChild(document.createTextNode(object.title));
    cardDiv.appendChild(imgElement);
    cardDiv.appendChild(imgTitle);

    container.appendChild(cardDiv);
}

function removeElement(event) {
    event.currentTarget.removeEventListener('click', event);
    event.currentTarget.remove();
    count--;
    document.querySelector('.counter').innerHTML = "" + count;
}

function fadeOut(event) {

}

//fade out
//removed from DOM?
//clear interval
//3 items per row if page shrunk