export class Account{
    public accountNumber:string;
    private balance:number;
    readonly ownerName:string;

    constructor(accountNumber:string, initialBalance:number, ownerName:string) {
        this.accountNumber=accountNumber;
        this.balance=initialBalance;
        this.ownerName=ownerName;
    }
    public deposit(amount:number):void {
        this.balance += amount;
        console.log(`Deposited: ${amount}, New balance: ${this.balance}`);
    }
    public withdraw(amount:number):void {
        if (amount > this.balance) {
            console.log("Insufficient funds");
        } else {
            this.balance -= amount;
            console.log(`Withdrew: ${amount}, New balance: ${this.balance}`);
        }
    }
    public getBalance():number {
        return this.balance;
    }
}