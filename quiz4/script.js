const questions = [
    {
        question: "Which gas is the most significant contributor to the greenhouse effect?",
        options: ["Nitrogen","Carbon dioxide","Oxygen", "Helium"],
        answer: 1,
        explanation: "Carbon dioxide is the most significant greenhouse gas because it remains in the atmosphere for a long time, effectively trapping heat and contributing to global warming."
    },
    {
        question: "Which of the following is not a greenhouse gas?",
        options: [ "Methane", "Water vapor", "Oxygen", "Nitrous oxide"],
        answer: 2,
        explanation: "Oxygen is not a greenhouse gas; it does not trap heat in the atmosphere like methane, water vapor, or nitrous oxide."
    },
    {
        question: "What human activity significantly increases methane emissions?",
        options: ["Deforestation","Agriculture", "Mining","Solar energy use"],
        answer: 1,
        explanation: "Agriculture, particularly livestock production and rice cultivation, significantly increases methane emissions due to the digestive processes of animals and the anaerobic conditions in flooded rice fields."
    },
    {
        question: "Which sector produces the most greenhouse gas emissions?",
        options: [ "Transportation","Energy production", "Waste management", "Fisheries"],
        answer: 1,
        explanation: "Energy production, particularly from fossil fuels, is the largest source of greenhouse gas emissions, primarily due to the burning of coal, oil, and natural gas."
    },
    {
        question: "How do greenhouse gases warm the Earth?",
        options: ["By trapping heat in the atmosphere","By increasing solar radiation","By reflecting sunlight back into space", "By cooling the Earth’s surface"],
        answer: 0,
        explanation: "Greenhouse gases trap heat in the Earth's atmosphere, preventing it from escaping into space, which warms the planet."
    },
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
