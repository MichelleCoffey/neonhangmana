const words = ['javascript', 'hangman', 'neon', 'rainbow', 'coding'];
let selectedWord;
let guessedLetters;
let mistakes;
let score = 0;

const wordContainer = document.getElementById('word-container');
const lettersContainer = document.getElementById('letters-container');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset-button');
const scoreElement = document.getElementById('score');
const hangman = document.getElementById('hangman');
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');

function initGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    mistakes = 0;
    message.textContent = '';
    hangman.style.display = 'block';
    resetHangman();
    updateWordDisplay();
    updateLettersDisplay();
    updateScoreDisplay();
}

function updateWordDisplay() {
    wordContainer.innerHTML = '';
    for (let i = 0; i < selectedWord.length; i++) {
        const letter = selectedWord[i];
        const span = document.createElement('span');
        span.textContent = guessedLetters.includes(letter) ? letter : '_';
        span.classList.add('neon-text', 'word-letter');
        wordContainer.appendChild(span);
    }
}

function updateLettersDisplay() {
    lettersContainer.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        const button = document.createElement('button');
        button.textContent = String.fromCharCode(i);
        button.disabled = guessedLetters.includes(button.textContent.toLowerCase());
        button.classList.add('neon-text', 'alphabet-button');
        button.addEventListener('click', () => guessLetter(button.textContent.toLowerCase()));
        lettersContainer.appendChild(button);
    }
}

function guessLetter(letter) {
    guessedLetters.push(letter);
    if (selectedWord.includes(letter)) {
        correctSound.play();
        updateWordDisplay();
        checkWin();
    } else {
        wrongSound.play();
        mistakes++;
        drawHangman(mistakes);
        if (mistakes >= 6) {
            message.textContent = 'Game Over!';
            disableAllButtons();
            updateScore(-1); // Deduct score on loss
        }
    }
    updateLettersDisplay();
}

function checkWin() {
    const wordGuessed = selectedWord.split('').every(letter => guessedLetters.includes(letter));
    if (wordGuessed) {
        message.textContent = 'You Win!';
        disableAllButtons();
        updateScore(1); // Add score on win
    }
}

function disableAllButtons() {
    const buttons = lettersContainer.querySelectorAll('button');
    buttons.forEach(button => button.disabled = true);
}

function resetHangman() {
    const parts = hangman.querySelectorAll('line, circle');
    parts.forEach(part => part.classList.remove('visible'));
}

function drawHangman(mistakes) {
    const parts = ['head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];
    if (mistakes > 0 && mistakes <= parts.length) {
        document.getElementById(parts[mistakes - 1]).classList.add('visible');
    }
}

function updateScore(points) {
    score += points;
    updateScoreDisplay();
}

function updateScoreDisplay() {
    scoreElement.textContent = score;
}

resetButton.addEventListener('click', initGame);

// Initialize the game on page load
initGame();

