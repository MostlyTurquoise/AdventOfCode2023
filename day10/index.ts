import fs from "fs";
import Day from "../helpFiles/export.js";
import { number } from "mathjs";

function gridLoop<T>(grid: T[][], fn: (input: T, y: number, x: number) => any) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            process.stdout.write(`\u001b[${i};${j}H${grid[i][j]}`);
            fn(grid[i][j], i, j);
        }
        process.stdout.write("\n");
    }
}

function gridLoopClean<T>(
    grid: T[][],
    fn: (input: T, y: number, x: number) => any
) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            fn(grid[i][j], i, j);
        }
    }
}

function traverse<T>(
    grid: T[][],
    y: number,
    x: number,
    fn: (input: T, y: number, x: number) => [number, number] | false
) {
    let go = true;
    while (go) {
        let movement = fn(grid[y][x], y, x);
        if (Array.isArray(movement)) {
            y += movement[0];
            x += movement[1];
        } else {
            go = false;
        }
    }
}

function moveCursorTo(y: number, x: number) {
    process.stdout.write(`\u001b[${y};${x}H`);
}

function writeCharAt(grid: string[][], y: number, x: number, c: string) {
    process.stdout.write(`\u001b[${y};${x}H\u001b[${c}m${grid[y][x]}\u001b[0m`);
}

function writeTo(y:number,x:number,str:string, ender="\n"){
    process.stdout.write(`\u001b[${y};${x}H${str}${ender}`);
}

// function canEnter(val: string, [rely, relx]: [number, number]): boolean {
//     switch (val) {
//         case "-": {
//             return rely == 0 && (relx == -1 || relx == 1);
//         }
//         case "|": {
//             return relx == 0 && (rely == -1 || rely == 1);
//         }
//         case "F": {
//             return (relx == 0 && rely == 1) || (relx == 1 && rely == 0);
//         }
//         case "J": {
//             return (relx == 0 && rely == -1) || (relx == -1 && rely == 0);
//         }
//         case "L": {
//             return (relx == 0 && rely == -1) || (relx == 1 && rely == 0);
//         }
//         case "7": {
//             return (relx == 0 && rely == 1) || (relx == -1 && rely == 0);
//         }
//         default: {
//             return false;
//         }
//     }
// }

function findNextSquare(
    grid: string[][],
    [y, x]: [number, number],
    [lasty, lastx]: [number, number],
    sCol = 136
): [number, number] {
    let squaresToCheck: [number, number][] = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];

    for (let i = 0; i < squaresToCheck.length; i++) {
        let toCheck: [number, number] = squaresToCheck[i];
        if (y + toCheck[0] == lasty && x + toCheck[1] == lastx) {
            i++;
            toCheck = squaresToCheck[i];
        }
        while(y + toCheck[0]>=grid.length || x + toCheck[1]>=grid[y].length){
            i++
            toCheck = squaresToCheck[i];
        }
        let here = grid[y][x];
        let square = grid[y + toCheck[0]][x + toCheck[1]];
        // writeCharAt(grid, y + toCheck[0], x + toCheck[1], "48;5;59");
        // writeCharAt(grid, lasty, lastx, `48;5;${sCol}`);
        if (i == 0 && ["S", "J", "|", "L"].includes(here)) {
            if (["7", "|", "F"].includes(square)) {
                return toCheck;
            } else if(square=="S"){
                return [-58, -58];
            }
        } else if (i == 1 && ["S", "7", "|", "F"].includes(here)) {
            if (["J", "|", "L"].includes(square)) {
                return toCheck;
            } else if(square=="S"){
                return [-58, -58];
            }
        } else if (i == 2 && ["S", "J", "-", "7"].includes(here)) {
            if (["L", "-", "F"].includes(square)) {
                return toCheck;
            } else if(square=="S"){
                return [-58, -58];
            }
        } else if (i == 3 && ["S", "L", "-", "F"].includes(here)) {
            if (["J", "-", "7"].includes(square)) {
                return toCheck;
            } else if(square=="S"){
                return [-58, -58];
            }
        }
    }
    process.stdout.write(`\u001b[${y + 100};${0}H`);
    console.log(
        grid[y - 1][x] + grid[y + 1][x] + grid[y][x - 1] + grid[y][x + 1],
        ["7", "|", "F"].indexOf(grid[y - 1][x])
    );
    throw new Error(`No Squares to move to at ${y},${x} (${grid[y][x]})`);
}

function task1() {
    let input: string = fs.readFileSync("./day10/testcase.txt").toString();
    let grid: string[][] = input.split("\n").map((x) => {
        return x.split("");
    });
    let distanceGrid: (string | number)[][] = grid;

    let startCoordinates: [number, number] = [-1, -1];

    gridLoop(grid, (val, y, x) => {
        if (val == "S") {
            startCoordinates = [y, x];
        }
    });

    let lastSquare = startCoordinates;
    let distance = 0;
    // console.log(grid[startCoordinates[0]][startCoordinates[1]]);
    traverse(grid, startCoordinates[0], startCoordinates[1], (val, y, x) => {
        writeCharAt(grid, y, x, "48;5;199");
        let nextSquareMove = findNextSquare(grid, [y, x], lastSquare);
        if (nextSquareMove[0] > -5) {
            distanceGrid[y][x] = distance;
            distance++;
            lastSquare = [y, x];
            return nextSquareMove;
        } else {
            return false;
        }
    });

    distance = 0;
    //@ts-ignore
    traverse(grid, lastSquare[0], lastSquare[1], (val, y, x) => {
        writeCharAt(grid, y, x, "48;5;199");
        let nextSquareMove = findNextSquare(grid, [y, x], lastSquare, 18);
        writeCharAt(grid, lastSquare[0], lastSquare[1], "48;5;18");
        if (nextSquareMove[0] > -5) {
            distanceGrid[y][x] =
                typeof distanceGrid[y][x] == typeof 4 &&
                //@ts-ignore
                distance < distanceGrid[y][x]
                    ? distance
                    : distanceGrid[y][x];
            distance++;
            lastSquare = [y, x];
            return nextSquareMove;
        } else {
            return false;
        }
    });

    // console.clear()

    // console.log("gridlooping");
    // let highestDistance = 0;
    // gridLoopClean(distanceGrid, (val, x, y) => {
    //     //@ts-ignore
    //     if (typeof val == typeof 4 && val > highestDistance) {
    //         //@ts-ignore
    //         highestDistance = val;
    //         console.log(val,highestDistance)
    //     }
    // });

    // console.log("Final output:",highestDistance);
}

export default new Day("Pipe Maze", 10, task1);
