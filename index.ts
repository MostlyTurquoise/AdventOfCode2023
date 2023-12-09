import fs from "fs";
import axios from "axios";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

import Day from "./helpFiles/export.js";

import day1 from "./day1/index.js";
import day2 from "./day2/index.js";
import day3 from "./day3/index.js";
import day4 from "./day4/index.js";
import day5 from "./day5/index.js";
import day6 from "./day6/index.js";
import day7 from "./day7/index.js";
import day8 from "./day8/index.js";
import day9 from "./day9/index.js";

let daylist: Day[] = [day1, day2, day3, day4, day5, day6, day7, day8, day9];
console.log("Please choose a day:");
for (let i = 0; i < 25; i++) {
    if (i < daylist.length) {
        let thisDay: Day = daylist[i];
        console.log(
            `Day ${thisDay.dayNumber}: ${thisDay.name}`.padEnd(
                (process.stdout.columns || 37) - 2,
                " "
            ) + thisDay.stars
        );
    } else {
        console.log(
            `Day ${i + 1}:`.padEnd((process.stdout.columns || 37) - 2, " ") +
                "--"
        );
    }
}

const keyboardTopRow = "`qwertyuiop";

rl.question("Select Day: ", function (day: string) {
    if (day.length == 1) {
        rl.question("Select Task: ", function (task: string) {
            console.clear();
            console.time("Run-time");
            daylist[parseInt(day) - 1].run(parseInt(task));
            console.timeEnd("Run-time");
        });
    } else {
        if (day.match(/^[0-9]+[\`qwertyuiop]+$/)) {
            let dayNo = 0;
            let dayVal = parseInt(day[0]);
            for (let i = 0; i < day.length; i++) {
                if (i != 0 && day[i] == day[0]) {
                    dayNo++;
                }
            }
            let actualDay: number;
            if (day[0] != "0") {
                actualDay = dayVal + 10 * dayNo;
            } else if (day[0] == "0") {
                actualDay = 10 * (dayNo + 1);
            } else {
                throw new Error(";-;");
            }
            let actualTask: number =
                keyboardTopRow.indexOf(day.at(-1) || "") -
                ((dayVal != 0 ? dayVal : 10) - 2);
            console.clear();
            console.time("Run-time");
            try {
                daylist[actualDay - 1].run(actualTask);
            } catch (err) {
                console.warn(err)
                throw new Error(
                    `Input ${day} invalid U~U (${actualDay - 1} ${actualTask})`
                );
            }

            console.timeEnd("Run-time");
        } else {
            throw new Error(`Invalid Input T.T (${day})`);
        }
    }
});
