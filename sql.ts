import { open } from 'node:fs/promises';
import { appendFile } from "node:fs/promises";
import { exit, stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';
//import * as sql from 'sql-parser';

const SQL_KEYWORDS = new Set(["SELECT", "FROM", "WHERE", "AND", "OR", "ORDER BY", "INSERT",]);
const ALLOWED_ORDER = {
    "SELECT": ["FROM", "WHERE", "GROUP BY", "ORDER BY"],
    "INSERT": ["INTO", "VALUES"]
};


export async function sqlQuery(): Promise<string> {
    const rl: any = await readline.createInterface({ input, output, terminal: false });
    let query: string = await rl.question(`enter a query : \n`);
    while (!checkSqlQuery(query)) {
        query = await rl.question(`You entered an invalid query`);
    }
    const res: boolean = await checkSqlQuery(query);
    if (!res) {
        return "You entered an invalid query"
    }
    runningTheQuery(query)

    return ""
}



async function runningTheQuery(query: string): Promise<void> {
    const columns: string[] = [];
    const conditions: string[] = [];
    query = query.toUpperCase(); 
    const words = query.split(/\s+/);

    if (words[0].toUpperCase() == "SELECT") {
        // Split query by "FROM" keyword
        const queryParts = query.split("FROM");
        if (queryParts[0]) {
            // Split first part of query (before "FROM") by "," to get columns
            const columnString = queryParts[0].split("SELECT")[1];
            if (columnString) {
                columns.push(...columnString.trim().split(",").map(column => column.trim()));
            }
        }

        // Check if there is a "WHERE" clause in the query
        if (queryParts[1] && queryParts[1].includes("WHERE")) {
            // Split second part of query (after "FROM") by "WHERE" to get conditions
            const conditionString = queryParts[1].split("WHERE")[1];
            if (conditionString) {
                conditions.push(...conditionString.trim().split("AND").map(condition => condition.trim()));
            }
        }
        const usersFile: any = await open('./file.txt');
        const Bfr: Buffer = Buffer.alloc(60);
        conditions
        for await (const line of usersFile.readLines()) {
            if (condition) {
                
            }
            // idIndex.set(line.split('.')[0], line.split('.')[1]);
        }
        
        const bfrNameToString: string = Bfr.toString();
        const remMark: string = bfrNameToString.split('.').join(" ")
        const data: string[] = remMark.replace(/\s+/g, ' ').trim().split(" ");
        console.log(`id = ${data[0]} \nfirstName =  ${data[1]}  \nlastName = ${data[2]} \nage =  ${data[3]}\ncity =  ${data[4]}\ncountry =  ${data[5]}\n`);

    }
    console.log(columns);
    console.log(conditions);



}

//     const words = query.split(/\s+/);
//     if (words[0].toUpperCase() == "SELECT") {
//         let columns: any;
//         let conditions: any;
//         let word:string|undefined = words[1];
//         let i = 0;
//         while(!SQL_KEYWORDS.has(word.toUpperCase())){
//             columns.push(word);
//             i +=1;
//             word = words[i];
//         }
//         if (word == "WHERE"){
//             while(word){
//             i +=1; 

//             }
//         }
//     }

//     if (words[0].toUpperCase() == "INSERT") {

//     }
// }

async function checkSqlQuery(query: string): Promise<boolean> {
    let lastKeyword: string | undefined;
    const words = query.split(/\s+/);
    const firstWord = words[0].toUpperCase();
    if (firstWord !== "SELECT" && firstWord !== "INSERT") {
        return false;
    }
    for (const word of words) {
        if (SQL_KEYWORDS.has(word.toUpperCase())) {
            if (lastKeyword && ALLOWED_ORDER[firstWord].indexOf(word.toUpperCase()) === -1) {
                return false;
            }
            lastKeyword = word;
        }
    }
    return true
}

// let a = "SELECT * FROM dsg WHERE aa= bb and sdf =asdfas"
// a = a.toUpperCase()
// console.log(a);
// console.log(runningTheQuery(a));
// console.log("asda");








