export class Employee{
    private name: string;
    private position: string;
    private salary: number;

    constructor(name: string, position: string, salary: number) {
        this.name = name;
        this.position = position;
        this.salary = salary;
    }

    public getDetails(): string {
        return `Name: ${this.name}, Position: ${this.position}, Salary: ${this.salary}`;
    }
}
export class Manager extends Employee {
    private department: string;

    constructor(name: string, position: string, salary: number, department: string) {
        super(name, position, salary);
        this.department = department;
    }

    public getDetails(): string {
        return `${super.getDetails()}, Department: ${this.department}`;
    }
}
export class Developer extends Employee {
    private programmingLanguage: string;

    constructor(name: string, position: string, salary: number, programmingLanguage: string) {
        super(name, position, salary);
        this.programmingLanguage = programmingLanguage;
    }

    public getDetails(): string {
        return `${super.getDetails()}, Programming Language: ${this.programmingLanguage}`;
    }
}