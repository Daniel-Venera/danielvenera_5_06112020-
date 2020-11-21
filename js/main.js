let products = document.querySelector(".products");
const urlApi = "http://localhost:3000/api/teddies";
//méthode GET de l'API pour récupérer tous les produits d'une url donnée
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
// pour chaque produit, on l'affiche dans une card
function show(data) {
  data.forEach(e => {
    // on s'assure que tous les éléments qui seront affichés existent
    if (e.imageUrl && e.name && e._id && e.price) {
      var newCard = "<div class='col-md-4 mb-3'> <div class='card h-100'> <img class='card-img-top' src='" + e.imageUrl + "' alt='" + e.name + "'/> <div class='card-body text-center'> <h3 class='card-title'>" + e.name + "</h3> <p class='card-price'>" + (e.price / 100).toString() + "&euro;</p><a href='product.html?id=" + e._id + "' class='btn btn-primary'>Voir</a> </div></div></div>";
      products.insertAdjacentHTML("beforeend", newCard);
    }
  });
}
callApi(urlApi);
