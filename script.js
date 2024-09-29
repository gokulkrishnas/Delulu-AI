// Function to handle user pressing "Enter" to send a message
function sendMessage(event) {
    if (event.key === 'Enter') {
        sendButton();
    }
    return true;
}

// Function to handle button click
function sendButton() {
    const userInput = document.getElementById('userInput').value.trim();
    
    if (userInput !== '') {
        addMessage(userInput, 'user-message');
        document.getElementById('userInput').value = ''; // Clear input field

        // Send user input to backend for Groq API response
        sendToBackend(userInput);
    }
}

// Function to display messages in the chatbox
function addMessage(text, className) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.textContent = text;

    const chatbox = document.getElementById('chatbox');
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to bottom
}

// Function to handle the communication with the backend
function sendToBackend(userInput) {
    fetch('/chat', { // assuming your backend route is /chat
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
    })
    .then(response => response.json())
    .then(data => {
        const botResponse = data.response; // Expecting the API response here
        addMessage(botResponse, 'bot-message');
    })
    .catch((error) => {
        console.error('Error:', error);
        addMessage('Error: Could not reach the server', 'bot-message');
    });
}
