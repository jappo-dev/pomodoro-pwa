// Variables for Timer
let timer;
let isRunning = false;
let currentTime = 25 * 60; // Initial work time in seconds
let workDuration = 25; // Default work duration
let breakDuration = 5; // Default break duration
let sessionsCompleted = 0; // Track completed Pomodoro sessions
let isWorkSession = true; // Track if it's a work or break session

// Select DOM Elements
const timerDisplay = document.getElementById("timer");
const startPauseBtn = document.getElementById("startPauseBtn");
const sessionInfo = document.getElementById("session-info");
const progressBar = document.getElementById("progress-bar");
const workDurationSlider = document.getElementById('work-duration');
const breakDurationSlider = document.getElementById('break-duration');
const workDurationDisplay = document.getElementById('work-duration-display');
const breakDurationDisplay = document.getElementById('break-duration-display');
const endSound = document.getElementById("endSound");
const darkModeBtn = document.getElementById("darkModeBtn");

// Event Listeners
startPauseBtn.addEventListener("click", toggleTimer);
workDurationSlider.addEventListener("input", updateWorkDuration);
breakDurationSlider.addEventListener("input", updateBreakDuration);
darkModeBtn.addEventListener("click", toggleDarkMode);

// Toggle Timer
function toggleTimer() {
    if (isRunning) {
        clearInterval(timer);
        startPauseBtn.textContent = "Start";
        startPauseBtn.setAttribute('aria-label', 'Start Timer');
    } else {
        timer = setInterval(updateTime, 1000);
        startPauseBtn.textContent = "Pause";
        startPauseBtn.setAttribute('aria-label', 'Pause Timer');
    }
    isRunning = !isRunning;
}

// Update Work Duration
function updateWorkDuration() {
    workDuration = parseInt(workDurationSlider.value);
    workDurationDisplay.textContent = workDuration;
    workDurationSlider.setAttribute('aria-valuenow', workDuration);
    if (!isRunning) {
        currentTime = workDuration * 60;
        updateDisplay();
    }
}

// Update Break Duration
function updateBreakDuration() {
    breakDuration = parseInt(breakDurationSlider.value);
    breakDurationDisplay.textContent = breakDuration;
    breakDurationSlider.setAttribute('aria-valuenow', breakDuration);
    if (!isRunning && !isWorkSession) {
        currentTime = breakDuration * 60;
        updateDisplay();
    }
}

// Update Timer
function updateTime() {
    currentTime--;
    updateDisplay();
    updateProgressBar();

    if (currentTime <= 0) {
        handleSessionEnd();
    }
}

// Update Timer Display
function updateDisplay() {
    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime % 60;
    timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Update Progress Bar
function updateProgressBar() {
    const progress = (1 - (currentTime / (isWorkSession ? workDuration : breakDuration) / 60)) * 100;
    progressBar.style.width = progress + "%";
    progressBar.setAttribute('aria-valuenow', progress);
}

// Handle Session End (Work or Break)
function handleSessionEnd() {
    endSound.play();
    sessionsCompleted++;
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
    startPauseBtn.setAttribute('aria-label', 'Start Timer');
    isRunning = false;
}

// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    darkModeBtn.setAttribute('aria-label', document.body.classList.contains("dark-mode") ? 'Switch to Light Mode' : 'Switch to Dark Mode');
}
