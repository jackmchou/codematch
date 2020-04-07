const container = document.querySelector('.container');
const tries = document.querySelector("#tries");
const gamesPlayed = document.getElementById('played');
const pct = document.getElementById('pct');
let numOfCards = 18;
let counter = 0;
let attempts = 0;
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

let stats = {
  setStats(matches) {
    pct.textContent = parseFloat((matches.length / attempts) * 100).toFixed(2);
  }
}

let cardOps = {
  flipCard(event) {
    var cur = event.currentTarget;
    var tgt = event.target;
    let matches = document.querySelectorAll('.match');
    if (tgt.classList.contains('card')) {
      tgt.classList.add('flip');
      counter++;
    }
    if (counter === 2) {
      counter = 0;
      attempts++;
      tries.textContent = attempts;
      var pair = Array.from(cur.querySelectorAll('.flip'));
      var ID = pair.map(card => {
        return card.dataset.id;
      });
      setTimeout(() => {
        if (ID[0] === ID[1]) {
         pair.forEach((card) => {
          card.classList.add('match');
          card.classList.remove('flip');
          card.classList.remove('card');
          matches = document.querySelectorAll('.match');
          if (matches.length === numOfCards) {
            gamesPlayed.textContent++;
          }
         });
        } else {
         pair.forEach(card => {
          card.classList.remove('flip');
          // console.log(parseFloat((matches.length / points) * 100).toFixed(2))
          // container.removeEventListener("click", this.flipCard);
         });
        }
      }, 1000);
    }
    stats.setStats(matches);
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
  },
  resetGame(array) {
    Array.from(container.querySelectorAll('.match')).forEach((match) => {
      match.classList.remove('match');
      match.classList.add('card');
      gamesPlayed.textContent++;
    });
  }
};

let cardArray = iconArray.concat(iconArray);
let shuffled = cardArray;
// let shuffled = cardOps.shuffleCard(cardArray);
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
container.addEventListener("click", cardOps.flipCard);

