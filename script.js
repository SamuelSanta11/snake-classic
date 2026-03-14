const startScreen = document.getElementById("startScreen");
const difficultyScreen = document.getElementById("difficultyScreen");
const gameScreen = document.getElementById("gameScreen");
const restartBtn = document.getElementById("restartBtn");
const exitBtn = document.getElementById("exitBtn");
const gameOverModal = document.getElementById("gameOverModal");

let gameState = "start";
let selectedDifficulty = 0;

const difficulties = ["easy", "normal", "hard"];

const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");

const boxSize = 20;
const canvasSize = 400;
const tiles = canvasSize / boxSize;

let snake = [];
let direction = "right";
let lastDirection = "right";
let food = null;
let gameInterval = null;

document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(e) {

    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter"].includes(e.key)) {
        e.preventDefault();
    }

    switch (gameState) {

        case "start":
            if (e.key === "Enter") showScreen("difficulty");
            break;

        case "difficulty":
            handleDifficultyInput(e.key);
            break;

        case "playing":
            handleGameInput(e.key);
            break;
    }
}

function handleGameInput(key) {

    if (key === "ArrowUp" && lastDirection !== "down") direction = "up";
    if (key === "ArrowDown" && lastDirection !== "up") direction = "down";
    if (key === "ArrowLeft" && lastDirection !== "right") direction = "left";
    if (key === "ArrowRight" && lastDirection !== "left") direction = "right";
}

function showScreen(state) {

    startScreen.style.display = "none";
    difficultyScreen.style.display = "none";
    gameScreen.style.display = "none";
    if (gameOverModal) gameOverModal.style.display = "none";

    gameState = state;

    if (state === "start") {
        startScreen.style.display = "flex";
    }

    if (state === "difficulty") {
        difficultyScreen.style.display = "flex";
        updateDifficultyUI();
    }

    if (state === "playing") {
        gameScreen.style.display = "flex";
    }
}

function handleDifficultyInput(key) {

    if (key === "ArrowUp") {
        selectedDifficulty =
            (selectedDifficulty - 1 + difficulties.length) % difficulties.length;
    }

    if (key === "ArrowDown") {
        selectedDifficulty =
            (selectedDifficulty + 1) % difficulties.length;
    }

    if (key === "Enter") {
        startGame();
        return;
    }

    updateDifficultyUI();
}

function updateDifficultyUI() {
    difficulties.forEach((level, index) => {
        const element = document.getElementById(level);
        element.classList.toggle("active", index === selectedDifficulty);
        element.onclick = () => {
            selectedDifficulty = index;
            startGame();
        };
    });
}



function gameLoop() {
    clearCanvas();
    moveSnake();
    lastDirection = direction;
    checkCollision();
    checkFoodCollision();
    drawFood();
    drawSnake();
}



function moveSnake() {

    const head = { ...snake[0] };

    if (direction === "up") head.y--;
    if (direction === "down") head.y++;
    if (direction === "left") head.x--;
    if (direction === "right") head.x++;

    snake.unshift(head);
    snake.pop();
}



function checkCollision() {

    const head = snake[0];

    
    if (
        head.x < 0 ||
        head.x >= tiles ||
        head.y < 0 ||
        head.y >= tiles
    ) {
        gameOver();
    }

    
    for (let i = 1; i < snake.length; i++) {

        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }

    }
}


function gameOver() {

    clearInterval(gameInterval);

    gameOverModal.style.display = "flex";
}

restartBtn.addEventListener("click", () => {
    gameOverModal.style.display = "none";
    startGame();
});

exitBtn.addEventListener("click", () => {
    gameOverModal.style.display = "none";
    showScreen("start");
})

function drawSnake() {
    ctx.fillStyle = "lime";

    snake.forEach(segment => {
        ctx.fillRect(
            segment.x * boxSize,
            segment.y * boxSize,
            boxSize,
            boxSize
        );
    });
}



function clearCanvas() {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvasSize, canvasSize);
}



function generateFood() {
    return {
        x: Math.floor(Math.random() * tiles),
        y: Math.floor(Math.random() * tiles),
        color: getRandomColor()
    };
}



function getRandomColor() {
    const colors = ["red", "yellow", "blue", "purple"];
    return colors[Math.floor(Math.random() * colors.length)];
}



function drawFood() {

    if (!food) return;

    ctx.fillStyle = food.color;
    ctx.fillRect(
        food.x * boxSize,
        food.y * boxSize,
        boxSize,
        boxSize
    );
}



function checkFoodCollision() {

    const head = snake[0];

    if (food && head.x === food.x && head.y === food.y) {

        snake.push({ ...snake[snake.length - 1] });
        food = generateFood();

    }
}



function startGame() {

    showScreen("playing");

    snake = [{ x: 10, y: 10 }];
    direction = "right";
    lastDirection = "right";
    food = generateFood();

    clearInterval(gameInterval);
    
    let speed = 200;
    if (difficulties[selectedDifficulty] === "normal") speed = 150;
    if (difficulties[selectedDifficulty] === "hard") speed = 100;
    
    gameInterval = setInterval(gameLoop, speed);
}



showScreen("start");