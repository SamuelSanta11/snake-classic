const startScreen = document.getElementById("startScreen");
const difficultyScreen = document.getElementById("difficultyScreen");
const gameScreen = document.getElementById("gameScreen");
const gameCanvas = document.getElementById("gameCanvas");

let gameState = "start";
let selectedDifficulty = 0;

const difficulties = ["easy", "normal", "hard"];

document.addEventListener("keydown", (e) => {

    if (["ArrowUp", "ArrowDown", "Enter"].includes(e.key)) {
        e.preventDefault();
    }

    switch (gameState) {

        case "start":
            if (e.key === "Enter") {
                showScreen("difficulty");
            }
            break;

        case "difficulty":
            handleDifficultyInput(e.key);
            break;

        case "playing":
            // Aquí luego irá movimiento snake
            break;
    }
});

function showScreen(state) {

    startScreen.classList.remove("active");
    difficultyScreen.classList.remove("active");
    gameScreen.classList.remove("active");

    gameState = state;

    if (state === "start") {
        startScreen.classList.add("active");
    }

    if (state === "difficulty") {
        difficultyScreen.classList.add("active");
        updateDifficultyUI();
    }

    if (state === "playing") {
        gameScreen.classList.add("active");
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

function startGame() {
    console.log("Dificultad seleccionada:", difficulties[selectedDifficulty]);
    showScreen("playing");
}

// Inicializar el juego en la pantalla de inicio
showScreen("start");
