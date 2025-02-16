// Variables for Timer
let timer;
let isRunning = false;
let isWorkSession = true;
let workDuration = 25; // Default work duration (in minutes)
let breakDuration = 5; // Default break duration (in minutes)
let currentTime = workDuration * 60; // in seconds
let sessionsCompleted = localStorage.getItem("sessionsCompleted") || 0;
let timerEndSound = document.getElementById("endSound");
let taskInput = document.getElementById("task-input");
let quoteBtn = document.getElementById("quoteBtn");

// Select DOM Elements
const timerDisplay = document.getElementById("timer");
const startPauseBtn = document.getElementById("startPauseBtn");
const darkModeBtn = document.getElementById("darkModeBtn");
const progressBar = document.getElementById("progress-bar");
const sessionInfo = document.getElementById("session-info");

// Event Listeners
startPauseBtn.addEventListener("click", toggleTimer);
darkModeBtn.addEventListener("click", toggleDarkMode);
quoteBtn.addEventListener("click", showMotivationalQuote);

// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".container").classList.toggle("dark-mode");
}

// Show Motivational Quote
function showMotivationalQuote() {
    const quotes = [
        "Success is the sum of small efforts, repeated day in and day out.",
        "The way to get started is to quit talking and begin doing.",
        "Don’t watch the clock; do what it does. Keep going."
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    alert(randomQuote);
}

// Start or Pause Timer
function toggleTimer() {
    if (isRunning) {
        clearInterval(timer);
        startPauseBtn.textContent = "Resume";
    } else {
        timer = setInterval(updateTime, 1000);
        startPauseBtn.textContent = "Pause";
    }
    isRunning = !isRunning;
}

// Update Timer
function updateTime() {
    currentTime--;
    updateDisplay();

    if (currentTime <= 0) {
        handleSessionEnd();
    }
}

// Update Timer Display
function updateDisplay() {
    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime % 60;
    timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    // Update progress bar
    let progress = (1 - currentTime / (isWorkSession ? workDuration : breakDuration) / 60) * 100;
    progressBar.style.width = `${progress}%`;
}

// Handle Session End
function handleSessionEnd() {
    timerEndSound.play();
    sessionsCompleted++;
    localStorage.setItem("sessionsCompleted", sessionsCompleted);
    sessionInfo.textContent = `Sessions Completed: ${sessionsCompleted}`;

    if (isWorkSession) {
        currentTime = breakDuration * 60; // Set to break time
        alert("Pomodoro session is complete! Time for a break.");
    } else {
        currentTime = workDuration * 60; // Set to work time
        alert("Break is over! Time to get back to work.");
    }
    isWorkSession = !isWorkSession;
    clearInterval(timer);
    startPauseBtn.textContent = "Start";
    isRunning = false;
}

// Set Custom Timer Durations
document.getElementById("work-duration").addEventListener("input", (e) => {
    workDuration = parseInt(e.target.value, 10);
    currentTime = workDuration * 60;
});

document.getElementById("break-duration").addEventListener("input", (e) => {
    breakDuration = parseInt(e.target.value, 10);
});
