const minefield = [];
let [minefieldRows, minefieldColumns] = [8, 12];
initMinefield();

const startingPoint = new Point(2, 3);

const x = startingPoint.x;
const y = startingPoint.y;
minefield[y][x].isRevealed = true; //Reveal the starting point.

//Reveal all the adjacent cells of the starting point:
if (x > 0) {
    minefield[y][x - 1].isRevealed = true;
}
if (x < minefieldColumns) {
    minefield[y][x + 1].isRevealed = true;
}
if (y > 0) {
    minefield[y - 1][x].isRevealed = true;
    if (x > 0) {
        minefield[y - 1][x - 1].isRevealed = true;
    }
    if (x < minefieldColumns) {
        minefield[y - 1][x + 1].isRevealed = true;
    }
}
if (y < minefieldRows) {
    minefield[y + 1][x].isRevealed = true;
    if (x > 0) {
        minefield[y + 1][x - 1].isRevealed = true;
    }
    if (x < minefieldColumns) {
        minefield[y + 1][x + 1].isRevealed = true;
    }
}



function initMinefield() {
    for (let i = 0; i < minefieldRows; i++) {
        const temp = [];
        for (let j = 0; j < minefieldColumns; j++) {
            temp.push(new Cell());
        }
        minefield.push(temp.slice());
        temp.length = 0;
    }
}

function Cell() {
    this.isBomb = false;
    this.isFlagged = false;
    this.isRevealed = false;
}

function Point(x, y) {
    this.x = x;
    this.y = y;
}