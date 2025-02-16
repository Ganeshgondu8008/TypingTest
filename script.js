const testModes = {
    "one-minute": "This is a one-minute typing test. Try to type as fast as possible.",
    "paragraph": "Typing speed is important for programmers. Improve it daily with practice.",
    "words-50": "Speed is key in typing. Accuracy matters as well. Improve steadily.",
    "numbers": "123 456 789 012 345 678 901 234 567 890",
    "symbols": "!@#$%^&*()_+{}[]:;'<>,.?/"
};

let startTime;
const loginScreen = document.getElementById("login-screen");
const testScreen = document.getElementById("test-screen");
const loginNameInput = document.getElementById("login-name");
const startTestButton = document.getElementById("start-test");
const userNameDisplay = document.getElementById("user-name");
const textToType = document.getElementById("text-to-type");
const typingArea = document.getElementById("typing-area");
const wpmDisplay = document.getElementById("wpm");
const restartButton = document.getElementById("restart");
const feedback = document.getElementById("feedback");

startTestButton.addEventListener("click", function () {
    const name = loginNameInput.value.trim();
    if (name) {
        userNameDisplay.textContent = `Welcome, ${name}!`;
        loginScreen.style.display = "none";
        testScreen.style.display = "block";
    }
});

document.querySelectorAll(".mode-btn").forEach(button => {
    button.addEventListener("click", function () {
        textToType.textContent = testModes[this.getAttribute("data-mode")];
        typingArea.value = "";
        wpmDisplay.textContent = "0";
        feedback.textContent = "";
        startTime = null;
    });
});

typingArea.addEventListener("input", function () {
    if (!startTime) {
        startTime = new Date();
    }

    const typedText = typingArea.value;
    const referenceText = textToType.textContent;

    let highlightedText = "";
    let correct = true;
    for (let i = 0; i < referenceText.length; i++) {
        if (typedText[i] === referenceText[i]) {
            highlightedText += `<span class="correct">${referenceText[i]}</span>`;
        } else if (typedText[i] !== undefined) {
            highlightedText += `<span class="incorrect">${referenceText[i]}</span>`;
            correct = false;
        } else {
            highlightedText += referenceText[i];
        }
    }
    textToType.innerHTML = highlightedText;

    const wordsTyped = typedText.trim().split(/\s+/).length;
    const timeElapsed = (new Date() - startTime) / 1000 / 60;
    const wpm = Math.floor(wordsTyped / timeElapsed);
    wpmDisplay.textContent = isNaN(wpm) || !isFinite(wpm) ? 0 : wpm;

    if (wpm < 20) {
        feedback.textContent = "Try to improve your speed! Keep practicing daily.";
    } else if (wpm < 40) {
        feedback.textContent = "Good job! But there's still room for improvement.";
    } else {
        feedback.textContent = "Great typing speed! Keep it up!";
    }
});

restartButton.addEventListener("click", function () {
    typingArea.value = "";
    textToType.innerHTML = "";
    wpmDisplay.textContent = "0";
    feedback.textContent = "";
    startTime = null;
});
