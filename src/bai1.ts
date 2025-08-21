class Person {
  constructor(private name: string, private age: number) {}

  public introduce(): void {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

const person = new Person("ChiTuong", 21);
person.introduce();
