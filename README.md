# TTSNeuro

This repository contains prototypes of a voice assistant for the Denza N9 MMC.
Originally an Android app, the project now also includes a simple web-based
implementation. Both variants communicate with an external AI model over MCP.

## Web Version

The `web` directory holds a minimal Node.js server (`server.js`) and a browser
client. To run it:

```bash
cd web
npm install
env OPENAI_API_KEY=YOUR_KEY node server.js
```

Then open `http://localhost:3000` in a modern browser and use the **Start**
button to begin speech recognition. The recognized text is sent to the server and
a dummy AI response is displayed on the page.

If you see an error like `Cannot find module 'express'` when starting the
server, ensure you've run `npm install` inside the `web` directory.

## Android Version

The Android prototype remains in the `app` directory. Open it with Android
Studio if you want to experiment with the mobile approach.
It now connects to the Node.js server via WebSocket and shows the AI response
on the car display. Launch the server first and ensure the device has network
access to it.
