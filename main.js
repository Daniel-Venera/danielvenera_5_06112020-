let log = console.log
let products = document.querySelector('.products')
fetch('http://localhost:3000/api/teddies')
.then(function(response) {
  return response.json();
})
.then(function(data) {
   show(data)
});
function show(data) {
    log(data)
    data.forEach(e => {
        var newCard = "<div class='col-md-4 mb-3'> <div class='card h-100'> <img class='card-img-top' src='" + e.imageUrl + "' alt='" + e.name + "'/> <div class='card-body text-center'> <h3 class='card-title'>" + e.name + "</h3> <p class='card-price'>" + (e.price / 100 ).toString() + "&euro;</p><a href='product.html?id=" + e._id +  "' class='btn btn-primary'>Voir</a> </div></div></div>"
        products.insertAdjacentHTML('beforeend', newCard)
    });
}
console.log('oui')