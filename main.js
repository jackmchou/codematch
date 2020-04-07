const container = document.querySelector('.container');
const tries = document.querySelector("#tries");
const gamesPlayed = document.getElementById('played');
const pct = document.getElementById('pct');
let numOfCards = 18;
let counter = 0;
let attempts = 0;
let matchedCount = 0;
let iconArray = [
  'fa-archive',
  'fa-bug',
  'fa-code',
  'fa-microchip',
  'fa-coffee',
  'fa-file',
  'fa-terminal',
  'fa-sitemap',
  'fa-qrcode'
]

const gameOperations = {
  setStats(matches) {
    console.log(matches)
    pct.textContent = parseFloat((matches / attempts) * 100).toFixed(2);
  },
  resetGame() {
    Array.from(container.querySelectorAll('.match')).forEach((match) => {
      match.classList.remove('match');
      match.classList.add('card');
    });
  }
}

const cardOperations = {
  flipCard(event) {
    const cur = event.currentTarget;
    const tgt = event.target;
    if (tgt.classList.contains('card')) {
      tgt.classList.add('flip');
      counter++;
    }
    if (counter === 2) {
      counter = 0;
      attempts++;
      tries.textContent = attempts;
      const pair = Array.from(cur.querySelectorAll('.flip'));
      const ID = pair.map(card => card.dataset.id );
      setTimeout(() => {
        if (ID[0] === ID[1]) {
          matchedCount++;
          gameOperations.setStats(matchedCount);
          pair.forEach((card) => {
            card.classList.add('match');
            card.classList.remove('flip');
            card.classList.remove('card');
            const matchedElements = document.querySelectorAll('.match');
            if (matchedElements.length === numOfCards) {
              gamesPlayed.textContent++;
              gameOperations.resetGame();
            }
          });
        } else {
          pair.forEach(card => {
            card.classList.remove('flip');
          });
        }
      }, 750);
    }
    gameOperations.setStats(matchedCount);
  },
  shuffleCard(array) {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.random() * i | 0;
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      // array.splice(array[i], (array[Math.random() * i | 0] - 1));
    }
    return array;
  }
};

let cardArray = iconArray.concat(iconArray);
let shuffled = cardArray;
// let shuffled = cardOperations.shuffleCard(cardArray);
for (let i = 0; i < cardArray.length; i++) {
  container.insertAdjacentHTML(
    "beforeend", `<div class='card'><i class='fas'></i></div>`
  );
}

Array.from(container.querySelectorAll(".fas")).forEach((fas, i) => {
  fas.classList.add(shuffled[i]);
  let ID = shuffled[i].split("-");
  fas.parentElement.dataset.id = ID[1];
});
container.addEventListener("click", cardOperations.flipCard);