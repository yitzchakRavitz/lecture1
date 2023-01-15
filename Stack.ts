import { exit, stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';
import stream from 'stream';

stream.setMaxListeners(100);
let myStack: Array<Number> = [];

async function generateStack() {
    for (let index = 0; index < 10; index++) {
        myStack[index] = Math.floor(Math.random() * 100);
    }
    console.log(myStack);
}

async function start() {
    const rl: any = await readline.createInterface({ input, output, terminal: false });
    let choice1 = await rl.question(`For push enter 1\nFor pop enter 2\nFor top enter 3\nFor exit enter 4\n`);
    if (choice1 == "1") {
        choice1 = await rl.question(`Enter a number\n`);
        myStack.unshift(+choice1)
        console.log(myStack);
        start();
    }
    if (choice1 == "2") {
        myStack.shift()
        console.log(myStack);
        start();
    }
    if (choice1 == "3") {
        console.log(myStack[0]);
        start();
    }
    if (choice1 == "4") {
        exit(0)
    }
}



generateStack();
start();

// let a = [1,2,3,4,5]
// a.unshift(2)
// console.log(a);