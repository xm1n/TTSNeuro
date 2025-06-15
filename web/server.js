const express = require('express');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(__dirname));

wss.on('connection', ws => {
    ws.on('message', message => {
        // TODO: send message to AI model via MCP and get response
        console.log('Received:', message.toString());
        // For now just echo back
        ws.send(`AI response for: ${message}`);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
