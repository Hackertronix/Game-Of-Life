let rows = 1000;
let columns = 1000;
let cellSize = 10;
const framesPerSecond = 8
let width = window.innerWidth;
let height = window.innerHeight;



function makeAGrid() {
    let grid = new Array(columns);

    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(rows);
        for (let j = 0; j < grid.length; j++) {
            grid[i][j] = Math.floor(Math.random() * 2);
        }
    }

    return grid;
}

function drawGrid(grid, context) {

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

const getNextGeneration = (grid) => {
    let nextGrid = new Array(columns);

    for (let i = 0; i < grid.length; i++) {
        nextGrid[i] = new Array(rows);
        for (let j = 0; j < grid.length; j++) {

            //compute 
            let cell = grid[i][j];

            neighborCount = countNeighbours(grid, i, j);
            if (cell === 0 && neighborCount == 3) {
                nextGrid[i][j] = 1;
            } else if (cell === 1 && (neighborCount < 2 || neighborCount > 3)) {
                nextGrid[i][j] = 0;
            } else {
                nextGrid[i][j] = cell;
            }
        }
    }

    return nextGrid;
}

const countNeighbours = (grid, x, y) => {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            const row = (x + i + rows) % rows;
            const col = (y + j + columns) % columns;
            sum += grid[row][col]
        }
    }

    sum -= grid[x][y];
    return sum;
}

const generateNewGen = (context, grid) => {
    context.clearRect(0, 0, width, height);
    drawGrid(grid, context);
    const nextGeneration = getNextGeneration(grid);
    setTimeout(() => {
        requestAnimationFrame(() => generateNewGen(context, nextGeneration))
    }, 1000 / 1000);

}

window.onload = () => {

    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let playButton = document.getElementById('playBtn')
    canvas.width = 1200;
    canvas.height = 600;
    const grid = makeAGrid();
    drawGrid(grid, context);
    playButton.addEventListener('click', () => {
        canvas.setAttribute("style", "filter: blur(0px)");
        playButton.style.visibility = 'hidden';
        generateNewGen(context, grid);
    })

}