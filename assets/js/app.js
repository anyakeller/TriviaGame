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
var optionButtons = [$("#optn0"), $("#optn1"), $("#optn2"), $("#optn3")];
//Results
var resultsDiv = $("#resultsDiv");
var scoreSpan = $("#score");
var numQuestionsSpan = $("#numQuestions");
var numIncorrectSpan = $("#numIncorrect");
var numMissedSpan = $("#numMissed");

//GLOBALS
var questions = [
    {
        question: "Which are corret units for the gravitational constant?",
        options: [
            "[g][m1][m2]/[r^2]",
            "[N][m]",
            "[k][q1][q2]/[r^2]",
            "1/2[m][v^2]"
        ],
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
var intervalVar;
var countdown = 10; //how many seconds left
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
    numQuestionsSpan.text(questions.length);
    gameStartDiv.hide();
    var correctAnswerIndex = displayNewQuestion();
    quizDiv.show();
    timeRemainingSpan.text(countdown);
    intervalVar = window.setInterval(timer, 1000);
    //Form Response
    questionForm.submit(function(event) {
        event.preventDefault();
        clearInterval(intervalVar);
        countdown = 10;
        timeRemainingSpan.text(countdown);
        intervalVar = window.setInterval(timer, 1000);

        //check answer
        var chosenAnswer = parseInt(
            $("input[name=options]:checked", "#questionForm").val()
        );
        if (isNaN(chosenAnswer)) {
            chosenAnswer = -1;
        }
        if (chosenAnswer == correctAnswerIndex) {
            correctIncorrectMissed.correct.push(currentQuestionIndex);
            console.log("correct");
        } else if (chosenAnswer == -1) {
            correctIncorrectMissed.missed.push(currentQuestionIndex);
            console.log("question missed");
        } else {
            correctIncorrectMissed.incorrect.push(currentQuestionIndex);
            console.log("incorrect");
        }
        //try to load a new question
        correctAnswerIndex = displayNewQuestion();
        //if game is over
        if (correctAnswerIndex == -1) {
            quizDiv.hide();
            endgame();
            console.log(correctIncorrectMissed.correct);
            console.log(correctIncorrectMissed.incorrect);
            console.log(correctIncorrectMissed.missed);
            questionForm.off("submit");
        }
    });
}

// Interval clock function
function timer() {
    if (countdown == 0) {
        questionForm.submit();
    } else {
        countdown--;
        timeRemainingSpan.text(countdown);
    }
}

// =======================
//GAME JS

//Get New Question
function getNewQuestion() {
    // event.preventDefault();
    currentQuestionIndex++;
    questionNumSpan.text(currentQuestionIndex);
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
        $(".active").prop("checked", false);
        $(".active").removeClass("active");
        var newQ = getNewQuestion();
        questionSpan.text(newQ.question);
        var reorderedOptions = randomizeAnswerOpions(newQ.options, [], 0);
        optionButtons[0].text(reorderedOptions[0]);
        optionButtons[1].text(reorderedOptions[1]);
        optionButtons[2].text(reorderedOptions[2]);
        optionButtons[3].text(reorderedOptions[3]);

        return reorderedOptions[4];
    }
}

//ENDGAME
function endgame() {
    scoreSpan.text(correctIncorrectMissed.correct.length);
    numIncorrectSpan.text(correctIncorrectMissed.incorrect.length);
    numMissedSpan.text(correctIncorrectMissed.missed.length);
    resultsDiv.show();
}
