fetchProducts();

function fetchProducts() {
    fetch('https://picsum.photos/v2/list?page=2&limit=10')
    //fetch('https://jsonplaceholder.typicode.com/albums/2/photos')

        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            let container = document.getElementById('object-list');
            let containerFragment = document.createDocumentFragment();

            data.forEach(function(object) {
                buildCardsUsingDOMAPI(containerFragment, object);
            });

            container.appendChild(containerFragment);
            document.querySelector('.counter').innerHTML = "" + container.childElementCount;
    });
}

function buildCardsUsingDOMAPI(container, object) {
    let cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', 'object-card');

    let imgElement = document.createElement('img');
    imgElement.setAttribute('class', 'object-image');
    //imgElement.setAttribute('src', object.url);
    imgElement.setAttribute('src', object.download_url);

    let imgTitle = document.createElement('p');
    imgTitle.setAttribute('class', 'object-title');
    //imgTitle.appendChild(document.createTextNode(object.title));
    imgTitle.appendChild(document.createTextNode(object.author));

    cardDiv.appendChild(imgElement);
    cardDiv.appendChild(imgTitle);
    container.appendChild(cardDiv);

    cardDiv.addEventListener('click', function(event) {
        let cardDiv = event.currentTarget;
        let currOpacity = 1;

        let intervalID = setInterval(function() {
            cardDiv.style.opacity = currOpacity;
            currOpacity -= .2;
            if (currOpacity <= 0) {
                clearInterval(intervalID);
                document.querySelector('.counter').innerHTML = "" + (cardDiv.parentElement.childElementCount - 1);
                cardDiv.remove();
            }
        }, 75)
    });
}

// remove event listener?