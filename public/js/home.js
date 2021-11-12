let btnBackToTop = document.querySelector('[class="btn-back-to-top'),
    scrollDuration = 700;

window.onscroll = () => {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300)
        btnBackToTop.style.display = 'block';
    else
        btnBackToTop.style.display = 'none';
}

function backToTop() {
    (!window.requestAnimationFrame) ? window.scrollTo(0, 0): Util.scrollTo(0, scrollDuration);
}

// Function to filter pokemons container
filterSelection('all')
function filterSelection(filter) {
  let card;
  card = document.getElementsByClassName('filter-card');
  if (filter == 'all') filter = '';
  for (let i = 0; i < card.length; i++) {
    removeClass(card[i], 'show');
    if (card[i].className.indexOf(filter) > -1) addClass(card[i], 'show');
  }
}

function addClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(' ');
  arr2 = name.split(' ');
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += ' ' + arr2[i];}
  }
}

function removeClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(' ');
  arr2 = name.split(' ');
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(' ');
}

// Add active class to the current button (highlight it)
var filterContainer = document.getElementById('filter-container');
var btns = filterContainer.getElementsByClassName('btn');
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
