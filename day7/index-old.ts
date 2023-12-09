import fs from "fs";
import Day from "../helpFiles/export.js";

type Hand = {
    cards: string;
    bet: number;
    type?: HandType;
};

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
enum HandType {
    FiveOfAKind,
    FourOfAKind,
    FullHouse,
    ThreeOfAKind,
    TwoPair,
    OnePair,
    HighCard,
    Null
}

function compareHands(a: Hand, b: Hand, pos = 0): number {
    if (cardValues.indexOf(a.cards[pos]) < cardValues.indexOf(b.cards[pos])) {
        return 1;
    } else if (
        cardValues.indexOf(a.cards[pos]) > cardValues.indexOf(b.cards[pos])
    ) {
        return -1;
    } else {
        return compareHands(a, b, pos + 1);
    }
}

function task1() {
    let input: string = fs.readFileSync("./day7/testcase.txt").toString();
    let lines = input.split("\n");
    console.log(lines);
    let hands: Hand[] = [];
    lines.forEach((hand, i) => {
        let [cards, bet] = hand.split(" ");
        let maxCards: [string, unknown][] = maxCount(cards);
        let thisHand: Hand = {
            cards,
            bet: parseInt(bet),
            type: HandType.HighCard,
        };
        // console.log(maxCards)
        let highestCardCount: unknown = -1;
        maxCards.forEach(([val, no], i) => {
            if (val != "J" && highestCardCount == -1) {
                highestCardCount = no;
            }
        });
        maxCards.forEach(([val, no], i) => {
            if (val == "J") {
                //@ts-ignore
                highestCardCount += no;
                maxCards.splice(i, 1);
            }
        });
        console.log(maxCards, highestCardCount);
        if (highestCardCount === 5) {
            thisHand.type = HandType.FiveOfAKind;
        } else if (highestCardCount === 4) {
            thisHand.type = HandType.FourOfAKind;
        } else if (highestCardCount === 3) {
            thisHand.type = HandType.ThreeOfAKind;
            if (
                maxCount(
                    cards.replaceAll(maxCards[0][0], "").replaceAll("J", "")
                )[0][1] == 2
            ) {
                thisHand.type = HandType.FullHouse;
            }
        } else if (
            highestCardCount === 2 &&
            maxCards[1] &&
            maxCards[1][1] === 2
        ) {
            thisHand.type = HandType.TwoPair;
        } else if (highestCardCount === 2) {
            thisHand.type = HandType.OnePair;
        } else {
            thisHand.type = HandType.HighCard;
        }
        hands.push(thisHand);
    });
    hands.sort((a, b) => {
        //@ts-ignore
        if (a.type > b.type) {
            return -1;
            //@ts-ignore
        } else if (a.type < b.type) {
            return 1;
        } else {
            return compareHands(a, b);
        }
    });
    let output = 0;
    for (let i = 0; i < hands.length; i++) {
        output += hands[i].bet * (i + 1);
        console.log(
            hands[i].cards,
            hands[i].bet,
            //@ts-ignore
            HandType[hands[i].type],
            i + 1,
            hands[i].bet * (i + 1),
            output
        );
    }
    console.log(output);
}

function maxCount(input: string) {
    const { max, ...counts } = (input || "").split("").reduce(
        (a: any, c) => {
            a[c] = a[c] ? a[c] + 1 : 1;
            a.max = a.max < a[c] ? a[c] : a.max;
            return a;
        },
        { max: 0 }
    );

    //@ts-ignore
    return Object.entries(counts).sort(([k, v], [k2, v2]) => (v < v2 ? 1 : -1));
}

function task2() {
    let input: string = fs.readFileSync("./day7/input.txt").toString();
    let lines = input.split("\n");
    console.log(lines);
    let hands: Hand[] = [];
    lines.forEach((hand, i) => {
        let [cards, bet] = hand.split(" ");
        let maxCards: [string, unknown][] = maxCount(cards);
        let thisHand: Hand = {
            cards,
            bet: parseInt(bet),
            type: HandType.Null,
        };
        // console.log(maxCards)
        let highestCardCount: unknown = -1;
        maxCards.forEach(([val, no], i) => {
            if (val != "J" && highestCardCount == -1) {
                highestCardCount = no;
            }
        });
        console.log(maxCards)
        maxCards.forEach(([val, no], i) => {
            if (val == "J") {
                //@ts-ignore
                highestCardCount += no;
                maxCards.splice(i, 1);
            }
        });
        console.log(highestCardCount);
        if (highestCardCount === 5) {
            thisHand.type = HandType.FiveOfAKind;
        } else if (highestCardCount === 4) {
            thisHand.type = HandType.FourOfAKind;
        } else if (highestCardCount === 3) {
            thisHand.type = HandType.ThreeOfAKind;
            if (
                maxCount(
                    cards.replaceAll(maxCards[0][0], "").replaceAll("J", "")
                )[0][1] == 2
            ) {
                thisHand.type = HandType.FullHouse;
            }
        } else if (
            highestCardCount === 2 &&
            maxCards[1] &&
            maxCards[1][1] === 2
        ) {
            thisHand.type = HandType.TwoPair;
        } else if (highestCardCount === 2) {
            thisHand.type = HandType.OnePair;
        } else {
            thisHand.type = HandType.HighCard;
        }
        hands.push(thisHand);
    });
    hands.sort((a, b) => {
        //@ts-ignore
        if (a.type > b.type) {
            return -1;
            //@ts-ignore
        } else if (a.type < b.type) {
            return 1;
        } else {
            return compareHands(a, b);
        }
    });
    let output = 0;
    for (let i = 1; i <= hands.length; i++) {
        output += hands[i-1].bet * (i);
        console.log(
            hands[i-1].cards,
            hands[i-1].bet,
            //@ts-ignore
            HandType[hands[i-1].type],
            i,
            hands[i-1].bet * (i),
            output
        );
    }
    console.log(output);
}

//244777904

export default new Day("Camel Cards", 7, task1, task2);
