import fs from "fs";
import Day from "../helpFiles/export.js";
function isNumeric(c) {
    return c >= "0" && c <= "9";
}
const numbers = [
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
function getNo(line, c) {
    if (isNumeric(line[c])) {
        return parseInt(line[c]);
    }
    else {
        for (let i = 0; i < numbers.length; i++) {
            if (line.substring(c).startsWith(numbers[i])) {
                return i;
            }
        }
    }
}
function run1() {
    let input = fs.readFileSync("./day1/input.txt").toString();
    let splitInput = input.split("\n");
    let totalCalibrationVal = 0;
    for (let i = 0; i < splitInput.length; i++) {
        let line = splitInput[i];
        let firstNo = "";
        let lastNo = "";
        for (let c = 0; c < line.length; c++) {
            if (isNumeric(line[c])) {
                if (firstNo == "") {
                    firstNo = line[c];
                }
                lastNo = line[c];
            }
        }
        let no = firstNo + lastNo;
        let val = 0;
        if (no != "") {
            val = parseInt(no);
        }
        totalCalibrationVal += val;
        console.log(`Line: ${line} | val: ${val}`);
    }
    console.log(totalCalibrationVal);
    return true;
}
function run2() {
    var _a, _b, _c, _d;
    let input = fs.readFileSync("./day1/input.txt").toString();
    let splitInput = input.split("\n");
    let totalCalibrationVal = 0;
    for (let i = 0; i < splitInput.length; i++) {
        let line = splitInput[i];
        let firstNo = "";
        let lastNo = "";
        for (let c = 0; c < line.length; c++) {
            let result = getNo(line, c);
            if (result != undefined) {
                if (firstNo == "") {
                    firstNo = (_b = (_a = getNo(line, c)) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "";
                }
                lastNo = (_d = (_c = getNo(line, c)) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : "";
            }
        }
        let no = firstNo + lastNo;
        let val = 0;
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
//# sourceMappingURL=index.js.map