// Board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

// Game 
var gameOver = false;

// Snake
var snakeX = blockSize * 5;   // Head
var snakeY = blockSize * 5;   // Head
var snakeBody = [];           // Body 
var speed = 75;               // Speed

var movementX = 0;
var movementY = 0;

// Food 
var foodX;
var foodY;

var message = document.getElementById("message");
var title = document.createTextNode("Snake");
message.appendChild(title);

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");

  placeFood();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, speed);
}

function update() {
  // Board 
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  // Food
  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if ((snakeX == foodX) && (snakeY == foodY)) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  // Update the movement of the snake body 
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY]; 
  }

  // Snake 
  context.fillStyle = "lime";
  snakeX += movementX * blockSize;
  snakeY += movementY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);

  // Checks where the snake ate the food and fills those coordinates green
  for(let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  // Check game over 
  // Snake hits boundaries
  if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
    gameOver = true;
    resetGame();
  }

  // Snake overlaps itself
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      resetGame()
    }
  }
}

function changeDirection(e) {
  // Cannot go in opposite direction, check the previous direction 
  if (e.code == "ArrowUp" && movementY != 1) {
    movementX = 0;
    movementY = -1;
  }
  if (e.code == "ArrowDown" && movementY != -1) {
    movementX = 0;
    movementY = 1;
  }
  if (e.code == "ArrowLeft" && movementX != 1) {
    movementX = -1;
    movementY = 0;
  }
  if (e.code == "ArrowRight" && movementX != -1) {
    movementX = 1;
    movementY = 0;
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

function resetGame() {
  var gameOver = document.createTextNode("Game Over. Score: " + snakeBody.length);

  var restart = document.createElement("button");
  restart.setAttribute("id", "restart")
  restart.textContent = 'Restart';

  message.removeChild(title);
  message.appendChild(gameOver);
  message.appendChild(restart);


  restart.addEventListener("click", () => {
    location.reload();
  })
}