import { exit, stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';
require('events').EventEmitter.defaultMaxListeners = 50;


let arr: Array<number> = [];

function generateList() {
    for (let index: number = 0; index < 50000; index++) {
        arr[index] = Math.floor(Math.random() * 50000);
    }
    console.log(arr[3000]);
}

async function start() {

    const rl: any = await readline.createInterface({ input, output, terminal: false });
    let choice: any = await rl.question(`For unsorted array, press 1.\nFor sorted array, press 2.\npress 3 to exit \n`);
    if (choice == "1") {
        let choice = await rl.question(`Enter a number between 1 and 50000   `);
        let flag: boolean = false;
        for (let index: number = 0; index < arr.length; index++) {
            if (choice == arr[index]) {
                console.log(`The number ` + choice + ` is in the array at position ` + index);
                flag = true;
            }

        }
        if (flag == false) {
            console.log("The number is not in the array");
        }
        start();

    }
    if (choice == "2") {
        let arr2: Array<number> = [];
        arr2  = arr.sort()
        let choice: any = await rl.question(`Enter a number between 1 and 50000  `);
        let find: number = 0;
        let left: number = 0;
        let right: number = arr2.length - 1;
        let index: number = 0;
        let flag: boolean = false;
        let count: number = 0;
        while (left < right && flag == false) {
            count += 1;
            index = Math.floor((left + right) / 2);
            if (arr2[index] < choice) {
                left = index;
            }
            if (arr2[index] > choice) {
                right = index;
            }
            if (arr2[index] == parseInt(choice)) {
                console.log(`The number ` + choice + ` is in the array at position ` + index);
                console.log("It took " + count + " tests on the array");
                flag = true;
            }
            else if (index == Math.floor((left + right) / 2)) {
                if(arr2[index +1 ] == parseInt(choice)){
                console.log(`The number ` + choice + ` is in the array at position ` + index);
                console.log("It took " + count + " tests on the array");
                flag = true;
                }
                left = right;
            }
        }
        if (flag == false) {
            console.log("The number is not in the array");
            console.log("It took " + count + " tests on the array");
        }
        flag = false;
        start();
    }
    if (choice == "3") {
        exit(0);
    }
}


generateList()
start();




