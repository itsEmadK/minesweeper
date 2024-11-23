function shuffleInPlace(arr, skipPredicate) {
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
}


function reshape(arr, rows, columns) {

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
}

function generateMinefield(rows, columns, firstTouchI, firstTouchJ, bombCount) {
    let minefield = [];
    for (let i = 0; i < rows; i++) {
        const tempArray = [];
        for (let j = 0; j < columns; j++) {
            tempArray.push(false);
        }
        minefield.push(tempArray.slice());
        tempArray.length = [];
    }

    minefield[firstTouchI][firstTouchJ] = null;
    const neighbors = getCellNeighbors(firstTouchI, firstTouchJ, rows, columns);
    neighbors.forEach((neighbor) => minefield[neighbor.i][neighbor.j] = null);
    const flatMineField = minefield.flat();

    let k = 0;
    for (let i = 0; k < bombCount; i++) {
        if (flatMineField[i] !== null) {
            flatMineField[i] = true;
            k++;
        }
    }

    shuffleInPlace(flatMineField, (item) => item === null);
    minefield = reshape(flatMineField, rows, columns);
    return minefield;

}

function getCellNeighbors(i, j, rows, columns) {
    const neighbors = [];
    if (j > 0) {
        neighbors.push({ i: i, j: j - 1 });
    }
    if (j < columns - 1) {
        neighbors.push({ i: i, j: j + 1 });
    }
    if (i > 0) {
        neighbors.push({ i: i - 1, j: j });
        if (j > 0) {
            neighbors.push({ i: i - 1, j: j - 1 });
        }
        if (j < columns - 1) {
            neighbors.push({ i: i - 1, j: j + 1 });
        }
    }
    if (i < rows - 1) {
        neighbors.push({ i: i + 1, j: j });
        if (j > 0) {
            neighbors.push({ i: i + 1, j: j - 1 });
        }
        if (j < columns - 1) {
            neighbors.push({ i: i + 1, j: j + 1 });
        }
    }

    return neighbors;
}

console.table(generateMinefield(10, 10, 0, 9, 20));
