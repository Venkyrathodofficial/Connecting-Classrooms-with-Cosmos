const questions = [
    {
        question: "What is the main consequence of melting polar ice caps?",
        options: [
            "Rising sea levels",
            "Increased global temperatures",
            "Increased wildlife populations",
            "Decreased cloud cover"
        ],
        correct: 0,  // Correct answer: Rising sea levels
        explanation: "Melting polar ice caps add water to the oceans, causing sea levels to rise and threatening coastal areas."
    },
    {
        question: "Which species is most affected by the melting of Arctic ice?",
        options: [
            "Penguins",
            "Polar bears",
            "Elephants",
            "Kangaroos"
        ],
        correct: 1,  // Correct answer: Polar bears
        explanation: "Polar bears rely on sea ice for hunting, and the melting ice reduces their habitat, threatening their survival."
    },
    {
        question: "What percentage of the world’s freshwater is stored in glaciers?",
        options: [
            "10%",
            "50%",
            "69%",
            "90%"
        ],
        correct: 2,  // Correct answer: 69%
        explanation: "Around 69% of the Earth's freshwater is stored in glaciers, highlighting their importance as a freshwater source."
    },
    {
        question: "Which of the following regions is seeing the most rapid glacial melt?",
        options: [
            "Greenland",
            "Amazon Rainforest",
            "Sahara Desert",
            "Australia"
        ],
        correct: 0,  // Correct answer: Greenland
        explanation: "Greenland is experiencing accelerated glacial melting due to rising global temperatures, contributing significantly to sea level rise."
    },
    {
        question: "Melting glaciers contribute directly to which of the following?",
        options: [
            "Ocean acidification",
            "Increased cloud formation",
            "Sea level rise",
            "Desert expansion"
        ],
        correct: 2,  // Correct answer: Sea level rise
        explanation: "As glaciers melt, they release large amounts of water into the oceans, leading to higher sea levels worldwide."
    }
];

let currentQuestionIndex = 0;
let score = 0;
const totalQuestions = questions.length;

function displayQuestion() {
    const questionElement = document.getElementById("question");
    const optionButtons = document.getElementsByClassName("option-btn");

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    for (let i = 0; i < optionButtons.length; i++) {
        optionButtons[i].textContent = currentQuestion.options[i];
    }

    resetExplanation();
    updateProgressBar();
}

function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    const optionButtons = document.getElementsByClassName("option-btn");

    if (selectedOption === currentQuestion.correct) {
        score++;
        optionButtons[selectedOption].style.backgroundColor = "#28a745";
    } else {
        optionButtons[selectedOption].style.backgroundColor = "#dc3545";
        optionButtons[currentQuestion.correct].style.backgroundColor = "#abeaab";
    }

    document.getElementById("next-btn").style.display = "block";
    disableOptions();
    showExplanation();
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < totalQuestions) {
        resetOptions();
        displayQuestion();
        document.getElementById("next-btn").style.display = "none";
    } else {
        displayResult();
    }
}

function updateProgressBar() {
    const progressFill = document.getElementById("progress-fill");
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    progressFill.style.width = `${progress}%`;
}

function displayResult() {
    document.getElementById("quiz-box").style.display = "none";
    const resultElement = document.getElementById("result");
    resultElement.textContent = `Your score is ${score}/${totalQuestions}`;
    resultElement.style.display = "block";
}

function disableOptions() {
    const optionButtons = document.getElementsByClassName("option-btn");
    for (let i = 0; i < optionButtons.length; i++) {
        optionButtons[i].disabled = true;
    }
}

function resetOptions() {
    const optionButtons = document.getElementsByClassName("option-btn");
    for (let i = 0; i < optionButtons.length; i++) {
        optionButtons[i].style.backgroundColor = "#007BFF";
        optionButtons[i].disabled = false;
    }
}

function showExplanation() {
    const explanationElement = document.getElementById("explanation");
    explanationElement.textContent = questions[currentQuestionIndex].explanation;
    explanationElement.style.display = "block";
}

function resetExplanation() {
    const explanationElement = document.getElementById("explanation");
    explanationElement.style.display = "none";
}

window.onload = () => {
    displayQuestion();
};
