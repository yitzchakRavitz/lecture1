import { exit, stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';
import stream from 'stream';

stream.setMaxListeners(100);



let indexd: number = 0;
class myNode {
    public number: number;
    public index: number;
    public next: myNode | null;

    constructor(data: any) {
        this.number = data;
        this.index = indexd;
        this.next = null;
        indexd = indexd + 1;
    }
    public setNumber(data: any): void {
        this.number = data
    }
    public setIndex(data: any): void {
        this.index = data
    }
    public setNext(data: any): void {
        this.next = data
    }
    
}

class LinkedList {
    public head: myNode | null;

    constructor() {
        this.head = null;
    }

    // Adding a new node to the end of the list
    public append(data: any): void {
        let newNode = new myNode(data);

        // If the list is empty, set the new node as the head
        if (!this.head) {
            this.head = newNode;
            return;
        }

        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }

    // Removing a node from the list
    public remove(data: any): void {
        if (!this.head) {
            return;
        }

        // If the head node contains the data to remove
        if (this.head.number === data) {
            this.head = this.head.next;
            return;
        }

        let current = this.head;
        while (current.next) {
            if (current.next.number === data) {
                current.next = current.next.next;
                return;
            }
            current = current.next;
        }
    }

    
    // Finding a node in the list
    public find(data: any): myNode | null {
        if (!this.head) {
            return null;
        }

        let current: myNode | null = this.head;
        let count : number = 0;
        while (current) {
            count +=1;
            if (current.number == data) {
                console.log("The run time is: " + count );
                
                return current;
            }
            current = current.next;
        }
        return null;
    }
}

function sortWithIndexes<T>(arr: T[]): { sortedArr: T[], indexes: number[] } {
    const indexes: number[] = Array.from(arr, (_, i) => i);
    indexes.sort((i1, i2) => {
        if (arr[i1] > arr[i2]) return 1;
        if (arr[i1] < arr[i2]) return -1;
        return 0;
    });
    const sortedArr = indexes.map(i => arr[i]);
    return { sortedArr, indexes };
}


async function generateList(): Promise<LinkedList> {
    let myList: LinkedList = new LinkedList();
    let num = 0;
    for (let index = 0; index < 50000; index++) {
        num = Math.floor(Math.random() * 50000)
        if (index == 30000) {
            console.log(num);

        }
        myList.append(num);
    }
    return myList;

}


async function start(myList: Promise<LinkedList>) {
    const rl: any = await readline.createInterface({ input, output, terminal: false });
    let choice1 = await rl.question(`For an unsorted list, press 1. \nTo sort the list click 2. \nTo enter values, press 3. \nTo exit, press 4\n`);

    if (choice1 == "1") {
        let choice = await rl.question(`enter a number \n`);
        while (!choice) {
            choice = await rl.question(`Please enter a correct number\n`);
        }
        let current: myNode | null = (await myList).find(choice);
        if (current) {
            console.log("The number:  " + current.number);
            console.log("The index is:  " + current.index);
            console.log();
            
        }
        else {
            console.log("The number was not found\n");

        }
        start(myList);

    }

    if (choice1 == "2") {
        
        let arr: Array<number | undefined> = [];
        let current: myNode | null | undefined = (await myList).head;
        for (let index = 0; index < 50000; index++) {
            arr[index] = current?.number;
            current = current?.next;
        }
        let sortedNumbers: any = sortWithIndexes(arr);
        let sortedarr : Array<number | undefined> = sortedNumbers.sortedArr;
        let indexes : Array<number | undefined> = sortedNumbers.indexes;
        current = (await myList).head;
        for (let index = 0; index < 50000; index++) {
            current?.setNumber(sortedarr[index]);
            current?.setIndex(indexes[index]);
            current = current?.next;
        }
        console.log("The list has been sorted successfully!!\n");
        
        start(myList);
    }

    if (choice1.includes("3")) {
        let current: myNode | null | undefined = (await myList).head;
        choice1 = await rl.question(`enter a number `);
        let parChoice : number | undefined = +choice1;
        while(current?.next && parChoice > current?.next?.number){
            current = current?.next;
        }
        if (current?.number) {
            let newNode = new myNode(parChoice);
            newNode.setNext(current.next);
            current.setNext(newNode);
            console.log("The number was inserted after the number: "+ current.number+" found in index: "+ current.index);
            
        }
        start(myList);
    }

    if (choice1.includes("4")) {
        exit(0);
    }
}

start(generateList());
