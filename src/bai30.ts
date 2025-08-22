import { Student } from "./bai02.js";
import { Teacher } from "./bai27.js";

export class School{
    teachers: Teacher[] = [];
    students: Student[] = [];

    addTeacher(teacher: Teacher): void {
        this.teachers.push(teacher);
    }

    addStudent(student: Student): void {
        this.students.push(student);
    }

    displayInfo(): void {
        console.log("Teachers:");
        this.teachers.forEach(teacher => teacher.display());

        console.log("Students:");
        this.students.forEach(student => student.display());
    }
}
