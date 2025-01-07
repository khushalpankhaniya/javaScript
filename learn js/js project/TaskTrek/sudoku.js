function isSafe(board, row, col, number) {
  
    for (let i = 0; i < board.length; i++) {
        if (board[i][col] === number.toString()) {
            return false;
        }
    }


    for (let j = 0; j < board.length; j++) {
        if (board[row][j] === number.toString()) {
            return false;
        }
    }


    let sr = 3 * Math.floor(row / 3);
    let sc = 3 * Math.floor(col / 3);

    for (let i = sr; i < sr + 3; i++) {
        for (let j = sc; j < sc + 3; j++) {
            if (board[i][j] === number.toString()) {
                return false;
            }
        }
    }

    return true;
}

function helper(board, row, col) {
    if (row === board.length) {
        return true;
    }

    let nrow = 0;
    let ncol = 0;

    if (col === board.length - 1) {
        nrow = row + 1;
        ncol = 0;
    } else {
        nrow = row;
        ncol = col + 1;
    }

    if (board[row][col] !== '.') {
        if (helper(board, nrow, ncol)) {
            return true;
        }
    } else {
        // Fill the place
        for (let i = 1; i <= 9; i++) {
            if (isSafe(board, row, col, i)) {
                board[row][col] = i.toString();
                if (helper(board, nrow, ncol)) {
                    return true;
                } else {
                    board[row][col] = '.';
                }
            }
        }
    }

    return false;
}

function solveSudoku(board) {
    helper(board, 0, 0);
}

//  Sudoku board
const sudokuBoard = [
    ['8', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '3', '6', '.', '.', '.', '.', '.'],
    ['.', '7', '.', '.', '9', '.', '2', '.', '.'],
    ['.', '5', '.', '.', '.', '7', '.', '.', '.'],
    ['.', '.', '.', '.', '4', '5', '7', '.', '.'],
    ['.', '.', '.', '1', '.', '.', '.', '3', '.'],
    ['.', '.', '1', '.', '.', '.', '.', '6', '8'],
    ['.', '.', '8', '5', '.', '.', '.', '1', '.'],
    ['.', '9', '.', '.', '.', '.', '4', '.', '.']
];


console.log('Original Sudoku Board:');
console.log(sudokuBoard.map(row => row.join(' ')).join('\n'));

solveSudoku(sudokuBoard);

console.log('\nSolved Sudoku Board:');
console.log(sudokuBoard.map(row => row.join(' ')).join('\n'));


