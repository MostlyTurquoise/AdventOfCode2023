import fs from "fs";
import Day from "../helpFiles/export.js";
import { LN10Dependencies } from "mathjs";

function task1() {
    console.warn("Not currently implemented here >.<");
}

type CardCount = {
    card: string;
    count: number;
};

function cardCountAlreadyHas(cards: CardCount[], checkCard: string): number {
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        if (card.card == checkCard) {
            return i;
        }
    }
    return -1;
}

enum CardTypes {
    HighestCard = 0,
    OnePair = 1,
    TwoPair = 2,
    ThreeOfAKind = 3,
    FullHouse = 4,
    FourOfAKind = 5,
    FiveOfAKind = 6,
}

const cardValues = [
    "J",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "T",
    "Q",
    "K",
    "A",
];

class Hand {
    cards: string[];
    bet: number;
    constructor(input: string) {
        if (input.match(/^[0-9AKQTJ]{5}\s[0-9]+$/)) {
            let parts = input.split(" ");
            this.cards = parts[0].split("");
            this.bet = parseInt(parts[1]);
        } else {
            throw new Error(`Invalid hand >~< (${input})`);
        }
    }

    get type() {
        let cardCounts = Hand.getCardCounts(this.cards);
        let j = 0;
        cardCounts.forEach((c, i) => {
            if (c.card == "J") {
                j += c.count;
                cardCounts.splice(i, 1);
            }
        });
        if(cardCounts[0]){
            cardCounts[0].count += j;
        } else {
            cardCounts.push({
                card:"J",
                count:j
            })
        }

        if (cardCounts[0].count == 5) {
            return CardTypes.FiveOfAKind;
        } else if (cardCounts[0].count == 4) {
            return CardTypes.FourOfAKind;
        } else if (cardCounts[0].count == 3 && cardCounts[1].count == 2) {
            return CardTypes.FullHouse;
        } else if (cardCounts[0].count == 3) {
            return CardTypes.ThreeOfAKind;
        } else if (cardCounts[0].count == 2 && cardCounts[1].count == 2) {
            return CardTypes.TwoPair;
        } else if (cardCounts[0].count == 2) {
            return CardTypes.OnePair;
        } else {
            return CardTypes.HighestCard;
        }
    }

    beats(that: Hand):boolean {
        if (this.type > that.type) {
            return true;
        } else if (this.type < that.type) {
            return false;
        } else if (this.type==that.type){
            for (let i = 0; i < this.cards.length; i++) {
                if (
                    cardValues.indexOf(this.cards[i]) >
                    cardValues.indexOf(that.cards[i])
                ) {
                    return true;
                } else if (
                    cardValues.indexOf(this.cards[i]) <
                    cardValues.indexOf(that.cards[i])
                ) {
                    return false;
                }
            }
        }
        throw new Error(`Oh no >~< (${this.cards}, ${that.cards})`)
    }

    static getCardCounts(cards: string[]) {
        let cardCounts: CardCount[] = [];
        for (let i = 0; i < cards.length; i++) {
            let card = cards[i];
            let cardCountLoc = cardCountAlreadyHas(cardCounts, card);
            if (cardCountLoc == -1) {
                cardCounts.push({
                    card,
                    count: 1,
                });
            } else {
                cardCounts[cardCountLoc].count++;
            }
        }
        return cardCounts.sort((a, b) => {
            return a.count < b.count ? 1 : -1;
        });
    }
}

function task2() {
    let input: string = fs.readFileSync("./day7/input2.txt").toString();
    let lines: string[] = input.split("\n");
    let hands: Hand[] = [];
    for (let i = 0; i < lines.length; i++) {
        hands.push(new Hand(lines[i]));
        hands[i].type;
    }
    hands.sort((a,b)=>{
        if(a.beats(b)){
            return 1
        } else if(b.beats(a)){
            return -1
        } else {
            throw new Error("Cards didn't beat each other ;-;")
        }
    })
    let totalWinnings = 0
    for(let i = 0; i < hands.length; i++){
        console.log(hands[i], CardTypes[hands[i].type],(i+1)*hands[i].bet)
        totalWinnings += (i+1)*hands[i].bet
    }
    console.log(totalWinnings)
}

export default new Day("Camel Cards", 7, task1, task2);
