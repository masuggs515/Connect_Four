/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

// global variables 
const small = document.querySelector('#small');
const medium = document.querySelector('#medium');
const large = document.querySelector('#large');
const gameSize = document.querySelector('#game-size');
const newGame = document.querySelector('#new-game');
const coin = document.querySelector('#coin');
const coinContain = document.querySelector('#coin-container');
const TIMEOUT_FOR_COIN_TEXT = 800;
const TIMEOUT_FOR_COIN_COLOR = 3400;
const TIMEOUT_TO_REMOVE_COIN = 2300;
// initialize width and height so it can be changed with selections
let WIDTH;
let HEIGHT;

// Go back to start screen if in the middle of the game and allow to change size board
newGame.addEventListener('click', () => location.reload())

// flip a coin to choose who starts
let currPlayer; // active player: 1 or 2 (I used red and yellow)
const flipCoin = () => {
  coin.classList.add('flip');
  coin.innerText = '';
  // give 50/50 chance to be yellow or red
  currPlayer = (Math.round(Math.random() * 100) <= 1) ? "Red" : "Yellow";

  (currPlayer === 'Red') ? coin.classList.add('red-coin') : coin.classList.add('yellow-coin')
  // {
  //   coin.classList.add('red-coin')
  // }else{
  //   coin.classList.add('yellow-coin')
  // }
  // delay showing results of flip until coin has flipped
  setTimeout(() => {

    coin.style.backgroundColor = currPlayer;
    // this timeout is more to help visually and not functionality
    setTimeout(() => { coin.innerText = `${currPlayer} goes first!`; }, TIMEOUT_FOR_COIN_TEXT)
    // remove coin flip that will have board for game underneath
    setTimeout(() => {
      document.querySelector('#coin-container').style.display = 'none';
    }, TIMEOUT_FOR_COIN_COLOR)
  }, TIMEOUT_TO_REMOVE_COIN)
}

// add click to flip coin
coin.addEventListener('click', flipCoin)

// ability to choose size of game before it starts then remove choices and populate board into DOM
const chooseBoardSize = (y, x) => {
  WIDTH = y;
  HEIGHT = x;
  makeBoard();
  makeHtmlBoard();
  // add new game button with coin on higher z-index
  newGame.style.display = 'block'
  coinContain.style.display = 'flex'
  // remove size choice selection
}
small.addEventListener('click', (e) => {
  e.target.parentElement.style.display = 'none';
  chooseBoardSize(6, 5);
});

medium.addEventListener('click', (e) => {
  e.target.parentElement.style.display = 'none';
  chooseBoardSize(8, 7);
})
large.addEventListener('click', (e) => {
  e.target.parentElement.style.display = 'none';
  chooseBoardSize(10, 9);
})






let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

const makeBoard = () => {
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }))
  }
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
}

/** makeHtmlBoard: make HTML table and row of column tops. */

const makeHtmlBoard = () => {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const board = document.querySelector('#board');

  // TODO: add comment for this code

  // Create top line that can be selected to drop a piece
  let top = document.createElement("tr");
  // Give top row an id of column-top
  top.setAttribute("id", "column-top");
  // add a click listener that links to a callback function to drop piece when clicked
  top.addEventListener("click", handleClick);

  // Take the number that WIDTH is set to and create a header row with that many cells
  // WIDTH = number of cells
  for (let x = 0; x < WIDTH; x++) {
    // Create each cell for header row and give that cell an ID of x (column number). Then append the row to the top tr created
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  // after top is created append top to board
  board.append(top);

  // TODO: add comment for this code
  // loop through to create a number of rows based on what HEIGHT is set to
  // number of rows = HEIGHT
  // have each iteration through to create a row and then the WIDTH number of cells in each row
  for (let y = 0; y < HEIGHT; y++) {
    // create rows with variable row
    const row = document.createElement("tr");
    // for every row create  a number of cells determined by WIDTH number
    for (let x = 0; x < WIDTH; x++) {
      // create table cell with a variable of cell
      const cell = document.createElement("td");
      // give each cell a unique id for later access id ='row # - column #' then append the cell into row
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    // at the end of each loop append the row to the board
    board.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

const findSpotForCol = x => {
  // TODO: write the real version of this, rather than always returning 0
  // start at bottom of column x that is selected and loop through entire column moving up to find highest empty spot
  // if spot is empty return the y(row) at that cell, else return null
  for (let y = HEIGHT - 1; y >= 0; y--) {
    // if the cell at board (y,x) is falsy return the y so piece can be placed here
    if (!board[y][x]) {
      return y;
    }

  }
  // if the cell is truthy return null to function to loop through next y
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

const placeInTable = (y, x) => {
  // TODO: make a div and insert into correct table cell
  // create div called piece with class name of basic piece and another class name for current player
  let piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`player${currPlayer}`);
  piece.classList.add('fall')
  // find id of spot with variables that are input in to the function
  let spot = document.getElementById(`${y}-${x}`)
  // add piece to spot to add game piece created into desired location
  spot.append(piece);

}

/** endGame: announce game end */
// TODO: pop up alert message
// insert msg from below into an alert message for game being finalized
const endGame = msg => alert(msg);


/** handleClick: handle click of column top to play piece */

const handleClick = evt => {
  // get x from ID of clicked cell
  // find column (variable x) that is clicked by using e.target.id
  // assigned x for continuity
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  // use find spot function to assign y so you have (y,x) for current spot
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  // set spot found to current player
  board[y][x] = currPlayer
  placeInTable(y, x);

  // check for win
  // if check for win returns true then return winning message else do nothing
  if (checkForWin()) {
    // added timeout so board is filled before winning message appears
    setTimeout(() => {
      // since timeout will delay player will switch so revert back to previous player for message
      currPlayer = currPlayer === 'Red' ? 'Yellow' : 'Red';
      return endGame(`${currPlayer} player won!`);
    }, 10)


  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  // check board to see if all cells on all rows are filled return endgame function with msg of a tie
  const checkForTie = () => {
    board.every(row => row.every(cell => cell))
  }
  if (checkForTie()) {
    return endGame('Tie Game! GAME OVER!')
  }


  // switch players
  // set currPlayer to red or Yellow
  // if current player is red then return Yellow else return red
  currPlayer = currPlayer === 'Red' ? 'Yellow' : 'Red';
  // TODO: switch currPlayer 1 <-> 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

const checkForWin = () => {
  const _win = (cells) => {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  // loop through all rows and insid each row iteration loop through all columns
  // start loop for rows
  for (let y = 0; y < HEIGHT; y++) {
    // immediatelly loop through each column in the row
    for (let x = 0; x < WIDTH; x++) {
      // increase x +1 four times to find horizontal adjacent column spots for current y
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      // increase y +1 four times to find vertical adjacent row spots for current x
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      // check current (y,x) and increase both by one, three times, to move diagnolly down and to the right on board
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      // check current (y,x) and increase y by one and decrease x by 1, three times, to move diagnolly down and left board
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

