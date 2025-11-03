const chatBox = document.getElementById('chat-box');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');

function appendMessage(sender, text) {
    const message = document.createElement('div');
    message.classList.add('chat-message', sender);
    message.textContent = (sender === 'user' ? 'You: ' : 'SilvFox: ') + text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;
    appendMessage('user', text);
    userInput.value = '';
    appendMessage('ai', "SilvFox: Loading response...");
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });
        const data = await response.json();
        chatBox.lastChild.remove();
        appendMessage('ai', data.reply);
    } catch (error) {
        chatBox.lastChild.textContent = "SilvFox: Error fetching response.";
        console.error(error);
    }
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
