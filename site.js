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
    }
    
]
const questionNumber= document.querySelector(".question-number");
const questions= document.querySelector(".question");
const options=document.querySelector(".options");
const contentbox=document.querySelector(".content-box");
const resultbox=document.querySelector(".result-box");
const namebox=document.querySelector(".name");
const navbarbox=document.querySelector(".nav-bar");


let countquestion=0;
let currentQuestion;
let questionsDisplay=[];
let correct=0;
let wrong=0; 
function getquestions(){
    const n=quiz.length;
    for(let i=0;i<n;i++){
        questionsDisplay.push(quiz[i]);
    }
}
var attempt={};
var attempted={};
contentbox.classList.add("hide");
function setquestions(x=0){
    resultbox.classList.add("hide");
    countquestion+=x;
    questionNumber.innerHTML="Q"+(countquestion+1);
    if(attempt.hasOwnProperty(countquestion)){
        console.log(countquestion);
        currentQuestion=attempt[countquestion];
        questions.innerHTML=currentQuestion.question;

        
        options.innerHTML=''; /*So that the options wont get stacked*/
    let m=4;
    for(let i=0;i<m;i++){   /*creating options for the particular question*/
        const option=document.createElement("div");
        option.innerHTML=currentQuestion.options[i];
        option.id=i;
        option.className="option";    
        options.appendChild(option);
        if(attempted[countquestion]){
            options.children[i].classList.add("attempted-already");
        }
        else{
            option.setAttribute("onclick","result(this)");
        }
    }
   
}
    else{
    currentQuestion=questionsDisplay[Math.floor(Math.random()*questionsDisplay.length)];
    attempt[countquestion]=currentQuestion;
    console.log(attempt);
    questions.innerHTML=currentQuestion.question;
    const index=questionsDisplay.indexOf(currentQuestion);
    questionsDisplay.splice(index,1)
    

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


function result(answered){
    if(answered.id==currentQuestion.answer){
        answered.classList.add("correct");
        correct++;
    }
    else{
        answered.classList.add("wrong");
        wrong++;
        for(let i=0;i<4;i++){
            
                if(options.children[i].id==currentQuestion.answer){
                    options.children[i].classList.add("correct");
                }
            }
    }
    attempted[countquestion]=true;
    localStorage.setItem("correct",correct);
    localStorage.setItem("wrong",wrong);
    answerlimit();
}
function answerlimit(){
    const x=4;
    for(let i=0;i<x;i++){
        options.children[i].classList.add("attempted-already");
    }
}
var o=0;
var timeLeft=100;
function startquiz(){
    contentbox.classList.remove("hide");
    namebox.classList.add("hide");
    welcome=document.getElementById("heading");
    welcome.innerHTML="Welcome to the COVID-19 Quiz, "+name;
    time = document.getElementById('countdown');
    var timerId = setInterval(countdown, 1000);
    function countdown() {
      if (timeLeft == -100000 ) {
        clearTimeout(timerId);
        quizover();
      } else if(o!=1){
        time.innerHTML = ' Time remaining: '+timeLeft;
        timeLeft--;
      }
    }
}
function writename(){
    name =document.getElementById("quiz").value;
    localStorage.setItem("name",name);   
}
writename();

function quizresult(){
    resultbox.querySelector(".name").innerHTML=name;
    resultbox.querySelector(".totalquestions").innerHTML=quiz.length;
    resultbox.querySelector(".correct").innerHTML=correct;
    resultbox.querySelector(".wrong").innerHTML=wrong;
    resultbox.querySelector(".attempted").innerHTML=correct+wrong;
    resultbox.querySelector(".score").innerHTML=correct;
    resultbox.querySelector(".scorepercentage").innerHTML=(correct/(quiz.length))*100+"%";
}
function quizover(){
    o++;
    localStorage.setItem("timeLeft",timeLeft);
    resultbox.classList.remove("hide");
    contentbox.classList.add("hide");
    console.log(timeLeft);
    if(timeLeft==-1){
        time.innerHTML="Time Out!";
    }
    quizresult();
}
function navbar(){
    const totalquestions=quiz.length;
    for(let i=0;i<totalquestions;i++){
        const nav=document.createElement("div");
        navbarbox.appendChild(nav);
    }
}

function next(){
    if(countquestion+1==10){
        quizover();
    }
    else{
        setquestions(1);
    }
}
function previous(){
   if(countquestion!=0){
       setquestions(-1);
   }
   else{
      console.log("Quiz just started");
   }
}
c=parseInt(localStorage.getItem("correct"));
w=parseInt(localStorage.getItem("wrong"));
t=parseInt(localStorage.getItem("timeLeft"));
console.log(c);
var score1=0;
var score2=0;
    switch(c-w){
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
score2=(score1/(Math.sqrt(t)))*10;
console.log(score2);    
window.localStorage.time = new Date().getTime();
var date = new Date(parseInt(window.localStorage.time));
console.log(date);

window.onload=function(){
    getquestions();
    setquestions();
    navbar();
}
console.log(localStorage);

