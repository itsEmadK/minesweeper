const minefield = [];
let [minefieldRows, minefieldColumns] = [8, 12];
initMinefield();

const startingPoint = new Point(2, 3);

const j = startingPoint.j;
const i = startingPoint.i;
minefield[i][j].isRevealed = true; //Reveal the starting point.

//Reveal all the adjacent cells of the starting point:
if (j > 0) {
    minefield[i][j - 1].isRevealed = true;
}
if (j < minefieldColumns) {
    minefield[i][j + 1].isRevealed = true;
}
if (i > 0) {
    minefield[i - 1][j].isRevealed = true;
    if (j > 0) {
        minefield[i - 1][j - 1].isRevealed = true;
    }
    if (j < minefieldColumns) {
        minefield[i - 1][j + 1].isRevealed = true;
    }
}
if (i < minefieldRows) {
    minefield[i + 1][j].isRevealed = true;
    if (j > 0) {
        minefield[i + 1][j - 1].isRevealed = true;
    }
    if (j < minefieldColumns) {
        minefield[i + 1][j + 1].isRevealed = true;
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

function Point(i, j) {
    this.j = j;
    this.i = i;
}