import fs from "fs";
import axios from "axios";
import readline from "readline"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

import Day from "./helpFiles/export.js";

import day1 from "./day1/index.js";
import day2 from "./day2/index.js";

let daylist: Day[] = [day1, day2]
console.log("Please choose a day:")
for(let i = 0; i < 25; i++){
    if(i<daylist.length){
        let thisDay: Day = daylist[i];
        console.log(`Day ${thisDay.dayNumber}: ${thisDay.name}`.padEnd(35," ")+thisDay.stars)
    } else {
        console.log(`Day ${i+1}:`.padEnd(35," ")+"--")
    }
}

rl.question("Select Day: ", function(day: string) {
    rl.question("Select Task: ", function(task:string) {
        console.clear()
        daylist[parseInt(day)-1].run(parseInt(task));
    });
});
