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
    const startGame = function(e){
        startGameBtn.addEventListener('click', ()=>{
            startGameBtn.classList.add('disabled');
            restartGameBtns.classList.remove('disabled');
            player1 = getNameMarker(player1Name.value, "X");
            player2 = getNameMarker(player2Name.value, "O");
            playerArray.push(player1, player2);
            isStartGame = true;
            playerOneTurn = true;
            _playerTurnDisplay();
            _colorStartRestart();
        })
    };
    startGame();
 
    //pressing grid marks X or O
    const markerOnGrid = function(){
        pressGrids.forEach((pressGrid) => {
            pressGrid.addEventListener('click', ()=>{
                if (playerOneTurn && isStartGame){
                    pressGrid.textContent = playerArray[0].marker;
                    pressGrid.classList.toggle('disabled');
                    playerOneTurn = false;
                    playerTwoTurn = true;
                    _checkWinner();
                    _playerTurnDisplay();
                } else if(playerTwoTurn){
                    pressGrid.textContent = playerArray[1].marker;
                    pressGrid.classList.toggle('disabled');
                    playerOneTurn = true;
                    playerTwoTurn = false;
                    _checkWinner();
                    _playerTurnDisplay();
                }
            })
        })
    };
    markerOnGrid();

    //player turn display text
    const _playerTurnDisplay = function() {
            playerTurnText.textContent = `${player1.name}'s turn`;
            if (playerOneTurn){
                playerTurnText.textContent = `${player1.name}'s turn`;
            } else if(playerTwoTurn){
                playerTurnText.textContent = `${player2.name}'s turn`;
            }
    };

    //check for winner
    const _checkWinner = () =>{
        const topLeft = pressGrids[0].textContent;
        const topMiddle = pressGrids[1].textContent;
        const topRight = pressGrids[2].textContent;
        const middleLeft = pressGrids[3].textContent;
        const middleMiddle = pressGrids[4].textContent;
        const middleRight = pressGrids[5].textContent;
        const bottomLeft = pressGrids[6].textContent;
        const bottomMiddle = pressGrids[7].textContent;
        const bottomRight = pressGrids[8].textContent;

        let winner = "";

        //horizontal win combination
        if (topLeft && topLeft === topMiddle && topLeft === topRight){
            winner = topLeft;
            _displayWinner(topLeft);
        }   else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight){
                winner = middleLeft;
                _displayWinner(middleLeft);
        }   else if(bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight){
                winner = bottomLeft;
                _displayWinner(bottomLeft);
        //vertical win combination
        }   else if(topLeft && topLeft === middleLeft && topLeft === bottomLeft){
                winner = topLeft;
                _displayWinner(topLeft);
        }   else if(topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle){
                winner = topMiddle;
                _displayWinner(topMiddle);
        }   else if(topRight && topRight === middleRight && topRight === bottomRight){
                winner = topRight;
                _displayWinner(topRight);
        //diagnol win combination
        }   else if(topLeft && topLeft === middleMiddle && topLeft === bottomRight){
                winner = topLeft;
                _displayWinner(topLeft);
        }   else if(topRight && topRight === middleMiddle && topRight === bottomLeft){
                winner = topRight;
                _displayWinner(topRight);
        }   else if(topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight){
                displayWinnerText.textContent = "ITS A DRAW";
        }
    };

    const score1 = document.querySelector('.score-board1');
    const score2 = document.querySelector('.score-board2');

    let playerOneScore = 0;
    let playerTwoScore = 0;

    //display winner
    const _displayWinner = (winner)=>{
        isStartGame = false;
        playerTwoTurn = false;
        if (winner === 'X'){
            displayWinnerText.textContent = `${player1.name} is the WINNER!!!`;
            playerOneScore++;
            score1.textContent = `${playerOneScore}`;
        } else {
            displayWinnerText.textContent = `${player2.name} is the WINNER!!!`;
            playerTwoScore++;
            score2.textContent = `${playerTwoScore}`;
        }
    };
    
    //color sign that game has started or stopped.
    const _colorStartRestart = ()=>{
        const border = document.querySelector('.game-board');
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
            playerArray.pop();
            playerArray.pop();
            displayWinnerText.textContent = "";
            startGameBtn.classList.remove('disabled');
            _colorStartRestart();
            pressGrids.forEach((pressGrid)=>{
                pressGrid.textContent = "";
                playerTurnText.textContent = "";
                pressGrid.classList.remove('disabled')
            })
        })
    };
    restartGame();

    //reset score
    const resetScore = () =>{
        const resetScoreBtn = document.querySelector('.reset-scoreboard');
        resetScoreBtn.addEventListener('click', ()=>{
            playerOneScore = 0;
            playerTwoScore = 0;
            score1.textContent = `${playerOneScore}`;
            score2.textContent = `${playerTwoScore}`;
        })
    };
    resetScore();
    //start with disabled restart button
    window.addEventListener('DOMContentLoaded',()=>{
        restartGameBtns.classList.add('disabled');
    })
    return {getNameMarker, startGame, restartGame, resetScore};
})();