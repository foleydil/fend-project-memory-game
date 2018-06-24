/*
 * Create a list that holds all of your cards
 */
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

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method belo
 */
shuffle(deck);
let deckUl = document.querySelector('.deck');

//   - loop through each card and create its HTML
deck.forEach(function(card) {
 let currentCard = document.createElement('li');
 currentCard.classList.add('card');
 currentCard.setAttribute('tag', card);
 let cardItem = document.createElement('i');
 cardItem.classList.add('fa', 'fa-' + card);
 currentCard.appendChild(cardItem);
//   - add each card's HTML to the page
 deckUl.appendChild(currentCard);
});

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

 //FUNCTION DECLARATIONS

 //Add open and show classes to a card when clicked
 function showCard(event) {
   let clickedCard = event.target;
   clickedCard.classList.add('open', 'show');
 }

//
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
   let clickedCard = event.target;
   openCards.push(clickedCard.classList);
   if (openCards.length === 2) {
     checkForMatch(event);
   }
 }

 deckUl.addEventListener('click', function(event){
   showCard(event);
   checkClickedCard(event);
 });

let openCards = [];
