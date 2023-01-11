import { exit, stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';



let indexd : number = 0;
class myNode {
    public number: number;
    public indexd: number;
    public next: myNode | null;

    constructor(data: any) {
        this.number = data;
        this.indexd = indexd;
        this.next = null;
        indexd = indexd+1;
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

        let current :myNode| null = this.head;
        while (current) {
            if (current.number == data) {
                return current;
            }
            current = current.next;
        }
        return null;
    }
}
async function generateList() : Promise<LinkedList>  {
    let myList :LinkedList = new LinkedList();
    let num = 0;
    for (let index = 0; index < 50000; index++) {
        num =Math.floor(Math.random() *500000)
        if(index == 30000){
            console.log(num);
            
        }
        myList.append(num);            
    }
    return myList;

}


async function start(myList : Promise<LinkedList>) {
    const rl : any = await readline.createInterface({ input, output, terminal: false });
    let choice = await rl.question(`enter a number enter "x" to exit  `);
    while (!choice) {
        choice = await rl.question(`Please enter a correct number`);
    }
    if(choice.includes("x")){
        exit(0);
    }
    else {

        
        let current : myNode | null = (await myList).find(choice);
        if(current){
            console.log(current.number);
            console.log(current.indexd);
        }
        else{
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
}

start(generateList());