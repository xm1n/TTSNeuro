const express = require('express');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');
const OpenAI = require('openai');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const openaiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: openaiKey });

async function queryAI(text) {
    if (!openaiKey) {
        return `Echo: ${text}`;
    }
    try {
        const result = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: text }]
        });
        return result.choices[0].message.content.trim();
    } catch (err) {
        console.error('AI error', err);
        return 'AI error';
    }
}

app.use(express.static(__dirname));

wss.on('connection', ws => {
    ws.on('message', async message => {
        console.log('Received:', message.toString());
        const reply = await queryAI(message.toString());
        ws.send(reply);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
