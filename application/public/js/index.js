fetchProducts();

function fetchProducts() {
  fetch('https://jsonplaceholder.typicode.com/albums/2/photos')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let container = document.getElementById('object-list');
      let containerFragment = document.createDocumentFragment();

      data.forEach(function (object) {
        buildCardsUsingDOMAPI(containerFragment, object);
      });

      container.appendChild(containerFragment);
      // document.querySelector('.counter').innerHTML = "" + container.childElementCount;
    });
}

function buildCardsUsingDOMAPI(container, object) {
  let cardDiv = document.createElement('div');
  cardDiv.setAttribute('class', 'object-card');

  let imgElement = document.createElement('img');
  imgElement.setAttribute('class', 'object-image');
  imgElement.setAttribute('src', object.url);

  let imgTitle = document.createElement('p');
  imgTitle.setAttribute('class', 'object-title');
  imgTitle.appendChild(document.createTextNode(object.title));

  cardDiv.appendChild(imgElement);
  cardDiv.appendChild(imgTitle);
  container.appendChild(cardDiv);

  cardDiv.addEventListener('click', function (event) {
    let cardDiv = event.currentTarget;
    let currOpacity = 1;

    let intervalID = setInterval(function () {
      let container = document.getElementById('object-list');
      cardDiv.style.opacity = currOpacity;
      currOpacity -= .2;

      if (currOpacity <= 0) {
        clearInterval(intervalID);
        cardDiv.remove();
        document.querySelector('.counter').innerHTML = "" + container.childElementCount;
      }
    }, 75)
  });
}