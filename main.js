//get player name and marker
const getNameMarker = function (name,marker){
    return {name, marker};
};

const myGameModule = (() => {
    const player1Name = document.querySelector('.player-1');
    const player2Name = document.querySelector('.player-2');
    const playerTurnText = document.querySelector('.player-turn-text');
    const startGameBtn = document.querySelector('.start-game-btn');
    const pressGrids = document.querySelectorAll('.box');
    const restartGameBtns = document.querySelector('.restart-btn');
    const displayWinnerText = document.querySelector('.display-winner')

    const playerArray = [];

    //assign player name and marker auto assigned marker
    let player1 = getNameMarker(player1Name.value, "X");
    let player2 = getNameMarker(player2Name.value, "O");
    
    let playerOneTurn = true;
    let playerTwoTurn = false; 

    let isStartGame = false;

    //start game button
    const startGame = function(){
        startGameBtn.addEventListener('click', ()=>{

            player1 = getNameMarker(player1Name.value, "X");
            player2 = getNameMarker(player2Name.value, "O");
            playerArray.push(player1, player2);

            isStartGame = true;
            playerOneTurn = true;

            playerTurnDisplay();
            colorStartRestart()
        })
    };
    startGame();
 
    //pressing grid marks X or O
    const markerOnGrid = function(){
        pressGrids.forEach((pressGrid) => {
            pressGrid.addEventListener('click', ()=>{
                if (playerOneTurn && isStartGame){
                    pressGrid.textContent = playerArray[0].marker;

                    pressGrid.classList.toggle('disabled')

                    playerOneTurn = false;
                    playerTwoTurn = true;

                    checkWinner();
                    playerTurnDisplay();
                } else if(playerTwoTurn){
                    pressGrid.textContent = playerArray[1].marker;

                    pressGrid.classList.toggle('disabled')

                    playerOneTurn = true;
                    playerTwoTurn = false;

                    checkWinner();
                    playerTurnDisplay();
                }
            })
        })
    };
    markerOnGrid();

    //player turn display text
    const playerTurnDisplay = function() {
            //player turn text
            playerTurnText.textContent = `${player1.name}'s turn`;
            if (playerOneTurn){
                playerTurnText.textContent = `${player1.name}'s turn`;
            } else if(playerTwoTurn){
                playerTurnText.textContent = `${player2.name}'s turn`;
            }
    };

    //check for winner function WORK ON THIS 
    const checkWinner = () =>{
        const topLeft = pressGrids[0].textContent
        const topMiddle = pressGrids[1].textContent
        const topRight = pressGrids[2].textContent
        const middleLeft = pressGrids[3].textContent
        const middleMiddle = pressGrids[4].textContent
        const middleRight = pressGrids[5].textContent
        const bottomLeft = pressGrids[6].textContent
        const bottomMiddle = pressGrids[7].textContent
        const bottomRight = pressGrids[8].textContent

        let winner = "";
        
            if (topLeft && topLeft === topMiddle && topLeft === topRight){
                isStartGame = false;
                winner = topLeft;
            if (winner === 'X'){
                displayWinnerText.textContent = `${player1.name} is the winner`
            } else {
                displayWinnerText.textContent = `${player2.name} is the winner`
            }
        }  
    };
    
    //display that game has started or stopped.
    const colorStartRestart = ()=>{
        const border = document.querySelector('.game-board')
        if (!isStartGame){
            border.style.border= "3px solid red";
        } else if (isStartGame) {
            border.style.border = "3px solid #22C55E";
        }
    };
  
    //restart game
    const restartGame = () => {
        restartGameBtns.addEventListener('click',()=>{
            isStartGame = false;
            playerOneTurn = false;
            playerTwoTurn = false;

            playerArray.pop()
            playerArray.pop()

            playerOneChoice = "";
            playerTwoChoice = "";
            player1Name.value ="";
            player2Name.value = "";
            displayWinnerText.textContent = "";

            colorStartRestart()

            pressGrids.forEach((pressGrid)=>{
                pressGrid.textContent = "";
                playerTurnText.textContent = "";
                pressGrid.classList.remove('disabled')
            })
        })
    }
    restartGame();
    return {getNameMarker, startGame};
})();
