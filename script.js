// Gameboard
function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];
    let value = 0;

    // Create array to represent the state of the game board
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i][j] = value;
        }
    }


    const getBoard = () => board;

    const placeMarker = (row, column, player) => {
        value = player;

        if (board[row][column] === 0) {
            board[row][column] = player;
            return true;
        } else if (board[row][column] !== 0) {
            console.log('Invalid move!');
            return false;
        }
       

    }

    const printBoard = () => {
        for (let i = 0; i < board.length; i++) {
            let row = "";
            for (let j = 0; j < board[i].length; j++) {
                row += board[i][j] + " ";
            }
            console.log(row);
        }
    };


    return { getBoard, placeMarker, printBoard };

};

function GameController(
    playerOneName = 'Player One',
    playerTwoName = 'Player Two'
) {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            token: 1
        },
        {
            name: playerTwoName,
            token: 2
        }
    ];

    let activePlayer = players[0];

    const switchTurnPlayer = (checkMove) => {
        // Only switch turn player if the move was valid; otherwise turn player stays the same until valid move is made
        if(checkMove) {
            activePlayer = activePlayer === players[0] ? players[1] : players[0];
        }
        
    };

    const getActivePlayer = () => activePlayer;

    const printRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }

    const playRound = (row, column) => {
        let checkMove = true;

        
        checkMove = board.placeMarker(row, column, getActivePlayer().token);

        // Placing check for winner and winner message

        
        switchTurnPlayer(checkMove);
        printRound();
        
    };

    // Start of game
    printRound();

    return {
        playRound,
        getActivePlayer
    };
};


const game = GameController();