import * as readline from 'node:readline/promises';
import { exit, stdin as input, stdout as output } from 'node:process';

//import writeFile from 'node:fs/promises';
import { appendFile, readFile, writeFile } from 'node:fs';

const rl = readline.createInterface({ input, output });
let numOfData = 10;


async function readTheFile(ID) {
    await readFile('db.txt', (err, data) => {
        if (err) {
            console.error(err);
            exit(1)
        }
        let ff = JSON.parse(data)
        let user = []
        ff.forEach(element => {
            if (element[3] == ID) {
                user.push(element)
            }
        });
        if (!user.length) {
            console.log("There is no such user! \n");
        }
        else {
            user.forEach(element => {
                console.log("First Name:" + element[0]);
                console.log("Last Name:" + element[1]);
                console.log("Age:" + element[2]);
                console.log("ID:" + element[3] + '\n');
            });
        }
        userChoice()


    });

};


async function writeToFile() {
    let firstName = await rl.question("First Name:")
    while (!firstName) {
        firstName = await rl.question("Please enter your first Name: ")
    }
    let lastName = await rl.question("Last Name: ")
    while (!lastName) {
        lastName = await rl.question("Please enter your last Name: ")
    }
    let age = await rl.question("Age: ")
    while (!age) {
        age = await rl.question("Please enter your age: ")
    }
    let id = await rl.question("ID: ")
    while (!id) {
        id = await rl.question("Please enter your ID: ")
    }
    let data = [firstName, lastName, age, id]


    await readFile('db.txt', (err, rdata) => {
        if (err) {
            console.error(err);
            exit(1)
        }
        let temp = JSON.parse(rdata)
        if (temp[0] == "start") {
            writeFile('db.txt', JSON.stringify([data]), (err) => {
                if (err) {
                    console.error(err);
                }
            })
        }
        else {
            temp.push(data)
            writeFile('db.txt', JSON.stringify(temp), (err) => {
                if (err) {
                    console.error(err);
                }
            })
        }
    }

    )



    userChoice()

}


async function userChoice() {


    const choice = await rl.question("Press 1 to write to the file \nPress 2 to read from a file \nPress 3 to finish \n")

    if (choice == 1) {
        await writeToFile();
    }
    if (choice == 2) {
        const ID = await rl.question("Enter ID: \n")
        readTheFile(ID);
    }
    if (choice == 3) {
        exit(0)
    }

}

async function createFile() {

    await readFile('db.txt', (err) => {
        if (err) {
            appendFile('db.txt', JSON.stringify(["start"]), (err) => {
                if (err) {
                    console.error(err);
                }
            })
        }
    })
}

createFile()
userChoice()



// test()

// async function test(){
//     let data = [["firstName","lastName",45,45646],[1,"dsgds",2]]
//     await writeFile('db.txt',JSON.stringify(data) , (err) => {
//         if (err) {
//              console.error(err);
//         }
//     });
//     let a = await readFile('db.txt', (err,data) => {
//         if (err) {
//             console.error(err);
//             exit(1)
//         }
//         console.log(JSON.parse(data))
//         return JSON.parse(data)
//         exit(0)
//     });
//     console.log(a);
// }


// async function aa(){


//     let data = ["firstName","lastName",45,45646]

//     await writeFile('db.txt',JSON.stringify(data) , (err) => {
//         if (err) {
//             console.error(err);
//         }
//     });
//     data = ["firssfdtName","lastNafsame",345,455646]
//     await appendFile('db.txt', JSON.stringify(data) , (err) => {
//         if (err) {
//             console.error(err);
//         }
//     });
//     data = ["firssfdfgtName","lasfgjhtNafsame",347474745,645]
//     await appendFile('db.txt',JSON.stringify(data), (err) => {
//         if (err) {
//             console.error(err);
//         }
//     });
//     await readFile('db.txt', (err,data) => {
//         if (err) {
//             console.error(err);
//             exit(1)
//         }
//         console.log(JSON.parse("[" + data + "]"))
//         //let ff = JSON.parse(data)
//         //console.log(JSON.parse("%s",ff));
//         exit(0)
//     });
// }

// aa();


// import * as readline from 'node:readline/promises';
// import { stdin as input, stdout as output } from 'node:process';

// const rl = readline.createInterface({ input, output });

// const answer = await rl.question('What do you think of Node.js? ');

// console.log(`Thank you for your valuable feedback: ${answer}`);

// rl.close();

// let data = {
//     "first name": firstName,
// "last name":lastName,
// "age":age,
// "id":id}