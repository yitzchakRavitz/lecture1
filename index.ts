import { open } from 'node:fs/promises';
import { appendFile } from "node:fs/promises";
import { exit, stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';
import { sqlQuery } from './sql';
//import * as sql from 'sql-parser';
import { EventEmitter } from 'events';
import {validateInput} from './UI/inputValidation'
import { getDeleteQuestions, getMainQuestions, getReadFileQuestions, getInputQuestions, getUpdateQuestions } from './UI/UserInputQuestions';


/**
 * The function receives user information and enters it into a buffer
 * @param user 
 * @returns Promise<Buffer>
 */
export async function setInputIntoBuffer(user: Map<string, string>): Promise<Buffer> {
    let id: string | undefined = user.get("ID")
    let firstName: string | undefined = user.get("FIRST_NAME")
    let lastName: string | undefined = user.get("LAST_NAME")
    let age: string | undefined = user.get("AGE")
    let city: string | undefined = user.get("CITY")
    let country: string | undefined = user.get("COUNTRY")

    if (id == undefined) {
        id = "0"
    }
    if (firstName == undefined) {
        firstName = "Unknown"
    }
    if (lastName == undefined) {
        lastName = "Unknown"
    }
    if (age == undefined) {
        age = "0"
    }
    if (city == undefined) {
        city = "Unknown"
    }
    if (country == undefined) {
        country = "Unknown"
    }

    const BuferLen: number = 59;
    const FillChar: string = `~`;

    const bfr: Buffer = Buffer.alloc(BuferLen, FillChar);
    bfr.write(id, 0)
    bfr.write(firstName, 10);
    bfr.write(lastName, 20);
    bfr.write(age, 30);
    bfr.write(city, 39);
    bfr.write(country, 49);
    console.log(`ID: ${id} \n First Name: ${firstName} \n Last Name : ${lastName} \n Age : ${age}\n city : ${city}\n country : ${country}`);

    return bfr;
}

/**
 * The function sends to a function that receives input from the user, 
 * then to a function that puts the input into buffer and 
 * finally the function puts the data into the file
 * @param idIndex 
 */
async function writeToFile(idIndex : Map<string, string>): Promise<void> {

    let user: Map<string, string> = await getInputQuestions(idIndex);
    
    const bfr: Buffer = await setInputIntoBuffer(user);

    const FillChar: string = `~`;
    let id: string | undefined = await user.get("ID")
    if (id == undefined) {
        id = ""
    }
    //puts the data into the file
    await addToFile(bfr);
    //update the index file
    await countLines(idIndex , id, FillChar);
    //main();
}

/**
 * The function receives a buffer and puts it in a file
 * @param bfr 
 */
export async function addToFile(bfr: Buffer) {
    await appendFile('file.txt', `${bfr}\n`);
    console.log("success appendFile To file");
}


/**
 * The function receives a map of the users' ID  and a new ID 
 * and inserts the new ID into the map and the file of the index
 * @param idIndex 
 * @param id 
 * @param FillChar 
 */
export async function countLines(idIndex: Map<string, string> , id: string, FillChar: string): Promise<void> {
    const file: any = await open('./file.txt');
    let numOfLines: number = 0;
    for await (const line of file.readLines()) {
        numOfLines++;
    }
    let count_Lines = 0
    if (numOfLines != 0) {
        count_Lines = numOfLines - 1;
    }
    const size: number = count_Lines * 60;
    const stringSize: string = size.toString();

    const bfrToIndex: Buffer = Buffer.alloc(20, FillChar);
    bfrToIndex.write(id, 0)
    bfrToIndex.write(stringSize, 10)
    console.log(`Your information:  \n ID: ${id} \n LDS ${stringSize} `);
    await appendFile('index.txt', `${bfrToIndex}\n`);
    idIndex.set(id, stringSize);
    console.log("success appendFile To Index file");

}

/**
 * The function calls the function that receives the ID that the user 
 * wants to read and if it exists in the file, searches the file for 
 * the ID and writes all the details of this user
 * @param idIndex 
 */
async function readFromFile(idIndex : Map<string, string>): Promise<void> {

    let findIndex = await getReadFileQuestions();
    console.log(idIndex);
    
    if (idIndex.get(findIndex)) {

        let theIndex: any = await idIndex.get(findIndex);
        console.log(theIndex);

        theIndex = theIndex.split('~').join("");



        const fdName: any = await open('./file.txt');
        const Bfr: Buffer = Buffer.alloc(60);
        await fdName.read(Bfr, 0, 60, parseInt(theIndex));
        const bfrNameToString: string = Bfr.toString();
        const remMark: string = bfrNameToString.split('~').join(" ")
        const data: string[] = remMark.replace(/\s+/g, ' ').trim().split(" ");
        console.log(`id = ${data[0]} \nfirstName =  ${data[1]}  \nlastName = ${data[2]} \nage =  ${data[3]}\ncity =  ${data[4]}\ncountry =  ${data[5]}\n`);

        console.log(`Success\n`);
        await fdName.close()


    }
    else {
        console.log("No such user found");
    }
    //main();

}

/**
 * 
 * @param idIndex 
 */
async function deleteFromFile(idIndex: Map<string, string> ): Promise<void> {

    try {
        let id:string = await getDeleteQuestions(idIndex);
        idIndex.delete(id);
    } catch (error) {
        console.log(error);
    }
}


async function updateFile(idIndex: Map<string, string> ): Promise<void> {

    try {
        let user: Map<string, string> =  await getUpdateQuestions(idIndex);
        const bfr: Buffer = await setInputIntoBuffer(user);

        const FillChar: string = `~`;
        let id: string | undefined = await user.get("ID")
        if (id == undefined) {
            id = ""
        }
    
        await addToFile(bfr);
        await countLines(idIndex , id, FillChar);
    } catch (error) {
        console.log(error);
    }
}

async function loadIndex(): Promise<Map<string, string>> {
    let idIndex: Map<string, string> = new Map();
    const fd: any = await open("./index.txt");
    for await (const line of fd.readLines()) {
        idIndex.set(line.split('~')[0], line.split('~')[1]);
    }
    return idIndex;

}



async function main(): Promise<void> {
    let idIndex : Map<string, string> = await loadIndex();
        
    let choice: string = await getMainQuestions();
    console.log(idIndex);
    
    while (choice != "6") {

        if (choice.includes("1")) {
            await writeToFile(idIndex);
        }
        else if (choice.includes("2")) {
            await readFromFile(idIndex);

        }
        else if (choice.includes("3")) {
            await deleteFromFile(idIndex);
        }
        else if (choice.includes("4")) {
            await updateFile(idIndex);
        }
        else if (choice.includes("5")) {
            console.log(await sqlQuery(idIndex));
        }
        else if (choice.includes("6")) {
            exit(0);
        }
        else {
            console.log("you don't enter Something Right, Try again");
            main();
        }
        console.log();
        choice = await getMainQuestions();
    }


}





main();













