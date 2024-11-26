const minefield = [];
let [minefieldRows, minefieldColumns] = [8, 12];
let remainingBombs = 18;
initEmptyMinefield();

const startingPoint = new Point(2, 3);
minefield[startingPoint.i][startingPoint.j].isRevealed = true; //Reveal the starting point.
revealStartingPointNeighbors();
populateMinefieldWithBombs();


const CSS_SELECTORS = {
    MINEFIELD_GRID: ".minefield-grid",
};

const CSS_CLASSES = {
    CELL_ROW: "cell-row",
    CELL: "cell",
};

const minefieldDiv = document.querySelector(CSS_SELECTORS.MINEFIELD_GRID);
const cellRowDiv = document.createElement("div");
cellRowDiv.classList.add(CSS_CLASSES.CELL_ROW);
const cellDiv = document.createElement("div");
cellDiv.classList.add(CSS_CLASSES.CELL);

//Generate the minefieldDiv cells:
populateMinefieldGridDiv();

minefieldDiv.addEventListener("click", (e) => {
    const i = getCellDivElementPosition(e.target).i;
    const j = getCellDivElementPosition(e.target).j;
});






function Cell() {
    this.isBomb = false;
    this.isFlagged = false;
    this.isRevealed = false;
}

function Point(i, j) {
    this.j = j;
    this.i = i;
}

function initEmptyMinefield() {
    for (let i = 0; i < minefieldRows; i++) {
        const temp = [];
        for (let j = 0; j < minefieldColumns; j++) {
            temp.push(new Cell());
        }
        minefield.push(temp.slice());
        temp.length = 0;
    }
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

function populateMinefieldWithBombs() {

    const flatMinefield = minefield.flat();
    let k = 0;
    let ind = 0;
    //Set the first remainingBombs cells of flatMinefield to be bombs:
    while (k < remainingBombs) {
        //Starting point and its neighbors should not be bombs!
        if (!flatMinefield[ind].isRevealed) {
            flatMinefield[ind].isBomb = true;
            k++;
        }
        ind++;
    }

    //Shuffle the flatMinefield (Fisher-Yates method):
    for (let i = flatMinefield.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        //Starting point and its neighbors should not be moved!
        if (!flatMinefield[i].isRevealed && !flatMinefield[j].isRevealed) {
            const temp = flatMinefield[i];
            flatMinefield[i] = flatMinefield[j];
            flatMinefield[j] = temp;
        }
    }

    //Update the minefield with the reshaped value of flatMinefield:
    minefield.length = 0;
    k = 0;
    const tempArr = [];
    for (let i = 0; i < flatMinefield.length; i++) {
        if (k === minefieldColumns) {
            minefield.push(tempArr.slice());
            tempArr.length = 0;
            k = 0;
        }
        tempArr.push(flatMinefield[i]);
        k++;
    }
    minefield.push(tempArr);


}

function populateMinefieldGridDiv() {
    for (let i = 0; i < minefieldRows; i++) {

        for (let j = 0; j < minefieldColumns; j++) {
            cellDiv.id = `${i}:${j}`;
            cellRowDiv.appendChild(cellDiv.cloneNode());
        }

        minefieldDiv.appendChild(cellRowDiv.cloneNode(true));
        cellRowDiv.innerHTML = "";

    }
}

function getCellDivElementPosition(cellDivElement) {
    const i = +String(cellDivElement.id).split(":")[0];
    const j = +String(cellDivElement.id).split(":")[1];
    return new Point(i, j);
}