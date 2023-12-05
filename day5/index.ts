import fs from "fs";
import Day from "../helpFiles/export.js";
import { type } from "os";

class MapRange{
    destination: number
    source: number
    size: number
    constructor(destination:number, source:number, size:number){
        this.destination = destination;
        this.source = source;
        this.size = size;

    }

    attemptToMap(value:number):(number | false) {
        let inRangeVal = value - this.source;
        if(inRangeVal>=0 && inRangeVal < this.size){
            return this.destination+inRangeVal
        } else {
            return false
        }
    }
}

class SeedMap{
    from:string;
    to:string;
    ranges: MapRange[] = []

    constructor(inmap:string){
        let mapLines = inmap.split("\n");
        mapLines[0] = mapLines[0].replace(/\s*map\:\s*/,"");
        let xToY = mapLines[0].split("-to-");
        this.from = xToY[0];
        this.to = xToY[1]
        mapLines.shift()
        for(let i = 0; i < mapLines.length; i++){
            let [destination, source, size] = mapLines[i].split(" ");
            this.ranges.push(new MapRange(
                parseInt(destination),
                parseInt(source),
                parseInt(size)
            ));
        }
    }

    translate(value:number): number{
        for(let i = 0; i < this.ranges.length; i++){
            let mapAttempt = this.ranges[i].attemptToMap(value)
            if(typeof mapAttempt === typeof 3){
                //@ts-ignore
                return mapAttempt;
            }
        }
        return value;
    }
}

function task1(){
    let input: string = fs.readFileSync("./day5/input.txt").toString();
    let splitMap: string[] = input.split("\n");
    let seedLine = splitMap[0].replace(/seeds:\s*/,"");
    let seedStrs = seedLine.split(" ");
    let seeds: number[] = []
    seedStrs.forEach(seed => {
        seeds.push(parseInt(seed))
    });
    splitMap.shift();
    splitMap.shift();
    let justMaps: string = splitMap.join("\n");
    let mapsStrs: string[] = justMaps.split("\n\n");
    let maps: SeedMap[] = []
    console.log(seedLine)
    for(let i = 0; i<mapsStrs.length; i++){
        maps.push(new SeedMap(mapsStrs[i]))
    }
    
    let outVals: number[] = []

    for(let i = 0; i < seeds.length; i++){
        let seed = seeds[i]
        let currentVal = seed;
        for(let j = 0; j < maps.length; j++){
            currentVal = maps[j].translate(currentVal)
        }
        outVals.push(currentVal)
    }

    console.log(Math.min(...outVals))
}

function task2() {
    let input: string = fs.readFileSync("./day5/input.txt").toString();
    let splitMap: string[] = input.split("\n");
    let seedLine = splitMap[0].replace(/seeds:\s*/, "");
    let seedStrs = seedLine.split(" ");
    let seedRangeNos: number[] = [];
    seedStrs.forEach((seed) => {
        seedRangeNos.push(parseInt(seed));
    });
    splitMap.shift();
    splitMap.shift();
    let justMaps: string = splitMap.join("\n");
    let mapsStrs: string[] = justMaps.split("\n\n");
    let maps: SeedMap[] = [];
    console.log(seedLine);
    for (let i = 0; i < mapsStrs.length; i++) {
        maps.push(new SeedMap(mapsStrs[i]));
    }

    let outVals = []
    console.log(seedRangeNos)
    for (let i = 0; i < seedRangeNos.length; i += 2) {
        console.log(`Processing range ${i/2}`)
        let start = seedRangeNos[i];
        let size = seedRangeNos[i+1];  
        outVals.push(processRange(maps,start,size))
        console.log(start,size)
    }
    console.log(Math.min(...outVals))
    
}

function processRange(maps: SeedMap[], lowerBound:number, size:number):number{
    let smallestNumber = Number.MAX_SAFE_INTEGER
    for (let i = lowerBound; i<lowerBound+size; i++) {
        let currentVal = i;
        for (let j = 0; j < maps.length; j++) {
            currentVal = maps[j].translate(currentVal);
        }
        if(currentVal < smallestNumber){
            smallestNumber = currentVal
        }
        if(i % 1000000===0){
            console.log(`${i}/${lowerBound+size} (${size} operations)`)
        }
    }
    return smallestNumber
}

export default new Day("If You Give A Seed A Fertilizer",5,task1, task2)