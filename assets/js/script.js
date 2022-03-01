const startEl = document.querySelector("#startscreen");

const startButtonEl = document.querySelector("#btnBegin");

const timerEl = document.querySelector("#timer")

var interval;
var count = 60;
var time = null;

function startTimer() {
    time = setInterval(countDown, 1000);
};

function begin() {
    countDown();
    startTimer();
};

function countDown() {
    document.getElementById("timer").innerHTML =
    "<p> Time Left: " + count + " second(s) left</p>";
    count--;
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