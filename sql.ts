import { open } from 'node:fs/promises';
import { appendFile } from "node:fs/promises";
import { exit, stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';
import { setInputIntoBuffer, addToFile, countLines } from '.'

const SQL_KEYWORDS = new Set(["SELECT", "FROM", "WHERE", "AND", "OR", "ORDER BY", "INSERT",]);
const ALLOWED_ORDER = {
    "SELECT": ["FROM", "WHERE", "GROUP BY", "ORDER BY"],
    "INSERT": ["INTO", "VALUES"]
};
const tableColumns = ["ID", "FIRST_NAME", "LAST_NAME", "AGE", "CITY", "COUNTRY"];

async function getQuery(): Promise<string> {
    const rl: any = await readline.createInterface({ input, output, terminal: false });
    console.log("\nYou can write a query that uses the following columns:");
    console.log("ID, FIRST_NAME, LAST_NAME, AGE, CITY, COUNTRY");
    let query: string = await rl.question(`enter a query : \n`);
    return query;
}

export async function sqlQuery(): Promise<string> {
    let query: string = await getQuery()
    const res: boolean = await checkSqlQuery(query);
    if (!res) {
        return "You entered an invalid query"
    }
    const words = query.split(/\s+/);

    if (words[0].toUpperCase() == "SELECT") {
        await runningSelectQuery(query);
    }
    if (words[0].toUpperCase() == "INSERT") {
        await runningInsertQuery(query);
    }
    
    return "done"
}

async function checkingData(queryMap: Map<string, string>): Promise<boolean> {
    let id: string | undefined = queryMap.get("ID")
    let fName: string | undefined = queryMap.get("FIRST_NAME")
    let lName: string | undefined = queryMap.get("LAST_NAME")
    let age: string | undefined = queryMap.get("AGE")
    let city: string | undefined = queryMap.get("CITY")
    let country: string | undefined = queryMap.get("COUNTRY")
    let res: boolean = true;
    if (id && id.length != 9) {
        console.log("The id input is incorrect");
        res = false;
    }
    if (fName && fName.length >= 9) {
        console.log("The first Name input is incorrect");
        res = false;
    }
    if (lName && lName.length >= 9) {
        console.log("The last Name input is incorrect");
        res = false;
    }
    if (age && age.length >= 3) {
        console.log("The age input is incorrect");
        res = false;
    }
    if (city && city.length >= 9) {
        console.log("The city input is incorrect");
        res = false;
    }
    if (country && country.length >= 9) {
        console.log("The country input is incorrect");
        res = false;
    }
    return res;
}

async function runningInsertQuery(query: string): Promise<void> {
    try {
        let queryMap: Map<string, string> = await extractValuesFromInsertQuery(query);

        if (await checkingData(queryMap)) {
            const bfr: Buffer = await setInputIntoBuffer(queryMap);
            const FillChar: string = `.`;
            let id: string | undefined = queryMap.get("ID")
            if (id == undefined) {
                id = ""
            }


            addToFile(bfr);
            countLines(id, FillChar);
        }
    } catch (error: any) {
        console.error("Error:", error.message);
      }
}
async function dataSearch(columns: string[], conditions: string[], query: string): Promise<void> {
    try {
        //const words = query.split(/\s+/);
        const usersFile: any = await open('./file.txt');
        //const Bfr: Buffer = Buffer.alloc(60);
        if (conditions) {
            for await (let line of usersFile.readLines()) {
                const substrings = line.split(/\.(?=.*[a-zA-Z0-9])|(?<=.*[a-zA-Z0-9])\./).filter((substring: string) => substring !== '');
                line = substrings.filter((substring: string) => !substring.endsWith('...'));
                let flag: boolean = true;
                conditions.forEach(element => {
                    let condition: any = element.split("=");
                    let col: string = condition[0];

                    if (tableColumns.indexOf(col.trim()) == -1) {
                        usersFile.close()
                        throw ("You inserted a column that does not exist");
                    }
                    if (line[tableColumns.indexOf(col.trim())].toUpperCase() != condition[1].trim()) {
                        flag = false
                    }
                });
                if (flag) {
                    if (columns[0] == "*") {
                        tableColumns.forEach(element => {
                            console.log(element + ": " + line[tableColumns.indexOf((element.trim()).toUpperCase())]);
                        });
                    }
                    else {
                        columns.forEach(element => {
                            console.log(element + ": " + line[tableColumns.indexOf((element.trim()).toUpperCase())]);

                        });
                    }

                }
            }
        }
        await usersFile.close()
    } catch (error) {
        console.log(error);

    }
}

async function runningSelectQuery(query: string): Promise<void> {
    const columns: string[] = [];
    const conditions: string[] = [];
    query = query.toUpperCase();


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

    await dataSearch(columns, conditions, query);

}



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


async function extractValuesFromInsertQuery(query: string): Promise<Map<string, string>> {


    const fileStartIndex = query.indexOf("into") + 4;
    const fileEndIndex = query.indexOf("(");
    const file = query.substring(fileStartIndex, fileEndIndex).trim().toLowerCase();

    const columnsStartIndex = query.indexOf("(") + 1;
    const columnsEndIndex = query.indexOf(")");
    const columnsString = query.substring(columnsStartIndex, columnsEndIndex).trim();
    const columns = columnsString.split(",").map(column => column.trim().toUpperCase());

    const valuesStartIndex = query.lastIndexOf("(") + 1;
    const valuesEndIndex = query.lastIndexOf(")");
    const valuesString = query.substring(valuesStartIndex, valuesEndIndex).trim();
    const values = valuesString.split(",").map(value => value.trim());
  
    
    if (columns.length !== values.length) {
        throw new Error("The number of columns and values does not match");
    }

    const result = new Map<string, string>();
    result.set('file', file);
    columns.forEach((column, i) => {
        if (!tableColumns.includes(column)) {
            throw new Error("Incorrect column insertion");
        }
        values[i] = values[i].replace(/['"]+/g, '');
        result.set(column, values[i]);
    });

    return result;


}



