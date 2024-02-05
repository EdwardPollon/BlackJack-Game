let playerCards = []
let playerSum = 0
let dealerCards = []
let dealerSum = 0
let hasBlackJack = false
let isAlive = false
let playerHasStayed = false
let playerWon = false
let playerWager = 0
let message = ""
let messageEl = document.getElementById("message-el")
let playerSumEl = document.getElementById("playerSum-el")
let playerCardsEl = document.getElementById("playerCards-el")
let dealerSumEl = document.getElementById("dealerSum-el")
let dealerCardsEl = document.getElementById("dealerCards-el")

let player = {
    name: "Edward",
    chips: 100
}

let playerEl = document.getElementById("player-el")
playerEl.textContent = player.name + ": $" + player.chips

function getRandomCard() {
    randomNumber = Math.floor(Math.random()*13) + 1
    if(randomNumber > 10){
        return 10
    } else if(randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    isAlive = true
    playerHasStayed = false
    hasBlackJack = false
    playerWon = false
    let playerFirstCard = getRandomCard()
    let playerSecondCard = getRandomCard()
    playerCards = [playerFirstCard, playerSecondCard]
    playerSum = playerFirstCard + playerSecondCard
    let dealerFirstCard = getRandomCard()
    dealerCards = [dealerFirstCard]
    dealerSum = dealerFirstCard
    playerWager = document.getElementById("wager").value
    player.chips = player.chips - playerWager
    playerEl.textContent = player.name + ": $" + player.chips
    renderGame()
}

function renderGame() {
    dealerCardsEl.textContent = "Cards: "
    dealerSumEl.textContent = dealerSum
    for(let i=0; i<dealerCards.length; i++) {
        dealerCardsEl.textContent += dealerCards[i] + " "
    }
    playerCardsEl.textContent = "Cards: "
    for(let i=0; i<playerCards.length; i++){
        playerCardsEl.textContent += playerCards[i] + " "
    }
    playerSumEl.textContent = "Sum: " + playerSum
    if (playerSum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (playerSum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}

function newCard() {
    if (isAlive === true && hasBlackJack === false && playerHasStayed === false && playerWon === false) {
        console.log("Drawing a new card from the deck...")
        let card = getRandomCard()   
        playerCards.push(card)
        playerSum += card
        renderGame()
    }
}

function stay() {
    if (isAlive === true && playerWon === false) {
    playerHasStayed = true
        if(dealerSum < 18){
            do {
                let dealerCard = getRandomCard()
                dealerCards.push(dealerCard)
                dealerSum += dealerCard
                dealerCardsEl.textContent += dealerCard + " "
                dealerSumEl.textContent = "Sum: " + dealerSum
            } while (dealerSum < 18)
        }
        if (playerSum > dealerSum || dealerSum > 21) {
            message = "You win!"
            playerWon = true
            player.chips = player.chips + (playerWager * 2)
            playerEl.textContent = player.name + ": $" + player.chips
        } else if (dealerSum > playerSum) {
            message = "You lose..."
        } else {
            message = "It's a draw."
            player.chips = player.chips + (playerWager * 1)
            playerEl.textContent = player.name + ": $" + player.chips
        }
        messageEl.textContent = message
    }
}
