import readline from "readline";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
import day1 from "./day1/index.js";
import day2 from "./day2/index.js";
import day3 from "./day3/index.js";
import day4 from "./day4/index.js";
import day5 from "./day5/index.js";
let daylist = [day1, day2, day3, day4, day5];
console.log("Please choose a day:");
for (let i = 0; i < 25; i++) {
    if (i < daylist.length) {
        let thisDay = daylist[i];
        console.log(`Day ${thisDay.dayNumber}: ${thisDay.name}`.padEnd(35, " ") +
            thisDay.stars);
    }
    else {
        console.log(`Day ${i + 1}:`.padEnd(35, " ") + "--");
    }
}
rl.question("Select Day: ", function (day) {
    rl.question("Select Task: ", function (task) {
        console.clear();
        daylist[parseInt(day) - 1].run(parseInt(task));
    });
});
//# sourceMappingURL=index.js.map