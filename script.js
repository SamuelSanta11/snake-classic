const startScreen = document.getElementById("startScreen");
const difficultyScreen = document.getElementById("difficultyScreen");
const gameCanvas = document.getElementById("gameCanvas");

let gameState = "start";
let selectedDifficulty = 0;

const difficulties = ["easy", "normal", "hard"];

document.addEventListener("keydown", (e) => {
    if (["ArrowUp", "ArrowDown", "Enter"].includes(e.key)) {
        e.preventDefault();
    }

    if (gameState === "start" && e.key === "Enter") {
        openDifficultyMenu();
        return;
    }

    if (gameState === "difficulty") {
        handleDifficultyInput(e.key);
    }
});



function openDifficultyMenu() {
    startScreen.style.display = "none";
    difficultyScreen.style.display = "flex";
    gameState = "difficulty";
    updateDifficultyUI();
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
    }

    updateDifficultyUI();
}

function updateDifficultyUI() {
    difficulties.forEach((level, index) => {
        const element = document.getElementById(level);
        element.classList.remove("active");

        if (index === selectedDifficulty) {
            element.classList.add("active");
        }
    });
}

function startGame() {
    difficultyScreen.style.display = "none";
    gameCanvas.style.display = "block";
    gameState = "playing";

    console.log("Dificultad seleccionada:", difficulties[selectedDifficulty]);
}
