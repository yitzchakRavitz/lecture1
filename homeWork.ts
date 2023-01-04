import * as readline from 'node:readline/promises';
import { exit, stdin as input, stdout as output } from 'node:process';

//import writeFile from 'node:fs/promises';
import { appendFile, readFile, writeFile } from 'node:fs';

const rl = readline.createInterface({ input, output });

//The program can write user information to a database and search effectively for users,
// I divided the data base into ten arrays, each data written to the database goes into a certain
// array determined according to its id, so it is faster to search for it

async function readTheFile(ID) {
    await readFile('db.txt', (err, data) => {
        if (err) {
            console.error(err);
            exit(1)
        }
        let ff = JSON.parse(data)
        let user = []
        let databaseLocation = ID % 10 //Finding the array the person is in
        ff[databaseLocation].forEach(element => {
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
                console.log("ID:" + element[3] );
                console.log("city:" + element[4]);
                console.log("street:" + element[5]);
                console.log("AhouseNumberge:" + element[6]);
                console.log("zipCode:" + element[7]+ '\n');
            });
        }
        userChoice()


    });

};

//A function that adds a new user to a database
async function writeToFile() {
    let isnum = true
    let firstName = await rl.question("First Name:")
    while (!firstName) {
        firstName = await rl.question("Please enter your first Name: ")
    }

    let lastName = await rl.question("Last Name: ")
    while (!lastName) {
        lastName = await rl.question("Please enter your last Name: ")
    }

    let age = await rl.question("Age: ")
    isnum = /^\d+$/.test(age);
    while (!age || !isnum) {
        age = await rl.question("Please enter your age: ")
        isnum = /^\d+$/.test(age);
    }

    let id = await rl.question("ID: ")
    isnum = /^\d+$/.test(id);
    while (!id || !isnum) {
        id = await rl.question("Please enter your ID: ")
        isnum = /^\d+$/.test(id);
    }

    console.log("Please enter your Address:");
    let city = await rl.question("City: ")
    while (!city) {
        city = await rl.question("Please enter the name of your city: ")
    }

    let street = await rl.question("street: ")
    while (!street) {
        street = await rl.question("Please enter the name of your street: ")
    }
    let houseNumber = await rl.question("house number: ")
    while (!houseNumber) {
        houseNumber = await rl.question("Please enter your house number: ")
    }

    let zipCode = await rl.question("zip code number: ")
    isnum = /^\d+$/.test(zipCode);
    while (!zipCode || !isnum) {
        zipCode = await rl.question("Please enter your zip code number: ")
        isnum = /^\d+$/.test(zipCode);
    }

    let data = [firstName, lastName, age, id,city,street,houseNumber,zipCode]


    await readFile('db.txt', (err, rdata) => {
        if (err) {
            console.error(err);
            exit(1)
        }
        let temp = JSON.parse(rdata)

        //Makes % for the ID card number and according to the number that comes out it is
        // inserted into a certain array, and when we go to look for this man it will be much faster
        let databaseLocation = data[3] % 10
        temp[databaseLocation].push(data)
        writeFile('db.txt', JSON.stringify(temp), (err) => {
            if (err) {
                console.error(err);
            }
        })
    })
    userChoice()
}


async function userChoice() {
    //The start screen of the program
    let choice = await rl.question("Press 1 to write to the file \nPress 2 to read from the file \nPress 3 to finish \n")
    while (choice != '1' && choice != '2' && choice != '3') {
        choice = await rl.question("Press 1 to write to the file \nPress 2 to read from the file \nPress 3 to finish \n")
    }
    if (choice == 1) {
        await writeToFile();
    }
    if (choice == 2) {
        const ID = await rl.question("Enter ID: \n")
        readTheFile(ID,);
    }
    if (choice == 3) {
        exit(0)
    }

}

//A function that initializes a file if it does not exist
async function createFile() {

    await readFile('db.txt', (err, data) => {
        if (err) {
            //Initializes the database to 10 arrays to optimize the search time of people
            appendFile('db.txt', JSON.stringify([[], [], [], [], [], [], [], [], [], []]), (err) => {
                if (err) {
                    console.error(err);
                }
            })
        }

    })
}

// //A function that initializes a file if it does not exist
// createFile()
// //The beginning of the program
// userChoice()


