const minefield = [];
let [minefieldRows, minefieldColumns] = [8, 12];
let remainingBombs = 18;
initMinefield();

const startingPoint = new Point(2, 3);
minefield[startingPoint.i][startingPoint.j].isRevealed = true; //Reveal the starting point.
revealStartingPointNeighbors();

const flatMinefield = minefield.flat();
let k = 0;
let ind = 0;
while (k < remainingBombs) {
    if (!flatMinefield[ind].isRevealed) { //Starting point and its neighbors should not be bombs!
        flatMinefield[ind].isBomb = true;
        k++;
    }
    ind++;
}

//Shuffle the flatMinefield (Fisher-Yates method):
for (let i = flatMinefield.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    if (!flatMinefield[i].isRevealed && !flatMinefield[j].isRevealed) {
        const temp = flatMinefield[i];
        flatMinefield[i] = flatMinefield[j];
        flatMinefield[j] = temp;
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

//Reveals all the adjacent cells of the starting point:
function revealStartingPointNeighbors() {
    const i = startingPoint.i;
    const j = startingPoint.j;
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
}