quiz=[
    {
        question:"How does Coronavirus transmit?",
        options:['By sneezes or coughs, droplets spread in the air',' If the distance is less than 1 meter from the infected person','If a person comes in contact with surface infected with the virus','All the above'],
        answer:3
    },
    {
        question:"The clinical trial in which blood is transfused from recovered COVID-19 patients to a coronavirus patient who is in critical condition?",
        options:['Solidarity','Plasma Therapy','Remdesivir','Hydroxychloroquine'],
        answer:1
    },
    {
        question:"The first case of novel coronavirus was identified in .....",
        options:['Beijing','Shanghai','Wuhan','Hong Kong'],
        answer:2
    },
    {
        question:"Which of the following is not a symptom of the COVID-19?",
        options:['Shortness of breath','Dry cough','Loss of taste/smell','Partial Blindness'],
        answer:3
    },
    {
        question:"On which day COVID-19 was declared Pandemic by WHO?",
        options:['11th Mar','28th Feb','30th Jan','21st Dec'],
        answer:0
    },
    {
        question:"The 'SARS' in SARS-CoV-2 stands for?",
        options:['Severe Acute Renal Syndrome ','Sudden Acute Respiratory Syndrome','Severe Acute Respiratory Syndrome','Sudden Acute Respiratory Syndrome'],
        answer:2
    },
    {
        question:"Valid Test for COVID-19:",
        options:['RT-PCR','SYS-PCR','ELISA','VDRL'],
        answer:0
    },
    {
        question:"'Incubation Period' is the time between?",
        options:['Virus-infection','Virus-symptomns','Virus-complication','Virus-death'],
        answer:1
    },
    {
        question:"Which animal source is responsible for the origin of the disease?",
        options:['Mandarin Duck','Grebes Pigeon','Corona Dragon','Horseshoe Bat'],
        answer:3
    },
    {
        question:"Which of the following people is COVID-19 more dangerous for? ",
        options:['European people','People with underlying health conditions','Children','Senior Citizens'],
        answer:3
    }    //Storing questions ,options and answers using array of objects
    
]
const questionNumber= document.querySelector(".question-number");
const questions= document.querySelector(".question");
const options=document.querySelector(".options");
const contentbox=document.querySelector(".content-box");
const resultbox=document.querySelector(".result-box");
const namebox=document.querySelector(".name");
const navbarbox=document.querySelector(".navbar")
const previousbox=document.querySelector(".previous") 
//Allows entering and modifying child elements in the parent element

let countquestion=0;
let currentQuestion;
let questionsDisplay=[];
let correct=0;
let wrong=0; 
function getquestions(){    //function to copy the objects in a new array(questionsDisplay), so that original object array "quiz" is not disturbed 
    const n=quiz.length;
    for(let i=0;i<n;i++){
        questionsDisplay.push(quiz[i]);
    }
}
var attempt={};
var attempted={};
var wronged={};
var corrected={};
var user={};
contentbox.classList.add("hide");   //Using classlist we can add and remove a class when required
yours=document.getElementById("status"); //Question status

function setquestions(x=0){     //function to display the content of the questions
    countquestion+=x;           //x is a global variable to navigate to the correct question number
    resultbox.classList.add("hide");
    if(countquestion+1==quiz.length){   //Modifies next to submit for the last question
        y=document.getElementsByClassName("button");
        y[1].style.backgroundColor="red";
        y[1].innerText="Submit?";
    }
    else{
    y=document.getElementsByClassName("button");
    y[1].style.backgroundColor="#8DDBE0";
    y[1].innerText="Next";
    }
    if(countquestion==0){               //previous button disabled for first question
        previousbox.classList.add("attempted-already");
    } 
    else{
        previousbox.classList.remove("attempted-already");
    }
    questionNumber.innerHTML="Q"+(countquestion+1); 
    if(attempt.hasOwnProperty(countquestion)){   //for attempted questions
        currentQuestion=attempt[countquestion];
        questions.innerHTML=currentQuestion.question;


        options.innerHTML=''; /*So that the options wont get stacked*/
    let m=4;
    for(let i=0;i<m;i++){   //creating options for the particular question in the content box container
        const option=document.createElement("div");
        option.innerHTML=currentQuestion.options[i];
        option.id=i;
        option.className="option";    
        options.appendChild(option);   
        if(attempted[countquestion]){       
            options.children[i].classList.add("attempted-already");
            if(wronged[countquestion]){
                yours.innerHTML="Status:Wrong|Your Response: "+(parseInt(user[countquestion])+1); 
            }
            else if(corrected[countquestion]){
                yours.innerHTML="Status:Correct Response!";
            }
            if(options.children[i].id==currentQuestion.answer){
                options.children[i].classList.add("correct");
            }
        }
        else{
            yours.innerHTML="Status:Unattempted";
            option.setAttribute("onclick","result(this)");      // func(this) allows us to get the clickec option and modify it
        }
    }
   
}
    else{               //for displaying unattempted questions
    currentQuestion=questionsDisplay[Math.floor(Math.random()*questionsDisplay.length)]; //Random question order display for every user
    attempt[countquestion]=currentQuestion;
    questions.innerHTML=currentQuestion.question;
    const index=questionsDisplay.indexOf(currentQuestion);
    questionsDisplay.splice(index,1);       //To remove the displayed question from the array of questions so that it wont repeat again
    

    options.innerHTML=''; /*So that the options wont get stacked*/
    let n=4;
    for(let i=0;i<n;i++){   /*creating options for the particular question*/
        const option=document.createElement("div");
        option.innerHTML=currentQuestion.options[i];
        option.id=i;
        option.className="option";    
        options.appendChild(option); /*Adding newly created option container into the options container*/       
        option.setAttribute("onclick","result(this)");
    }}   
}

