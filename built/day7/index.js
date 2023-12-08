var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import fs from "fs";
import Day from "../helpFiles/export.js";
let cardValues = [
    "A",
    "K",
    "Q",
    "T",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
    "J",
];
var HandType;
(function (HandType) {
    HandType[HandType["FiveOfAKind"] = 0] = "FiveOfAKind";
    HandType[HandType["FourOfAKind"] = 1] = "FourOfAKind";
    HandType[HandType["FullHouse"] = 2] = "FullHouse";
    HandType[HandType["ThreeOfAKind"] = 3] = "ThreeOfAKind";
    HandType[HandType["TwoPair"] = 4] = "TwoPair";
    HandType[HandType["OnePair"] = 5] = "OnePair";
    HandType[HandType["HighCard"] = 6] = "HighCard";
    HandType[HandType["Null"] = 7] = "Null";
})(HandType || (HandType = {}));
function compareHands(a, b, pos = 0) {
    if (cardValues.indexOf(a.cards[pos]) < cardValues.indexOf(b.cards[pos])) {
        return 1;
    }
    else if (cardValues.indexOf(a.cards[pos]) > cardValues.indexOf(b.cards[pos])) {
        return -1;
    }
    else {
        return compareHands(a, b, pos + 1);
    }
}
function task1() {
    let input = fs.readFileSync("./day7/testcase.txt").toString();
    let lines = input.split("\n");
    console.log(lines);
    let hands = [];
    lines.forEach((hand, i) => {
        let [cards, bet] = hand.split(" ");
        let maxCards = maxCount(cards);
        let thisHand = {
            cards,
            bet: parseInt(bet),
            type: HandType.HighCard,
        };
        let highestCardCount = -1;
        maxCards.forEach(([val, no], i) => {
            if (val != "J" && highestCardCount == -1) {
                highestCardCount = no;
            }
        });
        maxCards.forEach(([val, no], i) => {
            if (val == "J") {
                highestCardCount += no;
                maxCards.splice(i, 1);
            }
        });
        console.log(maxCards, highestCardCount);
        if (highestCardCount === 5) {
            thisHand.type = HandType.FiveOfAKind;
        }
        else if (highestCardCount === 4) {
            thisHand.type = HandType.FourOfAKind;
        }
        else if (highestCardCount === 3) {
            thisHand.type = HandType.ThreeOfAKind;
            if (maxCount(cards.replaceAll(maxCards[0][0], "").replaceAll("J", ""))[0][1] == 2) {
                thisHand.type = HandType.FullHouse;
            }
        }
        else if (highestCardCount === 2 &&
            maxCards[1] &&
            maxCards[1][1] === 2) {
            thisHand.type = HandType.TwoPair;
        }
        else if (highestCardCount === 2) {
            thisHand.type = HandType.OnePair;
        }
        else {
            thisHand.type = HandType.HighCard;
        }
        hands.push(thisHand);
    });
    hands.sort((a, b) => {
        if (a.type > b.type) {
            return -1;
        }
        else if (a.type < b.type) {
            return 1;
        }
        else {
            return compareHands(a, b);
        }
    });
    let output = 0;
    for (let i = 0; i < hands.length; i++) {
        output += hands[i].bet * (i + 1);
        console.log(hands[i].cards, hands[i].bet, HandType[hands[i].type], i + 1, hands[i].bet * (i + 1), output);
    }
    console.log(output);
}
function maxCount(input) {
    const _a = (input || "").split("").reduce((a, c) => {
        a[c] = a[c] ? a[c] + 1 : 1;
        a.max = a.max < a[c] ? a[c] : a.max;
        return a;
    }, { max: 0 }), { max } = _a, counts = __rest(_a, ["max"]);
    return Object.entries(counts).sort(([k, v], [k2, v2]) => (v < v2 ? 1 : -1));
}
function task2() {
    let input = fs.readFileSync("./day7/input.txt").toString();
    let lines = input.split("\n");
    console.log(lines);
    let hands = [];
    lines.forEach((hand, i) => {
        let [cards, bet] = hand.split(" ");
        let maxCards = maxCount(cards);
        let thisHand = {
            cards,
            bet: parseInt(bet),
            type: HandType.Null,
        };
        let highestCardCount = -1;
        maxCards.forEach(([val, no], i) => {
            if (val != "J" && highestCardCount == -1) {
                highestCardCount = no;
            }
        });
        console.log(maxCards);
        maxCards.forEach(([val, no], i) => {
            if (val == "J") {
                highestCardCount += no;
                maxCards.splice(i, 1);
            }
        });
        console.log(highestCardCount);
        if (highestCardCount === 5) {
            thisHand.type = HandType.FiveOfAKind;
        }
        else if (highestCardCount === 4) {
            thisHand.type = HandType.FourOfAKind;
        }
        else if (highestCardCount === 3) {
            thisHand.type = HandType.ThreeOfAKind;
            if (maxCount(cards.replaceAll(maxCards[0][0], "").replaceAll("J", ""))[0][1] == 2) {
                thisHand.type = HandType.FullHouse;
            }
        }
        else if (highestCardCount === 2 &&
            maxCards[1] &&
            maxCards[1][1] === 2) {
            thisHand.type = HandType.TwoPair;
        }
        else if (highestCardCount === 2) {
            thisHand.type = HandType.OnePair;
        }
        else {
            thisHand.type = HandType.HighCard;
        }
        hands.push(thisHand);
    });
    hands.sort((a, b) => {
        if (a.type > b.type) {
            return -1;
        }
        else if (a.type < b.type) {
            return 1;
        }
        else {
            return compareHands(a, b);
        }
    });
    let output = 0;
    for (let i = 1; i <= hands.length; i++) {
        output += hands[i - 1].bet * (i);
        console.log(hands[i - 1].cards, hands[i - 1].bet, HandType[hands[i - 1].type], i, hands[i - 1].bet * (i), output);
    }
    console.log(output);
}
export default new Day("Camel Cards", 7, task1, task2);
//# sourceMappingURL=index.js.map