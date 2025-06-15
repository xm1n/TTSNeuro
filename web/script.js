const recordButton = document.getElementById('recordButton');
const resultElem = document.getElementById('result');
let recognizing = false;

const ws = new WebSocket(`ws://${location.host}`);

ws.addEventListener('message', event => {
    resultElem.textContent = event.data;
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognizer = new SpeechRecognition();
recognizer.lang = 'ru-RU';
recognizer.continuous = false;

recognizer.onresult = e => {
    const text = e.results[0][0].transcript;
    ws.send(text);
};

recognizer.onend = () => {
    recognizing = false;
    recordButton.textContent = 'Start';
};

recordButton.addEventListener('click', () => {
    if (recognizing) {
        recognizer.stop();
        recognizing = false;
        recordButton.textContent = 'Start';
    } else {
        recognizer.start();
        recognizing = true;
        recordButton.textContent = 'Stop';
    }
});
