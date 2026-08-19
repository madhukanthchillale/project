const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

let board = ["", "", "", "", "", "", "", "",];
let currentPlayer = "X";
let gameOver = false;

// Winning combinations
const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

// When a cell is clicked
cells.forEach(cell => {
    cell.addEventListener("click", () => {

        const index = cell.getAttribute("data-index");

        // Don't allow changing an already filled cell
        if (board[index] !== "" || gameOver) {
            return;
        }

        // Put X or O
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        // Add CSS class
        cell.classList.add(currentPlayer.toLowerCase());

        // Check winner
        checkWinner();
    });
});


function checkWinner() {

    for (let pattern of winningPatterns) {

        const a = pattern[0];
        const b = pattern[1];
        const c = pattern[2];

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            statusText.textContent =
                `Player ${currentPlayer} Wins!`;

            gameOver = true;
            return;
        }
    }

    // Check draw
    if (!board.includes("")) {
        statusText.textContent = "It's a Draw!";
        gameOver = true;
        return;
    }

    // Change player
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent =
        `Player ${currentPlayer}'s Turn`;
}


// Restart the game
restartButton.addEventListener("click", restartGame);


function restartGame() {

    board = ["", "", "", "", "", "", "", ""];

    currentPlayer = "X";
    gameOver = false;

    statusText.textContent = "Player X's Turn";

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o");
    });
}
