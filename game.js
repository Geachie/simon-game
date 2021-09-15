// array of colors to be selected
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

$(document).keydown(function () {
  if (!started) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

// function creating random num 0 - 3
const nextSequence = () => {
  level++;

  userClickedPattern = [];

  $("#level-title").text(`Level ${level}`);

  let randomNumber = Math.round(Math.random() * 3);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
};

const playSound = (name) => {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
};

const animatePress = (currentColor) => {
  $(`#${currentColor}`).addClass("pressed");

  setTimeout(function () {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
};

const checkAnswer = (currentLevel) => {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // wrong entry
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("GAME OVER, Press Any Key to Restart");

    startOver();
  }
};

const startOver = () => {
  level = 0;
  gamePattern = [];
  started = false;
};
