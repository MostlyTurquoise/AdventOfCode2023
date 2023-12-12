import fs from "fs";
import Day from "../helpFiles/export.js";
function task1() {
    let input = fs.readFileSync("./day11/input.txt").toString();
    let gridOfSpace = input.split("\n").map((e) => {
        return e.split("");
    });
    for (let row = 0; row < gridOfSpace.length; row++) {
        let containsGalaxy = false;
        for (let charIn = 0; charIn < gridOfSpace[row].length; charIn++) {
            if (gridOfSpace[row][charIn] == "#") {
                containsGalaxy = true;
            }
        }
        if (!containsGalaxy) {
            gridOfSpace.splice(row, 0, gridOfSpace[row]);
            row++;
        }
    }
    for (let column = 0; column < gridOfSpace[0].length; column++) {
        let containsGalaxy = false;
        for (let charIn = 0; charIn < gridOfSpace.length; charIn++) {
            if (gridOfSpace[charIn][column] == "#") {
                containsGalaxy = true;
            }
        }
        if (!containsGalaxy) {
            gridOfSpace.forEach((row, i) => {
                gridOfSpace[i].splice(column, 0, row[column]);
            });
            column++;
        }
    }
    let galaxies = [];
    for (let row = 0; row < gridOfSpace.length; row++) {
        for (let col = 0; col < gridOfSpace[row].length; col++) {
            if (gridOfSpace[row][col] == "#") {
                galaxies.push({
                    row,
                    col,
                });
            }
        }
    }
    console.log(galaxies);
    let totalDistance = 0;
    for (let i = 0; i < galaxies.length; i++) {
        let r1 = galaxies[i].row;
        let c1 = galaxies[i].col;
        for (let j = i; j < galaxies.length; j++) {
            let r2 = galaxies[j].row;
            let c2 = galaxies[j].col;
            let dist = Math.abs(r2 - r1) + Math.abs(c2 - c1);
            console.log(`Dist ${i} (${r1},${c1}) to ${j} (${r2},${c2}) = ${dist}`);
            totalDistance += dist;
        }
    }
    console.log(totalDistance);
}
function task2() {
    let input = fs.readFileSync("./day11/input.txt").toString();
    let gridOfSpace = input.split("\n").map((e) => {
        return e.split("");
    });
    let noGalRows = [];
    for (let row = 0; row < gridOfSpace.length; row++) {
        let containsGalaxy = false;
        for (let charIn = 0; charIn < gridOfSpace[row].length; charIn++) {
            if (gridOfSpace[row][charIn] == "#") {
                containsGalaxy = true;
            }
        }
        if (!containsGalaxy) {
            noGalRows.push(row);
        }
    }
    let width = gridOfSpace[0].length;
    let height = gridOfSpace.length;
    let galaxyAge = 1000000;
    let galaxies = [];
    let trueRow = 0;
    let trueCol = 0;
    let checkedCols = [];
    for (let row = 0; row < height; row++) {
        let rowContainsGalaxy = false;
        for (let icol = 0; icol < width; icol++) {
            if (gridOfSpace[row][icol] === "#") {
                rowContainsGalaxy = true;
            }
        }
        if (!rowContainsGalaxy) {
            trueRow += galaxyAge - 1;
        }
        for (let col = 0; col < width; col++) {
            console.log(row, col, trueRow, trueCol);
            let containsGalaxy = false;
            for (let irow = 0; irow < height; irow++) {
                if (gridOfSpace[irow][col] === "#") {
                    containsGalaxy = true;
                }
            }
            if (!containsGalaxy) {
                trueCol += galaxyAge - 1;
                checkedCols.push(col);
            }
            trueCol++;
            if (gridOfSpace[row][col] == "#") {
                galaxies.push({
                    row: trueRow,
                    col: trueCol,
                });
            }
        }
        trueCol = 0;
        trueRow++;
    }
    console.log(galaxies, trueRow, trueCol);
    let totalDistance = 0;
    for (let i = 0; i < galaxies.length; i++) {
        let r1 = galaxies[i].row;
        let c1 = galaxies[i].col;
        for (let j = i; j < galaxies.length; j++) {
            let r2 = galaxies[j].row;
            let c2 = galaxies[j].col;
            let dist = Math.abs(r2 - r1) + Math.abs(c2 - c1);
            console.log(`Dist ${i} (${r1},${c1}) to ${j} (${r2},${c2}) = ${dist}`);
            totalDistance += dist;
        }
    }
    console.log(totalDistance);
}
export default new Day("Cosmic Expansion", 11, task1, task2);
//# sourceMappingURL=index.js.map