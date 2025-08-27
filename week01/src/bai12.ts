export interface Flyable{
    fly(): void;
}
export interface Swimmable {
    swim(): void;
}
export class Bird implements Flyable {
    fly(): void {
        console.log("The bird is flying.");
    }
}
export class Fish implements Swimmable {
    swim(): void {
        console.log("The fish is swimming.");
    }
}