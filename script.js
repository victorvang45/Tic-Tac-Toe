// Gameboard
function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    // Create array to represent the state of the game board
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    };


    return {printBoard};

}


function Cell() {
    let value = 0;

    const getValue = () => value;
    return {
        getValue
    };
}


const game = Gameboard();