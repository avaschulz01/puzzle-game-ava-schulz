// SCRIPT FOR SCRAMBLED PUZZLE GAME - AVA SCHULZ
//October 5, 2024

//DECLARE VARIABLES FOR TIME SPENT, TIMER, and MOVES MADE

///////////////
let time = 0;
let timerInterval;
let moveCount = 0;
///////////////





//When the window loads, start a new game - also on refresh
window.onload = newGame;






//Function for a new game
function newGame() {
    resetGame(); //Reset the game, restart timer and move count
    shuffleBoard(); //Randomly shuffle the numbers on the board
    startTimer(); // Begin the new timer on new game start
}







//Function for resetting the game - will be put into newGame() to start fresh
function resetGame() {
    moveCount = 0; //set the number of moves back to zero
    time = 0; // set the timer back to zero
    document.getElementById('move-count').innerText = moveCount; // grab the HTML element from index, move-count
    document.getElementById('time-count').innerText = time; // grab the HTML element from the index, time-count
    clearInterval(timerInterval);
}






// Function to start the timer
function startTimer() {
	////Update every second
    timerInterval = setInterval(() => {
        time++;
        document.getElementById('time-count').innerText = time; // Grab the HTML element time-count
    }, 1000); ///1000 milliseconds ->  1 second
}







//Function to shuffle the board so the numbers are completely random
function shuffleBoard() {
    const numbers = [...Array(15).keys()].map(x => x + 1); // Numbers 1-15
    numbers.push(""); // Add empty slot
    numbers.sort(() => Math.random() - 0.5); // Shuffle numbers

    const table = document.getElementById("puzzle-board");
    table.innerHTML = "";
    let cellNum = 0;

    for (let i = 0; i < 4; i++) {
        const row = table.insertRow();
        for (let j = 0; j < 4; j++) {
            const cell = row.insertCell();
            cell.id = `cell${i}${j}`;
            if (numbers[cellNum] === "") {
                cell.classList.add('empty');
            } else {
                cell.innerText = numbers[cellNum];
            }
            cell.addEventListener('click', () => clickTile(i, j));
            cellNum++;
        }
    }
}









// Function to move the Tile once the user clicks on it
function clickTile(row, column) {
    const cell = document.getElementById(`cell${row}${column}`);
    const tile = cell.innerText;

    if (tile !== "") {
        // Check neighboring cells for an empty spot
        if (checkAndSwap(row, column, row, column + 1) || // Right
            checkAndSwap(row, column, row, column - 1) || // Left
            checkAndSwap(row, column, row + 1, column) || // Down
            checkAndSwap(row, column, row - 1, column)) { // Up

            moveCount++;
            document.getElementById('move-count').innerText = moveCount;
            setTimeout(() => { checkWin(); }, 500);
        }
    }
}










//Function to check if the tile can move
function checkAndSwap(row, col, emptyRow, emptyCol) {
    const emptyCell = document.getElementById(`cell${emptyRow}${emptyCol}`);
    if (emptyCell && emptyCell.classList.contains('empty')) {
        swapTiles(row, col, emptyRow, emptyCol);
        return true;
    }
    return false;
}









//Function to swap the tiles on the board
function swapTiles(row1, col1, row2, col2) {
    const cell1 = document.getElementById(`cell${row1}${col1}`);
    const cell2 = document.getElementById(`cell${row2}${col2}`);
    
    const tempText = cell1.innerText;
    cell1.innerText = cell2.innerText;
    cell2.innerText = tempText;
    
    cell1.classList.toggle('empty');
    cell2.classList.toggle('empty');
}








// Function to check if the user has won the game
function checkWin() {
    const cells = [...document.querySelectorAll("#puzzle-board td")];
    let correct = true;
    for (let i = 0; i < cells.length - 1; i++) {
        if (cells[i].innerText != i + 1) {
            correct = false;
            break;
        }
    }

    if (correct) {
        clearInterval(timerInterval);
        setTimeout(() => {
            alert(`CONGRATULATIONS!!!\nyou've successfully reordered the puzzle numbers in sequential order!\nTime to complete it: ${time} seconds\nNumber of moves it took to complete: ${moveCount}\nTo play it again, click OK`);
            window.location.reload();
        }, 500);
    }
}









// Function to start a SIMPLE game - the user only has to make one move to win
function simpleGame() {
	
	
	////////////
	resetGame();
	clearInterval(timerInterval);
	startTimer();
	////////////
    
    // Generate the winning order of tiles (1-15 and one empty space)
    const numbers = [...Array(15).keys()].map(x => x + 1); // Numbers 1 to 15
    numbers.push(""); // Add the empty slot



    // Swap the last two tiles so the puzzle requires only one move to win
    [numbers[14], numbers[15]] = [numbers[15], numbers[14]];




    // Render the board
    const table = document.getElementById("puzzle-board");
    table.innerHTML = "";
    let cellNum = 0;



    for (let i = 0; i < 4; i++) {
        const row = table.insertRow();
        for (let j = 0; j < 4; j++) {
            const cell = row.insertCell();
            cell.id = `cell${i}${j}`;
            if (numbers[cellNum] === "") {
                cell.classList.add('empty');
            } else {
                cell.innerText = numbers[cellNum];
            }
            cell.addEventListener('click', () => clickTile(i, j));
            cellNum++;
        }
    }
}