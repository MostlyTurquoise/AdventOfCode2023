export default class Day{
    name: string;
    dayNumber: number;
    #runTask1: Function;
    #runTask2: Function | undefined;

    constructor(inname:string, indaynum:number, inrun1: Function, inrun2: Function | undefined){
        this.name = inname;
        this.dayNumber = indaynum
        this.#runTask1 = inrun1;
        this.#runTask2 = inrun2;
    }

    run(task: number):boolean{
        if(task==1){
            return this.#runTask1()
        } else if(task==2 && this.#runTask2){
            return this.#runTask2()
        } else {
            throw new Error("Not a valid task :(")
        }
    }

    get stars(): string{
        if(this.#runTask1 && this.#runTask2){
            return "**"
        } else if(this.#runTask1 || this.#runTask2){
            return "*-"
        } else {
            return "--"
        }
    }
}