const questions = [
    {
        question: "Which of the following is an extreme weather event linked to climate change?",
        options: [
            "a) Regular rainfall",
            "b) Hurricanes",
            "c) Mild winters",
            "d) Decreased winds"
        ],
        answer: "b) Hurricanes",
        explanation: "Hurricanes are extreme weather events that have been linked to climate change, as rising ocean temperatures can intensify their strength and frequency."
    },
    {
        question: "How does climate change affect the frequency of extreme weather events?",
        options: [
            "a) Decreases their frequency",
            "b) Has no impact",
            "c) Increases their frequency",
            "d) Stabilizes them"
        ],
        answer: "c) Increases their frequency",
        explanation: "Climate change is associated with an increase in the frequency and intensity of extreme weather events, such as storms, heatwaves, and heavy rainfall."
    },
    {
        question: "Which of the following events is most commonly linked to droughts?",
        options: [
            "a) Reduced rainfall",
            "b) Increased snowfall",
            "c) Earthquakes",
            "d) Flooding"
        ],
        answer: "a) Reduced rainfall",
        explanation: "Droughts are primarily linked to reduced rainfall, which leads to prolonged periods of dry conditions and water shortages."
    },
    {
        question: "What happens to hurricanes as ocean temperatures rise?",
        options: [
            "a) They become weaker",
            "b) They become stronger",
            "c) They decrease in number",
            "d) They stay the same"
        ],
        answer: "b) They become stronger",
        explanation: "Rising ocean temperatures provide more energy for hurricanes, resulting in stronger storms with higher wind speeds and greater potential for destruction."
    },
    {
        question: "Which part of the world is most prone to increased flooding due to climate change?",
        options: [
            "a) Deserts",
            "b) Coastal areas",
            "c) Tundra",
            "d) Grasslands"
        ],
        answer: "b) Coastal areas",
        explanation: "Coastal areas are most prone to increased flooding due to climate change, as rising sea levels and more intense storms lead to higher risks of inundation."
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
