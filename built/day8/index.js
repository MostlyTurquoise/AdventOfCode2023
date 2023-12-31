import fs from "fs";
import Day from "../helpFiles/export.js";
import { lcm } from "mathjs";
function task1() {
    let input = fs.readFileSync("./day8/input.txt").toString();
    let lines = input.split("\n");
    let instructions = lines[0];
    let map = {};
    let follow = {
        L: 0,
        R: 1,
    };
    for (let i = 1; i < lines.length; i++) {
        if (lines[i] != "") {
            let thisLine = lines[i];
            let parts = thisLine.split(/\s+\=\s+/);
            parts[1] = parts[1].replaceAll(/(\(|\))/g, "");
            map[parts[0]] = parts[1].split(/,\s*/);
        }
    }
    console.log(map);
    let startNode = "AAA";
    let currentNode = startNode;
    let steps = 0;
    for ("I can put anything I want"; currentNode != "ZZZ"; steps++) {
        let options = map[currentNode];
        currentNode =
            options[follow[instructions[steps % instructions.length]]];
    }
    console.log(steps);
}
function task2() {
    let input = fs.readFileSync("./day8/input.txt").toString();
    let lines = input.split("\n");
    let instructions = lines[0];
    let map = {};
    let follow = {
        L: 0,
        R: 1,
    };
    let aNodes = [];
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].substring(0, 3).endsWith("A")) {
            aNodes.push(lines[i].substring(0, 3));
        }
        if (lines[i] != "") {
            let thisLine = lines[i];
            let parts = thisLine.split(/\s+\=\s+/);
            parts[1] = parts[1].replaceAll(/(\(|\))/g, "");
            map[parts[0]] = parts[1].split(/,\s*/);
        }
    }
    console.log(map);
    let currentNodes = aNodes;
    let steps = Array.apply(null, Array(currentNodes.length)).map(function (x, i) { return 0; });
    let instructionPos = 0;
    let continue_q = true;
    while (continue_q) {
        console.log(steps, currentNodes);
        continue_q = false;
        currentNodes.forEach((node, i) => {
            if (node.endsWith("Z")) {
            }
            else {
                let here = map[node];
                currentNodes[i] = here[follow[instructions[instructionPos % instructions.length]]];
                steps[i]++;
                continue_q = true;
            }
        });
        instructionPos++;
    }
    console.log(steps, lcm(...steps));
}
function isValidEnd_q(nodes) {
    let valid = true;
    nodes.forEach(node => {
        if (!node.endsWith("Z")) {
            valid = false;
        }
    });
    return valid;
}
export default new Day("Haunted Wasteland", 8, task1, task2);
//# sourceMappingURL=index.js.map