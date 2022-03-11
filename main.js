//get player name and marker
const getNameMarker = function (name,marker){
    return {name, marker};
};

const myGameModule = (() => {
    //html querySelectors
    const player1Name = document.querySelector('.player-1').value;
    const player2Name = document.querySelector('.player-2').value;
    const playerTurnText = document.querySelector('.player-turn-text');
    const startGameBtn = document.querySelector('.start-game-btn');

    const winningArray = [
        //horizontal
        [0,1,2],
        [3,4,5],
        [6,7,8],
        //vertical
        [0,3,6],
        [1,4,7],
        [2,5,8],
        //diagnol
        [0,4,8],
        [2,4,6]
    ];

    //assign player name and marker auto assigned
    let player1 = getNameMarker(player1Name, "X")
    let player2 = getNameMarker(player2Name, "O")

    //start game button
    const startGame = function(){
        startGameBtn.addEventListener('click', ()=>{
            playerTurnDisplay();
            //board becomes active and player can start clicking on box to place marker.
        })
    };
    //player turn display text
    const playerTurnDisplay = function() {
            //player turn text
            playerTurnText.textContent = `${player1}'s turn`
            playerTurnText.textContent = `${player2}'s turn`
            //palyer win text
            playerTurnText.textContent = `${player1} wins!`
            playerTurnText.textContent = `${player2} wins!`
            //game draw text
            playerTurnText.textContent = `its a draw!`
    };
    return {getNameMarker, startGame}
})();

myModule.startGame()