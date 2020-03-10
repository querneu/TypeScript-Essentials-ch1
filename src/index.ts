import { TodoItem } from "./TodoItem";
import { TodoCollection } from "./TodoCollection";
import * as inquirer from 'inquirer';
import { JsonTodoCollection } from "./jsonTodoCollection";

let todos = [
    new TodoItem(1, "Comprar flores"),
    new TodoItem(2, "Testar funções em typescript"),
    new TodoItem(3, "Coletar Bilhetes"),
    new TodoItem(4, "Ligar pra Dyana", true)
];

let collection: TodoCollection = new JsonTodoCollection("Adam", todos);
//let collection = new TodoCollection("Adam", todos);
let showCompleted = true;


function displayTodoList(): void {
    console.log(`${collection.userName}'s Too List` +
        `(${collection.getItemCounts().incomplete} items to do)`);
    //collection.getTodoItems(true).forEach(item => item.printDetails());
    collection.getTodoItems(showCompleted).forEach(item => {
        item.printDetails();
    });
}

enum Commands {
    Add = "Add New Task",
    Complete = "Complete Task",
    Toggle = "Show/Hide Completed",
    Purge = "Remove Completed Tasks",
    Quit = "Quit"
}
function promptAdd(): void {
    console.clear();
    inquirer.prompt({
        type: "input", name: "add", message: "enter Task:"
    }).then(answers => {
        if (answers["add"] !== "") {
            collection.addTodo(answers["add"]);
        }
        promptUser();
    });
}
function promptComplete(): void {
    console.clear();
    inquirer.prompt({
        type: "checkbox", name: "complete",
        message: "Mark Tasks Complete",
        choices: collection.getTodoItems(showCompleted).map(item =>
            ({
                name: item.task, value: item.id, checked: item.complete
            }))

    }).then(answers => {
        let completedTasks = answers["complete"] as number[];
        collection.getTodoItems(true).forEach(item => collection.markComplete(item.id, completedTasks.find(id => id === item.id) != undefined));
        promptUser();
    })
}






function promptUser(): void {
    console.clear();
    displayTodoList();
    inquirer.prompt({
        type: "list",
        name: "command",
        message: "Choose option",
        choices: Object.values(Commands),
        //badProperty: true
    }).then(answers => {
        switch (answers["command"]) {
            case Commands.Toggle:
                showCompleted = !showCompleted;
                promptUser();
                break;
            case Commands.Add:
                promptAdd();
                break;
            // if (answers["command"] !== Commands.Quit) {
            //     promptUser();
            // }
            //Página45
            case Commands.Complete:
                if (collection.getItemCounts().incomplete > 0) {
                    promptComplete();
                } else {
                    promptUser();
                }
                break;
            case Commands.Purge:
                collection.removeComplete();
                promptUser();
                break;
        }
    })

}


promptUser();

// console.clear();
// console.log(`${collection.userName}'s Todo List`+
//         `(${collection.getItemCounts().incomplete} items to do)`
// );


// //collection.removeComplete();
// collection.getTodoItems(true).forEach(item=>item.printDetails());
// //old

// // let newId = collection.addTodo("Go for run");

// // let todoItem = collection.getTodoById(newId);
// // todoItem.printDetails();

// //collection.addTodo(todoItem);