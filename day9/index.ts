import fs from "fs";
import Day from "../helpFiles/export.js";

function getDiff(series:number[]){
    let diffs: number[] = []
    let zeroes_q = true;
    for(let i = 0; i < series.length-1; i++){
        let diff = series[i+1]-series[i]
        if(diff!==0){
            zeroes_q = false
        }
        diffs.push(diff)
    }
    if(zeroes_q){
        console.log(0)
        return 0;
    } else {
        //@ts-ignore
        let returner:number = diffs.at(0)-getDiff(diffs)
        console.log(returner)
        return returner
    }
}

function task1(){
    let input: string = fs.readFileSync("./day9/input.txt").toString();
    let seriesStrings: string[] = input.split("\n")
    let series: number[][] = seriesStrings.map((x)=>{
        return x.split(" ").map((y)=>{
            return parseInt(y)
        })
    })
    console.log(series)
    let total = 0;
    for(let i = 0 ; i < series.length; i++){
        //@ts-ignore
        total+=series[i].at(-1) + getDiff(series[i])
    }
    console.log(total)
}

function task2(){
    let input: string = fs.readFileSync("./day9/input.txt").toString();
    let seriesStrings: string[] = input.split("\n")
    let series: number[][] = seriesStrings.map((x)=>{
        return x.split(" ").map((y)=>{
            return parseInt(y)
        })
    })
    console.log(series)
    let total = 0;
    for(let i = 0 ; i < series.length; i++){
        //@ts-ignore
        total+=series[i].at(0) - getDiff(series[i])
    }
    console.log(total)
}

export default new Day("Mirage Maintenance",9,task1, task2)