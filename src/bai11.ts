export class Animal{
    public name:string;
    constructor(name:string) {
        this.name=name;
    }
}
export class Dog extends Animal {
    public bark(): void {
        console.log(`${this.name} barks: Woof! Woof!`);
    }
}
export class Cat extends Animal {
    public meow(): void { 
        console.log(`${this.name} meows: Meow! Meow!`);
    }
}
