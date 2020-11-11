let container = document.querySelector(".container");
let i = 0;
fetch("http://localhost:3000/api/teddies")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    show(data);
  });
function show(data) {
  data.forEach(e => {
    if (localStorage.getItem(e.name)) {
      console.log(localStorage.getItem(e.name));
      container.insertAdjacentHTML("beforeend", "<p>" + e.name + " x" + localStorage.getItem(e.name) + "</p>");
      i += (parseInt(localStorage.getItem(e.name)) * parseInt(e.price)) / 100;
    }
  });
  console.log(i);
  if (parseInt(i) > 0) {
    container.insertAdjacentHTML("beforeend", "<p>" + i + "&euro;</p> <a class='btn btn-danger cart text-white' onclick='suppressCart()' role='button'>Supprimer votre panier</a> ");
  } else {
    container.insertAdjacentHTML("beforeend", "<p>Vous n'avez pas d'articles dans votre panier</p>");
  }
}
function suppressCart() {
  localStorage.clear();
  container.innerHTML = "<p>Vous n'avez pas d'articles dans votre panier</p>";
}
function testPost() {
  fetch("http://localhost:3000/api/teddies/order", {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ a: 7, str: "Some string: &=&" })
  })
    .then(res => res.json())
    .then(res => console.log(res));
}
