export interface Animal {
     name: string;
    makeSound(): void;
}
export class Cow implements Animal {
    public name:string;
    constructor(name:string) {
        this.name=name;
    }
    public makeSound(): void {
        console.log(`${this.name} says Moo!`);
    }
}
export class Chicken implements Animal {
    public name:string;
    constructor(name:string) {
        this.name=name;
    }
    public makeSound(): void {
        console.log(`${this.name} says Cluck!`);
    }
}