function sendMessage(event) {
    if (event.key === 'Enter') {
        sendButton();
    }
    return false;
}

function sendButton() {
    const userInput = document.getElementById('userInput').value.trim();
    
    if (userInput !== '') {
        addMessage(userInput, 'user-message');
        document.getElementById('userInput').value = ''; // Clear input field

        // Mock response after a short delay to simulate real-time response
        setTimeout(function() {
            getBotResponse(userInput);
        }, 500);
    }
}

function addMessage(text, className) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.textContent = text;

    const chatbox = document.getElementById('chatbox');
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to bottom
}

function getBotResponse(userInput) {
    // Here we simulate a bot response
    let botResponse = '';

    switch (userInput.toLowerCase()) {
        case 'hello':
            botResponse = 'Hello! How can I assist you?';
            break;
        case 'how are you?':
            botResponse = 'I’m just a bot, but I’m doing great! How about you?';
            break;
        case 'bye':
            botResponse = 'Goodbye! Have a great day!';
            break;
        default:
            botResponse = 'Sorry, I didn’t understand that. Can you rephrase?';
    }

    addMessage(botResponse, 'bot-message');
}
