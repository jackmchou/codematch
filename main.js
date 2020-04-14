const gameOperations = {
  container: document.querySelector('.container'),
  startGame () {
    const iconArray = [
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
    const cardArray = iconArray.concat(iconArray)
    // Below variable used for testing purposes to prevent shuffling
    // let shuffled = cardArray;
    const shuffled = cardOperations.shuffleCard(cardArray)
    cardArray.forEach(() => {
      this.container.insertAdjacentHTML(
        'beforeend', '<div class=\'card\'><i class=\'fas\'></i></div>'
      )
    })
    Array.from(this.container.querySelectorAll('.fas')).forEach((fas, i) => {
      fas.classList.add(shuffled[i])
      const ID = shuffled[i].split('-')
      fas.parentElement.dataset.id = ID[1]
    })
    this.container.addEventListener('click', cardOperations.flipCard)
  },
  setStats (matches, attempts) {
    const pct = document.getElementById('pct')
    const accuracy = parseFloat((matches / attempts) * 100).toFixed(2)
    pct.textContent = `${isNaN(accuracy) ? '0' : accuracy}%`
  },
  resetGame () {
    Array.from(this.container.querySelectorAll('.match')).forEach((match) => {
      match.classList.remove('match')
      match.classList.add('card')
    })
  }
}

const cardOperations = {
  counter: 0,
  attempts: 0,
  matchedCount: 0,
  flipCard (event) {
    const cur = event.currentTarget
    const tgt = event.target
    const tries = document.querySelector('#tries')
    const gamesPlayed = document.getElementById('played')
    const numOfCards = 18
    if (tgt.classList.contains('card')) {
      tgt.classList.add('flip')
      cardOperations.counter++
    }
    if (cardOperations.counter === 2) {
      cardOperations.counter = 0
      cardOperations.attempts++
      tries.textContent = cardOperations.attempts
      const pair = Array.from(cur.querySelectorAll('.flip'))
      const ID = pair.map(card => card.dataset.id)
      setTimeout(() => {
        if (ID[0] === ID[1]) {
          cardOperations.matchedCount++
          gameOperations.setStats(cardOperations.matchedCount, cardOperations.attempts)
          pair.forEach((card) => {
            card.classList.add('match')
            card.classList.remove('flip')
            card.classList.remove('card')
            const matchedElements = document.querySelectorAll('.match')
            if (matchedElements.length === numOfCards) {
              gamesPlayed.textContent++
              gameOperations.resetGame()
            }
          })
        } else {
          pair.forEach(card => {
            card.classList.remove('flip')
          })
        }
      }, 750)
    }
    gameOperations.setStats(cardOperations.matchedCount, cardOperations.attempts)
  },
  shuffleCard (array) {
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
