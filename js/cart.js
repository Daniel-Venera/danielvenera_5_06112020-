let container = document.querySelector(".container");
let i = 0;
let products = [];
let log = console.log;
fetch("http://localhost:3000/api/teddies")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    show(data);
  });
function show(data) {
  products = [];
  data.forEach(e => {
    if (localStorage.getItem(e._id)) {
      console.log(localStorage.getItem(e._id));
      products.push(e._id);
      container.insertAdjacentHTML("beforeend", "<p>" + e.name + " x" + localStorage.getItem(e._id) + "</p>");
      i += (parseInt(localStorage.getItem(e._id)) * parseInt(e.price)) / 100;
    }
  });
  log("products: " + products);
  console.log(i);
  if (parseInt(i) > 0) {
    container.insertAdjacentHTML("beforeend", "<p>" + i + "&euro;</p> <a class='btn btn-danger cart text-white' onclick='suppressCart()' role='button'>Supprimer votre panier</a> ");
    // log(document.querySelector("#form"));
    document.querySelector("#form").classList.remove("d-none");
  } else {
    container.insertAdjacentHTML("beforeend", "<p>Vous n'avez pas d'articles dans votre panier</p>");
  }
  console.log(localStorage);
}
function suppressCart() {
  localStorage.clear();
  container.innerHTML = "<p>Vous n'avez pas d'articles dans votre panier</p>";
  document.querySelector("#form").classList.add("d-none");
}
document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();
  // document.querySelector("button").addEventListener("click", function(e) {
  var firstName = document.querySelector("#firstName").value;
  var lastName = document.querySelector("#lastName").value;
  var address = document.querySelector("#address").value;
  var city = document.querySelector("#city").value;
  var email = document.querySelector("#email").value;
  let contact = { firstName: firstName, lastName: lastName, address: address, city: city, email: email };
  let objectToSend = { contact, products };
  localStorage.setItem("objectToSend", JSON.stringify(objectToSend));
  const options = {
    method: "post",
    body: JSON.stringify(objectToSend),
    headers: {
      "Content-Type": "application/json"
    }
  };
  fetch("http://localhost:3000/api/teddies/order", options)
    .then(response => response.json())
    .then(response => {
      log(response);
      localStorage.setItem("orderId", response.orderId);
      window.location.replace("./confirmation.html");
    })
    .catch(err => console.error(err));
});
