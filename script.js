const cssSelectors = {
    MINEFIELD_GRID_SELECTOR: ".minefield-grid",
};

const cssClasses = {
    CELL_CONTAINER_CLASS: "cell-container",
    CELL_CLASS: "cell",
};


function Cell(isBomb, isFlagged, isRevealed) {
    this.isBomb = isBomb;
    this.isFlagged = isFlagged;
    this.isRevealed = isRevealed;
}


const gameController = {
    minefield: [],
    rows: null,
    columns: null,
    bombCount: null,
    hasUserWon: false,
    hasUserLost: false,
    utility: {
        shuffleInPlace(arr, skipPredicate) {
            const n = arr.length;
            for (let i = n - 1; i >= 1; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                if (!(skipPredicate(arr[j]) || skipPredicate(arr[i]))) {
                    const temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
            return arr;
        },
        reshape(arr, rows, columns) {

            const new2DArray = [];

            if (arr.length !== rows * columns) {
                return -1;
            }

            let k = 0;
            const tempArray = [];
            for (let i = 0; i < arr.length; i++) {
                if (k < columns) {
                    tempArray.push(arr[i]);
                    k++;
                } else {
                    new2DArray.push(tempArray.slice());
                    tempArray.length = 0;
                    tempArray.push(arr[i]);
                    k = 1;
                }
            }
            new2DArray.push(tempArray);
            return new2DArray;
        },
        getAdjacentCoordinates(i, j) {
            const neighbors = [];
            if (j > 0) {
                neighbors.push({ i: i, j: j - 1 });
            }
            if (j < this.columns - 1) {
                neighbors.push({ i: i, j: j + 1 });
            }
            if (i > 0) {
                neighbors.push({ i: i - 1, j: j });
                if (j > 0) {
                    neighbors.push({ i: i - 1, j: j - 1 });
                }
                if (j < this.columns - 1) {
                    neighbors.push({ i: i - 1, j: j + 1 });
                }
            }
            if (i < this.rows - 1) {
                neighbors.push({ i: i + 1, j: j });
                if (j > 0) {
                    neighbors.push({ i: i + 1, j: j - 1 });
                }
                if (j < this.columns - 1) {
                    neighbors.push({ i: i + 1, j: j + 1 });
                }
            }

            return neighbors;
        },
    },
    generateMinefield(rows, columns, firstTouchI, firstTouchJ, bombCount) {
        let minefield = [];
        this.rows = rows;
        this.columns = columns;
        this.bombCount = bombCount;
        for (let i = 0; i < rows; i++) {
            const tempArray = [];
            for (let j = 0; j < columns; j++) {
                const mine = new Cell(false, false, false);
                tempArray.push(mine);
            }
            minefield.push(tempArray.slice());
            tempArray.length = [];
        }


        minefield[firstTouchI][firstTouchJ].isRevealed = true;
        const neighbors = this.utility.getAdjacentCoordinates(firstTouchI, firstTouchJ, rows, columns);
        neighbors.forEach((neighbor) => minefield[neighbor.i][neighbor.j].isRevealed = true);
        const flatMineField = minefield.flat();

        let k = 0;
        for (let i = 0; k < bombCount; i++) {
            if (flatMineField[i].isRevealed === false) {
                flatMineField[i].isBomb = true;
                k++;
            }
        }

        this.utility.shuffleInPlace(flatMineField, (item) => item.isRevealed === true);
        minefield = this.utility.reshape(flatMineField, rows, columns);

        this.minefield = minefield;

    },
    getNearBombsCount(i, j) {
        return getAdjacentCoordinates(i, j).reduce(
            (count, coord) => this.minefield[coord.i][coord.j].isBomb ? count + 1 : count,
            0);
    },
    toggleCellFlagState(i, j) {
        const cell = this.minefield[i][j];
        cell.isFlagged = !cell.isFlagged;
        if (cell.isFlagged && cell.isBomb) {
            //Flagged a bomb cell.
            this.bombCount--;
        } else if (!cell.isFlagged && cell.isBomb) {
            //UnFlagged a bomb cell
            this.bombCount++;
        }
    },
    revealCell(i, j) {
        const cell = this.minefield[i][j];
        if (!cell.isFlagged && !cell.isRevealed) {
            if (cell.isBomb) {
                this.hasUserLost = true;
            } else {
                cell.isRevealed = true;
            }
        }
    },


}

gameController.generateMinefield(6, 8, 2, 3, 12);
console.table(gameController.minefield.map(((row) => row.map((cell) => cell.isBomb))));


