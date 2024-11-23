function shuffleInPlace(arr) {
    const n = arr.length;
    for (let i = n - 1; i >= 1; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}
