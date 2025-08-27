export class BankAccount{
    private balance:number;
    constructor(balance:number){
        this.balance=balance;
    }
    deposit(amount:number):number{
        this.balance += amount;
        console.log("Deposited: " + amount + ", New balance: " + this.balance);
        return this.balance;
    }
    withdraw(amount:number):number{
        this.balance -= amount;
        console.log("Withdrew: " + amount + ", New balance: " + this.balance);
        return this.balance;
    }
    getBalance():number{
        console.log("Current balance is: " + this.balance);
        return this.balance;
    }
}