/// Gameboard
function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];
    let value = "";

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

        if (board[row][column] === "") {
            board[row][column] = player;
            return true;
        } else if (board[row][column] !== "") {
            console.log('Invalid move!');
            return false;
        }


    }

    const checkWinner = () => {
        const matchMark = (a, b, c) => a !== "" && a === b && b === c;

        //Checks Columns
        for (let i = 0; i < 3; i++) {
            const a = board[0][i]
            const b = board[1][i]
            const c = board[2][i]
            if (matchMark(a, b, c)) {
                console.log("win by column");
                return "win";
            }
        }

        //Checks Rows
        for (let i = 0; i < 3; i++) {
            const a = board[i][0];
            const b = board[i][1];
            const c = board[i][2];
            if (matchMark(a, b, c)) {
                console.log("win by row")
                return "win";
            }
        }

        //Diagonal Checks
        if (matchMark(board[0][0], board[1][1], board[2][2])) {
            console.log("win by left diagonal");
            return "win";
        }

        if (matchMark(board[0][2], board[1][1], board[2][0])) {
            console.log("win by right diagonal");
            return "win";
        }

        if (board.flat().includes("")) {
            return "play";
        }
        else {
            console.log("draw");
            return "draw";
        }
    }

    const printBoard = () => {
        for (let i = 0; i < board.length; i++) {
            let row = "";
            for (let j = 0; j < board[i].length; j++) {
                row += board[i][j] + " ";
            }

        }
    };

    const resetBoard = () => {
        value = "";
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                board[i][j] = value;
            }
        }
    }


    return { getBoard, placeMarker, checkWinner, printBoard, resetBoard };

};

function GameController(
    playerOneName = 'Player One',
    playerTwoName = 'Player Two'
) {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            token: "X"
        },
        {
            name: playerTwoName,
            token: "O"
        }
    ];

    let activePlayer = players[0];
    let gameState = "play";

    const switchTurnPlayer = (checkMove) => {
        // Only switch turn player if the move was valid; otherwise turn player stays the same until valid move is made
        if (checkMove && gameState === "play") {
            activePlayer = activePlayer === players[0] ? players[1] : players[0];
        }

    };

    const getActivePlayer = () => activePlayer;


    const getGameState = () => gameState;




    const printRound = () => {
        if (gameState === 'play') {
            board.printBoard();
            console.log(`${getActivePlayer().name}'s turn.`);
        }
        else {
            console.log("Game has ended");
        }
    }

    const playRound = (row, column) => {
        let checkMove = true;
        console.log(gameState);


        checkMove = board.placeMarker(row, column, getActivePlayer().token);

        // Placing check for winner and winner message
        gameState = board.checkWinner();

        if (gameState === "play") {
            switchTurnPlayer(checkMove);
        }
        // For console use only
        printRound();

    };

    const restart = () => {
        gameState = 'play'
        activePlayer = players[0];
        board.resetBoard();
        printRound();
    }

    // Start of game
    printRound();

    return {
        playRound,
        getActivePlayer,
        getGameState,
        restart,
        getBoard: board.getBoard
    };
};

function ScreenController() {
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const restartBtn = document.querySelector('.reset-btn');

    const updateScreen = () => {


        // Reset boarddiv content
        boardDiv.textContent = "";

        const board = game.getBoard();
        // Display message on screen
        if (game.getGameState() === "play") {

            const activePlayer = game.getActivePlayer();
            playerTurnDiv.textContent = `${activePlayer.name}'s turn...`
        }
        else if (game.getGameState() === "win") {
            boardDiv.removeEventListener("click", clickHandlerBoard);
            const activePlayer = game.getActivePlayer();
            playerTurnDiv.textContent = `${activePlayer.name} won!`
        }
        else if (game.getGameState() === "draw") {
            boardDiv.removeEventListener("click", clickHandlerBoard);
            playerTurnDiv.textContent = `Game has ended in a draw`
        }



        // Render board on screen
        board.forEach((row, rowIndex) => {
            row.forEach((token, index) => {
                const cellButton = document.createElement('button');
                cellButton.classList.add('cell');
                cellButton.dataset.column = index;
                cellButton.dataset.rowNum = rowIndex;
                cellButton.textContent = token;
                boardDiv.appendChild(cellButton);
            })
        })
    }

    // Event listener for the board
    function clickHandlerBoard(event) {
        const selectedColumn = event.target.dataset.column;
        const selectedRow = event.target.dataset.rowNum;

        if (!selectedColumn && !selectedRow) return;
        game.playRound(selectedRow, selectedColumn);

        updateScreen();
    }

    function restartClick(event) {
        game.restart();
        boardDiv.addEventListener("click", clickHandlerBoard);
        updateScreen();
    }

    boardDiv.addEventListener("click", clickHandlerBoard);
    restartBtn.addEventListener("click", restartClick);
    // Initial render
    updateScreen();

}

ScreenController();