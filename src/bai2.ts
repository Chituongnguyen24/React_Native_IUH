import { Person } from "./bai1.js";

export class Student extends Person {
    grade: string;

    constructor(name: string, age: number, grade: string) {
        super(name, age);
        this.grade = grade;
    }

    display(): void {
        super.display();
        console.log(`Grade: ${this.grade}`);
    }
}

const student = new Student("Chí Tường", 21, "A");
student.display();
