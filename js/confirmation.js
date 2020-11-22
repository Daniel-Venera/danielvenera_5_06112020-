let container = document.querySelector(".container");
i = 0;
const url = "http://localhost:3000/api/teddies";
//on fait une requête GET vers l'API pour récupérer tous les produits
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
  //pour chaque produit, s'il est présent dans le panier, on l'affiche
  data.forEach(e => {
    if (localStorage.getItem(e._id)) {
      hasProducts = true;
      container.insertAdjacentHTML("beforeend", "<p>" + e.name + " x" + localStorage.getItem(e._id) + "</p>");
      i += (parseInt(localStorage.getItem(e._id)) * parseInt(e.price)) / 100;
    }
  });
  //s'il n'y a pas de produits et qu'on est sur confirmation.html, on met un 404
  if (!hasProducts) {
    document.querySelector("h1").innerText = "404";
    container.insertAdjacentHTML("beforeend", "<div class='text-center'><a class='btn btn-success text-white' href='index.html'>Retour à l'accueil</a></div> ");
  } else {
    //on affiche l'ordrer ID
    container.insertAdjacentHTML("beforeend", "<p>Identifiant de commande: " + localStorage.getItem("orderId") + "</p>");
  }
  if (parseInt(i) > 0) {
    container.insertAdjacentHTML("beforeend", "<p>Prix total: " + i + "&euro;</p> <a class='btn btn-success text-white' href='index.html'>Retour à l'accueil</a> ");
  }
  //on supprime le panier à la fin du processus
  localStorage.clear();
}
callApi(url);
