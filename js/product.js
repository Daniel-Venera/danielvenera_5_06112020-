let log = console.log;
let number = document.querySelector("#number");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get("id");
fetch("http://localhost:3000/api/teddies/" + product)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    show(data);
    document.querySelector(".cart").addEventListener("click", function(e) {
      e.preventDefault;
      // var new_key = 'oui'
      if (localStorage.getItem(data._id)) {
        localStorage.setItem(data._id, (parseInt(localStorage.getItem(data._id)) + parseInt(number.value)).toString());
      } else {
        localStorage.setItem(data._id, number.value);
      }
      var val = localStorage.getItem(data._id);
      document.querySelector(".modal-body__sum").innerText = data.name + " x" + number.value;
      log(val);
    });
  });
function show(data) {
  document.querySelector("h1").innerText = data.name;
  document.querySelector("img").src = data.imageUrl;
  document.querySelector(".product__description").innerText = data.description;
  document.querySelector(".product__price").innerHTML = (data.price / 100).toString() + "&euro;";
  document.querySelector(".modal-body__img").src = data.imageUrl;
  log(number.value);
  data.colors.forEach(e => {
    document.querySelector(".custom-select").insertAdjacentHTML("beforeend", "<option value='" + e + "'>" + e + "</option>");
  });
}
