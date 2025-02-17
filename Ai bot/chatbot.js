// script.js

// Predefined responses for the chatbot
const responses = {
    "hello": "Hi there! How can I help you with climate change?",
    "what is climate change": "Climate change refers to significant changes in global temperatures and weather patterns over time.",
    "causes of climate change": "The main causes of climate change are human activities such as burning fossil fuels, deforestation, and industrial processes.",
    "how can we stop climate change": "We can help mitigate climate change by reducing emissions, using renewable energy, and promoting sustainable practices.",
    "effects of climate change": "Some effects of climate change include rising sea levels, more extreme weather, and loss of biodiversity.",
    "default": "Sorry, I don't understand that. Try asking about climate change."
};

// Function to capture user input and process the message
function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim().toLowerCase();
    
    if (userInput === "") return; // Ignore empty input

    appendMessage(userInput, 'user'); // Display user's message
    document.getElementById('user-input').value = ''; // Clear input field

    // Simulate chatbot response delay
    setTimeout(() => {
        const botResponse = getBotResponse(userInput);
        appendMessage(botResponse, 'bot'); // Display bot's response
    }, 500); // 500ms delay for bot's response
}

// Function to get a chatbot response based on user input
function getBotResponse(message) {
    return responses[message] || responses["default"]; // Get response or default
}

// Function to append a message to the chat box
function appendMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    
    messageElement.classList.add('message', ${sender}-message);
    messageElement.textContent = message;

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
}