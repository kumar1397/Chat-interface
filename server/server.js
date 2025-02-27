const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const axios = require('axios'); // ✅ Import axios

const app = express();

app.use(cors({ origin: 'http://localhost:3000' })); // ✅ Keep only one CORS setup
app.use(express.json());

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
const PORT = process.env.PORT || 5000; // ✅ Fallback to 5000 if undefined

app.post('/api/completion', async (req, res) => {
    try {
        const { message } = req.body;
        console.log("Received message:", message);

        const response = await axios.post(
            'https://api.mistral.ai/v1/chat/completions',
            {
                model: 'mistral-small-latest', // Options: 'mistral-tiny', 'mistral-small', 'mistral-large'
                messages: [{ role: 'user', content: message }],
                temperature: 0.7,
                max_tokens: 256
            },
            {
                headers: {
                    'Authorization': `Bearer ${MISTRAL_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log("Mistral Response:", response.data);
        res.json({ result: response.data.choices[0].message.content });
    } catch (error) {
        console.error("Error in /api/completion:", error.response?.data || error.message);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
