let number = document.querySelector("#number");
// on récupère le paramètre d'url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get("id");
const url = "http://localhost:3000/api/teddies/";
// on fait une requête get pour récupérer le produit
function callApi(url, product) {
  fetch(url + product)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      show(data);
      // on permet à l'utilisateur de rajouter le(s) produit(s) dans le panier, qui seront dans le localstorage
      document.querySelector(".cart").addEventListener("click", function(e) {
        e.preventDefault;
        if (localStorage.getItem(data._id)) {
          localStorage.setItem(data._id, (parseInt(localStorage.getItem(data._id)) + parseInt(number.value)).toString());
        } else {
          localStorage.setItem(data._id, number.value);
        }
        //on remplit la modale qui sera affichée
        document.querySelector(".modal-body__sum").innerText = data.name + " x" + number.value;
      });
    })
    .catch(err => console.error(err));
}

function show(data) {
  //on s'assure de l'existence de ces éléments et on change le contenu de la page en conséquence
  if (data.name && data.imageUrl && data.description && data.price && data.colors) {
    document.querySelector("h1").innerText = data.name;
    document.querySelector("img").src = data.imageUrl;
    document.querySelector(".product__description").innerText = data.description;
    document.querySelector(".product__price").innerHTML = (data.price / 100).toString() + "&euro;";
    document.querySelector(".modal-body__img").src = data.imageUrl;
    //permet d'avoir le dropdown des couleurs
    data.colors.forEach(e => {
      document.querySelector(".custom-select").insertAdjacentHTML("beforeend", "<option value='" + e + "'>" + e + "</option>");
    });
  } else {
    //sinon on affiche un 404
    document.querySelector(".container").innerHTML = "<h1 class='text-center'>404</h1><div class='text-center'><a class='btn btn-success text-white' href='index.html'>Retour à l'accueil</a></div> ";
  }
}

callApi(url, product);
