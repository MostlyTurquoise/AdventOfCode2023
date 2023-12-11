import fs from 'fs'; 
import Day from '../helpFiles/export.js'; 

function task1(){
    let input: string = fs.readFileSync("./day10/testcase.txt").toString();

}
 
export default new Day('Cosmic Expansion',11,task1); 
