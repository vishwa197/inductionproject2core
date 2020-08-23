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
        options:['Virus-infective','Virus-symptonms','Virus-complication','Virus-death'],
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
        answer:1
    }
    
]
const questionNumber= document.querySelector(".question-number");
const questions= document.querySelector(".question");
const options=document.querySelector(".option");

var countquestion=0;
let currentQuestion;
let questionsDisplay=[];
function getquestions(){
    const n=quiz.length;
    for(let i=0;i<n;i++){
        questionsDisplay.push(quiz[i]);
    }
}
function setquestions(){
    questionNumber.innerHTML="Q"+(countquestion+1);
    currentQuestion=questionsDisplay[countquestion].question;
    questions.innerHTML=currentQuestion;
    countquestion++;
    console.log(currentQuestion);
}
function next(){
    if(countquestion==questionsDisplay.length){
        console.log("Quiz over");
    }
    else{
        setquestions();
    }
}
function previous(){
   
}
window.onload=function(){
    getquestions();
    setquestions();
}