import fs from "fs";
import Day from "../helpFiles/export.js";
import { range } from "mathjs";

function task1() {
    let input: string = fs.readFileSync("./day12/testcase.txt").toString();
    let lines = input.split("\n");
    let totalSum = 0;
    for (let i = 0; i < lines.length; i++) {
        let [springs, rangesFull] = lines[i].split(" ");
        let ranges: number[] = rangesFull.split(",").map((x) => parseInt(x));
        let rangePos = 0
        let run = 0
        for (let c = 0; c < springs.length; c++) {
            if(springs[c]=="."){
                run = 0
                rangePos++
            } else if(springs[c]=="#"){
                run++
            }
        }
    }
    console.log(totalSum);
}

export default new Day("Hot Springs", 12, task1);
