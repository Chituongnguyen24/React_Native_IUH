export class Person {
  private name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  display() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}