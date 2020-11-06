let log = console.log
let number = document.querySelector('#number')
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('id')
fetch('http://localhost:3000/api/teddies/' + product)
.then(function(response) {
  return response.json();
})
.then(function(data) {
   show(data)
  //  document.querySelector('.form-group').addEventListener('submit', function(e) {
  //   e.preventDefault
  //    log('oui')
  //   if (localStorage.getItem(data.name)) {
  //     localStorage.setItem(data.name, (parseInt(localStorage.getItem(data.name)) + 1).toString() );
  //   } else {
  //     localStorage.setItem(data.name, 1)
  //   }
  //   var val = localStorage.getItem(data.name);
  //   log(val)
  //  })
   document.querySelector('.cart').addEventListener('click', function(e){
    e.preventDefault
    // var new_key = 'oui'
    if (localStorage.getItem(data.name)  ) {
      localStorage.setItem(data.name, (parseInt(localStorage.getItem(data.name)) + parseInt(number.value)).toString() );
    } else {
      localStorage.setItem(data.name, number.value)
    }
    var val = localStorage.getItem(data.name);
    log(val)
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