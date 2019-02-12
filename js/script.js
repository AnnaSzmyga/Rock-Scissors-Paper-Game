'use strict';

var buttons = document.querySelectorAll('.player-move');
var newGameButton = document.getElementById('new-game-btn');
var output = document.getElementById('output');
var resultBox = document.getElementById('result-box');

var params = {
  playerResult: 0,
  computerResult: 0,
  gameContinue: false,
  winningNumber: 0,
  winningInfo: '',
  playerName: 'YOU',
  progress: [],
  roundNumber: 0,
  roundResult: '0:0'
};

var outputShow = function (text) {
  output.innerHTML = text + '<br>' + params.winningInfo;
};

outputShow('Please, press the New Game button!');

var resultShow = function() {
  resultBox.innerHTML = params.playerResult + ' : ' + params.computerResult;
};
resultShow();

var newGame = function() {
  params.playerResult = 0;
  params.computerResult = 0;
  params.progress = [];
  params.roundNumber = 0;
  cleanTable();
  resultShow();
  params.winningInfo = params.winningNumber + ' winnings give you VICTORY!<br>'
  outputShow('What is your move? Click the button!');
  params.gameContinue = true;
};

var moveRandom = function() {
  if ((Math.floor(Math.random() * 3)) + 1 === 1) {
    return 'rock';
  } else if ((Math.floor(Math.random() * 3)) + 1 === 2) {
    return 'scissors';
  } else {
    return 'paper';
  }
};

var win = function(playerMoveName, computerMoveName) {
  outputShow(params.playerName + ' WON: ' + params.playerName + ' played ' + playerMoveName + ' , computer played ' + computerMoveName + '.');
  params.playerResult++;
  params.roundResult = '1 : 0';
  resultShow();
  };
var lose = function (playerMoveName, computerMoveName) {
  outputShow(params.playerName + ' LOST: ' + params.playerName + ' played ' + playerMoveName + ' , computer played ' + computerMoveName + '.');
  params.computerResult++;
  params.roundResult = '0 : 1';
  resultShow();
};

var playerMove = function(playerMoveName) {
  params.roundNumber++;
  var computerMoveName = moveRandom();
  var deadHeat = 'IT\'S DEAD-HEAT: ' + params.playerName + ' played ' + playerMoveName + ' , computer played ' + computerMoveName + '.';
  if (((playerMoveName === 'rock') && (computerMoveName === 'scissors')) || ((playerMoveName === 'scissors') && (computerMoveName === 'paper')) || ((playerMoveName === 'paper') && (computerMoveName === 'rock'))) {
      win(playerMoveName, computerMoveName);
   } else if (((playerMoveName === 'rock') && (computerMoveName === 'paper')) || ((playerMoveName === 'scissors') && (computerMoveName === 'rock')) || ((playerMoveName === 'paper') && (computerMoveName === 'scissors'))) {
      lose(playerMoveName, computerMoveName);           
   } else {
      outputShow(deadHeat);
      params.roundResult = '0 : 0';
  }
  params.progress.push({roundNumber: params.roundNumber, playerMoveName: playerMoveName, computerMoveName: computerMoveName, roundResult: params.roundResult, gameResult: params.playerResult + ' : ' + params.computerResult});
  if ((params.playerResult === params.winningNumber) || (params.computerResult === params.winningNumber)) {
    buildTable();
    gameOver();
  }
};

var buildTable = function() {
  for(var i = 0; i < params.progress.length; i++) {
    var tableRow = document.createElement("tr");
    document.querySelector('tbody').appendChild(tableRow);
    
    for( var key in params.progress[i]) {
      var tableData = document.createElement("td");
      tableData.appendChild(document.createTextNode(params.progress[i][key]));
      tableRow.appendChild(tableData);
    }   
  }
};
var cleanTable = function() {
  var tableRows = document.querySelectorAll('tbody tr');
  for ( var i = 0; i < tableRows.length; i++) {
    if (tableRows[i]) {
        tableRows[i].parentNode.removeChild(tableRows[i]);
    }
  }
};

var gameOver = function() {
  if (params.playerResult < params.computerResult) {
    document.querySelector('#game-over-modal-output').innerHTML = params.playerName + ' LOST ENTIRE GAME!';
  } else if (params.playerResult > params.computerResult) {
    document.querySelector('#game-over-modal-output').innerHTML = params.playerName + ' WON ENTIRE GAME!';
  } 
  showModal('#game-over-modal');
  params.winningInfo = '';
  outputShow('Please, press the New Game button!');
  params.gameContinue = false;
};

var buttonsCallback = function(event) {
   if (params.gameContinue === true) {
     playerMove(this.getAttribute('data-move'));
   } else {
     gameOver();
   }
};
var newGameButtonCallback = function(event) {
  showModal('#new-game-modal');
};

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', buttonsCallback);
}
newGameButton.addEventListener('click', newGameButtonCallback);

var startButtonCallback = function(event) {
  event.preventDefault();
  if (!(document.querySelector('#player-name').value.trim() === '')) {
    params.playerName = document.querySelector('#player-name').value;
  }
  params.winningNumber = Math.round(document.querySelector('#winnings-number').value);
  if (params.winningNumber === 0) {
    document.querySelector('#new-game-modal-output').innerHTML = '<br>You didn\'t enter correct winnings number!<br>';
    params.gameContinue = false;
  } else {
  hideModal();
  newGame();
  }
}
document.querySelector('#start-btn').addEventListener('click', startButtonCallback);



//  MODALS

var modals = document.querySelectorAll('.modal');

var showModal = function(modal){
  for (var i = 0; i < modals.length; i++) {
    modals[i].classList.remove('show'); 
  }
  document.querySelector(modal).classList.add('show');
  document.querySelector('#modal-overlay').classList.add('show');
}; 

var hideModal = function(){
  document.querySelector('#modal-overlay').classList.remove('show');
};

var closeButtons = document.querySelectorAll('.modal .close');

for(var i = 0; i < closeButtons.length; i++){
  closeButtons[i].addEventListener('click', hideModal);
}

document.querySelector('#modal-overlay').addEventListener('click', hideModal);

for(var i = 0; i < modals.length; i++){
  modals[i].addEventListener('click', function(event){
    event.stopPropagation();
  });
}


