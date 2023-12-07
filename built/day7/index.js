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
    "J",
    "T",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
    "1",
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
})(HandType || (HandType = {}));
function compareHands(a, b, pos = 0) {
    if (cardValues.indexOf(a.cards[pos]) < cardValues.indexOf(b.cards[pos])) {
        return a;
    }
    else if (cardValues.indexOf(a.cards[pos]) > cardValues.indexOf(b.cards[pos])) {
        return b;
    }
    else if (cardValues.indexOf(a.cards[pos]) === cardValues.indexOf(b.cards[pos])) {
        return compareHands(a, b, pos + 1);
    }
    else {
        return {
            cards: "INVALID",
            bet: -14,
        };
    }
}
function task1() {
    let input = fs.readFileSync("./day7/testcase.txt").toString();
    let lines = input.split("\n");
    let hands = [];
    let highest = [
        {
            cards: "11111",
            bet: 0,
            type: 0,
        },
        {
            cards: "11111",
            bet: 0,
            type: 0,
        },
        {
            cards: "11111",
            bet: 0,
            type: 0,
        },
        {
            cards: "11111",
            bet: 0,
            type: 0,
        },
        {
            cards: "11111",
            bet: 0,
            type: 0,
        },
        {
            cards: "11111",
            bet: 0,
            type: 0,
        },
        {
            cards: "11111",
            bet: 0,
            type: 0,
        }
    ];
    let scores = [0, 0, 0, 0, 0, 0, 0];
    lines.forEach((hand, i) => {
        let [cards, bet] = hand.split(" ");
        let maxCards = maxCount(cards);
        let thisHand = {
            cards,
            bet: parseInt(bet),
            type: HandType.HighCard,
        };
        if (maxCards[0][1] === 5) {
            thisHand.type = HandType.FiveOfAKind;
            scores[HandType.FiveOfAKind]++;
            highest[HandType.FiveOfAKind] = compareHands(thisHand, highest[HandType.FiveOfAKind]);
        }
        else if (maxCards[0][1] === 4) {
            thisHand.type = HandType.FourOfAKind;
            scores[HandType.FourOfAKind]++;
            highest[HandType.FourOfAKind] = compareHands(thisHand, highest[HandType.FourOfAKind]);
        }
        else if (maxCards[0][1] === 3 &&
            maxCards[1] &&
            maxCards[1][1] === 2) {
            thisHand.type = HandType.FullHouse;
            scores[HandType.FullHouse]++;
            highest[HandType.FullHouse] = compareHands(thisHand, highest[HandType.FullHouse]);
        }
        else if (maxCards[0][1] === 3) {
            thisHand.type = HandType.ThreeOfAKind;
            scores[HandType.ThreeOfAKind]++;
            highest[HandType.ThreeOfAKind] = compareHands(thisHand, highest[HandType.ThreeOfAKind]);
        }
        else if (maxCards[0][1] === 2 &&
            maxCards[1] &&
            maxCards[1][1] === 2) {
            thisHand.type = HandType.TwoPair;
            scores[HandType.TwoPair]++;
            highest[HandType.TwoPair] = compareHands(thisHand, highest[HandType.TwoPair]);
        }
        else if (maxCards[0][1] === 2) {
            thisHand.type = HandType.OnePair;
            scores[HandType.OnePair]++;
            highest[HandType.OnePair] = compareHands(thisHand, highest[HandType.OnePair]);
        }
        else {
            thisHand.type = HandType.HighCard;
            scores[HandType.HighCard]++;
            highest[HandType.HighCard] = compareHands(thisHand, highest[HandType.HighCard]);
        }
        hands.push(thisHand);
    });
    console.log(hands, highest, scores, lines.length);
    let output = 0;
    for (let i = 0; i < scores.length; i++) {
        let position = 0;
        for (let j = i; j < scores.length; j++) {
            position += scores[j];
        }
        output += position * highest[i].bet;
        console.log(output, position, highest[i].bet);
    }
    console.log(output);
}
function maxCount(input) {
    const _a = (input || "").split("").reduce((a, c) => {
        a[c] = a[c] ? a[c] + 1 : 1;
        a.max = a.max < a[c] ? a[c] : a.max;
        return a;
    }, { max: 0 }), { max } = _a, counts = __rest(_a, ["max"]);
    return Object.entries(counts).filter(([k, v]) => v === max);
}
export default new Day("Camel Cards", 7, task1, undefined);
//# sourceMappingURL=index.js.map