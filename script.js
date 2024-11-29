document.addEventListener("DOMContentLoaded", () => {
    const startgamecontainer = document.querySelector(".startgame"),
        startgamecards = document.querySelectorAll(".startgame .card"),
        startgame = document.querySelector(".startgame button"),
        playground = document.querySelector(".playground"),
        scoreDisplay = document.getElementById("score"),
        timerDisplay = document.getElementById("timer");

    let levels = 2,
        columns = 2,
        rows = 2,
        matched = 0,
        score = 0,
        timer = 60,
        cardone = null,
        cardtwo = null,
        IsPreventClick = false,
        countdown;


    startgamecards.forEach((element) => {
        element.addEventListener("click", (e) => {
            startgamecards.forEach((el) => el.classList.remove("active"));
            e.target.parentElement.classList.add("active");

            levels = parseInt(e.target.parentElement.getAttribute("level"));
            columns = parseInt(e.target.parentElement.getAttribute("column"));
            rows = parseInt(e.target.parentElement.getAttribute("row"));
        });
    });

    
    startgame.addEventListener("click", () => {
        startgamecontainer.style.display = "none";
        playground.style.display = "grid";
        playground.style.gridTemplateColumns = `repeat(${columns}, 100px)`;
        playground.style.gridTemplateRows = `repeat(${rows}, 100px)`;

        score = 0;
        scoreDisplay.textContent = score;
        matched = 0;
        timer = 60;
        timerDisplay.textContent = timer;

        startTimer();
        createCards();
    });

    
    function startTimer() {
        clearInterval(countdown);
        countdown = setInterval(() => {
            timer--;
            timerDisplay.textContent = timer;
            if (timer <= 0) {
                clearInterval(countdown);
                alert("Time's up! Game over.");
                resetGame();
            }
        }, 1000);
    }

    
    function resetGame() {
        clearInterval(countdown);
        playground.innerHTML = "";
        playground.style.display = "none";
        startgamecontainer.style.display = "flex";
        scoreDisplay.textContent = 0;
        timerDisplay.textContent = 60;
    }

    
    function createCards() {
        const cardArr = ["house", "bomb", "poo", "gift", "egg", "dragon", "car", "rocket"];
        const shuffledCards = shuffleArray([...cardArr.slice(0, levels), ...cardArr.slice(0, levels)]);

        playground.innerHTML = "";
        shuffledCards.forEach((card) => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("cards");
            cardElement.innerHTML = `
                <div class="front"><i class="fa-solid fa-question"></i></div>
                <div class="back"><i class="fa-solid fa-${card}"></i></div>
            `;
            cardElement.addEventListener("click", () => cardClicked(cardElement));
            playground.appendChild(cardElement);
        });
    }

    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    
    function cardClicked(card) {
        if (IsPreventClick || card === cardone || card.classList.contains("flipped")) return;

        card.classList.add("flipped");
        if (!cardone) {
            cardone = card;
            return;
        }

        cardtwo = card;
        IsPreventClick = true;

        if (cardone.innerHTML === cardtwo.innerHTML) {
            matched += 2;
            score += 10;
            scoreDisplay.textContent = score;
            cardone = cardtwo = null;
            IsPreventClick = false;
            if (matched === levels * 2) {
                clearInterval(countdown);
                setTimeout(() => alert('Congrats You Won!🏆🏅'), 500);
            }
        } else {
            setTimeout(() => {
                cardone.classList.remove('flipped');
                cardtwo.classList.remove('flipped');
                cardone = cardtwo = null;
                IsPreventClick = false;
            }, 1000);
        }
    }
});