let sessionTime = 25; // Session time in minutes
let breakTime = 5; // Break time in minutes
let isSession = true; // Start with a session
let timerInterval;
let timeRemaining;
let progressInterval;

const startBtn = document.querySelector('.start-btn');
const resetBtn = document.querySelector('.reset-btn');
const timerDisplay = document.querySelector('.timer-display');
const sessionTimeDisplay = document.querySelector('.session-time');
const breakTimeDisplay = document.querySelector('.break-time');
const progressBar = document.querySelector('.progress-bar');

const sessionEndSound = new Audio('session-end.mp3');
const breakEndSound = new Audio('break-end.mp3');

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        clearInterval(progressInterval);
    }

    // Get session and break times from input fields
    sessionTime = parseInt(document.querySelector('.session-length').value);
    breakTime = parseInt(document.querySelector('.break-length').value);

    timeRemaining = isSession ? sessionTime * 60 : breakTime * 60;

    updateTimerDisplay();
    startCountdown();
}

function startCountdown() {
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            switchSession();
        }

    }, 1000);

    // Start the progress bar animation
    progressBar.style.transition = `width ${timeRemaining}s linear`;
    progressBar.style.width = '100%';

    // Update progress bar continuously
    progressInterval = setInterval(() => {
        let percentage = (1 - timeRemaining / (isSession ? sessionTime * 60 : breakTime * 60)) * 100;
        progressBar.style.width = `${percentage}%`;
    }, 1000);
}

function updateTimerDisplay() {
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function switchSession() {
    if (isSession) {
        // Switch to break
        isSession = false;
        timeRemaining = breakTime * 60;
        breakEndSound.play();  // Play break sound
        alert("Take a break!");
    } else {
        // Switch to work session
        isSession = true;
        timeRemaining = sessionTime * 60;
        sessionEndSound.play();  // Play session end sound
        alert("Back to work!");
    }
    startTimer();
}

function resetTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        clearInterval(progressInterval);
    }
    isSession = true;
    timeRemaining = sessionTime * 60;
    updateTimerDisplay();
    progressBar.style.width = '0%';
}
