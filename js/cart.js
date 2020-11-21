let container = document.querySelector(".container");
//compteur
let i = 0;
//array des produits
let products = [];
const url = "http://localhost:3000/api/teddies";
//on fait une requête get pour récupérer tous les produits
function callApiGet(url) {
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      show(data);
    })
    .catch(err => console.error(err));
}

//on affiche les produits qui sont dans le panier
function show(data) {
  products = [];
  data.forEach(e => {
    //s'il existe dans le panier, on le rajoute à l'array products et on l'affiche
    if (localStorage.getItem(e._id)) {
      products.push(e._id);
      container.insertAdjacentHTML("beforeend", "<div class='mb-3'><img class='card-img-top w-25 ' src='" + e.imageUrl + "' alt='" + e.name + "'/>" + "<span class='pl-3'>" + e.name + " x" + localStorage.getItem(e._id) + "</span></div>");
      i += (parseInt(localStorage.getItem(e._id)) * parseInt(e.price)) / 100;
    }
  });
  // s'il existe des produits, alors on affiche le prix et le bouton de suppression
  if (parseInt(i) > 0) {
    container.insertAdjacentHTML("beforeend", "<p>Prix total :  " + i + "&euro;</p> <a class='btn btn-danger cart text-white' onclick='suppressCart()' role='button'>Supprimer votre panier</a> ");
    document.querySelector("#form").classList.remove("d-none");
  } else {
    //sinon on informe qu'il n'y a pas de produits
    container.insertAdjacentHTML("beforeend", "<p>Vous n'avez pas d'articles dans votre panier</p>");
  }
}
// permet de supprimer le cart (et d'enlever le formulaire)
function suppressCart() {
  localStorage.clear();
  container.innerHTML = "<p>Vous n'avez pas d'articles dans votre panier</p>";
  document.querySelector("#form").classList.add("d-none");
}

//requête POST pour récupérer le numéro de l'order
function callApiPost(urlOrder, options) {
  fetch(urlOrder, options)
    .then(response => response.json())
    .then(response => {
      //on met le numéro dans le localstorage
      localStorage.setItem("orderId", response.orderId);
      //on redirige vers confirmations
      window.location.replace("./confirmation.html");
    })
    .catch(err => console.error(err));
}

// a la soumission on s'assure que les champs sont valides

var checkValid = true;
document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();
  checkValid = true;
  //on récupère les valeurs des inputs
  var firstName = document.querySelector("#firstName").value;
  var lastName = document.querySelector("#lastName").value;
  var address = document.querySelector("#address").value;
  var city = document.querySelector("#city").value;
  var email = document.querySelector("#email").value;
  // on les checke
  checkInput("Prénom", firstName, "text");
  checkInput("Nom", lastName, "text");
  checkInput("Adresse", address, "address");
  checkInput("Ville", city, "text");
  checkInput("Mail", email, "mail");
  // s'ils sont valides, on créé un objet avec contact et les produits du panier
  if (checkValid) {
    let contact = { firstName: firstName, lastName: lastName, address: address, city: city, email: email };
    let objectToSend = { contact, products };
    localStorage.setItem("objectToSend", JSON.stringify(objectToSend));
    //on renseigne les options pour le POST
    const options = {
      method: "post",
      body: JSON.stringify(objectToSend),
      headers: {
        "Content-Type": "application/json"
      }
    };
    const urlOrder = "http://localhost:3000/api/teddies/order";
    //on appelle la fonction POST
    callApiPost(urlOrder, options);
  }
});

// vérifie les valeurs des inputs selon leur type
function checkInput(field, value, type) {
  if (type == "text") {
    if (!/^([A-Za-z])/.test(value)) {
      checkValid = false;
      alert(value + " n'est pas une valeur valide pour le champ " + field);
    }
  } else if (type == "mail") {
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      checkValid = false;
      alert(value + " n'est pas une valeur valide pour le champ " + field);
    }
  } else {
    if (!/^([A-Z0-9a-z])/.test(value)) {
      checkValid = false;
      alert(value + " n'est pas une valeur valide pour le champ " + field);
    }
  }
}

callApiGet(url);
