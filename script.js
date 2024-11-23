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
    if (firstTouchJ > 0) {
        minefield[firstTouchI][firstTouchJ - 1] = null;
    }
    if (firstTouchJ < columns - 1) {
        minefield[firstTouchI][firstTouchJ + 1] = null;
    }
    if (firstTouchI > 0) {
        minefield[firstTouchI - 1][firstTouchJ] = null;
        if (firstTouchJ > 0) {
            minefield[firstTouchI - 1][firstTouchJ - 1] = null;
        }
        if (firstTouchJ < columns - 1) {
            minefield[firstTouchI - 1][firstTouchJ + 1] = null;
        }
    }
    if (firstTouchI < columns - 1) {
        minefield[firstTouchI + 1][firstTouchJ] = null;
        if (firstTouchJ > 0) {
            minefield[firstTouchI + 1][firstTouchJ - 1] = null;
        }
        if (firstTouchJ < columns - 1) {
            minefield[firstTouchI + 1][firstTouchJ + 1] = null;
        }
    }

    const flatMineField = minefield.flat();

    let k = 0;
    while (k < bombCount) {
        if (flatMineField[k] !== null) {
            flatMineField[k] = true;
            k++;
        }
    }

    shuffleInPlace(flatMineField, (item) => item === null);
    minefield = reshape(flatMineField, rows, columns);
    return minefield;

}


console.table(generateMinefield(5, 10, 3, 2, 20));
