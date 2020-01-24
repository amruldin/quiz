//  select all elements 
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const counter = document.getElementById("counter");
const timeGuage = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("score");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");

// make quiz container unvisible at the start
quiz.style.display = "none";

// create our questions
let questions = [
    {
        question:"What does HTML stand for ? ",
        imgScr : "img/html.png",
        choiceA : "Correct",
        choiceB : "Wrong",
        choiceC : "Wrong",
        correct : "A",
    },
    {
        question:"What does CSS stand for ? ",
        imgScr : "img/css.png",
        choiceA : "Wrong",
        choiceB : "Correct",
        choiceC : "Wrong",
        correct : "B",
    },

    {
        question:"What does JS stand for ? ",
        imgScr : "img/js.png",
        choiceA : "Wrong",
        choiceB : "Wrong",
        choiceC : "Correct",
        correct : "C",
    },
    {
        question:"Where is the capital of Mexico? ",
        imgScr : "img/js.png",
        choiceA : "Mexico City",
        choiceB : "Iran",
        choiceC : "Kabul",
        correct : "A",
    }

];


// create some variables
const lastQuestion = questions.length -1;
let runningQuestion = 0;
let count = 0;
let questionTime = 10; // 10s
const guageWidth = 150;
const guageUnit = guageWidth / questionTime;
let TIMER;
let score = 0;


// Render a question
function renderQuestion()
{
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src ="+ q.imgScr + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;

}


start.addEventListener("click", startQuiz);
function startQuiz()
{
    // call functions
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000);

}



// render progress
function renderProgress()
{
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++)
    {
        progress.innerHTML += "<div class = 'prog' id = "+qIndex +"></div>";

    }
}


// counter render
function renderCounter(){
    if(count <= questionTime)
    {
        counter.innerHTML = count;
        timeGauge.style.width = (count * guageUnit) + "px";
        count++;
    }
    else
    {
        answerIsWrong();
        count = 0;
        if(runningQuestion < lastQuestion)
        {
            runningQuestion++;
            renderQuestion();
        }

    }
}


// check answer

function checkAnswer(answer)
{
    if(answer == questions[runningQuestion].correct)
    {
        //answer is correct
        answerIsCorrect();
        score++;
        // change progrss color to green
        
    }
    else
    {
        // anwer is wrong
        answerIsWrong();
        // change progress color to red

    }

    count = 0;
    if(runningQuestion < lastQuestion)
    {
        runningQuestion ++;
        renderQuestion();
    }
    else
    {
        // end the quiz and show the score to the user
        clearInterval(TIMER);
        renderScore();



    }
 



}


// answer is correct

function answerIsCorrect()
{
    document.getElementById(runningQuestion).style.backgroundColor = "green";
}


function answerIsWrong()
{
    document.getElementById(runningQuestion).style.backgroundColor = "Red";
}

// render score
function renderScore()
{

    scoreContainer.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePercent = Math.round(100* score/questions.length);


    // choose the image 
    let img = (scorePercent >= 80) ? "img/5.png" :
              (scorePercent >= 60) ? "img/4.png" :
              (scorePercent >= 40) ? "img/3.png":
              (scorePercent >= 20) ? "img/2.png":
              "img/1.png";

    scoreContainer.innerHTML = "<img src=" + img + ">";
    scoreContainer.innerHTML += "<p>" + scorePercent + "%</p>";
}
