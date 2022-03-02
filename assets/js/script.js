const startEl = document.querySelector("#startscreen");

const startButtonEl = document.querySelector("#btnBegin");

const timerEl = document.querySelector("#timer")

const quizQuestionEl = document.querySelector("#quizQuestion");

var interval;
var count = 60;
var time = null;

var questions = [
    
]

function startTimer() {
    time = setInterval(countDown, 1000);
};

function begin() {
    countDown();
    startTimer();
};

function countDown() {
    document.getElementById("timer").innerHTML =
    "<p>" + count + " seconds left!</p>";
    count--;
    if (count < 0) {
        alert("You ran out of time!");
    }
};

function hide(element) {
    element.style.display = "none";
};

function show(element) {
    element.style.display = "none";
};

startButtonEl.addEventListener("click", function() {
    hide(startScreen);
    begin();
});