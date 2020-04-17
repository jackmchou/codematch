const gameOperations = {
  container: document.querySelector('.container'),
  modal: document.getElementById('winModal'),
  iconArray: [
    'fa-archive',
    'fa-bug',
    'fa-code',
    'fa-microchip',
    'fa-coffee',
    'fa-file',
    'fa-terminal',
    'fa-sitemap',
    'fa-qrcode'
  ],
  startGame() {
    const cardArray = this.iconArray.concat(this.iconArray)
    cardArray.forEach(() => {
      this.container.insertAdjacentHTML(
        'beforeend', '<div class=\'card\'><i class=\'fas\'></i></div>'
      )
    })
    this.resetCards();
    this.container.addEventListener('click', cardOperations.flipCard)
    this.gameResetOptions();
  },
  setStats(matches, attempts) {
    const pct = document.getElementById('pct')
    const accuracy = parseFloat((matches / attempts) * 100).toFixed(2)
    pct.textContent = `${isNaN(accuracy) ? '0' : accuracy}%`
  },
  resetCards() {
    const cardArray = this.iconArray.concat(this.iconArray)
    // Below variable used for testing purposes to prevent shuffling
    // let shuffled = cardArray;
    const shuffled = cardOperations.shuffleCard(cardArray)
    Array.from(this.container.querySelectorAll('.fas')).forEach((fas, idx) => {
      fas.classList.add(shuffled[idx])
      const ID = shuffled[idx].split('-')
      fas.parentElement.dataset.id = ID[1]
    })
    Array.from(this.container.querySelectorAll('.match')).forEach(match => {
      match.classList.remove('match')
      match.classList.add('card')
    })
  },
  gameResetOptions() {
    document.getElementById('playAgain').addEventListener('click', () => {
      this.modal.classList.add('hidden')
      document.getElementById('played').textContent++
      this.resetCards();
    })
    document.getElementById('startOver').addEventListener('click', () => {
      this.modal.classList.add('hidden')
      document.getElementById('played').textContent = 0
      this.setStats(0, 0)
      this.resetCards();
    })
  }
}

const cardOperations = {
  attempts: 0,
  matchedCount: 0,
  firstCardClicked: null,
  isProcessing: false,
  flipCard(event) {
    if (this.isProcessing) return
    const { currentTarget, target } = event
    const tries = document.querySelector('#tries')
    if (target.classList.contains('flip')) return
    target.classList.add('flip')
    if (!this.firstCardClicked) this.firstCardClicked = target
    else {
      const pair = Array.from(currentTarget.querySelectorAll('.flip'))
      const ID = pair.map(card => card.dataset.id)
      if (ID[0] === ID[1]) {
        tries.textContent = ++cardOperations.attempts
        cardOperations.matchedCount++
        gameOperations.setStats(cardOperations.matchedCount, cardOperations.attempts)
        pair.forEach((card) => {
          card.classList.add('match')
          card.classList.remove('flip', 'card')
          if (document.querySelectorAll('.match').length === 18) {
            document.getElementById('played').textContent++
            gameOperations.modal.classList.remove('hidden')
          }
        })
        this.firstCardClicked = null
      } else {
        tries.textContent = ++cardOperations.attempts
        this.isProcessing = true
        setTimeout(() => {
          pair.forEach(card => card.classList.remove('flip'))
          this.firstCardClicked = null
          this.isProcessing = false
        }, 750);
      }
    }
    gameOperations.setStats(cardOperations.matchedCount, cardOperations.attempts)
  },
  shuffleCard(array) {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.random() * i | 0
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array
  }
}

gameOperations.startGame()
