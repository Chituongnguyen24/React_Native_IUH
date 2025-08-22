import { Person } from "./bai01.js";

export class Teacher extends Person{
    private subject: string;

    constructor(name: string, age: number, subject: string) {
        super(name, age);
        this.subject = subject;
    }

    public teach(): void {
        console.log(`${this.getName()} is teaching ${this.subject}.`);
    }
}