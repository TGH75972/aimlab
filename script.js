let score = 0;
let dotCount = 0;
let dotTimeout;
const maxDots = 30;
let dotDelay = 1400;
let dotColor = 'red';
let lastDifficulty = null;

document.getElementById('eye').addEventListener('click', startGame);

function startGame() {
    if (dotCount === 0 || dotCount >= maxDots) {
        if (lastDifficulty === null) {
            setDifficulty('easy');
        } else {
            setDifficulty(lastDifficulty);
        }
        generateDot();
    }
}

function updateScore() {
    document.getElementById('score').textContent = score;
}

function generateDot() {
    if (dotCount >= maxDots) {
        setTimeout(resetGame, 1000);
        return;
    }

    dotCount++;

    const gameArea = document.getElementById('gameArea');
    const dot = document.createElement('div');
    dot.classList.add('dot');

    dot.style.backgroundColor = dotColor;

    const x = Math.random() * (gameArea.clientWidth - 20);
    const y = Math.random() * (gameArea.clientHeight - 20);

    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;

    dot.addEventListener('click', () => {
        score++;
        updateScore();
        dot.remove();
        clearTimeout(dotTimeout);
        if (dotCount < maxDots) {
            generateDot();
        }
    });

    gameArea.appendChild(dot);

    dotTimeout = setTimeout(() => {
        dot.remove();
        if (dotCount < maxDots) {
            generateDot();
        }
    }, dotDelay);
}

function resetGame() {
    score = 0;
    dotCount = 0;
    updateScore();
    clearTimeout(dotTimeout);
    document.getElementById('gameArea').innerHTML = '';

    window.scrollTo({ top: 0, behavior: 'smooth' });
} 


function setDifficulty(difficulty) {
    switch (difficulty) {
        case 'easy':
            dotDelay = 1400;
            break;
        case 'medium':
            dotDelay = 1000;
            break;
        case 'hard':
            dotDelay = 600;
            break;
        default:
            dotDelay = 1400; 
            break;
    }
    lastDifficulty = difficulty;
}

document.getElementById('easyButton').addEventListener('click', function() {
    setDifficulty('easy');
    resetGame();
});

document.getElementById('mediumButton').addEventListener('click', function() {
    setDifficulty('medium');
    resetGame();
});

document.getElementById('hardButton').addEventListener('click', function() {
    setDifficulty('hard');
    resetGame();
});

document.getElementById('redButton').addEventListener('click', function() {
    dotColor = 'red';
});

document.getElementById('yellowButton').addEventListener('click', function() {
    dotColor = 'yellow';
});

document.getElementById('greenButton').addEventListener('click', function() {
    dotColor = 'greenyellow';
});

updateScore();
