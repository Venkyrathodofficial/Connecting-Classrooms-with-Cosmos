const questions = [
    {
        question: "What is ocean acidification primarily caused by?",
        options: [
            "Excess nitrogen in the air",
            "Increased CO2 absorption by oceans",
            "Global warming",
            "Overfishing"
        ],
        answer: 1, // Index of the correct answer
        explanation: "Ocean acidification occurs as oceans absorb more CO2, lowering their pH levels."
    },
    {
        question: "Which marine species is most affected by ocean acidification?",
        options: [
            "Dolphins",
            "Coral reefs",
            "Tuna",
            "Sharks"
        ],
        answer: 1,
        explanation: "Coral reefs are highly sensitive to changes in pH, making them vulnerable to acidification."
    },
    {
        question: "What is the effect of ocean acidification on shell-forming marine organisms?",
        options: [
            "It strengthens their shells",
            "It weakens their shells",
            "It has no effect",
            "It increases their size"
        ],
        answer: 1,
        explanation: "Increased acidity reduces the availability of carbonate ions, essential for shell formation."
    },
    {
        question: "How does ocean acidification affect marine ecosystems?",
        options: [
            "It makes them more diverse",
            "It disrupts marine food chains",
            "It increases oxygen levels in water",
            "It encourages more marine life"
        ],
        answer: 1,
        explanation: "Ocean acidification can harm key species, disrupting the entire marine food web."
    },
    {
        question: "Which chemical process is disrupted by ocean acidification?",
        options: [
            "Photosynthesis",
            "Calcification",
            "Respiration",
            "Combustion"
        ],
        answer: 1,
        explanation: "Calcification, the process by which marine organisms build their shells and skeletons, is hindered by lower pH levels."
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
