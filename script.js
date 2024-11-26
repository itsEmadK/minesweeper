const minefield = [];
let [rows, columns] = [8, 12];
for (let i = 0; i < rows; i++) {
    const temp = [];
    for (let j = 0; j < columns; j++) {
        temp.push(new Cell());
    }
    minefield.push(temp.slice());
    temp.length = 0;
}



function Cell() {
    this.isBomb = false;
    this.isFlagged = false;
    this.isRevealed = false;
}