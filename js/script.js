'use strict';

var buttons = document.querySelectorAll('.player-move');
var newGameButton = document.getElementById('new-game-btn');
var output = document.getElementById('output');
var winningOutput = document.getElementById('winning-output');
var resultBox = document.getElementById('result-box');

var winningAsk = function() {
  return parseFloat(window.prompt('How many winnings end the game?'));
};
var params = {
  playerResult: 0,
  computerResult: 0,
  gameContinue: false,
  winningNumber: 0 
};
console.log(params);

var outputShow = function (text) {
  output.innerHTML = text + '<br>';
};
var winningShow = function(text) {
  winningOutput.innerHTML = '<br>' + text + '<br>';
};
outputShow('Please, press the New Game button!');

var resultShow = function() {
  resultBox.innerHTML = params.playerResult + ' : ' + params.computerResult;
};
resultShow();

var newGame = function() {
  params.playerResult = 0;
  params.computerResult = 0;
  resultShow();
  params.winningNumber = winningAsk();
  if (isNaN(params.winningNumber)) {
    outputShow('');
    winningShow('<br>You didn\'t enter correct winnings number. Please, press New Game button!<br>');
    params.gameContinue = false;
  } else {
    outputShow('What is your move? Click the button!');
    winningShow('<br>' + params.winningNumber + ' winnings give you VICTORY!<br>');
    params.gameContinue = true;
  }
};
var moveRandom = function() {
  if ((Math.floor(Math.random() * 3)) + 1 === 1) {
    return 'ROCK';
  } else if ((Math.floor(Math.random() * 3)) + 1 === 2) {
    return 'SCISSORS';
  } else {
    return 'PAPER';
  }
};
var win = function(playerMoveName, computerMoveName) {
  outputShow('YOU WON: you played ' + playerMoveName + ' , computer played ' + computerMoveName + '.');
  params.playerResult++;
  resultShow();
  };
var lose = function (playerMoveName, computerMoveName) {
  outputShow('YOU LOST: you played ' + playerMoveName + ' , computer played ' + computerMoveName + '.');
  params.computerResult++;
  resultShow();
};
var playerMove = function(playerMoveName) {
  var computerMoveName = moveRandom();
  var deadHeat = 'IT\'S DEAD-HEAT: you played ' + playerMoveName + ' , computer played ' + computerMoveName + '.';
  if (((playerMoveName === 'ROCK') && (computerMoveName === 'SCISSORS')) || ((playerMoveName === 'SCISSORS') && (computerMoveName === 'PAPER')) || ((playerMoveName === 'PAPER') && (computerMoveName === 'ROCK'))) {
      win(playerMoveName, computerMoveName);
   } else if (((playerMoveName === 'ROCK') && (computerMoveName === 'PAPER')) || ((playerMoveName === 'SCISSORS') && (computerMoveName === 'ROCK')) || ((playerMoveName === 'PAPER') && (computerMoveName === 'SCISSORS'))) {
      lose(playerMoveName, computerMoveName);           
   } else {
      outputShow(deadHeat);
  }
  if ((params.playerResult === params.winningNumber) || (params.computerResult === params.winningNumber)) {
    gameOver();
 }
};
var gameOver = function() {
  if (params.playerResult < params.computerResult) {
    winningShow('YOU LOST ENTIRE GAME!');
  } else if (params.playerResult > params.computerResult) {
    winningShow('YOU WON ENTIRE GAME!');
  } else {
    winningShow('');
  }
  outputShow('GAME OVER! Please, press the New Game button!');
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
  newGame();
};

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', buttonsCallback);
}
newGameButton.addEventListener('click', newGameButtonCallback);
