import { validateInput } from './inputValidation'

export async function getInputQuestions(idIndex:Map<string,string>): Promise<Map<string, string>> {

    let user: Map<string, string> = new Map();

    let id: string = await validateInput("What is your ID ? ", 9, 9, "number");
    
    while(idIndex.get(id)){
        id = await validateInput("ID already exists, please enter another ID ", 9, 9, "number");
    }
    user = await insertUserQuestions(user);
    user.set("ID", id);
    return user;
}


export async function getReadFileQuestions(): Promise<string> {

    let id: string = await validateInput("Enter your ID:  ", 9, 9, "string");
    return id;
}


export async function getDeleteQuestions(idIndex:Map<string,string>): Promise<string> {

    let id: string = await validateInput("Enter the ID that you want to delete:  ", 9, 9, "string");
    if(!idIndex.get(id)){
        throw("The ID does not exist");
    }
    return id;
}

async function insertUserQuestions(user:Map<string,string>): Promise<Map<string, string>> {
    
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

export async function getUpdateQuestions(idIndex:Map<string,string>): Promise<Map<string, string>> {
    let user: Map<string, string> = new Map();

    let id: string = await validateInput("Enter the ID that you want to update:  ", 9, 9, "string");
    if(!idIndex.get(id)){
        throw("The ID does not exist");
    }
    user = await insertUserQuestions(user);
    user.set("ID", id);
    return user
  
}



export async function getMainQuestions(): Promise<string> {
    let id: string = await validateInput('If you want to write to the file enter 1\nIf you want to read from the file enter 2\nIf you want to delete from the file enter 3\nIf you want to update the file enter 4\nenter 5 to write an sql query\nenter 6 to exit\n ',1,1,"number");
    return id
}

export async function getSqlQuestions(): Promise<string> {
    console.log("\nYou can write a query into file.txt that uses and the following columns:");
    console.log("ID, FIRST_NAME, LAST_NAME, AGE, CITY, COUNTRY");
    let query: string = await validateInput(`enter a query : \n`,1000,0,"string");
    return query;
}