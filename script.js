const minefield = [];
let [minefieldRows, minefieldColumns] = [8, 12];
initMinefield();

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