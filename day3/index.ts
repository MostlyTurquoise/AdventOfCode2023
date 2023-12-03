import fs from "fs";
import Day from "../helpFiles/export.js";

function isNumeric(c: string): boolean {
    return c >= "0" && c <= "9";
}

function task1() {
    let input: string = fs.readFileSync("./day3/input.txt").toString();
    let schematic: string[] = input.split("\n");

    let sumOfAllParts = 0;

    for (let y = 0; y < schematic.length; y++) {
        for (let x = 0; x < schematic[0].length; x++) {
            let thisNo = "";
            if (isNumeric(schematic[y][x])) {
                thisNo += schematic[y][x];
                while (isNumeric(schematic[y][x + 1])) {
                    x++;
                    thisNo += schematic[y][x];
                }
                let enginePart = false;

                for (let yMod = -1; yMod <= 1; yMod++) {
                    for (let xMod = -thisNo.length; xMod <= 1; xMod++) {
                        if (
                            x + xMod < schematic[0].length &&
                            x + xMod > 0 &&
                            y + yMod < schematic.length &&
                            y + yMod > 0
                        ) {
                            if (
                                schematic[y + yMod][x + xMod] != "." &&
                                !isNumeric(schematic[y + yMod][x + xMod])
                            ) {
                                enginePart = true;
                            }
                            try {
                                process.stdout.write(
                                    schematic[y + yMod][x + xMod]
                                );
                            } catch (err) {
                                process.stdout.write(" ");
                            }
                        }
                    }
                    process.stdout.write("\n");
                }

                sumOfAllParts += enginePart ? parseInt(thisNo) : 0;
                console.log(enginePart);
                process.stdout.write("\n");
            }
        }
    }
    console.log(sumOfAllParts);
}

function task2() {
    let input: string = fs.readFileSync("./day3/input.txt").toString();
    let schematic: string[] = input.split("\n");

    let totalGearRatio = 0;

    for (let y = 0; y < schematic.length; y++) {
        process.stdout.write("New Line\n");
        for (let x = 0; x < schematic[0].length; x++) {
            if (schematic[y][x] == "*") {
                let nos:number[] = []
                for (let yMod = -1; yMod <= 1; yMod++) {
                    for (let xMod = -1; xMod <= 1; xMod++) {
                        if (
                            x + xMod < schematic[0].length &&
                            x + xMod >= 0 &&
                            y + yMod < schematic.length &&
                            y + yMod >= 0
                        ) {
                            if (isNumeric(schematic[y + yMod][x + xMod])) {
                                let thisNo = ""
                                let noMod = 0
                                while(isNumeric(schematic[y + yMod][x + xMod+noMod-1])){
                                    noMod--;
                                }

                                thisNo+=schematic[y + yMod][x + xMod+noMod]
                                

                                while(isNumeric(schematic[y + yMod][x + xMod+noMod+1])){
                                    noMod++;
                                    thisNo+=schematic[y + yMod][x + xMod+noMod]
                                    try {
                                        process.stdout.write(
                                            schematic[y + yMod][x + xMod+noMod]
                                        );
                                    } catch (err) {
                                        process.stdout.write(" ");
                                    }
                                }
                                
                                xMod+=noMod

                                nos.push(parseInt(thisNo))
                            }

                            try {
                                process.stdout.write(
                                    schematic[y + yMod][x + xMod]
                                );
                            } catch (err) {
                                process.stdout.write(" ");
                            }
                        }
                    }
                    process.stdout.write("\n");
                }
                console.log(nos)
                if(nos.length==2){
                    totalGearRatio+=nos[0]*nos[1]
                }
                process.stdout.write("\n");
            }
        }
    }

    console.log(totalGearRatio);
}

// 527736
// 522726

// 162682784
// 81721933
export default new Day("Gear Ratios", 3, task1, task2);
