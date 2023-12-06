import fs from "fs";
import Day from "../helpFiles/export.js";
function task1() {
    var _a;
    let input = fs.readFileSync("./day6/input.txt").toString();
    let lines = input
        .replaceAll(/(Time\:|Distance\:)\s*/g, "")
        .split("\n");
    let races = [];
    lines.forEach((outerEl, i) => {
        outerEl.split(/\s+/g).forEach((el, j) => {
            console.log(i, j, el);
            if (i == 0) {
                races.push({ time: 0, record: 0 });
                races[j].time = parseInt(el);
            }
            else {
                races[j].record = parseInt(el);
            }
        });
    });
    let marginsOfErr = [];
    for (let i = 0; i < races.length; i++) {
        let race = races[i];
        let c1 = (-race.time + Math.sqrt(race.time ** 2 - 4 * race.record)) / -2;
        let c2 = (-race.time - Math.sqrt(race.time ** 2 - 4 * race.record)) / -2;
        let intC1 = c1 > c2 ? Math.floor(c1) : Math.ceil(c1);
        let intC2 = c2 > c1 ? Math.floor(c2) : Math.ceil(c2);
        intC1 = intC1 == c1 ? intC1 + 1 : intC1;
        intC2 = intC2 == c2 ? intC2 - 1 : intC2;
        console.log("Range:", intC2 - (intC1 - 1), " Between:", intC1, intC2, "( from", c1, c2, ")");
        let marginOfErr = intC2 - (intC1 - 1);
        marginsOfErr.push(marginOfErr);
    }
    console.log(marginsOfErr);
    let totalMargin = (_a = marginsOfErr.shift()) !== null && _a !== void 0 ? _a : 1;
    marginsOfErr.forEach((el, i) => {
        totalMargin *= el;
    });
    console.log(`${totalMargin}`);
}
function task2() {
    let input = fs.readFileSync("./day6/input.txt").toString();
    let lines = input
        .replaceAll(/(Time\:|Distance\:)\s*/g, "")
        .split("\n");
    let race = { time: 0, record: 0 };
    lines.forEach((outerEl, i) => {
        let trueLine = outerEl.replaceAll(/\s+/g, "");
        if (i == 0) {
            race.time = parseInt(trueLine);
        }
        else {
            race.record = parseInt(trueLine);
        }
    });
    console.log(`${getWinningRange(race)}`);
}
function getWinningRange(race) {
    let c1 = (-race.time + Math.sqrt(race.time ** 2 - 4 * race.record)) / -2;
    let c2 = (-race.time - Math.sqrt(race.time ** 2 - 4 * race.record)) / -2;
    let intC1 = c1 > c2 ? Math.floor(c1) : Math.ceil(c1);
    let intC2 = c2 > c1 ? Math.floor(c2) : Math.ceil(c2);
    intC1 = intC1 == c1 ? intC1 + 1 : intC1;
    intC2 = intC2 == c2 ? intC2 - 1 : intC2;
    console.log("Range:", intC2 - (intC1 - 1), " Between:", intC1, intC2, "( from", c1, c2, ")");
    let marginOfErr = intC2 - (intC1 - 1);
    return marginOfErr;
}
export default new Day("Wait for it", 6, task1, task2);
//# sourceMappingURL=index.js.map