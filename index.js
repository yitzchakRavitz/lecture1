import { open } from 'node:fs/promises';
import { appendFile } from "node:fs/promises";
import { exit, stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';



const writeToFile = async function () {

    const rl = readline.createInterface({ input, output });
    let id = await rl.question("What is your id ?  ");
    while (!id || id.length != 9) {
        console.log("The input is incorrect, try again");
        id = await rl.question("What is your id ?  ");
    }

    let firstName = await rl.question("What is your First Name ?");
    while (!firstName || firstName.length > 10) {
        console.log("The input is incorrect, try again");
        firstName = await rl.question("What is your First Name ?   ");
    }
    let lastName = await rl.question("What is your Last Name ?  ");
    while (!lastName || lastName.length > 10) {
        console.log("The input is incorrect, try again");
        lastName = await rl.question("What is your Last Name ?  ");
    }
    let age = await rl.question("What is your Age ?  ");
    while (!age || age.length > 3) {
        console.log("The input is incorrect, try again");
        age = await rl.question("What is your Age ?  ");
    }
    while (isNaN(parseInt(age))) {
        console.log("it's not a number");
        age = await rl.question("What is your Age ? ");

    }
    const BuferLen = 35;
    const FillChar = `.`;
    const bfr = Buffer.alloc(BuferLen, FillChar);
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

    
    async function countLines() {
        const file = await open('./file.txt');
        let numOfLines = 0;
        for await (const line of file.readLines()) {
            numOfLines++;
        }
        let count_Lines =0
        if(!numOfLines == 0){
            count_Lines = numOfLines - 1;
        }
        const size = count_Lines * 35;
        const stringSize = size.toString();

        const bfrToIndex = Buffer.alloc(20, FillChar);
        bfrToIndex.write(id, 0)
        bfrToIndex.write(stringSize, 10) 
        console.log(`Your information:  \n ID: ${id} \n LDS ${stringSize} `);
        await appendFile('index.txt', `${bfrToIndex}\n`);
        map1.set(id,stringSize);
        console.log("success appendFile To Index file");
        main();
    }
    countLines();
    rl.close();
   
}

const readFromFile = async () => {
    const rl2 = readline.createInterface({ input, output });
    
    let findIndex = await rl2.question("Enter your ID");
    while (!findIndex || findIndex.length !== 9) {
        console.log("The input is incorrect, try again");
        findIndex = await rl2.question("Enter your ID");
    }
    console.log(findIndex);
   
    
    if (map1.get(findIndex)) {       
       
        let theIndex = map1.get(findIndex);
        console.log(theIndex);
        
        theIndex = theIndex.split('.').join("")
        
 
        
        const fdName = await open('./file.txt');
        const Bfr = Buffer.alloc(35);
        await fdName.read(Bfr, 0, 35, parseInt(theIndex));
        const bfrNameToString = Bfr.toString();
        const remMark = bfrNameToString.split('.').join(" ")
        const data = remMark.replace(/\s+/g, ' ').trim().split(" ");
        console.log(`id = ${ data[0]} \nfirstName =  ${data[1]}  \nlastName = ${ data[2] } \nage =  ${data[3]}\n`);
       
        console.log(`Success\n`);
        await fdName.close()
        rl2.close();
       
   }
   else{
        console.log("No such user found");
   }

    main();
}
const loadIndex = async () => {
    const fd = await open("./index.txt");
    for await (const line of fd.readLines()) {
        map1.set(line.split('.')[0],line.split('.')[1]);
    }
    
   
}



async function main() {
   
    const rl = await readline.createInterface({ input, output, terminal: false });
    let choice = await rl.question(`If you want to write to the file enter 1\nIf you want to read from the file enter 2\nenter 3 to exit\n `);
    while (!choice) {
        choice = await rl.question(`Please enter a correct number`);
    }
    if (choice.includes("1")) {
        writeToFile();
    } else if (choice.includes("2")) {
        readFromFile();
    }
    else if(choice.includes("3")){
        exit(0);
    }
    else {
        console.log("you don't enter Something Right, Try again");
        main();
    }
}
let map1 = new Map();
loadIndex();

main();//dfgdgdgdr