let time = 0;
let timer = null;

const cards = Array.from(document.querySelectorAll(".card"));

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Shuffle cards
function shuffleCards() {
  cards.forEach(card => {
    card.style.order = Math.floor(Math.random() * cards.length);
  });
}

// Card click
cards.forEach(card => {
  card.addEventListener("click", () => {

    // Start timer on first click
    if (!timer) {
      timer = setInterval(() => {
        time++;
        document.getElementById("time").innerText = time;
      }, 1000);
    }

    if (lockBoard) return;
    if (card === firstCard) return;

    card.classList.add("change");

    if (!firstCard) {
      firstCard = card;
      return;
    }

    secondCard = card;
    checkMatch();
  });
});

// Check match
function checkMatch() {
  if (firstCard.dataset.value === secondCard.dataset.value) {

    // Disable matched cards
    firstCard.style.pointerEvents = "none";
    secondCard.style.pointerEvents = "none";

    resetCards();

    // Win condition
 if (document.querySelectorAll(".card.change").length === cards.length) {
  clearInterval(timer);

  setTimeout(() => {
    document.getElementById("finalTime").innerText = time;
    const popup = document.getElementById("winPopup");
    popup.style.display = "flex";

    setTimeout(() => {
      popup.style.display = "none";
    }, 1000);

  }, 1000);
}

  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("change");
      secondCard.classList.remove("change");
      resetCards();
    }, 1000);
  }
}

// Reset selection
function resetCards() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}
document.getElementById("play-again").addEventListener("click", () => {
  location.reload();
});

// Start game
shuffleCards();