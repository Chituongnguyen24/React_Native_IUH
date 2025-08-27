export abstract class Shape{
    abstract getArea(): number;
}
export class Square extends Shape {
    private side: number;

    constructor(side: number) {
        super();
        this.side = side;
    }

    getArea(): number {
        console.log(`Area of square with side ${this.side} is:`);
        return this.side * this.side;
    }
}
export class Circle extends Shape {
    private radius: number;

    constructor(radius: number) {
        super();
        this.radius = radius;
    }

    getArea(): number {
        console.log(`Area of circle with radius ${this.radius} is:`);
        return Math.PI * this.radius * this.radius;
    }
}