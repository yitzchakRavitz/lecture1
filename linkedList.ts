let indexd : number = 0;
class myNode {
    public number: number;
    public indexd: number;
    public next: myNode | null;

    constructor(data: any) {
        this.number = data;
        this.indexd = indexd + 1
        this.next = null;
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

async function start() {
    
}
