var gameStarted = false;
var btnPattern = [];
var playerPattern = [];
var greenSound = new Audio("sounds/green.mp3");
var redSound = new Audio("sounds/red.mp3");
var yellowSound = new Audio("sounds/yellow.mp3");
var blueSound = new Audio("sounds/blue.mp3");

function startGame() {
  gameStarted = true;
  btnPattern = [];
}

$(document).on("keydown", function () {
  if (gameStarted === false) {
    startGame();
    makeNextLevel();
  }
});

if (window.matchMedia("(max-width: 740px)").matches) {
  $("h1").text("Touch Here To Begin");
  $("h1").on("click", function () {
    if (gameStarted === false) {
      startGame();
      makeNextLevel();
    }
  });
}

function pressedAnimation(color) {
  var buttonSelector = "." + color;
  $(buttonSelector).addClass("pressed");
  setTimeout(function () {
    $(buttonSelector).removeClass("pressed");
  }, 160);
}

function demoAnimation(color) {
  $("." + color)
    .animate({ opacity: 0 }, 80)
    .animate({ opacity: 1 }, 80);
}

async function makeNextLevel() {
  playerPattern = [];
  $("h1").text("Level " + (btnPattern.length + 1));
  let nextButton = Math.ceil(Math.random() * 4);
  btnPattern.push(nextButton);
  for (let i = 0; i < btnPattern.length; i++) {
    animationSwitch(demoAnimation, btnPattern[i]);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}

function animationSwitch(animation, buttonNumber) {
  switch (buttonNumber) {
    case 1:
      animation("green");
      greenSound.play();
      break;
    case 2:
      animation("red");
      redSound.play();
      break;
    case 3:
      animation("yellow");
      yellowSound.play();
      break;
    case 4:
      animation("blue");
      blueSound.play();
      break;
  }
}

function endGame() {
  gameStarted = false;
  if (window.matchMedia("(max-width: 740px)").matches) {
    $("h1").text("Game Over, Touch Here to Restart");
  } else {
    $("h1").text("Game Over, Press Any Key to Restart");
  }
  $("body").addClass("game-over");
  var endGameSound = new Audio("sounds/wrong.mp3");
  endGameSound.play();
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
}

function arrayEquals(a, b) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

$(".btn").click(function () {
  if (!gameStarted) {
    return;
  }

  let playerChoice = this.id;
  var playerChoiceNumber;

  switch (playerChoice) {
    case "green":
      playerChoiceNumber = 1;
      break;
    case "red":
      playerChoiceNumber = 2;
      break;
    case "yellow":
      playerChoiceNumber = 3;
      break;
    case "blue":
      playerChoiceNumber = 4;
      break;
  }

  playerPattern.push(playerChoiceNumber);

  animationSwitch(pressedAnimation, playerChoiceNumber);

  if (
    playerPattern.length < btnPattern.length &&
    arrayEquals(playerPattern, btnPattern.slice(0, playerPattern.length))
  ) {
    return;
  } else if (arrayEquals(playerPattern, btnPattern)) {
    setTimeout(makeNextLevel, 700);
  } else {
    endGame();
  }
});
