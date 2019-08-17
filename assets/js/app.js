//HTML ELEMENTS
//Game Start
var gameStartDiv = $("#gameStartDiv");
var startGameBtn = $("#startGame");
//Quiz
var quizDiv = $("#quizDiv");
//Question Info
var questionSpan = $("#question");
var questionNumSpan = $("#questionNum");
var timeRemainingSpan = $("#timeRemaining");
//Form
var nextQuestionBtn = $("#nextQuestionBtn");
var questionForm = $("#questionForm");
var optn0 = $("#optn0");
var optn1 = $("#optn1");
var optn2 = $("#optn2");
var optn3 = $("#optn3");
//GLOBALS
var questions = [
    {
        question: "Which are corret units for the gravitational constant?",
        options: ["[N][m]", "[k][q1][q2]/[r^2]", "1/2[m][v^2]"],
        solution:
            "use dimentional analyis using radius and mass to solve for force"
    },
    {
        question: "What is the unit for current?",
        options: ["Amperes", "Volts", "Coulombs", "Watts"],
        solution: "You're supposed to know this..."
    },
    {
        question:
            "If a 5kg object is 10m above the earth's surface, how much potential energy does it have? (ignore air resistance and round to the tenth)",
        options: ["490.5m/s", "500.2m/s", "25.6m/s", "1,650.7m/s"],
        solution: "Use PE=mgh"
    }
]; //the questions and answers, [{question:asdf,options:[option1,2,3,4],soluion:asdf}], answer will olway be index 0
var currentQuestionIndex = 0; //index of the current question
var timeOutVar;
var correctIncorrectMissed = { correct: [], incorrect: [], missed: [] }; //arrays hold indecies of answered questions
// ===============================================
//FUNCTIONS AND WHATNOT
// =======================
// Begin game js
// start game listener
startGameBtn.on("click", function() {
    startGameBtn.off("click");
    console.log("game started");
    displayGame();
});
//change to game display
function displayGame() {
    gameStartDiv.hide();
    var correctAnswerIndex = displayNewQuestion();
    quizDiv.show();
    //Form Response
    questionForm.submit(function(event) {
        event.preventDefault();
        var chosenAnswer = parseInt(
            $("input[name=options]:checked", "#questionForm").val()
        );
        correctAnswerIndex = displayNewQuestion();
        if (correctAnswerIndex == -1) {
            console.log(correctIncorrectMissed.correct);
            console.log(correctIncorrectMissed.incorrect);
            console.log(correctIncorrectMissed.missed);
            questionForm.off("submit");
        }
    });
}
// =======================
//GAME JS

// nextQuestionBtn.on("click", function(event) {
//     event.preventDefault();
//     displayNewQuestion();
// });

//Get New Question
function getNewQuestion() {
    // event.preventDefault();
    currentQuestionIndex++;
    return questions[currentQuestionIndex - 1];
}

//randomize answer options
function randomizeAnswerOpions(optns, newOrder, correctIndex) {
    if (optns.length == 1) {
        newOrder.push(optns[0]);
        newOrder.push(correctIndex);
        return newOrder;
    }
    var ranIndex = Math.floor(Math.random() * optns.length);
    //if it's the correct one record the index

    newOrder.push(optns[ranIndex]);
    if (correctIndex == ranIndex) {
        correctIndex = newOrder.length - 1;
    }
    optns.splice(ranIndex, 1);
    return randomizeAnswerOpions(optns, newOrder, correctIndex);
}

//Display Next Question
function displayNewQuestion() {
    if (currentQuestionIndex >= questions.length) {
        return -1;
    } else {
        var newQ = getNewQuestion();
        questionSpan.text(newQ.question);
        var reorderedOptions = randomizeAnswerOpions(newQ.options, [], 0);
        optn0.text(reorderedOptions[0]);
        optn1.text(reorderedOptions[1]);
        optn2.text(reorderedOptions[2]);
        optn3.text(reorderedOptions[3]);
        var correctAnswerIndex = reorderedOptions[4];
        return correctAnswerIndex;
    }
}
