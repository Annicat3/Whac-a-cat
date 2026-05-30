let currCatTile;
let score = 0;
let catTimer;
let catHideTimer;

let timeLeft = 30;
let gameOver = false;

window.onload = function() {
    document.getElementById("start-btn")
        .addEventListener("click", startGame);

    document.getElementById("reset-btn")
        .addEventListener("click", restartGame);
}

function startGame() {
    document.getElementById("start-btn").style.display = "none";
    setGame();
}

function restartGame() {
    location.reload();
}

function setGame() {
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }

    document.getElementById("time").innerText = timeLeft;
    document.getElementById("score").innerText = score;

    scheduleNextCat();
    setInterval(updateTimer, 1000);
}

function scheduleNextCat() {
    if (gameOver) {
        return;
    }

    if (catTimer) {
        clearTimeout(catTimer);
    }

    let delay = Math.floor(Math.random() * 700) + 300; // 300ms bis 1000ms
    catTimer = setTimeout(setCat, delay);
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setCat() {
    if (gameOver) {
        return;
    }

    if (currCatTile) {
        return;
    }

    let cat = document.createElement("img");
    let randomCat = Math.random();

    if (randomCat < 0.5) {
        cat.src = "./blackcat.png";
    } else {
        cat.src = "./tabbycat.png";
    }

    cat.alt = "cat";
    cat.draggable = false;
    cat.style.cursor = 'pointer';

    let num = getRandomTile();
    currCatTile = document.getElementById(num);
    currCatTile.appendChild(cat);

    if (catHideTimer) {
        clearTimeout(catHideTimer);
    }

    let hideDelay = Math.floor(Math.random() * 700) + 500; // 500ms bis 1200ms
    catHideTimer = setTimeout(() => {
        if (gameOver) {
            return;
        }
        if (currCatTile) {
            currCatTile.innerHTML = "";
            currCatTile = null;
        }
        scheduleNextCat();
    }, hideDelay);
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this === currCatTile) {
        score += 1;
        document.getElementById("score").innerText = score;
        currCatTile.innerHTML = "";
        currCatTile = null;

        if (catHideTimer) {
            clearTimeout(catHideTimer);
            catHideTimer = null;
        }

        scheduleNextCat();
    }
}

function updateTimer() {
    if (gameOver) {
        return;
    }
    timeLeft--;
    document.getElementById("time").innerText = timeLeft;
    if (timeLeft <= 0) {
        gameOver = true;
        alert("Time's up! Your final score is: " + score);
        document.getElementById("reset-btn").style.display = "block";

        if (catTimer) {
            clearTimeout(catTimer);
            catTimer = null;
        }

        if (catHideTimer) {
            clearTimeout(catHideTimer);
            catHideTimer = null;
        }

        if (currCatTile) {
            currCatTile.innerHTML = "";
            currCatTile = null;
        }
    }
}