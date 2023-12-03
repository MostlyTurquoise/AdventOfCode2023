import fs from "fs";
import Day from "../helpFiles/export.js";

function isNumeric(c: string): boolean {
    return c >= "0" && c <= "9";
}

function task1(): boolean {
    let input: string = fs.readFileSync("./day2/input.txt").toString();
    let games: string[] = input.split("\n");

    let sumOfValidGameNumbers = 0;
    let max = {
        red: 12,
        green: 13,
        blue: 14,
    };

    for (let i = 0; i < games.length; i++) {
        let game = games[i];
        try {
            let [gameNo, gameResult] = game.split(":");
            console.log(gameNo);
            let individualRounds = gameResult.split(";");
            let valid = true;
            for (let i = 0; i < individualRounds.length; i++) {
                let round = individualRounds[i];
                console.log();
                let throws = round.split(",");
                for (let j = 0; j < throws.length; j++) {
                    let thisThrow = throws[j];
                    if (thisThrow.indexOf("red") >= 0) {
                        let justNo: string = thisThrow
                            .replace("red", "")
                            .trim();
                        let no: number = parseInt(justNo);
                        if (valid) {
                            valid = no <= max.red;
                        }
                        console.log(thisThrow + " red", !(no <= max.red));
                    } else if (thisThrow.indexOf("blue") >= 0) {
                        let justNo: string = thisThrow
                            .replace("blue", "")
                            .trim();
                        let no: number = parseInt(justNo);
                        if (valid) {
                            valid = no <= max.blue;
                        }
                        console.log(thisThrow + " blue", !(no <= max.blue));
                    } else if (thisThrow.indexOf("green") >= 0) {
                        let justNo: string = thisThrow
                            .replace("green", "")
                            .trim();
                        let no: number = parseInt(justNo);
                        if (valid) {
                            valid = no <= max.green;
                        }
                        console.log(thisThrow + " green", !(no <= max.green));
                    }
                }
            }
            if (valid) {
                console.log("Adding valid game...");
                let justNo: string = gameNo.replace("Game ", "").trim();
                let no: number = parseInt(justNo);
                sumOfValidGameNumbers += no;
            }
        } catch (err) {
            console.log("invalid line ~");
        }
    }
    console.log(sumOfValidGameNumbers);
    return true;
}

function task2(): boolean {
    let input: string = fs.readFileSync("./day2/input.txt").toString();
    let games: string[] = input.split("\n");

    let sumOfMinGamePowers = 0;

    for (let i = 0; i < games.length; i++) {
        let game = games[i];
        let min = {
            red: 0,
            green: 0,
            blue: 0,
        };
        try {
            let [gameNo, gameResult] = game.split(":");
            console.log(gameNo);
            let individualRounds = gameResult.split(";");
            let valid = true;
            for (let i = 0; i < individualRounds.length; i++) {
                let round = individualRounds[i];
                console.log();
                let throws = round.split(",");
                for (let j = 0; j < throws.length; j++) {
                    let thisThrow = throws[j];
                    if (thisThrow.indexOf("red") >= 0) {
                        let justNo: string = thisThrow
                            .replace("red", "")
                            .trim();
                        let no: number = parseInt(justNo);
                        if (no > min.red) {
                            min.red = no;
                        }
                        console.log(thisThrow + " red", !(no <= min.red));
                    } else if (thisThrow.indexOf("blue") >= 0) {
                        let justNo: string = thisThrow
                            .replace("blue", "")
                            .trim();
                        let no: number = parseInt(justNo);
                        if (no > min.blue) {
                            min.blue = no;
                        }
                        console.log(thisThrow + " blue", !(no <= min.blue));
                    } else if (thisThrow.indexOf("green") >= 0) {
                        let justNo: string = thisThrow
                            .replace("green", "")
                            .trim();
                        let no: number = parseInt(justNo);
                        if (no > min.green) {
                            min.green = no;
                        }
                        console.log(thisThrow + " green", !(no <= min.green));
                    }
                }
            }
            let power: number = min.red * min.blue * min.green;
            sumOfMinGamePowers += power;
        } catch (err) {
            console.log("invalid line ~");
        }
    }
    console.log(sumOfMinGamePowers);
    return true;
}

export default new Day("Cube Conundrum", 2, task1, task2);
