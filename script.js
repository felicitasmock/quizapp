let questions = [
    {
        'question': 'Was ist das größte Tier der Welt?',
        'answer_1': 'Elefant',
        'answer_2': 'Giraffe',
        'answer_3': 'Blauwal',
        'answer_4': 'Braunbär',
        'right_answer': 3,
    }, {
        'question': 'Einige Monate haben 30, einige 31 Tage. Wie viele haben 28 Tage?',
        'answer_1': 'Kein Monat',
        'answer_2': 'Alle Monate',
        'answer_3': '1 Monat',
        'answer_4': '3 Monate',
        'right_answer': 2,
    }, {
        'question': 'Welches Land ist flächenmäßig das zweitgrößte der Erde??',
        'answer_1': 'Kanada',
        'answer_2': 'Brasilien',
        'answer_3': 'China',
        'answer_4': 'USA',
        'right_answer': 1,
    }, {
        'question': 'Teneriffa, Gran Canaria und Fuerteventura gehören zu den…?',
        'answer_1': 'Azoren',
        'answer_2': 'Balearen',
        'answer_3': 'Karibische Inseln',
        'answer_4': 'Kanarische Inseln',
        'right_answer': 4,
    }
];

let currentQuestion = 0; // defines variable for current question of array
let rightQuestions = 0; // defines variable of right questions
let audioSuccess = new Audio('audio/success.mp3'); // sound for right answer
let audioFail = new Audio('audio/wrong.mp3') // sound for wrong answer


// onload function
function startQuiz() {
    document.getElementById('startCard').style = "display: none;";
    document.getElementById('quizCard').style = "";

    document.getElementById('maxQuestions').innerHTML = questions.length; // fill and shows the number of all questions
    showQuestion();
}

// fills question with their answers
function showQuestion() {
    if (gameIsOver()) {
        endScreen();
    } else { // show question
        progressBar();
        updateToNextQuestions();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;  // if current questions >= length of array = last question
}

// endscreen
function endScreen() {
    // document.getElementById('quizCard').classList.add('d-none'); // add CSS class d-none
    // document.getElementById('endCard').classList.remove('d-none'); // remove CSS class d-cone to show end screen
    document.getElementById('endCard').style = ''; // remove CSS class d-cone to show end screen
    document.getElementById('quizCard').style = 'display: none;'; // add CSS class d-none
    document.getElementById('endMaxQuestions').innerHTML = questions.length; // fills and shows the number of all questions
    document.getElementById('amountOfRightQuestions').innerHTML = rightQuestions;
}
// progess bar
function progressBar() {
    let percent = (currentQuestion + 1) / questions.length; //calc of progress // +1 because the varibale start with 0, but we start with 1
    percent = Math.round(percent * 100); // sets percent e.g. from 0.5 to 50% and rounds number
    //console.log('Fortschritt', percent);
    document.getElementById('progressBar').innerHTML = `${percent}%`; //shows percent on progess bar
    document.getElementById('progressBar').style.width = `${percent}%`; // changes width of element with same amount as percent
}
// show question
function updateToNextQuestions() {
    let question = questions[currentQuestion]; // get current Questions out of array

    document.getElementById('currentNumber').innerHTML = currentQuestion + 1; // +1 to start with 1 and not 0

    document.getElementById('questionText').innerHTML = question['question']; // fills question
    document.getElementById('answer_1').innerHTML = question['answer_1']; // fills answer ..
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}


// onklick on answer
function answer(selection) { //variable selection
    // selection is e.g. 'answer_1' see onklick in index.html = id
    // defines variable of current question
    console.log('selected answer is', selection);
    let selectedQuestionNumber = selection.slice(-1);// defines variable of last char of selection
    // selection is e.g. 'answer_1' see onklick in index.html = id
    let question = questions[currentQuestion]; // must be defined here
    console.log('selectedQuestionNumber is', selectedQuestionNumber);
    console.log('right answer is', question['right_answer']);

    let idOfRightAnswer = `answer_${question['right_answer']}`; // defines variable of right answer with variable of last char of element in array

    if (rightAnswerSelected(selectedQuestionNumber)) { //selectedQuestionNumber must be in here, because else varibale is unknown for thi function - is defined in function rightAnswerSelected
        console.log('right answer'); // than log right answer
        document.getElementById(selection).parentNode.classList.add('bg-success');
        // parentNote gets element above
        audioSuccess.play(); // playes sound for right answer
        rightQuestions++; // count up rightQuestions
    } else {
        console.log('wrong answer'); // else log wrong answer
        audioFail.play(); // plays sound for wrong answer
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');

    }
    //    document.getElementById('next-button').disabled = false; // enables button to click after answer has benn chosen
    console.log('currentQuestion is', currentQuestion);
    changeButton();
}
function rightAnswerSelected(selectedQuestionNumber) {
    let question = questions[currentQuestion]; // must also be defined here!!
    return selectedQuestionNumber == question['right_answer'];  // if the selected question (number) is same a number in right answer of array
}
function nextQuestion() {
    currentQuestion++ // counts up variable of current question 
    showQuestion(); // runs function of showQuestion

    document.getElementById('next-button').disabled = true; // disables Button
    resetAnswers(); // calls function that removes css classes

}

function changeButton() {
    if ((currentQuestion + 1) === questions.length) { // + 1 because array starts with 0
       
        document.getElementById('next-button').innerHTML = 'Ergebnis anzeigen';
        document.getElementById('next-button').disabled = false; // enables button to click after answer has benn chosen
    } else {
        document.getElementById('next-button').disabled = false; // enables button to click after answer has benn chosen
    }
}
// function to remove set CSS classes
function resetAnswers() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

// start quiz again
function playAgain() {
    document.getElementById('endCard').style = 'display: none;'; // add CSS class d-cone to show end screen
    document.getElementById('quizCard').style = ''; // removes CSS class d-none
    currentQuestion = 0; // sets current questin back to the first
    rightQuestions = 0; // sets variable of rightQuestions back to 0
    document.getElementById('next-button').innerHTML = 'Nächste Frage'; // change button text back to origin
    startQuiz(); // call function init to fill questions
}

