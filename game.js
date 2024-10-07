const cardDeck = [
    ...Array(4).fill('Exploding Kitten'),
    ...Array(6).fill('DEFUSE'),
    ...Array(4).fill('ATTACK (2x)'),
    ...Array(4).fill('FAVOR'),
    ...Array(5).fill('NOPE'),
    ...Array(4).fill('SHUFFLE'),
    ...Array(4).fill('SKIP'),
    ...Array(5).fill('SEE THE FUTURE (3x)'),
    ...Array(4).fill('CATCARD1'),
    ...Array(4).fill('CATCARD2'),
    ...Array(4).fill('CATCARD3'),
    ...Array(4).fill('CATCARD4'),
    ...Array(4).fill('CATCARD5')
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initializeGame(playerCount) {
    let gameDeck = [...cardDeck];
    let players = Array(playerCount).fill().map(() => []);
    
    const explodingKittens = gameDeck.filter(card => card === 'Exploding Kitten');
    const defuseCards = gameDeck.filter(card => card === 'DEFUSE');
    gameDeck = gameDeck.filter(card => card !== 'Exploding Kitten' && card !== 'DEFUSE');
    
    shuffleArray(gameDeck);
    
    for (let i = 0; i < 7 * playerCount; i++) {
        players[i % playerCount].push(gameDeck.pop());
    }
    
    players.forEach(hand => hand.push('DEFUSE'));
    
    gameDeck.push(...defuseCards.slice(playerCount));
    
    gameDeck.push(...explodingKittens);
    shuffleArray(gameDeck);
    
    return { players, gameDeck };
}

function dealCards(players, gameDeck) {
    const playerHandsElement = document.getElementById('player-hands');
    playerHandsElement.innerHTML = '';

    players.forEach((hand, index) => {
        const playerElement = document.createElement('div');
        playerElement.innerHTML = `<h3>玩家 ${index + 1} 的手牌：</h3>`;
        const cardContainer = document.createElement('div');
        cardContainer.style.display = 'flex';
        cardContainer.style.flexWrap = 'wrap';
        cardContainer.style.justifyContent = 'center';
        
        hand.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.textContent = card;
            cardElement.style.width = '100px';
            cardElement.style.height = '150px';
            cardElement.style.border = '1px solid black';
            cardElement.style.margin = '5px';
            cardElement.style.display = 'flex';
            cardElement.style.justifyContent = 'center';
            cardElement.style.alignItems = 'center';
            cardElement.style.backgroundColor = '#f8f8f8';
            cardContainer.appendChild(cardElement);
        });
        
        playerElement.appendChild(cardContainer);
        playerHandsElement.appendChild(playerElement);
    });

    const deckElement = document.createElement('div');
    deckElement.innerHTML = `<h3>剩余牌堆：${gameDeck.length} 张</h3>`;
    playerHandsElement.appendChild(deckElement);
}

document.getElementById('start-button').addEventListener('click', function() {
    alert('游戏开始！等待对手加入...');
    const { players, gameDeck } = initializeGame(2); // 假设有2名玩家
    console.log('玩家手牌:', players);
    console.log('剩余牌堆:', gameDeck);
    dealCards(players, gameDeck);
});