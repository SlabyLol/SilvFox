// Node.js backend for SilvFox AI Chat
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [{ role: "user", content: userMessage }],
                max_tokens: 200
            })
        });
        const data = await response.json();
        const reply = data.choices[0].message.content.trim();
        res.json({ reply });
    } catch (err) {
        console.error(err);
        res.status(500).json({ reply: "SilvFox: Error fetching response." });
    }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
