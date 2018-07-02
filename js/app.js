//GLOBAL VARIABLES

//array of card IDs
let deck = [
  'diamond',
  'paper-plane-o',
  'anchor',
  'bolt',
  'cube',
  'leaf',
  'bicycle',
  'bomb',
];
deck = [...deck, ...deck]

//array of DOM element of unmatched cards that are face-up
let openCards = [];

//Counter of moves
let moveCount = 0;

//counter of sucessful matches. When counter reaches 8, user has won!
let matchCount = 0;

//Timer to execute timing function & run function to update display each second
let timer =  0;
let timeCount = 0;
let timerRunning = false;

//FUNCTION DECLARATIONS

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

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
  for (let cardName of deck) {
    let currentCard = document.createElement('li');
    currentCard.classList.add('card', cardName);
    let cardItem = document.createElement('i');
    cardItem.classList.add('fa', 'fa-' + cardName);
    currentCard.appendChild(cardItem);
    //  Add each card's HTML to the page
    deckUl.appendChild(currentCard);
  };
}

//Set up event listener on each card
function addCardListeners() {
  const cardsHTML = document.getElementsByClassName('card');
  for (let card of cardsHTML) {
    card.addEventListener('click', function(event) {
      let c = null;
      if (event.target.nodeName === 'LI') {
        c = event.target;
      } else {
        c = event.target.parentElement;
      };
      if (openCards.length !== 2
        && !c.classList.contains('match')
        && c !== openCards[0]) {
          showCard(c);
          addToOpenCards(c);
          if (!timerRunning) {
            timer = setInterval(timerFunc, 1000);
            timerRunning = true;
          };
        };
      });
    };
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
  openCards.length === 2 && checkForMatch(c);
}

/*
**Helper function for AddtoOpenCards()
**If two unmatched cards are showing, check for a match using class name,
**and change class from 'open' to 'match' if matched, otherwise clears array
**of current selected cards. also updates the move count.
*/
function checkForMatch(event){
  if (openCards[0].classList[1] == openCards[1].classList[1]) {
    openCards[0].classList.add('match');
    openCards[1].classList.add('match');
    openCards = [];
    matchCount += 1;
    incrementMoveCount();
    checkMatchCount();
  } else {
    incrementMoveCount();
    openCards[0].classList.add('noMatch');
    openCards[0].classList.remove('open');
    openCards[1].classList.add('noMatch');
    openCards[1].classList.remove('open');
    setTimeout(function(){ resetCards() }, 1000);
  };
}

/*
**Helper function for checkForMatch
**Resets cards in openCards to be flipped down
*/
function resetCards() {
  for (let c of openCards) {
    c.classList.remove('open','show', 'noMatch');
  };
  openCards = [];
}

/*
**helper function for checkForMatch
**checks if user has matched all sets of cards and displays final modal if done
*/
function checkMatchCount() {
  if (matchCount === 8) {
    clearInterval(timer);
    displayModal();
  };
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

//add listener to reset entire game when refresh button is clicked
function addRefreshListener() {
  let resetButton = document.getElementById('refresh');
  resetButton.addEventListener('click', function() {
    resetGame();
  });
}

//Set up & display timer when game begins
function timerFunc() {
  document.getElementById('timer').innerHTML = 'Seconds: ' + timeCount;
  timeCount += 1;
}

//Resets game
function resetGame() {
  //reset stars to 3
  resetStars();

  //reset move count and match count to 0
  matchCount = 0;
  moveCount = 0;
  document.getElementById('moveCount').innerText = moveCount;

  //reset timer
  clearInterval(timer);
  timeCount = 0;
  timerRunning = false;

  //clear any card elements from openCards array
  openCards = [];

  //clear existing deck
  let deckUl = document.querySelector('.deck');
  deckUl.innerHTML = null;

  //shuffle deck, display on page, add appropriate listeners, start timer
  shuffle(deck);
  buildDeckGrid(deck);
  addCardListeners();
  addRefreshListener();
  timerFunc();
};

/*
**helper function for resetGame()
**resets stars and moveCount to 0 moves and 3 stars
*/
function resetStars() {
let starsSection = document.getElementById('stars');
starsSection.innerHTML = null;
for (let i of Array(3)) {
  let starItem = document.createElement('i');
  starItem.classList.add('fa', 'fa-star');
  let singleStarHTML = document.createElement('li');
  singleStarHTML.appendChild(starItem);
  starsSection.appendChild(singleStarHTML);
  };
}

//Displays modal if user wins (matchCount = 8)
function displayModal() {
  //Add results to modal before displaying
  document.getElementById('moves').innerText = moveCount + " moves";
  document.getElementById('seconds').innerText = (timeCount - 1) + " seconds";
  let stars = 3;
  if (moveCount > 19) {
    stars = 1;
  } else if (moveCount > 12) {
    stars = 2;
  };
  document.getElementById('finalStars').innerText = stars + " Stars";

  //display modal
  document.getElementById('modal').style.display = 'block';
}

//SCRIPTS TO RUN ON LOAD

shuffle(deck);
buildDeckGrid(deck);
resetStars();
addCardListeners();
addRefreshListener();


//TODO: update README.md file

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
