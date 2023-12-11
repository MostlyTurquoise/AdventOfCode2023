import fs from "fs";
import Day from "../helpFiles/export.js";
function gridLoop(grid, fn) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            process.stdout.write(`\u001b[${i};${j}H${grid[i][j]}`);
            fn(grid[i][j], i, j);
        }
        process.stdout.write("\n");
    }
}
function gridLoopClean(grid, fn) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            fn(grid[i][j], i, j);
        }
    }
}
function traverse(grid, y, x, fn) {
    let go = true;
    while (go) {
        let movement = fn(grid[y][x], y, x);
        if (Array.isArray(movement)) {
            y += movement[0];
            x += movement[1];
        }
        else {
            go = false;
        }
    }
}
function moveCursorTo(y, x) {
    process.stdout.write(`\u001b[${y};${x}H`);
}
function writeCharAt(grid, y, x, c) {
    process.stdout.write(`\u001b[${y};${x}H\u001b[${c}m${grid[y][x]}\u001b[0m`);
}
function writeTo(y, x, str, ender = "\n") {
    process.stdout.write(`\u001b[${y};${x}H${str}${ender}`);
}
function findNextSquare(grid, [y, x], [lasty, lastx], sCol = 136) {
    let squaresToCheck = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];
    for (let i = 0; i < squaresToCheck.length; i++) {
        let toCheck = squaresToCheck[i];
        if (y + toCheck[0] == lasty && x + toCheck[1] == lastx) {
            i++;
            toCheck = squaresToCheck[i];
        }
        while (y + toCheck[0] >= grid.length || x + toCheck[1] >= grid[y].length) {
            i++;
            toCheck = squaresToCheck[i];
        }
        let here = grid[y][x];
        let square = grid[y + toCheck[0]][x + toCheck[1]];
        if (i == 0 && ["S", "J", "|", "L"].includes(here)) {
            if (["7", "|", "F"].includes(square)) {
                return toCheck;
            }
            else if (square == "S") {
                return [-58, -58];
            }
        }
        else if (i == 1 && ["S", "7", "|", "F"].includes(here)) {
            if (["J", "|", "L"].includes(square)) {
                return toCheck;
            }
            else if (square == "S") {
                return [-58, -58];
            }
        }
        else if (i == 2 && ["S", "J", "-", "7"].includes(here)) {
            if (["L", "-", "F"].includes(square)) {
                return toCheck;
            }
            else if (square == "S") {
                return [-58, -58];
            }
        }
        else if (i == 3 && ["S", "L", "-", "F"].includes(here)) {
            if (["J", "-", "7"].includes(square)) {
                return toCheck;
            }
            else if (square == "S") {
                return [-58, -58];
            }
        }
    }
    process.stdout.write(`\u001b[${y + 100};${0}H`);
    console.log(grid[y - 1][x] + grid[y + 1][x] + grid[y][x - 1] + grid[y][x + 1], ["7", "|", "F"].indexOf(grid[y - 1][x]));
    throw new Error(`No Squares to move to at ${y},${x} (${grid[y][x]})`);
}
function task1() {
    let input = fs.readFileSync("./day10/testcase.txt").toString();
    let grid = input.split("\n").map((x) => {
        return x.split("");
    });
    let distanceGrid = grid;
    let startCoordinates = [-1, -1];
    gridLoop(grid, (val, y, x) => {
        if (val == "S") {
            startCoordinates = [y, x];
        }
    });
    let lastSquare = startCoordinates;
    let distance = 0;
    traverse(grid, startCoordinates[0], startCoordinates[1], (val, y, x) => {
        writeCharAt(grid, y, x, "48;5;199");
        let nextSquareMove = findNextSquare(grid, [y, x], lastSquare);
        if (nextSquareMove[0] > -5) {
            distanceGrid[y][x] = distance;
            distance++;
            lastSquare = [y, x];
            return nextSquareMove;
        }
        else {
            return false;
        }
    });
    distance = 0;
    traverse(grid, lastSquare[0], lastSquare[1], (val, y, x) => {
        writeCharAt(grid, y, x, "48;5;199");
        let nextSquareMove = findNextSquare(grid, [y, x], lastSquare, 18);
        writeCharAt(grid, lastSquare[0], lastSquare[1], "48;5;18");
        if (nextSquareMove[0] > -5) {
            distanceGrid[y][x] =
                typeof distanceGrid[y][x] == typeof 4 &&
                    distance < distanceGrid[y][x]
                    ? distance
                    : distanceGrid[y][x];
            distance++;
            lastSquare = [y, x];
            return nextSquareMove;
        }
        else {
            return false;
        }
    });
}
export default new Day("Pipe Maze", 10, task1);
//# sourceMappingURL=index.js.map