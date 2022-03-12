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
    const restartGameBtns = document.querySelector('.restart-btn');
    // const submitPlayerOneName = document.querySelector('.player1-name-submit');
    // const submitPlayerTwoName = document.querySelector('.player2-name-submit');

    //holds name and marker property
    const playerArray = [];
    //i will use this somehow to make taking turns work
    let playerOneTurn = true;
    let playerTwoTurn = false; 
    //start game by default is false. must flip it to true to start when button start is clicked.
    let isStartGame = false;
    //player 1 board
    let playerOneChoice = "";
    let playerTwoChoice = "";

    //ways to win 
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
    let player1 = getNameMarker(player1Name, "X");
    let player2 = getNameMarker(player2Name, "O");
    
    //start game button
    const startGame = function(){
        startGameBtn.addEventListener('click', ()=>{
            //push player info to playerArray
            playerArray.push(player1, player2);
            isStartGame = true;
            playerOneTurn = true;
            console.log(playerArray);
            playerTurnDisplay();
            //board becomes active and player can start clicking on box to place marker.
        })
    };
    startGame();

    //pressing grid marks X or O
    const markerOnGrid = function(){
        pressGrids.forEach((pressGrid) => {
            pressGrid.addEventListener('click', ()=>{
                if (playerOneTurn === true && isStartGame === true){
                    pressGrid.textContent = "X";
                    playerOneChoice += pressGrid.value
                    console.log("p1:", playerOneChoice);
                    pressGrid.classList.toggle('disabled')
                    playerOneTurn = false;
                    playerTwoTurn = true;
                    playerTurnDisplay();
                } else if( playerTwoTurn === true){
                    pressGrid.textContent = "O";
                    playerTwoChoice += pressGrid.value
                    // console.log("p2:", playerTwoChoice);
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
            if (playerOneTurn === true){
                playerTurnText.textContent = `${player1.name}'s turn`;
            } else if( playerTwoTurn === true){
                playerTurnText.textContent = `${player2.name}'s turn`;
            }
    };

    const checkWinner = () =>{

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