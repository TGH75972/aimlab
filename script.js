let score = 0;
let dotCount = 0;
let dotTimeout;
const maxDots = 30;

document.getElementById('eye').addEventListener('click', startGame);

function startGame() {
    if (dotCount === 0) {
        generateDot();
    }
}

function updateScore() {
    document.getElementById('score').textContent = score;
}

function generateDot() {
    if (dotCount >= maxDots) {
        setTimeout(resetGame, 1400); 
        return;
    }

    dotCount++;

    const gameArea = document.getElementById('gameArea');
    const dot = document.createElement('div');
    dot.classList.add('dot');

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
    }, 2000);
}

function resetGame() {
    score = 0;
    dotCount = 0;
    updateScore();
    clearTimeout(dotTimeout);
    document.getElementById('gameArea').innerHTML = '';
}

updateScore();
