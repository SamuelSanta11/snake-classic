const startScreen = document.getElementById("startScreen"); 
const difficultyScreen = document.getElementById("difficultyScreen");
const gameScreen = document.getElementById("gameScreen");

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

    if (key === "ArrowUp" && direction !== "down") direction = "up";
    if (key === "ArrowDown" && direction !== "up") direction = "down";
    if (key === "ArrowLeft" && direction !== "right") direction = "left";
    if (key === "ArrowRight" && direction !== "left") direction = "right";
}

function showScreen(state) {

    startScreen.style.display = "none";
    difficultyScreen.style.display = "none";
    gameScreen.style.display = "none";

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
    });
}



function gameLoop() {
    clearCanvas();
    moveSnake();
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
        snake.push({}); // crecer
        food = generateFood();
    }
}


function startGame() {

    showScreen("playing");

    snake = [{ x: 10, y: 10 }];
    direction = "right";
    food = generateFood();

    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 200);
}


showScreen("start");
