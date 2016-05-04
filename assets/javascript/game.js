var questions = [{
    question: "What Year did the french and indian war beging?",
    choices: ["1964", "1974", "1984", "1699"],
    correctAnswer: 1
}, {
    question: "Which President Was a U.S. Army Ranger?",
    choices: ["George Bush", "George Washington", "Abraham Lincoln", "Andrew Jackson"],
    correctAnswer: 2
}, {
    question: "In Which year did the Boston Tea Party take place?",
    choices: ["1772", "1773", "1843", "1900"],
    correctAnswer: 1
}, {
    question: "What is the longest river in the U.S?",
    choices: ["Missouri", "Rio Grande", "Saint Johns", "Mississippi"],
    correctAnswer: 0
}, {
    question: "What is the busiest subway station in NYC?",
    choices: ["Times Square", "Grand Central", "Union Street", "231 st"],
    correctAnswer: 0
}];

var timer;
var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    // Display the first question
    displayCurrentQuestion();
    $(".quizMessage").html('Good Luck!');

    // On clicking next, display the next question
    $(this).find("#nextButton").on("click", function () {
        if (!quizOver) {
            nextQuestion();
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $("#nextButton").html("Play Again?");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

function startTimer() {
    console.log('in startTimer');
    timer = setTimeout(function(){
        $(".quizMessage").html('Time up');
        quizOver = true;
        displayScore();
    }, 30000);
}

// This displays the current question AND the choices
function displayCurrentQuestion() {
    clearTimeout(timer);
    startTimer();
    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    // Set the questionClass text to the current question
    $(questionClass).html(question);
    $(".quizMessage").html("Please select an answer");
    $("#nextButton").html("Next Question");
    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function nextQuestion() {
    value = $("input[type='radio']:checked").val();

    if (value == undefined) {
        $(".quizMessage").html("Please select an answer");
        // $(document).find(".quizMessage").show();
    } else {
        // TODO: Remove any message -> not sure if this is efficient to call this each time....
        $(".quizMessage").html('');

        if (value == questions[currentQuestion].correctAnswer) {
            correctAnswers++;
        }

        currentQuestion++; // Since we have already displayed the first question on DOM ready
        if (currentQuestion < questions.length) {
            displayCurrentQuestion();
        } else {
            displayScore();
            //                    $(document).find(".nextButton").toggle();
            //                    $(document).find(".playAgainButton").toggle();
            // Change the text in the next button to ask if user wants to play again
            $("#nextButton").html("Play Again?");
            quizOver = true;
        }
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(".quizContainer > .result").html("You scored: " + correctAnswers + " out of: " + questions.length);
    $(".question").html('');
    $(".choiceList").html('');
    $("#nextButton").html('Play Again');
    // $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(".result").css('display','none');
}