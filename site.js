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
        answer:1
    }
    
]
const questionNumber= document.querySelector(".question-number");
const questions= document.querySelector(".question");
const options=document.querySelector(".options");
const contentbox=document.querySelector(".content-box");
const resultbox=document.querySelector(".result-box");

let alreadyattempted=[];
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
function setquestions(x=0){
    resultbox.classList.add("hide");
    countquestion+=x;
    questionNumber.innerHTML="Q"+(countquestion+1);
    currentQuestion=questionsDisplay[countquestion];
    questions.innerHTML=currentQuestion.question;

    
    options.innerHTML=''; /*So that the options wont get stacked*/
    let m=4,y=0;
    for(let i=0;i<m;i++){   /*creating options for the particular question*/
        const option=document.createElement("div");
        option.innerHTML=currentQuestion.options[i];
        option.id=i;
        option.className="option";    
        options.appendChild(option); /*Adding newly created option container into the options container*/       
        option.setAttribute("onclick","result(this)");
    }
    
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
    answerlimit();
}
function answerlimit(){
    const x=4;
    for(let i=0;i<x;i++){
        options.children[i].classList.add("attempted-already");
    }
}
function quizresult(){
    resultbox.querySelector(".totalquestions").innerHTML=quiz.length;
    resultbox.querySelector(".correct").innerHTML=correct;
    resultbox.querySelector(".wrong").innerHTML=wrong;
    resultbox.querySelector(".attempted").innerHTML=correct+wrong;
    resultbox.querySelector(".score").innerHTML=correct;
    resultbox.querySelector(".scorepercentage").innerHTML=(correct/(correct+wrong));
}
function quizover(){
    resultbox.classList.remove("hide");
    contentbox.classList.add("hide");
    quizresult();
}
function next(){
    if(countquestion+1==questionsDisplay.length){
        console.log("Quiz over");
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
window.onload=function(){
    getquestions();
    setquestions();
}