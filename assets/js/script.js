const startEl = document.querySelector("#startscreen");

const startButtonEl = document.querySelector("#btnBegin");

const timerEl = document.querySelector("#timer");

const quizQuestionEl = document.querySelector("#quizQuestion");

const scoreBoardEl = document.querySelector("#scoreboard");

// starting point in question array to push up to next question in nextQuestion function
var currentQuestion = 0;

//stores initials of user
var userName = "";

// interval to set clock when quiz begins
var interval;

// 60 seconds for clock to begin countdown
var count = 60;

// time variable used to update timer in startTimer function
var time = null;

// will be used to add correct answers/remaining time to calculate final score
userScore = 0;

// used to store user answers during quiz
var userInput = "";

// stores high scores to be displayed
let scores = JSON.parse(localStorage.getItem("userInfo")) || [];

// array that stores questions to be used in the quiz
var quizQuestion = [
    {
        question: "Which of the following is NOT a mathematic operator in JavaScript?",
        answers : {
            a: "*",
            b: "%",
            c: "x",
        },
        solution: "c"
    },

    {
        question: "Which of the following would become a comment in JavaScript?",
        answers: {
            a: "// comment",
            b: ">>comment",
            c: "/* Comment */",
        },
        solution: "a"
    },

    {
        question: "What does API stand for?",
        answers: {
            a: "Array Per Instance",
            b: "Application Programming Interface",
            c: "Artificial Programming Intelligence",
        },
        solution: "b",
    },

    {
        question: "Which of the following would run myFunction?",
        answers: {
            a: "execute.myFunction",
            b: "myFunction{run}",
            c: "myFunction()",
        },
        solution: "c",
    },

    {
        question: "A boolean is defined as:",
        answers: {
            a: "True/False",
            b: "A number rounded to the nearest whole number",
            c: "An alert on the page",
        },
        solution: "a",
    },
];

// begins running down the clock
function startTimer() {
    time = setInterval(countDown, 1000);
};

// starts countdown when player clicks start button
function begin() {
    countDown();
    startTimer();
};


// shows the time remaining and alerts the user when time has run out
function countDown() {
    timerEl.innerHTML =
    "<p>" + count + " seconds left!</p>";
    count--;
    if (count < 0) {
        alert("You ran out of time!");
        clearInterval(time);
    }
};

// display questions/answers from question array
function fetchQuestion() {

    if (!quizQuestion[currentQuestion]) {
        return endQuiz();
    }
    //get question text and display it at top of quiz area
    document.getElementById("problem").innerHTML = quizQuestion[currentQuestion].question;

    //display answers and record user submission
    document.getElementById("solution1").innerHTML = quizQuestion[currentQuestion].answers.a;
    solution1.addEventListener("click", markAnswerA);

    document.getElementById("solution2").innerHTML = quizQuestion[currentQuestion].answers.b;
    solution2.addEventListener("click", markAnswerB); 

    document.getElementById("solution3").innerHTML = quizQuestion[currentQuestion].answers.c;
    solution3.addEventListener("click", markAnswerC); 
};

// marks user answer and sends to checkAnswer function
function markAnswerA() {
    userInput = "a";
        checkAnswer();
}

function markAnswerB() {
    userInput = "b";
        checkAnswer();
}

function markAnswerC() {
    userInput = "c";
        checkAnswer();
}
// checks userInput against correct solution
function checkAnswer() {
    if (userInput == quizQuestion[currentQuestion].solution) {
        alert("Correct!");
        userScore = (userScore + 10);
    } else {
        alert("Incorrect. -10 seconds!");
        count = count-10;
    }
    console.log(userInput);
    nextQuestion();
};

//moves to next question in quiz array
function nextQuestion() {
    userInput = undefined;
    console.log(userInput)
    currentQuestion ++;
    fetchQuestion();
};

// ending screen that shows final score and collects user info for scoreboard
function endQuiz() {
    clearInterval(time);
    userScore = (userScore + count);
    alert("You reached the end!");
    alert("Your final score was " + userScore + ".");
    userName = prompt("Enter your initials.");

    // combines score and initials for scoreboard
    var userInfo = {
        userName, 
        userScore
    };
    scores.push(userInfo);
    localStorage.setItem("userInfo", JSON.stringify(scores));

    // hides last question
    hide(quizQuestionEl);

    // removes timer display and changes to scores banner
    timerEl.innerHTML = "Previous Scores:";

    // shows scoreboard
    for (let i = 0; i < scores.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scores[i].userName}: ${scores[i].userScore}`;
        scoreBoardEl.append(li);
    }
};

// hides rules when quiz begins
function hide(element) {
    element.style.display = "none";
};

function show(element) {
    element.style.display = "none";
};

// function for start button that begins quiz
startButtonEl.addEventListener("click", function() {
    hide(startScreen);
    quizQuestionEl.style.display = 'block';
    begin();
    fetchQuestion();
});



