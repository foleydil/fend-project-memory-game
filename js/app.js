//FUNCTION DECLARATIONS

//Add open and show classes to a card when clicked
function showCard(event) {
  event.target.classList.add('open', 'show');
}

function checkForMatch(event){
  console.log(openCards);
  if (openCards[0] === openCards[1]) {
    console.log("it's a match");
  } else {
    console.log('not a match');
  }
  openCards = [];
}

function checkClickedCard(event) {
  cardName = "";
  if (event.target.nodeName === 'LI') {
    cardName = event.target.getAttribute('id');
  } else {
    cardName = event.target.parentElement.getAttribute('id');
  }
  openCards.push(cardName);
  if (openCards.length === 2) {
    checkForMatch(event);
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


//array of card IDs
let deck = [
  'diamond',
  'diamond',
  'paper-plane-o',
  'paper-plane-o',
  'anchor',
  'anchor',
  'bolt',
  'bolt',
  'cube',
  'cube',
  'leaf',
  'leaf',
  'bicycle',
  'bicycle',
  'bomb',
  'bomb',
];

//Shuffle deck array
shuffle(deck);

let deckUl = document.querySelector('.deck');

//   loop through deck array, create HTML and append to page
deck.forEach(function(card) {
  let currentCard = document.createElement('li');
  currentCard.classList.add('card');
  currentCard.setAttribute('id', card);
  let cardItem = document.createElement('i');
  cardItem.classList.add('fa', 'fa-' + card);
  currentCard.appendChild(cardItem);
  //   - add each card's HTML to the page
  deckUl.appendChild(currentCard);
});

//Set up event listener on each card
const cardsHTML = document.getElementsByClassName('card');
for (let i=0; i < cardsHTML.length; i++) {
  cardsHTML[i].addEventListener('click', function(event) {
    showCard(event);
    checkClickedCard(event);
  });
}

let openCards = [];


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
