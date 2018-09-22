let width = window.innerWidth;
let height = window.innerHeight;

let rows = 80;
let columns = 80;

let cellSize = 25;

function makeAGrid() {
    let grid = new Array(columns);

    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(rows);
        for (let j = 0; j < grid.length; j++) {
            grid[i][j] = Math.floor(Math.random() * 2);
        }
    }

    return grid
}

function drawGrid(grid,context) {

    context.strokeStyle = '#000'
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let value = grid[i][j];
            if (value) {
                context.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
            context.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);

        }
    }

}

window.onload = () => {

    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const grid = makeAGrid();
    drawGrid(grid,context);

}