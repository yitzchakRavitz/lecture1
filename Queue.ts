import { exit, stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';
import stream from 'stream';

stream.setMaxListeners(100);
let myQueue: Array<Number> = [];

async function generateQueue() {
    for (let index = 0; index < 10; index++) {
        myQueue[index] = Math.floor(Math.random() * 100);
    }
    console.log(myQueue);
}

async function start() {
    const rl: any = await readline.createInterface({ input, output, terminal: false });
    let choice1 = await rl.question(`For enque enter 1\nFor dequeue enter 2\nFor exit enter 3\n`);
    if (choice1 == "1") {
        let choice2 = await rl.question(`Enter a number\n`);
        myQueue[myQueue.length] = +choice2;
        console.log(myQueue);
        start();
    }
    if (choice1 == "2") {
        myQueue.shift()
        console.log(myQueue);
        start();
    }
   
    if (choice1 == "3") {
        exit(0)
    }
}



generateQueue();
start();

