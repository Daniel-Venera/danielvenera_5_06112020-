let container = document.querySelector(".container");
i = 0;
container.insertAdjacentHTML("beforeend", "<p>Identifiant de commande: " + localStorage.getItem("orderId") + "</p>");
fetch("http://localhost:3000/api/teddies")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    show(data);
  });
function show(data) {
  data.forEach(e => {
    if (localStorage.getItem(e._id)) {
      console.log(localStorage.getItem(e._id));
      container.insertAdjacentHTML("beforeend", "<p>" + e.name + " x" + localStorage.getItem(e._id) + "</p>");
      i += (parseInt(localStorage.getItem(e._id)) * parseInt(e.price)) / 100;
    }
  });
  if (parseInt(i) > 0) {
    container.insertAdjacentHTML("beforeend", "<p>Prix total: " + i + "&euro;</p> <a class='btn btn-success text-white' href='index.html'>Retour à l'accueil</a> ");
  }
  console.log(localStorage);
  localStorage.clear();
}
