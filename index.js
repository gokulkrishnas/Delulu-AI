const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config(); // To load API key from .env

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());


app.post('/chat', async (req, res) => {
    const userInput = req.body.message;

    try {
        const response = await axios.post('https://api.groq.com/v1/chat/completions', {
            messages: [{ role: "user", content: userInput }],
            model: "llava-v1.5-7b-4096-preview" 
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const botResponse = response.data.choices[0].message.content;

        res.json({ response: botResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ response: 'Sorry, something went wrong with the bot.' });
    }
});

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname + '/public'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
