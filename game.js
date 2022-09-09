// Initialize global variables.
const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let userClicks = 0;

// Add event listeners to HTML.
$("div.btn").click(userClick);
$(document).keypress(nextSequence);

// Game logic.
function userClick(e) {
  let currentColor = e.target.id;
  flashClass("." + currentColor, "pressed");
  userClickedPattern.push(currentColor);
  if (userClickedPattern[userClicks] === gamePattern[userClicks]) {
    playSound(currentColor);
    if (userClickedPattern.length === gamePattern.length) {
      userClicks = 0;
      userClickedPattern = [];
      setTimeout(nextSequence, 1000);
    } else {
      userClicks++;
    }
  } else {
    startOver();
  }
}

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
}

function startOver() {
  level = 0;
  userClicks = 0;
  gamePattern = [];
  userClickedPattern = [];
  playSound("wrong");
  flashClass("body", "game-over", 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
}

// Helper functions.
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function flashClass(selector, cls, delay = 100) {
  $(selector).addClass(cls);
  setTimeout(function() {
    $(selector).removeClass(cls);
  }, delay);
}
