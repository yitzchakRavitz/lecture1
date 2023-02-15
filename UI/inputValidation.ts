import {  stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';


export async function validateInput(question: string, maxLength: number,minLength: number, type: any) {
    const rl: any = await readline.createInterface({ input, output, terminal: false });

    let userInput: any = await rl.question(question);


    while (!userInput || userInput.length > maxLength ||userInput.length < minLength) {
        console.log("Wrong input, try again");
        userInput = await rl.question(question);
    }
    if (type === 'number') {
        while (isNaN(userInput)) {
            console.log("This is not a number");
            userInput = await rl.question(question);
        }
    }
    await rl.close()
    return userInput;
   
}