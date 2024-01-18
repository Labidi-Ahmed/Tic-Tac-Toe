
const gameBoard = (function () {
    const board = Array(9).fill("");
    const getBoard = () => board;
    const resetBoard = () => board.fill("");
    return { getBoard, resetBoard };
})();



function createPlayer(mark, name) {
    let score = 0;
    const increaseScore = () => {
        score += 1;
    };
    const getName = () => name;
    const getScore = () => score;
    const resetScore = () => { score=0 ;
     return score }; 

    return {
        increaseScore, getScore, getName, mark, resetScore
    };
}




const game = (function () {
    let currentPlayerWinner = "";
    let round = 1;

    const getCurrentWinner = () => currentPlayerWinner;

    const updateBoard = (index) => {
        const board = gameBoard.getBoard();
        board[index - 1] = currentPlayer.mark;
    };

    const getRound = () => round;

    const reset = () => {
        round = 1;
        currentPlayerWinner = "";
        gameBoard.resetBoard();
          ;
    };


    const finalGameWinner = () => {
        if (player1.getScore() === player2.getScore()) {
            return 'Draw';
        } else {
            return player1.getScore() > player2.getScore() ? player1.mark + ' is the Game winner' : player2.mark + ' is the Game winner';
        }
    }
    

    const roundIncrement = () => round +=1 ;

    const checkWinner = () => {
        if (checkLines() || checkCols() || checkDiags()) {
            currentPlayerWinner = currentPlayer;
            popupModalText(`${currentPlayerWinner.mark} is the round ${getRound()} winner`);
            roundIncrement() ;
            currentPlayer.increaseScore();
            roundReset();
            if ( getRound() > 3 ){
                popupModal.close();
                resetModalText(`Game Over! ${game.finalGameWinner()}. Press "Reset" to play again.`);
              
            }
            
            
            
        } else {
            if (isDraw()) {
                popupModalText("Draw");
                roundIncrement() ;
                roundReset();
                
            }
        }
    };

    const checkCols = () => {
        for (let i = 0; i < 3; i++) {
            if (
                gameBoard.getBoard()[i] === currentPlayer.mark &&
                gameBoard.getBoard()[i + 3] === currentPlayer.mark &&
                gameBoard.getBoard()[i + 6] === currentPlayer.mark
            ) {
                return true;
            }
        }
        return false;
    };

    const checkDiags = () => {
        if (
            (gameBoard.getBoard()[0] === currentPlayer.mark &&
                gameBoard.getBoard()[4] === currentPlayer.mark &&
                gameBoard.getBoard()[8] === currentPlayer.mark) ||
            (gameBoard.getBoard()[2] === currentPlayer.mark &&
                gameBoard.getBoard()[4] === currentPlayer.mark &&
                gameBoard.getBoard()[6] === currentPlayer.mark)
        ) {
            return true;
        }
        return false;
    };

    const checkLines = () => {
        for (let i = 0; i < 3; i++) {
            if (
                gameBoard.getBoard()[i * 3] === currentPlayer.mark &&
                gameBoard.getBoard()[i * 3 + 1] === currentPlayer.mark &&
                gameBoard.getBoard()[i * 3 + 2] === currentPlayer.mark
            ) {
                return true;
            }
        }
        return false;
    };

    const isDraw = () => {
        return gameBoard.getBoard().every(cell => cell !== "");
    };

    const roundReset = () => {
        setTimeout(() => {
            
            
            resetContainerContent();
            gameBoard.resetBoard();
            updateCurrentWinner();
            
        }, );
    };

    const updateCurrentWinner = () => {
        currentPlayerWinner = ""
    };


    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    return { getRound, reset, updateBoard, checkWinner , getCurrentWinner ,
         switchPlayer ,finalGameWinner };
})();











const container = document.querySelector(".container");
const reset = document.querySelector('.reset');
const popupModal = document.querySelector('#popup-modal');
const popupModalSection = document.querySelector(' #popup-modal section');
const closePopupMoadlBtn = document.querySelector(" #close-popup")
const resetModal = document.querySelector('#reset-modal');
const resetModalSection = document.querySelector('#reset-modal section');



const player1 = createPlayer("X", "Player 1");
const player2 = createPlayer("O", "Player 2");

let currentPlayer = player1;


container.addEventListener('click', (e) => {
    if (e.target.matches('.container div')) {
    const index = e.target.id;
    
    if (game.getRound() < 4 && game.getCurrentWinner() === "") {
        if (gameBoard.getBoard()[index - 1] === "") {
            e.target.innerText = currentPlayer.mark;
            game.updateBoard(index);
            
            game.checkWinner();
            game.switchPlayer();
        } else {
           popupModalText("Cell already taken. Choose another one.")
        
        }
        
    }
    else{
        if( game.getRound() > 3 ) {
           
            resetModalText(`Game Over! ${game.finalGameWinner()}. Press "Reset" to play again.`);        }       
        
    }   }
});




function resetModalText(text){
    resetModalSection.textContent = text
            resetModal.showModal();
}


function popupModalText(text){
    popupModalSection.textContent = text
    popupModal.showModal() ;
}


closePopupMoadlBtn.addEventListener("click", () => {
    popupModal.close();
})


const containerDivs = document.querySelectorAll('.container div');

containerDivs.forEach((div) => {
    div.addEventListener('mouseover',() => {
        const index = div.id;
        if (!gameBoard.getBoard()[index - 1] && game.getRound() < 4 && game.getCurrentWinner() === "") 
           
         {
            div.textContent = currentPlayer.mark ;
        }
    })
    div.addEventListener('mouseout',() => {
        const index = div.id;
        if (!gameBoard.getBoard()[index - 1] && game.getRound() < 4 && game.getCurrentWinner() === "") {
            div.textContent = "";
            
        }
    })
})


reset.addEventListener('click', () => {
    game.reset();
    currentPlayer = player1;
    resetContainerContent();
    player1.resetScore();
    player2.resetScore();
    resetModal.close()
});


const resetContainerContent = () => {
    const containerDivs = document.querySelectorAll('.container div');
    containerDivs.forEach(div => {
        div.innerText = '';
    });
};

