export class Stack {
    private items: any[] = [];
    
    push(item: any): void {
        this.items.push(item);
    }
    
    pop(): any {
        if (this.isEmpty()) {
        throw new Error("Stack is empty.");
        }
        return this.items.pop();
    }
    
    peek(): any {
        if (this.isEmpty()) {
        throw new Error("Stack is empty.");
        }
        return this.items[this.items.length - 1];
    }
    
    isEmpty(): boolean {
        return this.items.length === 0;
    }
    
    size(): number {
        return this.items.length;
    }
}