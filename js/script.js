'use strict';

var button1 = document.getElementById('button1');
var button2 = document.getElementById('button2');
var button3 = document.getElementById('button3');
var newGameButton = document.getElementById('new-game-btn');

var output = document.getElementById('output');
var outputShow = function (text) {
  output.innerHTML = text + '<br>';
};

var winningOutput = document.getElementById('winning-output');
var winningShow = function(text) {
  winningOutput.innerHTML = '<br>' + text + '<br>';
};
outputShow('Please, press the New Game button!');
var result = document.getElementById('result');
var playerResult = 0;
var computerResult = 0;
var resultShow = function() {
  result.innerHTML = playerResult + ' : ' + computerResult;
};
resultShow();

var winningAsk = function() {
  return parseFloat(window.prompt('How many winnings end the game?'));
};
var gameContinue = false;
var winningNumber;
var newGame = function() {
  playerResult = 0;
  computerResult = 0;
  resultShow();
  winningNumber = winningAsk();
  if (isNaN(winningNumber)) {
    outputShow('');
    winningShow('<br>You didn\'t enter correct winnings number. Please, press New Game button!<br>');
    gameContinue = false;
  } else {
    outputShow('What is your move? Click the button!');
    winningShow('<br>' + winningNumber + ' winnings give you VICTORY!<br>');
    gameContinue = true;
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
  playerResult++;
  resultShow();
  };
var lose = function (playerMoveName, computerMoveName) {
  outputShow('YOU LOST: you played ' + playerMoveName + ' , computer played ' + computerMoveName + '.');
  computerResult++;
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
  if ((playerResult === winningNumber) || (computerResult === winningNumber)) {
    gameOver();
 }
};
var gameOver = function() {
  if (playerResult < computerResult) {
    winningShow('YOU LOST ENTIRE GAME!');
  } else if (playerResult > computerResult) {
    winningShow('YOU WON ENTIRE GAME!');
  } else {
    winningShow('');
  }
  outputShow('GAME OVER! Please, press the New Game button!');
  gameContinue = false;
};

var button1Callback = function(event) {
 if (gameContinue === true) {
   playerMove('ROCK');
 } else {
   gameOver();
 } 
};
var button2Callback = function(event) {
 if (gameContinue === true) {
   playerMove('SCISSORS');
 } else {
   gameOver();
 }
};
var button3Callback = function(event) {
 if (gameContinue === true) {
   playerMove('PAPER');
 } else {
   gameOver();
 }
};
var newGameButtonCallback = function(event) {
  newGame();
};

button1.addEventListener('click', button1Callback);
button2.addEventListener('click', button2Callback);
button3.addEventListener('click', button3Callback);

newGameButton.addEventListener('click', newGameButtonCallback);