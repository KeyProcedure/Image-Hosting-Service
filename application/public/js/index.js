fetchProducts();
let count = 0;

function fetchProducts() {
    fetch('https://picsum.photos/v2/list?page=2&limit=20')
    //fetch('https://jsonplaceholder.typicode.com/albums/2/photos')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            let container = document.getElementById('object-list');
            let containerFragment = document.createDocumentFragment();

            data.forEach(function(object) {
                buildCardsUsingDOMAPI(containerFragment, object);
                count++;
                document.querySelector('.counter').innerHTML = "" + count;
            });
            container.appendChild(containerFragment);
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
    cardDiv.style.opacity = '1';

    container.appendChild(cardDiv);
}

function removeElement(event) {
    event.currentTarget.removeEventListener('click', removeElement);
    let intervalID = setInterval(fade,50, event.currentTarget);
    event.currentTarget.setAttribute('interval', intervalID);
}

function fade(currentTarget) {
    currentTarget.style.opacity -= '.2';

    if (currentTarget.style.opacity <= '0') {
        clearInterval(currentTarget.getAttribute('interval'));
        currentTarget.remove();
        count--;
        document.querySelector('.counter').innerHTML = "" + count;
    }

}

// change email text box to red when input is invalid
// correct place to set initial opacity
// flex wrapper to keep footer on the bottom
// registration page list all requirements