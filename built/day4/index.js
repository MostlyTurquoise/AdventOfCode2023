import fs from "fs";
import Day from "../helpFiles/export.js";
function task1() {
    let input = fs.readFileSync("./day4/input.txt").toString();
    let cards = input.split("\n");
    let sanitisedSplitCards = [];
    cards.forEach(card => {
        sanitisedSplitCards.push([...card.replace(/Card.*[0-9]+:\s/, "").split("|")]);
    });
    let totalPoints = 0;
    for (let i = 0; i < sanitisedSplitCards.length; i++) {
        let winningNos = sanitisedSplitCards[i][0].split(" ");
        for (let j = 0; j < winningNos.length; j++) {
            winningNos[j] = winningNos[j].replace("\r", "");
        }
        let scratchedNos = sanitisedSplitCards[i][1].split(" ");
        console.log(winningNos, scratchedNos);
        let matches = 0;
        for (let j = 0; j < scratchedNos.length; j++) {
            if (scratchedNos[j] != "" && winningNos.includes(scratchedNos[j].replace("\r", ""))) {
                matches++;
            }
        }
        let points = 0;
        console.log(matches);
        if (matches > 0) {
            points = 2 ** (matches - 1);
        }
        console.log(points);
        totalPoints += points;
    }
    console.log(totalPoints);
}
function task2() {
    let input = fs.readFileSync("./day4/input.txt").toString();
    let cards = input.split("\n");
    let sanitisedSplitCards = [];
    for (let i = 0; i < cards.length; i++) {
        let strArrCard = cards[i].replace(/Card.*[0-9]+:\s/, "").split("|");
        let card = {
            winningNos: strArrCard[0].replaceAll("\r", "").split(" "),
            scratchedNos: strArrCard[1].replaceAll("\r", "").split(" "),
            pos: i + 1,
            clones: 1
        };
        sanitisedSplitCards.push(card);
    }
    let totalPoints = 0;
    for (let i = 0; i < sanitisedSplitCards.length; i++) {
        let winningNos = sanitisedSplitCards[i].winningNos;
        let scratchedNos = sanitisedSplitCards[i].scratchedNos;
        console.log(winningNos, scratchedNos, sanitisedSplitCards[i].clones);
        let matches = 0;
        for (let j = 0; j < scratchedNos.length; j++) {
            if (scratchedNos[j] != "" && winningNos.includes(scratchedNos[j].replace("\r", ""))) {
                matches++;
            }
        }
        for (let c = 0; c < sanitisedSplitCards[i].clones; c++) {
            for (let j = 1; j <= matches; j++) {
                sanitisedSplitCards[i + j].clones++;
            }
        }
        totalPoints += sanitisedSplitCards[i].clones;
    }
    console.log(totalPoints);
}
export default new Day("Scratchcards", 4, task1, task2);
//# sourceMappingURL=index.js.map