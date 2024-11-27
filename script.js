const minefield = [];
let [minefieldRows, minefieldColumns] = [8, 12];
let remainingBombs = 18;
initEmptyMinefield();
let startingPoint = null;
let gameFinished = false;


const CSS_SELECTORS = {
    MINEFIELD_GRID: ".minefield-grid",
};

const CSS_CLASSES = {
    CELL_ROW: "cell-row",
    CELL: "cell",
    REVEALED: "revealed",
    FLAG_IMG: "flag-img",
    BOMB_IMG: "bomb-img",
    NEAR_BOMB_COUNT_NUMBERS: {
        0: "zero",
        1: "one",
        2: "two",
        3: "three",
        4: "four",
        5: "five",
        6: "six",
        7: "seven",
        8: "eight"
    },
};

const minefieldDiv = document.querySelector(CSS_SELECTORS.MINEFIELD_GRID);
const cellRowDiv = document.createElement("div");
cellRowDiv.classList.add(CSS_CLASSES.CELL_ROW);
const cellDiv = document.createElement("div");
cellDiv.classList.add(CSS_CLASSES.CELL);

//Generate the minefieldDiv cells:
populateMinefieldGridDiv();

minefieldDiv.addEventListener("click", (e) => {
    if (gameFinished) {
        startingPoint = null;
        minefield.length = 0;
        initEmptyMinefield();
        minefieldDiv.innerHTML = "";
        populateMinefieldGridDiv();
        gameFinished = false;
    } else {
        let clickedDiv = e.target;
        if ([...clickedDiv.classList].includes(CSS_CLASSES.FLAG_IMG)) {
            clickedDiv = e.target.parentNode;
        }

        const i = cellDivElementToCoord(clickedDiv).i;
        const j = cellDivElementToCoord(clickedDiv).j;
        if (startingPoint === null) {
            startingPoint = new Point(i, j);
            minefield[startingPoint.i][startingPoint.j].isRevealed = true; //Reveal the starting point.
            revealStartingPointNeighbors();
            populateMinefieldWithBombs();
            clickedDiv.classList.add(CSS_CLASSES.REVEALED);

            const startingPointNeighbors = getCellNeighbors(startingPoint);
            startingPointNeighbors.forEach((point => {
                const neighborDiv = coordToCellDivElement(point);
                neighborDiv.classList.add(CSS_CLASSES.REVEALED);
                const nearBombs = calculateNearBombCount(point);
                neighborDiv.innerText = nearBombs === 0 ? "" : nearBombs;
                neighborDiv.classList.add(CSS_CLASSES.NEAR_BOMB_COUNT_NUMBERS[`${nearBombs}`]);
            }));
        } else {
            const i = cellDivElementToCoord(clickedDiv).i;
            const j = cellDivElementToCoord(clickedDiv).j;
            const shouldHandleClick = !minefield[i][j].isFlagged && !minefield[i][j].isRevealed;
            if (shouldHandleClick) {
                if (minefield[i][j].isBomb) {
                    gameFinished = true;
                    minefield.forEach(((row, i) => {
                        row.forEach((cell, j) => {
                            const div = coordToCellDivElement(new Point(i, j));
                            if (cell.isBomb) {
                                div.classList.add(CSS_CLASSES.REVEALED);
                                const bombImg = document.createElement("img");
                                bombImg.src = "./images/bomb.png";
                                bombImg.classList.add(CSS_CLASSES.BOMB_IMG);
                                div.appendChild(bombImg);
                            }
                        });
                    }));

                    clickedDiv.style.backgroundColor = "red";

                } else {
                    clickedDiv.classList.add(CSS_CLASSES.REVEALED);
                    minefield[i][j].isRevealed = true;
                    const coord = cellDivElementToCoord(clickedDiv);
                    const nearBombs = calculateNearBombCount(coord);
                    clickedDiv.innerText = nearBombs === 0 ? "" : nearBombs;
                    clickedDiv.classList.add(CSS_CLASSES.NEAR_BOMB_COUNT_NUMBERS[`${nearBombs}`]);
                }
            }
        }
    }
});

minefieldDiv.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    let rightClickedDiv = e.target;
    if ([...rightClickedDiv.classList].includes(CSS_CLASSES.FLAG_IMG)) {
        rightClickedDiv = rightClickedDiv.parentNode;
    }
    if (startingPoint !== null) {
        const coord = cellDivElementToCoord(rightClickedDiv);
        if (!minefield[coord.i][coord.j].isFlagged) {
            const imgElement = document.createElement("img");
            imgElement.src = "./images/flag.webp";
            imgElement.alt = "flag";
            imgElement.classList.add(CSS_CLASSES.FLAG_IMG);
            rightClickedDiv.appendChild(imgElement);
        } else {
            rightClickedDiv.innerHTML = "";
        }
        minefield[coord.i][coord.j].isFlagged = !minefield[coord.i][coord.j].isFlagged;
    }
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
    if (j < minefieldColumns - 1) {
        minefield[i][j + 1].isRevealed = true;
    }
    if (i > 0) {
        minefield[i - 1][j].isRevealed = true;
        if (j > 0) {
            minefield[i - 1][j - 1].isRevealed = true;
        }
        if (j < minefieldColumns - 1) {
            minefield[i - 1][j + 1].isRevealed = true;
        }
    }
    if (i < minefieldRows - 1) {
        minefield[i + 1][j].isRevealed = true;
        if (j > 0) {
            minefield[i + 1][j - 1].isRevealed = true;
        }
        if (j < minefieldColumns - 1) {
            minefield[i + 1][j + 1].isRevealed = true;
        }
    }
}

function getCellNeighbors(point) {
    const [i, j] = [point.i, point.j];
    const neighbors = [];
    if (j > 0) neighbors.push(new Point(i, j - 1));
    if (j < minefieldColumns - 1) neighbors.push(new Point(i, j + 1));
    if (i > 0) {
        neighbors.push(new Point(i - 1, j));
        if (j > 0) neighbors.push(new Point(i - 1, j - 1));
        if (j < minefieldColumns - 1) neighbors.push(new Point(i - 1, j + 1));
    }
    if (i < minefieldRows - 1) {
        neighbors.push(new Point(i + 1, j));
        if (j > 0) neighbors.push(new Point(i + 1, j - 1));
        if (j < minefieldColumns - 1) neighbors.push(new Point(i + 1, j + 1));
    }

    return neighbors;
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
            cellDiv.id = `p${i}_${j}`;
            cellRowDiv.appendChild(cellDiv.cloneNode());
        }

        minefieldDiv.appendChild(cellRowDiv.cloneNode(true));
        cellRowDiv.innerHTML = "";

    }
}

function cellDivElementToCoord(cellDivElement) {
    const i = +String(cellDivElement.id).slice(1).split("_")[0];
    const j = +String(cellDivElement.id).slice(1).split("_")[1];
    return new Point(i, j);
}

function coordToCellDivElement(point) {
    const i = point.i;
    const j = point.j;
    return document.querySelector(`#p${i}_${j}`);
}

function calculateNearBombCount(point) {
    const neighbors = getCellNeighbors(point);
    const bombCount = neighbors.reduce((count, neighbor) => {
        const [i, j] = [neighbor.i, neighbor.j];
        if (minefield[i][j].isBomb) {
            return count + 1;
        } else {
            return count;
        }
    }, 0);
    return bombCount;
}

function logMinefield(property) {
    console.table(minefield.map(row => row.map(cell => cell[property])));
}