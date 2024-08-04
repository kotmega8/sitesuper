// script.js
document.addEventListener("DOMContentLoaded", () => {
    const timerElement = document.getElementById("timer");
    const gameContainer = document.getElementById("game-container");
    const healthBar = document.getElementById("health-bar");
    const answerInput = document.getElementById("answer-input");
    const questionContainer = document.getElementById("question");
    const backgroundMusic = document.getElementById("background-music");

    let health = 100;
    let intervalId;
    let question;

    function startTimer(duration, display) {
        let timer = duration, seconds;
        intervalId = setInterval(() => {
            seconds = parseFloat((timer % 60).toFixed(1));
            display.textContent = seconds.toFixed(1);
            if (--timer < 0) {
                clearInterval(intervalId);
                startGame();
            }
        }, 100);
    }

    function startGame() {
        gameContainer.style.display = "block";
        timerElement.style.display = "none";
        answerInput.disabled = false;
        answerInput.focus();
        startHealthDecrease();
        generateQuestion();
    }

    function startHealthDecrease() {
        intervalId = setInterval(() => {
            health -= 1;
            updateHealthBar();
            if (health <= 0) {
                clearInterval(intervalId);
                alert("Игра окончена!");
                location.reload();
            }
        }, 100);
    }

    function updateHealthBar() {
        const leftHealth = (100 - health) / 2;
        const rightHealth = (100 - health) / 2;
        healthBar.style.background = `linear-gradient(to right, transparent ${leftHealth}%, red ${leftHealth}%, red ${100 - rightHealth}%, transparent ${100 - rightHealth}%)`;
    }

    function generateQuestion() {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        question = num1 + num2;
        questionContainer.textContent = `${num1} + ${num2} = ?`;
    }

    answerInput.addEventListener("input", () => {
        if (parseInt(answerInput.value) === question) {
            health = Math.min(health + 20, 100);
            updateHealthBar();
            answerInput.value = "";
            answerInput.style.backgroundColor = "lightgreen";
            generateQuestion();
        } else {
            answerInput.style.backgroundColor = "lightcoral";
        }
    });

    answerInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            if (parseInt(answerInput.value) !== question) {
                answerInput.disabled = true;
                setTimeout(() => {
                    answerInput.disabled = false;
                    answerInput.value = "";
                    answerInput.style.backgroundColor = "";
                }, 2000);
            }
        }
    });

    backgroundMusic.play();
    startTimer(65, timerElement);
});
