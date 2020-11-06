let container = document.querySelector('.container')
let i = 0
fetch('http://localhost:3000/api/teddies')
.then(function(response) {
  return response.json();
})
.then(function(data) {
   show(data)
});
function show(data){
    data.forEach(e => {
        if (localStorage.getItem(e.name)) {
            console.log(localStorage.getItem(e.name))
            container.insertAdjacentHTML('beforeend', "<p>" + e.name + " x" + localStorage.getItem(e.name) + "</p>")
            i+= parseInt(localStorage.getItem(e.name)) * parseInt(e.price)/100
        }
    });
    console.log(i)
    if (parseInt(i) > 0) {
        container.insertAdjacentHTML('beforeend', "<p>" + i + "&euro;</p>")
    } else {
        container.insertAdjacentHTML('beforeend', "<p>Vous n'avez pas d'articles dans votre panier</p>")
    }
}
