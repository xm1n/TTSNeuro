# Voice Assistant Design for Web Application

This document outlines an alternative approach for implementing the Denza N9 voice assistant as a web application instead of an Android app.

## Overview

- **Frontend**: A browser-based client using the Web Speech API for speech recognition. It connects to the backend via WebSocket to send the recognized text.
- **Backend**: A Node.js server (see `web/server.js`) that receives text commands and forwards them to the AI model over MCP. The response is sent back to the client for display.
- **Speaker Recognition**: A speaker verification module can be integrated server-side to check whether the voice belongs to the registered owner before sending the command to the AI.

## Flow

1. User opens the web page on the Denza N9 display or any connected device.
2. The user clicks the **Start** button to begin speech recognition.
3. The browser captures the speech, converts it to text, and sends it to the server over WebSocket.
4. The server optionally verifies the speaker and then forwards the text to the AI model via MCP.
5. The AI response is relayed back through the WebSocket and shown on the page.

## Example

```javascript
// Excerpt from web/server.js
wss.on('connection', ws => {
    ws.on('message', text => {
        // TODO: verify speaker and query AI
        ws.send(`AI response for: ${text}`);
    });
});
```

This setup allows the assistant to run in any modern browser without the need for an Android environment.
