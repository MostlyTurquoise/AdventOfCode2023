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
enum HandType {
    FiveOfAKind,
    FourOfAKind,
    FullHouse,
    ThreeOfAKind,
    TwoPair,
    OnePair,
    HighCard,
}

function compareHands(a: Hand, b: Hand, pos = 0): Hand {
    if (cardValues.indexOf(a.cards[pos]) < cardValues.indexOf(b.cards[pos])) {
        return a;
    } else if (
        cardValues.indexOf(a.cards[pos]) > cardValues.indexOf(b.cards[pos])
    ) {
        return b;
    } else if (
        cardValues.indexOf(a.cards[pos]) === cardValues.indexOf(b.cards[pos])
    ) {
        return compareHands(a, b, pos + 1);
    } else {
        return {
            cards: "INVALID",
            bet: -14,
        };
    }
}

function task1() {
    let input: string = fs.readFileSync("./day7/testcase.txt").toString();
    let lines = input.split("\n");
    let hands: Hand[] = [];
    let highest: Hand[] = [
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
    ]
    let scores: number[] = [0, 0, 0, 0, 0, 0, 0];
    lines.forEach((hand, i) => {
        let [cards, bet] = hand.split(" ");
        let maxCards: [string, unknown][] = maxCount(cards);
        let thisHand: Hand = {
            cards,
            bet: parseInt(bet),
            type: HandType.HighCard,
        };
        if (maxCards[0][1] === 5) {
            thisHand.type = HandType.FiveOfAKind;
            scores[HandType.FiveOfAKind]++;
            highest[HandType.FiveOfAKind] = compareHands(thisHand, highest[HandType.FiveOfAKind]);
        } else if (maxCards[0][1] === 4) {
            thisHand.type = HandType.FourOfAKind;
            scores[HandType.FourOfAKind]++;
            highest[HandType.FourOfAKind] = compareHands(thisHand, highest[HandType.FourOfAKind]);
        } else if (
            maxCards[0][1] === 3 &&
            maxCards[1] &&
            maxCards[1][1] === 2
        ) {
            thisHand.type = HandType.FullHouse;
            scores[HandType.FullHouse]++;
            highest[HandType.FullHouse] = compareHands(thisHand, highest[HandType.FullHouse]);
        } else if (maxCards[0][1] === 3) {
            thisHand.type = HandType.ThreeOfAKind;
            scores[HandType.ThreeOfAKind]++;
            highest[HandType.ThreeOfAKind] = compareHands(thisHand, highest[HandType.ThreeOfAKind]);
        } else if (
            maxCards[0][1] === 2 &&
            maxCards[1] &&
            maxCards[1][1] === 2
        ) {
            thisHand.type = HandType.TwoPair;
            scores[HandType.TwoPair]++;
            highest[HandType.TwoPair ]= compareHands(thisHand, highest[HandType.TwoPair]);
        } else if (maxCards[0][1] === 2) {
            thisHand.type = HandType.OnePair;
            scores[HandType.OnePair]++;
            highest[HandType.OnePair ]= compareHands(thisHand, highest[HandType.OnePair]);
        } else {
            thisHand.type = HandType.HighCard;
            scores[HandType.HighCard]++;
            highest[HandType.HighCard] = compareHands(thisHand, highest[HandType.HighCard]);
        }
        hands.push(thisHand);
    });
    console.log(
        hands,
        highest,
        scores,
        lines.length
    );
    let output = 0;
    for(let i = 0; i < scores.length; i++){
        let position = 0;
        for(let j = i; j < scores.length; j++){
            position+=scores[j]
        }
        output+=position * highest[i].bet
        console.log(output,position,highest[i].bet)
    }
    console.log(output)
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

    return Object.entries(counts).filter(([k, v]) => v === max);
}

export default new Day("Camel Cards", 7, task1, undefined);
