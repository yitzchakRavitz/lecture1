import { open } from 'node:fs/promises';
import { appendFile } from "node:fs/promises";
import { exit, stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';
import { sqlQuery } from './sql';
//import * as sql from 'sql-parser';
import { EventEmitter } from 'events';


async function getUserDetails(): Promise<Map<string, string>> {

    let user: Map<string, string> = new Map();

    const rl: any = await readline.createInterface({ input, output });
    let id: string = await rl.question("What is your id ?  ");
    while (!id || id.length != 9) {
        console.log("The input is incorrect, try again");
        id = await rl.question("What is your id ?  ");
    }
    user.set("ID", id)

    let firstName: string = await rl.question("What is your First Name ?");
    while (!firstName || firstName.length > 10) {
        console.log("The input is incorrect, try again");
        firstName = await rl.question("What is your First Name ?   ");
    }
    user.set("FIRSTNAME", firstName)

    let lastName: string = await rl.question("What is your Last Name ?  ");
    while (!lastName || lastName.length > 10) {
        console.log("The input is incorrect, try again");
        lastName = await rl.question("What is your Last Name ?  ");
    }
    user.set("LASTNAME", lastName)


    let age: string = await rl.question("What is your Age ?  ");
    while (!age || age.length > 3) {
        console.log("The input is incorrect, try again");
        age = await rl.question("What is your Age ?  ");
    }

    while (isNaN(parseInt(age))) {
        console.log("it's not a number");
        age = await rl.question("What is your Age ? ");

    }
    user.set("AGE", age)

    let city: string = await rl.question("What city are you from ?  ");
    while (!city || city.length > 10) {
        console.log("The input is incorrect, try again");
        city = await rl.question("What city are you from ?  ");
    }
    user.set("CITY", city)

    let country: string = await rl.question("What country are you from ?  ");
    while (!country || country.length > 10) {
        console.log("The input is incorrect, try again");
        country = await rl.question("What country are you from ?  ");
    }
    user.set("COUNTRY", country)

    rl.close();
    return user
}

export async function setInputIntoBuffer(user: Map<string, string>): Promise<Buffer> {
    let id: string | undefined = user.get("ID")
    let firstName: string | undefined = user.get("FIRSTNAME")
    let lastName: string | undefined = user.get("LASTNAME")
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

    const BuferLen: number = 60;
    const FillChar: string = `.`;

    const bfr: Buffer = Buffer.alloc(BuferLen, FillChar);
    bfr.write(id, 0)
    bfr.write(firstName, 11);
    bfr.write(lastName, 20);
    bfr.write(age, 30);
    bfr.write(city, 40);
    bfr.write(country, 50);
    console.log(`ID: ${id} \n First Name: ${firstName} \n Last Name : ${lastName} \n Age : ${age}\n city : ${city}\n country : ${country}`);

    return bfr;
}


async function writeToFile(): Promise<void> {

    let user: Map<string, string> = await getUserDetails();
    const bfr: Buffer = await setInputIntoBuffer(user);

    const FillChar: string = `.`;
    let id: string | undefined = await user.get("ID")
    if (id == undefined) {
        id = ""
    }

    await addToFile(bfr);
    await countLines(id, FillChar);
    //main();
}

export async function addToFile(bfr: Buffer) {
    await appendFile('file.txt', `${bfr}\n`);
    console.log("success appendFile To file");
}

export async function countLines(id: string, FillChar: string): Promise<void> {
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


async function readFromFile(): Promise<void> {
    const rl2 = await readline.createInterface({ input, output });

    let findIndex = await rl2.question("Enter your ID");
    while (!findIndex || findIndex.length !== 9) {
        console.log("The input is incorrect, try again");
        findIndex = await rl2.question("Enter your ID");
    }
    console.log(findIndex);


    if (idIndex.get(findIndex)) {

        let theIndex: any = await idIndex.get(findIndex);
        console.log(theIndex);

        theIndex = theIndex.split('.').join("");



        const fdName: any = await open('./file.txt');
        const Bfr: Buffer = Buffer.alloc(60);
        await fdName.read(Bfr, 0, 60, parseInt(theIndex));
        const bfrNameToString: string = Bfr.toString();
        const remMark: string = bfrNameToString.split('.').join(" ")
        const data: string[] = remMark.replace(/\s+/g, ' ').trim().split(" ");
        console.log(`id = ${data[0]} \nfirstName =  ${data[1]}  \nlastName = ${data[2]} \nage =  ${data[3]}\ncity =  ${data[4]}\ncountry =  ${data[5]}\n`);

        console.log(`Success\n`);
        await fdName.close()


    }
    else {
        console.log("No such user found");
    }
    await rl2.close();
    //main();

}
async function loadIndex(): Promise<void> {
    const fd: any = await open("./index.txt");
    for await (const line of fd.readLines()) {
        idIndex.set(line.split('.')[0], line.split('.')[1]);
    }


}



async function main(): Promise<void> {

    const rl: any = await readline.createInterface({ input, output, terminal: false });
    console.log();
    
    let choice: string = await rl.question(`If you want to write to the file enter 1\nIf you want to read from the file enter 2\nenter 3 to write an sql query\nenter 4 to exit\n `);
    while (!choice) {
        choice = await rl.question(`Please enter a correct number`);
    }
    await rl.close();
    while (choice != "4") {
        if (choice.includes("1")) {
            await writeToFile();
        }
        else if (choice.includes("2")) {
            await readFromFile();

        }
        else if (choice.includes("3")) {
            console.log(await sqlQuery());
        }
        else if (choice.includes("4")) {
            exit(0);
        }
        else {
            console.log("you don't enter Something Right, Try again");
            main();
        }
        console.log();
        const rl: any = await readline.createInterface({ input, output, terminal: false });
        
        choice = await rl.question(`If you want to write to the file enter 1\nIf you want to read from the file enter 2\nenter 3 to write an sql query\nenter 4 to exit\n `);
        while (!choice) {
            choice = await rl.question(`Please enter a correct number`);
        }
        await rl.close();
    }


}


let idIndex: Map<string, string> = new Map();

loadIndex();
main();



