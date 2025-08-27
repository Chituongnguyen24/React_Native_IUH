export class Payment{
    pay(amount:number):void{
        console.log(`Paid: ${amount}`);
    }
}
export class CashPayment extends Payment {
    pay(amount: number): void {
        console.log(`Cash payment of: ${amount}`);
    }
}
export class CardPayment extends Payment {
    pay(amount: number): void {
        console.log(`Card payment of: ${amount}`);
    }
}