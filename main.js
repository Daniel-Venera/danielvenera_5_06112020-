let log = console.log
let container = document.querySelector('.container')
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
        var newDiv = document.createElement("img");
        container.appendChild(newDiv)
        newDiv.src = e.imageUrl
    });   
}
