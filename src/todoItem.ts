export class TodoItem {
    //creating constructor for the class
    constructor(public id: number, 
        public task:string ,
        public complete:boolean = false) {

    }
    //function that show what is in the item
    printDetails() {
        console.log(`${this.id}\t${this.task} ${this.complete
            ? "\t(complete)" : ""}`);
    }
}
