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
    const pressGrids = document.querySelectorAll('.box');
    console.log(pressGrids);

    //holds name and marker property
    const playerArray = [];

    //i will use this somehow to make taking turns work
    let playerOneTurn = true;
    let playerTwoTurn = false; 



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

    //assign player name and marker auto assigned marker
    let player1 = getNameMarker(player1Name, "X")
    let player2 = getNameMarker(player2Name, "O")
    //push player info to playerArray
    playerArray.push(player1, player2)

    console.log(player1)
    console.log(playerArray)

    //start game button
    const startGame = function(){
        startGameBtn.addEventListener('click', ()=>{
            playerTurnDisplay();
            //board becomes active and player can start clicking on box to place marker.
        })
    };

    //pressing grid marks X or O
    const markerOnGrid = function(){
        pressGrids.forEach((pressGrid) => {
            pressGrid.addEventListener('click', ()=>{
                if (playerOneTurn === true){
                    pressGrid.textContent = "X";
                    console.log(playerOneTurn , 'p1 turn');
                } 
            })
        })
    };
    markerOnGrid();







    //player turn display text
    const playerTurnDisplay = function() {
            //player turn text
            playerTurnText.textContent = `${player1.name}'s turn`
            // playerTurnText.textContent = `${player2.name}'s turn`
            //palyer win text
            // playerTurnText.textContent = `${player1.name} wins!`
            // playerTurnText.textContent = `${player2.name} wins!`
            //game draw text
            // playerTurnText.textContent = `its a draw!`
    };
    return {getNameMarker, startGame}
})();

myGameModule.startGame()









// else if (playerTwoTurn === true){
//     pressGrid.textContent = "O"
//     playerTwoTurn = false;
//     console.log(playerTwoTurn, 'p2 turn')
// }