// set variables

const CARD_NAMES = ['arm', 'ear', 'eye', 'foot', 'hand', 'leg', 'mouth', 'nose'];

const startButton = document.querySelector('[data-button="start"]')
const helpButton = document.querySelector('[data-button="help"]')
const homeButtons = document.querySelectorAll('[data-button="home"]')
const restartButton = document.querySelector('[data-button="restart"]')
const closeButton = document.querySelector('[data-button="close"]');

const endOverlay = document.querySelector('[data-overlay="end"]')
const helpOverlay = document.querySelector('[data-overlay="help"]')

const menuPage = document.querySelector('[data-page="menu"]')
const gamePage = document.querySelector('[data-page="game"]')

const whiteBoard = document.querySelector('[data-whiteboard]');

const modalButton = document.querySelector('[data-modal-button]');
const modalTitle = document.querySelector('[data-modal-title]');

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
    menuPage.classList.add('hidden');
    gamePage.classList.remove('hidden');
    whiteBoard.classList.add('blur')
    startGame()
});

helpButton.addEventListener('click', () => {
    helpOverlay.classList.remove('hidden')
  })
  
  helpOverlay.addEventListener('click', e => {
    if(!e.target.classList.contains('overlay')) return;
    helpOverlay.classList.add('hidden');
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
      clearInterval(gameTick);
    })
  })
  
  restartButton.addEventListener('click', startGame)
  modalButton.addEventListener('click', () => {
    endOverlay.classList.add('hidden')
    startGame();
  })