let log = console.log
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('id')
fetch('http://localhost:3000/api/teddies/' + product)
.then(function(response) {
  return response.json();
})
.then(function(data) {
   show(data)
   document.querySelector('.cart').addEventListener('click', function(e){
    e.preventDefault
    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/api/teddies/order");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify({ x: 5, y: 6 }));
  })
});
function show(data) {
  document.querySelector('h1').innerText = data.name
  document.querySelector('img').src = data.imageUrl
  document.querySelector('.product__description').innerText = data.description
  document.querySelector('.product__price').innerHTML = (data.price / 100 ).toString() + "&euro;"
  data.colors.forEach(e => {
              document.querySelector('.custom-select').insertAdjacentHTML('beforeend', "<option value='" +  e +  "'>" + e + "</option>")
    });
}
