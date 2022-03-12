//get player name and marker
const getNameMarker = function (name,marker){
    return {name, marker};
};

const myGameModule = (() => {
    //html querySelectors
    const player1Name = document.querySelector('.player-1');
    const player2Name = document.querySelector('.player-2');
    const playerTurnText = document.querySelector('.player-turn-text');
    const startGameBtn = document.querySelector('.start-game-btn');
    const pressGrids = document.querySelectorAll('.box');
    const restartGameBtns = document.querySelector('.restart-btn');

    //holds name and marker property
    const playerArray = [];

    //assign player name and marker auto assigned marker
    let player1 = getNameMarker(player1Name.value, "X");
    let player2 = getNameMarker(player2Name.value, "O");
    
    //i will use this somehow to make taking turns work
    let playerOneTurn = true;
    let playerTwoTurn = false; 

    //start game by default is false. must flip it to true to start when button start is clicked.
    let isStartGame = false;

    //start game button
    const startGame = function(){
        startGameBtn.addEventListener('click', ()=>{
            //push player info to playerArray
            player1 = getNameMarker(player1Name.value, "X");
            player2 = getNameMarker(player2Name.value, "O");
            playerArray.push(player1, player2);

            isStartGame = true;
            playerOneTurn = true;

            console.log(playerArray);
            playerTurnDisplay();
            colorStartRestart()
            //board becomes active and player can start clicking on box to place marker.
        })
    };
    startGame();

    //player 1 board
    let playerOneChoice = "";
    let playerTwoChoice = "";
 
    //pressing grid marks X or O
    const markerOnGrid = function(){
        pressGrids.forEach((pressGrid) => {
            pressGrid.addEventListener('click', ()=>{
                if (playerOneTurn && isStartGame){
                    pressGrid.textContent = playerArray[0].marker;

                    playerOneChoice += pressGrid.value
                    console.log("p1 X: ", playerOneChoice);

                    

                    pressGrid.classList.toggle('disabled')

                    playerOneTurn = false;
                    playerTwoTurn = true;

                    playerTurnDisplay();
                } else if(playerTwoTurn){
                    pressGrid.textContent = playerArray[1].marker;

                    playerTwoChoice += pressGrid.value
                    console.log("p2 O:", playerTwoChoice);

                  

                    pressGrid.classList.toggle('disabled')

                    playerOneTurn = true;
                    playerTwoTurn = false;

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
            console.log(playerArray)

            playerOneChoice = "";
            playerTwoChoice = "";
            player1Name.value ="";
            player2Name.value = "";

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

    // //ways to win 
    // const winningArrays = [
    //     //horizontal
    //     [0,1,2],
    //     [3,4,5],
    //     [6,7,8],
    //     //vertical
    //     [0,3,6],
    //     [1,4,7],
    //     [2,5,8],
    //     //diagnol
    //     [0,4,8],
    //     [2,4,6]
    // ];
