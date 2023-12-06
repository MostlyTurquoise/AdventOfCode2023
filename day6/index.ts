import fs from "fs";
import Day from "../helpFiles/export.js";
import { time } from "console";

function task1() {
    let input: string = fs.readFileSync("./day6/input.txt").toString();
    type Race = {
        time: number;
        record: number;
    };
    let lines: string[] = input
        .replaceAll(/(Time\:|Distance\:)\s*/g, "")
        .split("\n");
    let races: Race[] = [];
    lines.forEach((outerEl, i) => {
        outerEl.split(/\s+/g).forEach((el, j) => {
            console.log(i, j, el);
            if (i == 0) {
                races.push({ time: 0, record: 0 });
                races[j].time = parseInt(el);
            } else {
                races[j].record = parseInt(el);
            }
        });
    });
    /*
    c = charge time
    m = total movement
    t = race time
    r = race record

    m = c(t - c)
    m > r
    c(t - c) > r
    -c^2 + tc - r > 0
    c = (-t +/- sqrt(t^2 - 4r))/-2
    */
    let marginsOfErr: number[] = [];
    for (let i = 0; i < races.length; i++) {
        let race = races[i];
        // lets do quadratic formula yay
        let c1 =
            (-race.time + Math.sqrt(race.time ** 2 - 4 * race.record)) / -2;
        let c2 =
            (-race.time - Math.sqrt(race.time ** 2 - 4 * race.record)) / -2;

        let intC1 = c1 > c2 ? Math.floor(c1) : Math.ceil(c1);
        let intC2 = c2 > c1 ? Math.floor(c2) : Math.ceil(c2);
        intC1 = intC1 == c1 ? intC1 + 1 : intC1;
        intC2 = intC2 == c2 ? intC2 - 1 : intC2;
        // console.log(i, race, c1, intC1, c2, intC2);
        console.log(
            "Range:",
            intC2 - (intC1 - 1),
            " Between:",
            intC1,
            intC2,
            "( from",
            c1,
            c2,
            ")"
        );
        let marginOfErr = intC2 - (intC1 - 1);
        marginsOfErr.push(marginOfErr);
    }
    console.log(marginsOfErr);
    let totalMargin = marginsOfErr.shift() ?? 1;
    marginsOfErr.forEach((el, i) => {
        totalMargin *= el;
    });
    console.log(`${totalMargin}`);
}

type Race = {
    time: number;
    record: number;
};

function task2() {
    let input: string = fs.readFileSync("./day6/input.txt").toString();
    let lines: string[] = input
        .replaceAll(/(Time\:|Distance\:)\s*/g, "")
        .split("\n");
    let race: Race = {time:0,record:0}
    lines.forEach((outerEl, i) => {
        let trueLine = outerEl.replaceAll(/\s+/g,"")
        if(i==0){
            race.time = parseInt(trueLine)
        } else {
            race.record = parseInt(trueLine)
        }
    });
    /*
    c = charge time
    m = total movement
    t = race time
    r = race record

    m = c(t - c)
    m > r
    c(t - c) > r
    -c^2 + tc - r > 0
    c = (-t +/- sqrt(t^2 - 4r))/-2
    */
    console.log(`${getWinningRange(race)}`);
}

function getWinningRange(race: Race) {
    // lets do quadratic formula yay
    let c1 = (-race.time + Math.sqrt(race.time ** 2 - 4 * race.record)) / -2;
    let c2 = (-race.time - Math.sqrt(race.time ** 2 - 4 * race.record)) / -2;

    let intC1 = c1 > c2 ? Math.floor(c1) : Math.ceil(c1);
    let intC2 = c2 > c1 ? Math.floor(c2) : Math.ceil(c2);
    intC1 = intC1 == c1 ? intC1 + 1 : intC1;
    intC2 = intC2 == c2 ? intC2 - 1 : intC2;
    // console.log(i, race, c1, intC1, c2, intC2);
    console.log(
        "Range:",
        intC2 - (intC1 - 1),
        " Between:",
        intC1,
        intC2,
        "( from",
        c1,
        c2,
        ")"
    );
    let marginOfErr = intC2 - (intC1 - 1);
    return marginOfErr;
}

export default new Day("Wait for it", 6, task1, task2);
