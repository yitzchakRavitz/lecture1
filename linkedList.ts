import { exit, stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';



let indexd: number = 0;
class myNode {
    public number: number;
    public indexd: number;
    public next: myNode | null;

    constructor(data: any) {
        this.number = data;
        this.indexd = indexd;
        this.next = null;
        indexd = indexd + 1;
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
                console.log("It took " + count + " tests on the list");
                
                return current;
            }
            current = current.next;
        }
        return null;
    }
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
    let choice1 = await rl.question(`For an unsorted list, press 1. \nFor a sorted list, press 3. \nTo enter values, press 3. \nTo exit, press 4`);

    if (choice1 == "1") {
        let choice = await rl.question(`enter a number \n`);
        while (!choice) {
            choice = await rl.question(`Please enter a correct number`);
        }
        let current: myNode | null = (await myList).find(choice);
        if (current) {
            console.log(current.number);
            console.log(current.indexd);
        }
        else {
            console.log("no!!!");

        }
        start(myList);

        // let current : myNode | null = myList.head;
        // while(current) {
        //     console.log(current?.number); 
        //     console.log(current?.indexd);
        //     current = current.next;           
        // }
    }
    if (choice1 == "2") {
        let arr: Array<number | undefined> = [];
        let mapIndex: Map<number,number>;
        let current: myNode | null = (await myList).head;
        for (let index = 0; index < 50000; index++) {
            arr[index] = current?.number;
            mapIndex(current?.number,index);
        }

    }
    if (choice1.includes("x")) {
        exit(0);
    }
}

start(generateList());


function quicksort(numbers: number[]) :any {
    if (numbers.length <= 1) {
        return numbers;
    }
    let pivot = numbers[numbers.length - 1];
    let left: number[] = [];
    let right: number[] = [];
    for (let i = 0; i < numbers.length - 1; i++) {
        if (numbers[i] < pivot) {
            left.push(numbers[i]);
        } else {
            right.push(numbers[i]);
        }
    }
    return quicksort(left).concat(pivot, quicksort(right));
}

let numbers = [4, 2, 9, 6, 1, 8];
let sortedNumbers = quicksort(numbers);
console.log(sortedNumbers); // Output: [1, 2, 4, 6, 8, 9]
