// Set variables

const CARD_NAMES = ['arm', 'ear', 'eye', 'foot', 'hand', 'leg', 'mouth', 'nose'];

const startButton = document.querySelector('[data-button="start"]')
const helpButton = document.querySelector('[data-button="help"]')
const feedbackButton = document.querySelector('[data-button="feedback"]')
const homeButtons = document.querySelectorAll('[data-button="home"]')
const restartButton = document.querySelector('[data-button="restart"]')
const closeButton = document.querySelector('[data-button="close"]');

const endOverlay = document.querySelector('[data-overlay="end"]')
const helpOverlay = document.querySelector('[data-overlay="help"]')
const feedbackOverlay = document.querySelector('[data-overlay="feedback"]')
const levelOverlay = document.querySelector('[data-overlay="level"]')

const menuPage = document.querySelector('[data-page="menu"]')
const gamePage = document.querySelector('[data-page="game"]')

const whiteBoard = document.querySelector('[data-whiteboard]');

const modalButton = document.querySelector('[data-modal-button]');
const modalTitle = document.querySelector('[data-modal-title]');

const formClose = document.querySelector('[data-close]');

const levelButtons = document.querySelectorAll('[data-level]')
const socialLinks = document.querySelector('[data-social-links]')

let gameTick;


const CARDS = {
  allCards: null,
  currentCardToPair : null,
  canFlip: true, 
  paired: 0,
};
  
const FLIPS = {
  count: 0, 
  flipCountSpan: document.querySelector('[data-flips]')
}

const TIME = {
  defaultValue: 60,
  currentValue: 60, 
  currentTimeSpan: document.querySelector('[data-timer]')        
};
  
// Event listeners

startButton.addEventListener('click', () => {
  levelOverlay.classList.remove('hidden')
});

levelButtons.forEach(button => {
  button.addEventListener('click', () => {
    TIME.defaultValue = button.dataset.level;

    menuPage.classList.add('hidden');
    gamePage.classList.remove('hidden');
    whiteBoard.classList.add('blur')
    levelOverlay.classList.add('hidden')
    startGame()
  })
})

feedbackButton.addEventListener('click', () => {
  feedbackOverlay.classList.remove('hidden')
})

helpButton.addEventListener('click', () => {
  helpOverlay.classList.remove('hidden')
})

helpOverlay.addEventListener('click', e => {
  if(!e.target.classList.contains('overlay')) return;
  helpOverlay.classList.add('hidden');
})


formClose.addEventListener('click', () => {
  feedbackOverlay.classList.add('hidden');
})

closeButton.addEventListener('click',() => {
  helpOverlay.classList.add('hidden')
})

homeButtons.forEach(homeButton => {
  homeButton.addEventListener('click', () => {
    endOverlay.classList.add('hidden');
    whiteBoard.classList.remove('blur');
    menuPage.classList.remove('hidden');
    gamePage.classList.add('hidden');
    socialLinks.classList.remove('hidden');
    clearInterval(gameTick);
  })
})

// Functions

  function startGame() { 
    genarateCards();
    
// Resetting Cards 

CARDS.allCards = document.querySelectorAll('.card');
CARDS.allCards.forEach(card => {
    card.classList.remove('visible')
    card.classList.remove('matched')
    card.addEventListener('click', ()=> flipCard(card))
});
CARDS.currentCardToPair = null;
CARDS.canFlip = true;
CARDS.flipped = 0;
CARDS.paired = 0;
  
// Resetting Time

TIME.currentValue = TIME.defaultValue;
TIME.currentTimeSpan.innerText = TIME.currentValue;

if(gameTick) clearInterval(gameTick);

gameTick = setInterval(() => {    
    TIME.currentValue--;
    TIME.currentTimeSpan.innerText  = TIME.currentValue
    if(CARD_NAMES.length === CARDS.paired){
      socialLinks.classList.remove('hidden');
      clearInterval(gameTick);
      endOverlay.classList.remove('hidden')
      modalTitle.innerText = `Congratulations! You finished with ${TIME.currentValue} seconds remaining`;
      modalButton.innerText = 'Play again';
    }
    if(TIME.currentValue === 0) {
      socialLinks.classList.remove('hidden');
      clearInterval(gameTick);
      endOverlay.classList.remove('hidden')
      modalTitle.innerText = 'You ran out of time!';
      modalButton.innerText = 'Try again?';
    }
}, 1000);
  
  //RESETTING FLIPS

  FLIPS.count = 0;
  FLIPS.flipCountSpan.innerText  = 0;

  // TOGGLE SOCIAL LINKS VISIBILITY

  socialLinks.classList.add('hidden')
}

function flipCard(card){
    if(!cardCanBeFlipped(card)) return;

    FLIPS.flipCountSpan.innerText =  ++FLIPS.count;

    card.classList.add('visible') 
    if(CARDS.currentCardToPair) 
        checkForMatch(CARDS.currentCardToPair, card)
    else  
        CARDS.currentCardToPair = card 
}

function cardCanBeFlipped(card){
    return !card.classList.contains('visible') && !card.classList.contains('matched') && CARDS.canFlip;
}

function checkForMatch(card1, card2){
    CARDS.canFlip = false;
    setTimeout(()=> { 
        if(card1.dataset.id === card2.dataset.id){ 
            card1.classList.add('matched')
            card2.classList.add('matched')   
            CARDS.paired++;
        } else {
            card1.classList.remove('visible')
            card2.classList.remove('visible') 
        } 
        CARDS.canFlip = true;
    }, 1000)
    CARDS.currentCardToPair = null;
}
  
  function genarateCards(){
    const cardHTMLArray = [];

    CARD_NAMES.forEach((name, index) => {
      const imageCardHTML = `
        <div class="card" data-id="${index}">
          <div class="front-face face"><img src="assets/images/${name}.jpg"></div> 
          <div class="back-face face"><img src="assets/images/back.jpg"></div> 
        </div>`;
      const textCardHTML = `
        <div class="card" data-id="${index}">
          <div class="front-face face"><img src="assets/images/white.jpg"><span class="card-text">${name}</span></div> 
          <div class="back-face face"><img src="assets/images/back.jpg"></div> 
        </div>`;

      cardHTMLArray.push(imageCardHTML, textCardHTML);
    });
    cardHTMLArray.sort((a, b) => 0.5 - Math.random());
    document.querySelector('[data-grid]').innerHTML = cardHTMLArray.join('');
}
  