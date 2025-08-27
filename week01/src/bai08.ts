export class Product{
    private name:string;
    private price:number;
    constructor(name:string,price:number){
        this.name=name;
        this.price=price;
    }
    public getName():string{
        return this.name;
    }
    public getPrice():number{
        return this.price;
    }
    public setName(name:string):void{
        this.name=name;
    }
    public setPrice(price:number):void{
        this.price=price;
    }
    public displayInfo(): void {
        console.log(`Product Name: ${this.getName()}, Price: ${this.getPrice()}`);
    }

}