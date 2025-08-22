import { Person } from "./bai01.js";
import { Student } from "./bai02.js";
import { Car } from "./bai03.js";
import { Rectangle } from "./bai04.js";
import { BankAccount } from "./bai05.js";
import { Book } from "./bai06.js";
import { User } from './bai07.js';
import { Product } from "./bai08.js";
import { Chicken, Cow } from "./bai09.js";
import { Account } from "./bai10.js";
import { Cat, Dog } from "./bai11.js";
import { Bird, Fish } from "./bai12.js";
import { Circle, Square } from "./bai13.js";
import { Developer, Employee, Manager } from "./bai14.js";
import { Library } from "./bai15.js";
import { Box } from "./bai16.js";
import { Logger } from "./bai17.js";
import { MathUtil } from "./bai18.js";



function sayHello(name: string): void {
  console.log(`Hello, ${name}! `);
}

sayHello("ChiTuong");

// Bai1
console.log("Bai1: Class Person");
const person = new Person("ChiTuong", 21);
person.display();

//Bai2
console.log("Bai2: Class Student extends Person");

const student = new Student("Chí Tường", 21, "A");
student.display();

//Bai3
console.log("Bài 3");
const car=new Car("McLaren","W1",2025)
car.display();

//Bai4
console.log("Bai4")
const rec=new Rectangle(40,25);
rec.Calculate();

//Bai5
console.log("Bai5");
const Acc=new BankAccount(1000);
Acc.deposit(500);
Acc.withdraw(200);
Acc.getBalance();
//Bai6
console.log("Bai6");
const book1=new Book("Harry Potter","J.K. Rowling",1997);
book1.display();
//Bai7
console.log("Bai7");
const user=new User("ChiTuong");
console.log(user.getName());
user.setName("LamChiTuong")
console.log(user.getName());

//Bai8
const products: Product[] = [
  new Product("Laptop", 1500),
  new Product("Smartphone", 800),
  new Product("Tablet", 600),
  new Product("Smartwatch", 90),
  new Product("Headphones", 99),
  new Product("PS5",200),
  new Product("Xbox", 20),
  new Product("Nintendo Switch", 30),
  new Product("Gaming PC", 2500),
];
console.log("Bai8: Product List");
const expensiveProducts = products.filter(product => product.getPrice() > 100);
console.log("Expensive Products:");
expensiveProducts.forEach(product => product.displayInfo());

//Bai9
console.log("Bai9: Animal Interface");
const cow = new Cow("Bessie");
cow.makeSound();
const chicken = new Chicken("Clucky");
chicken.makeSound();

//Bai10
console.log("Bai10: Bank Account");
const account = new Account("123456", 1000, "John Doe");
account.deposit(500);
account.withdraw(200);
console.log(`Account Balance: ${account.getBalance()}`);

//Bai11
console.log("Bai11: Inheritance");
const dog = new Dog("Buddy");
const cat = new Cat("Whiskers");
dog.bark();
cat.meow();

//bai12
console.log("Bai12: Abstract Class");
const bird = new Bird();
bird.fly();
const fish = new Fish();
fish.swim();
//bai13
console.log("Bai13: Abstract Class Shape");
const square = new Square(5);
console.log(square.getArea());

const circle = new Circle(3);
console.log(circle.getArea());

//bai14
console.log("Bai14: Employee Management Developer extends class");
const employee=new Employee("John Doe", "Secretary", 75000);
console.log(employee.getDetails());

const manager = new Manager("Jane Smith", "Project Manager", 90000, "IT");
console.log(manager.getDetails());

const developer = new Developer("Alice Johnson", "Frontend Developer", 80000, "JavaScript");
console.log(developer.getDetails());

//bai15
console.log("Bai15: Library Management System");
const library = new Library();
library.addBook(book1);
library.addUser(user);
library.displayBooks();
library.displayUsers();
//bai16
console.log("Bai16: Generic Class");
const numberBox = new Box<number>(123);
console.log(numberBox.getValue());
const stringBox = new Box<string>("Hello");
console.log(stringBox.getValue());

//bai17
console.log("Bai17: Logger");
const logger = Logger.getInstance();
logger.log("This is a log message.");

//bai18
console.log("Bai18: Math Utility Class");
console.log(MathUtil.add(5, 3));
console.log(MathUtil.subtract(5, 3));
console.log(MathUtil.multiply(5, 3));
console.log(MathUtil.divide(5, 3));