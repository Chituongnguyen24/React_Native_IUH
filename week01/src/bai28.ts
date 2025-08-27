export class Animal2{
    protected makeSound(): void {
        console.log("Animal sound");
    }
}
export class Dog2 extends Animal2 {
    public bark(): void {
        this.makeSound();
        console.log("Woof! Woof!");
    }
}
export class Cat2 extends Animal2 {
    public meow(): void {
        this.makeSound();
        console.log("Meow! Meow!");
    }
}