let container = document.querySelector(".container");
i = 0;
const url = "http://localhost:3000/api/teddies";
function callApi(url) {
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      show(data);
    })
    .catch(err => console.error(err));
}

function show(data) {
  var hasProducts = false;
  data.forEach(e => {
    if (localStorage.getItem(e._id)) {
      hasProducts = true;

      container.insertAdjacentHTML("beforeend", "<p>" + e.name + " x" + localStorage.getItem(e._id) + "</p>");
      i += (parseInt(localStorage.getItem(e._id)) * parseInt(e.price)) / 100;
    }
  });
  if (!hasProducts) {
    document.querySelector("h1").innerText = "404";
    container.insertAdjacentHTML("beforeend", "<div class='text-center'><a class='btn btn-success text-white' href='index.html'>Retour à l'accueil</a></div> ");
  } else {
    container.insertAdjacentHTML("beforeend", "<p>Identifiant de commande: " + localStorage.getItem("orderId") + "</p>");
  }
  if (parseInt(i) > 0) {
    container.insertAdjacentHTML("beforeend", "<p>Prix total: " + i + "&euro;</p> <a class='btn btn-success text-white' href='index.html'>Retour à l'accueil</a> ");
  }

  localStorage.clear();
}

callApi(url);
