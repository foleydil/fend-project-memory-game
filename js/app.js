//FUNCTION DECLARATIONS

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  };

  return array;
}

// loop through deck array, create HTML and append to page
function buildDeckGrid(deck) {
  let deckUl = document.querySelector('.deck');
  deck.forEach(function(card) {
    let currentCard = document.createElement('li');
    currentCard.classList.add('card', card);
    let cardItem = document.createElement('i');
    cardItem.classList.add('fa', 'fa-' + card);
    currentCard.appendChild(cardItem);
    //  Add each card's HTML to the page
    deckUl.appendChild(currentCard);
  });
}

//Set up event listener on each card
function addCardListeners() {
  const cardsHTML = document.getElementsByClassName('card');
  for (let i=0; i < cardsHTML.length; i++) {
    cardsHTML[i].addEventListener('click', function(event) {
      let card = null;
      if (event.target.nodeName === 'LI') {
        card = event.target;
      } else {
        card = event.target.parentElement;
      };
      if (openCards.length !== 2
        && !card.classList.contains('match')
        && card !== openCards[0]) {
          showCard(card);
          addToOpenCards(card);
        };
      });
    };
  }

//add listener to reset entire game when refresh button is clicked
function addRefreshListener() {
  let resetButton = document.getElementById('refresh');
  resetButton.addEventListener('click', function() {
    resetGame();
  });
}

/*
**Helper function for addCardListeners()
**Adds open and show classes to a card when clicked
*/
function showCard(c) {
  c.classList.add('open', 'show');
}

/*
**Helper function for addCardListeners()
**Adds clicked card to list of cards selected, and if 2 card are selected,
**checks for match
*/
function addToOpenCards(c) {
  openCards.push(c);
  if (openCards.length === 2) {
    checkForMatch(c);
  };
}

/*
**Helper function for AddtoOpenCards()
**If two unmatched cards are showing, check for a match using class name,
**and change class from 'open' to 'match' if matched, otherwise clears array
**of current selected cards. also updates the move count.
*/
function checkForMatch(event){
  if (openCards[0].classList[1] == openCards[1].classList[1]) {
    openCards[0].classList.remove('open', 'show');
    openCards[0].classList.add('match');
    openCards[1].classList.remove('open', 'show');
    openCards[1].classList.add('match');
    openCards = [];
    matchCount += 1;
    incrementMoveCount();
  } else {
    incrementMoveCount();
    setTimeout(function(){ resetCards() }, 2000);
  };
}

/*
**Helper function for checkForMatch
**Resets cards in openCards to be flipped down
*/
function resetCards() {
  for (let c of openCards) {
    c.classList.remove('open','show');
  };
  openCards = [];
}

/*
**Helper function for checkForMatch
**Increment move count, check if stars should be removed, and redisplay
*/
function incrementMoveCount() {
  moveCount += 1;
  document.getElementById('moveCount').innerText = moveCount;
  if (moveCount === 13 || moveCount === 20) {
    removeStar();
  }
}

/*
**Helper function for incrementMoveCount
**Remove Star from score section
*/
function removeStar() {
  document.getElementById('stars').lastElementChild.remove();
}

//Resets game
function resetGame() {
  //reset stars to 3
  resetStars();

  //reset move count to 0
  moveCount = 0;
  document.getElementById('moveCount').innerText = moveCount;

  //clear any card elements from openCards array
  openCards = [];

  //clear existing deck
  let deckUl = document.querySelector('.deck');
  deckUl.innerHTML = null;

  //shuffle deck, display on page, and add appropriate listeners
  shuffle(deck);
  buildDeckGrid(deck);
  addCardListeners();
  addRefreshListener();
};

/*
**helper function for resetGame()
**resets stars and moveCount to 0 moves and 3 starsHTML*/
function resetStars() {
let starsSection = document.getElementById('stars');
starsSection.innerHTML = null;
for (i=0; i<3; i++) {
  let starItem = document.createElement('i');
  starItem.classList.add('fa', 'fa-star');
  let singleStarHTML = document.createElement('li');
  singleStarHTML.appendChild(starItem);
  starsSection.appendChild(singleStarHTML);
  };
}


//GLOBAL VARIABLES

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

//array of DOM element of unmatched cards that are face-up
let openCards = [];

//Counter of moves
let moveCount = 0;

//counter of sucessful matches. When counter reaches 8, user has won!
let matchCount = 0;

//SCRIPTS TO RUN ON LOAD

shuffle(deck);
buildDeckGrid(deck);
addCardListeners();
addRefreshListener();

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
