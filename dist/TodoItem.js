"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TodoItem {
    //creating constructor for the class
    constructor(id, task, complete = false) {
        this.id = id;
        this.task = task;
        this.complete = complete;
    }
    //function that show what is in the item
    printDetails() {
        console.log(`${this.id}\t${this.task} ${this.complete
            ? "\t(complete)" : ""}`);
    }
}
exports.TodoItem = TodoItem;
