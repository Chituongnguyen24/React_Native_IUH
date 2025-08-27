export class MathUtil{
   public static add(a: number, b: number): number {
       return a + b;
   }

   public static subtract(a: number, b: number): number {
       return a - b;
   }

   public static multiply(a: number, b: number): number {
       return a * b;
   }

   public static divide(a: number, b: number): number {
       if (b === 0) {
           throw new Error("Division by zero is not allowed.");
       }
       return a / b;
   }
}