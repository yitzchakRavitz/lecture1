import { open } from 'node:fs/promises';
import { appendFile } from "node:fs/promises";
import { exit, stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';
//import * as sql from 'sql-parser';
import { EventEmitter } from 'events';
import { validateInput } from './inputValidation'

export async function setInputQuestions(idIndex:Map<string,string>): Promise<Map<string, string>> {

    let user: Map<string, string> = new Map();

    let id: string = await validateInput("What is your ID ? ", 9, 9, "number");
    
    while(idIndex.get(id)){
        id = await validateInput("ID already exists, please enter another ID ", 9, 9, "number");
    }
    user.set("ID", id);

    let firstName: string = await validateInput("What is your First Name ?", 9, 0, "string");
    user.set("FIRST_NAME", firstName);

    let lastName: string = await validateInput("What is your Last Name ?", 9, 0, "string");
    user.set("LAST_NAME", lastName);

    let age: string = await validateInput("What is your Age ?", 3, 0, "number");
    user.set("AGE", age);

    let city: string = await validateInput("What city are you from ?", 9, 0, "string");
    user.set("CITY", city);

    let country: string = await validateInput("What country are you from ?", 9, 0, "string");
    user.set("COUNTRY", country);
    return user
}


export async function readFromFileQuestions(): Promise<string> {

    let id: string = await validateInput("Enter your ID:  ", 9, 9, "string");
    return id;
}




export async function mainQuestions(): Promise<string> {
    let id: string = await validateInput('If you want to write to the file enter 1\nIf you want to read from the file enter 2\nenter 3 to write an sql query\nenter 4 to exit\n ',1,1,"number");
    return id
}

export async function sqlQuestions(): Promise<string> {
    console.log("\nYou can write a query that uses the following columns:");
    console.log("ID, FIRST_NAME, LAST_NAME, AGE, CITY, COUNTRY");
    let query: string = await validateInput(`enter a query : \n`,0,100,"string");
    return query;
}