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

function shuffle(arr) {
    arr = arr.slice();
    const n = arr.length;
    for (let i = n - 1; i >= 1; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
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

