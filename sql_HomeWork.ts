import { open } from 'node:fs/promises';
import { appendFile } from "node:fs/promises";
import { exit, stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';
import * as sql from 'sql-parser';

sda

const writeToFile = async function (): Promise<void> {

    const rl: any = readline.createInterface({ input, output });
    let id: string = await rl.question("What is your id ?  ");
    while (!id || id.length != 9) {
        console.log("The input is incorrect, try again");
        id = await rl.question("What is your id ?  ");
    }

    let firstName: string = await rl.question("What is your First Name ?");
    while (!firstName || firstName.length > 10) {
        console.log("The input is incorrect, try again");
        firstName = await rl.question("What is your First Name ?   ");
    }
    let lastName: string = await rl.question("What is your Last Name ?  ");
    while (!lastName || lastName.length > 10) {
        console.log("The input is incorrect, try again");
        lastName = await rl.question("What is your Last Name ?  ");
    }
    let age: string = await rl.question("What is your Age ?  ");
    while (!age || age.length > 3) {
        console.log("The input is incorrect, try again");
        age = await rl.question("What is your Age ?  ");
    }
    while (isNaN(parseInt(age))) {
        console.log("it's not a number");
        age = await rl.question("What is your Age ? ");

    }
    const BuferLen: number = 35;
    const FillChar: string = `.`;
    const bfr: Buffer = Buffer.alloc(BuferLen, FillChar);
    bfr.write(id, 0)
    bfr.write(firstName, 11);
    bfr.write(lastName, 20);
    bfr.write(age, 30);

    console.log(`ID: ${id} \n First Name: ${firstName} \n Last Name : ${lastName} \n Age : ${age}`);
    async function addToFile() {
        await appendFile('file.txt', `${bfr}\n`);
        console.log("success appendFile To file");
    }
    addToFile();


    async function countLines(): Promise<void> {
        const file: any = await open('./file.txt');
        let numOfLines: number = 0;
        for await (const line of file.readLines()) {
            numOfLines++;
        }
        let count_Lines = 0
        if (numOfLines != 0) {
            count_Lines = numOfLines - 1;
        }
        const size: number = count_Lines * 35;
        const stringSize: string = size.toString();

        const bfrToIndex: Buffer = Buffer.alloc(20, FillChar);
        bfrToIndex.write(id, 0)
        bfrToIndex.write(stringSize, 10)
        console.log(`Your information:  \n ID: ${id} \n LDS ${stringSize} `);
        await appendFile('index.txt', `${bfrToIndex}\n`);
        map1.set(id, stringSize);
        console.log("success appendFile To Index file");
        main();
    }
    countLines();
    rl.close();

}

async function readFromFile(): Promise<void> {
    const rl2 = readline.createInterface({ input, output });

    let findIndex = await rl2.question("Enter your ID");
    while (!findIndex || findIndex.length !== 9) {
        console.log("The input is incorrect, try again");
        findIndex = await rl2.question("Enter your ID");
    }
    console.log(findIndex);


    if (map1.get(findIndex)) {

        let theIndex: any = map1.get(findIndex);
        console.log(theIndex);

        theIndex = theIndex.split('.').join("");



        const fdName: any = await open('./file.txt');
        const Bfr: Buffer = Buffer.alloc(35);
        await fdName.read(Bfr, 0, 35, parseInt(theIndex));
        const bfrNameToString: string = Bfr.toString();
        const remMark: string = bfrNameToString.split('.').join(" ")
        const data: string[] = remMark.replace(/\s+/g, ' ').trim().split(" ");
        console.log(`id = ${data[0]} \nfirstName =  ${data[1]}  \nlastName = ${data[2]} \nage =  ${data[3]}\n`);

        console.log(`Success\n`);
        await fdName.close()
        rl2.close();

    }
    else {
        console.log("No such user found");
    }

    main();
}
async function loadIndex(): Promise<void> {
    const fd: any = await open("./index.txt");
    for await (const line of fd.readLines()) {
        map1.set(line.split('.')[0], line.split('.')[1]);
    }


}



async function main(): Promise<void> {

    const rl: any = await readline.createInterface({ input, output, terminal: false });
    let choice: string = await rl.question(`If you want to write to the file enter 1\nIf you want to read from the file enter 2\nenter 3 to write an sql query\nenter 4 to exit\n `);
    while (!choice) {
        choice = await rl.question(`Please enter a correct number`);
    }
    if (choice.includes("1")) {
        writeToFile();
    } else if (choice.includes("2")) {
        readFromFile();
    }
    else if (choice.includes("3")) {
        sqlQuery();
    }
    else if (choice.includes("4")) {
        exit(0);
    }
    else {
        console.log("you don't enter Something Right, Try again");
        main();
    }
}
let map1: Map<string, string> = new Map();
loadIndex();

main();

async function sqlQuery(): Promise<void> {
    const rl: any = await readline.createInterface({ input, output, terminal: false });
    let query: string = await rl.question(`enter a query : \n`);
    while (!checkSqlQuery(query)) {
        query = await rl.question(`You entered an invalid query`);
    }


}

const SQL_KEYWORDS = new Set(["SELECT", "FROM", "WHERE", "AND", "OR", "ORDER BY", "INSERT", ]);
const ALLOWED_ORDER = {
    "SELECT": ["FROM", "WHERE", "GROUP BY", "ORDER BY"],
    "INSERT": ["INTO", "VALUES"]
};

async function checkSqlQuery(query: string): Promise<boolean> {
    try {
        let lastKeyword: string | undefined;
        const words = query.split(/\s+/);
        const firstWord = words[0].toUpperCase();
        if (firstWord !== "SELECT" && firstWord !== "INSERT" ) {
            throw new Error("Invalid query type");
        }
        for (const word of words) {
            if (SQL_KEYWORDS.has(word.toUpperCase())) {
                if (lastKeyword && ALLOWED_ORDER[firstWord].indexOf(word.toUpperCase()) === -1) {
                    throw new Error(`Invalid keyword order: ${lastKeyword} ${word}`);
                }
                lastKeyword = word;
            }
        }
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}