import fs from "fs";

import Day from "../helpFiles/export.js";

function isNumeric(c: string): boolean {
    return c >= "0" && c <= "9";
}

const numbers: string[] = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
];

function getNo(line: string, c: number): number | undefined {
    if (isNumeric(line[c])) {
        return parseInt(line[c]);
    } else {
        for (let i = 0; i < numbers.length; i++) {
            if (line.substring(c).startsWith(numbers[i])) {
                return i;
            }
        }
    }
}

function run1(): boolean {
    let input: string = fs.readFileSync("./day1/input.txt").toString();
    let splitInput: string[] = input.split("\n");

    let totalCalibrationVal: number = 0;

    for (let i = 0; i < splitInput.length; i++) {
        let line: string = splitInput[i];
        let firstNo: string = "";
        let lastNo: string = "";
        for (let c = 0; c < line.length; c++) {
            if (isNumeric(line[c])) {
                if (firstNo == "") {
                    firstNo = line[c];
                }
                lastNo = line[c];
            }
        }
        let no: string = firstNo + lastNo;
        let val: number = 0;
        if (no != "") {
            val = parseInt(no);
        }
        totalCalibrationVal += val;
        console.log(`Line: ${line} | val: ${val}`);
    }
    console.log(totalCalibrationVal);
    return true;
}

function run2(): boolean {
    let input: string = fs.readFileSync("./day1/input.txt").toString();
    let splitInput: string[] = input.split("\n");

    let totalCalibrationVal: number = 0;

    for (let i = 0; i < splitInput.length; i++) {
        let line: string = splitInput[i];
        let firstNo: string = "";
        let lastNo: string = "";
        for (let c = 0; c < line.length; c++) {
            let result: number | undefined = getNo(line, c);
            if (result != undefined) {
                if (firstNo == "") {
                    firstNo = getNo(line, c)?.toString() ?? "";
                }
                lastNo = getNo(line, c)?.toString() ?? "";
            }
        }
        let no: string = firstNo + lastNo;
        let val: number = 0;
        if (no != "") {
            val = parseInt(no);
        }
        totalCalibrationVal += val;
        console.log(`Line: ${line} | val: ${val}`);
    }
    console.log(totalCalibrationVal);
    return true;
}

export default new Day("Trebuchet?!", 1, run1, run2);
