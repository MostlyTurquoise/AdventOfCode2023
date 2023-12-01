import readline from "readline";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
import day1 from "./day1/index.js";
let daylist = [day1,];
console.log("Please choose a day:");
for (let i = 0; i < 25; i++) {
    if (i < daylist.length) {
        let thisDay = daylist[i];
        console.log(`Day ${thisDay.dayNumber}: ${thisDay.name}`.padEnd(35, " ") + thisDay.stars);
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