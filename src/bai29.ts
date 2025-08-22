export interface Movable {
    move(): void;
}
export class Car3 implements Movable {
    move(): void {
        console.log("Car is moving");
    }
}
export class Robot implements Movable {
    move(): void {
        console.log("Robot is moving");
    }
}