var q=0;
l=document.getElementsByClassName("navbutton");
function navindicator(num,test){        //To indicate the color of navbars according to the status 
    if(test){
        l[num].style.backgroundColor="#8ED081";
    }
    else{
        l[num].style.backgroundColor="#EB8A90";
    }
}

function result(answered){    //Checking the attempted answer
    q=answered.id;
    user[countquestion]=q;
    if(answered.id==currentQuestion.answer){
        answered.classList.add("correct");
        correct++;
        corrected[countquestion]=true;
        navindicator(countquestion,1);
    }
    else{
        answered.classList.add("wrong");
        wrong++;
        wronged[countquestion]=true;
        navindicator(countquestion,0);
        for(let i=0;i<4;i++){  //If attempted answer is wrong,correct options is indicated
            
                if(options.children[i].id==currentQuestion.answer){
                    options.children[i].classList.add("correct");
                }
            }
    }
    attempted[countquestion]=true;
    answerlimit();
}
function answerlimit(){                 //To ensure Question can't be answered again
    const x=4;
    for(let i=0;i<x;i++){
        options.children[i].classList.add("attempted-already");
    }
}

var o=0;
var timeLeft=200;
function startquiz(){               //starts the quiz after inptuing the name
    contentbox.classList.remove("hide");
    namebox.classList.add("hide");
    welcome=document.getElementById("heading");
    welcome.innerHTML="Welcome to the COVID-19 Quiz, "+name;
    time = document.getElementById('countdown');
    var timerId = setInterval(countdown, 1000);
    function countdown() {          //Starts countdown timer and finishes the test when it runs out
      if (timeLeft == -1 ) {
        clearTimeout(timerId);
        quizover();
      } else if(o!=1){
        time.innerHTML = ' Time remaining: '+timeLeft;
        timeLeft--;
      }
    }
}
var score2=0;
function scorecalc(){               //Very basic scoring algorithm using correct,wrong and timetaken
timetaken=200-timeLeft;
score1=0;
    switch(correct-Math.round(wrong/2)){
        case 10:
        score1=9.5;break;    
        case 9:
        case 8:
        score1=8.5;break;
        case 7:
        case 6:
        score1=6.5;break;
        case 5:
        case 4:
        score1=5;break;
        case 3:
        case 2:
        score1=3;break;
        case 1:
        score1=2;break;
        default:
            score1=0;            
    }
score2=(score1/(timetaken))*10;   
window.localStorage.time = new Date().getTime();
date = new Date(parseInt(window.localStorage.time));        //Getting the attempted date and time  
if(correct-wrong>=5){
}
/*var highscorer=localStorage.setItem("highscorer",name);
var highscoredate=localStorage.setItem("highscoredate",date);
var highscore=localStorage.setItem("highscore",wrong);*/

highscorer=localStorage.getItem("highscorer");  //to store the highscore in the localstorage and display it 
highscore=localStorage.getItem("highscore");
highscoredate=localStorage.getItem("highscoredate");
if(highscore !== null){      //For the first examinee
    if (score2 > highscore) {
        localStorage.setItem("highscore", score2); 
        localStorage.setItem("highscorer", name);
        localStorage.setItem("highscoredate", date);
        document.getElementById("congrats").innerText="Congrats on the highscore! Your highscore will be updated on reloading.";       
    }
}
else{
        localStorage.setItem("highscore", score2); 
        localStorage.setItem("highscorer", name);
        localStorage.setItem("highscoredate", date);
        document.getElementById("congrats").innerText="Congrats on the highscore!, the highscore will be updated on reloading.";
}
}
function writename(){               //to get the inputted name
    name=document.getElementById("quiz").value;
}
writename();

function quizresult(){              //To display details and performance of examinee in the resultbox
    resultbox.querySelector(".examinee").innerHTML=name;
    resultbox.querySelector(".attempted").innerHTML=correct+wrong+"/"+quiz.length;
    resultbox.querySelector(".correct").innerHTML=correct;
    resultbox.querySelector(".wrong").innerHTML=wrong;
    resultbox.querySelector(".timetaken").innerHTML=timetaken-1;
    resultbox.querySelector(".score").innerHTML=score2;
    resultbox.querySelector(".highscore").innerHTML=highscore+"  by "+highscorer+" on  "+highscoredate;
}
function quizover(){        //Finishing quiz to display result
    o++;
    localStorage.setItem("timeLeft",timeLeft);
    resultbox.classList.remove("hide");
    contentbox.classList.add("hide");
    if(timeLeft==-1){
        time.innerHTML="Time Out!";
    }
    scorecalc();
    quizresult();
}


function next(){
    contentbox.classList.remove("next");
    if(countquestion+1==10){
        quizover();
    }
    
    else{
        yours.innerHTML="";
        setquestions(1);
        contentbox.classList.add("next");
    }
}                                    //Next and previous button navigation
function previous(){
    contentbox.classList.remove("next");
   if(countquestion!=0){
       setquestions(-1);
       contentbox.classList.add("previous");
   }
}

function nav(lol){
    z=lol-countquestion-1;   //Helps navigating to any question
    setquestions(z);
}

window.onload=function(){    //Runs the function when the page is reloaded.
    getquestions();
    setquestions();
}
console.log(localStorage);

