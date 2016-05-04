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

    
    displayCurrentQuestion();
    $(".quizMessage").html('Good Luck!');

    
    $(this).find("#nextButton").on("click", function () {
        if (!quizOver) {
            nextQuestion();
        } else { 
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


function displayCurrentQuestion() {
    clearTimeout(timer);
    startTimer();
    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    
    $(questionClass).html(question);
    $(".quizMessage").html("Please select an answer");
    $("#nextButton").html("Next Question");
    
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
        
    } else {
        
        $(".quizMessage").html('');

        if (value == questions[currentQuestion].correctAnswer) {
            correctAnswers++;
        }

        currentQuestion++; 
        if (currentQuestion < questions.length) {
            displayCurrentQuestion();
        } else {
            displayScore();
            
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
    
}

function hideScore() {
    $(".result").css('display','none');
}