//HTML ELEMENTS
//Question Info
var questionSpan = $("#question");
var questionNumSpan = $("#questionNum");
var timeRemainingSpan = $("#timeRemaining");
//Form
var nextQuestionBtn = $("#nextQuestionBtn");
var optn1 = $("#optn1");
var optn2 = $("#optn2");
var optn3 = $("#optn3");
var optn4 = $("#optn3");

//GLOBALS
var questions = [
    {
        question: "Which are corret units for the gravitational constant?",
        options: [
            "[N][m^2]/[kg^2]",
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

//Form Responce
nextQuestionBtn.on("click", function(event) {
    event.preventDefault();
    displayNewQuestion();
});

//Get New Question
function getNewQuestion() {
    currentQuestionIndex++;
    return questions[currentQuestionIndex - 1];
}

//randomize answer options
function randomizeAnswerOpions(optns, newOrder) {
    if (optns.length == 1) {
        newOrder.push(optns[0]);
        return newOrder;
    }
    var ranIndex = Math.floor(Math.random() * optns.length);
    newOrder.push(optns[ranIndex]);
    optns.splice(ranIndex, 1);
    return randomizeAnswerOpions(optns, newOrder);
}

//Display Next Question
function displayNewQuestion() {
    var newQ = getNewQuestion();
    questionSpan.text(newQ.question);
    var reorderedOptions = randomizeAnswerOpions(newQ.options, []);
}
