export  class Car {
    private brand:string;
    private model:string;
    private year:number;
    constructor(brand:string,model:string,year:number){
        this.brand=brand;
        this.model=model;
        this.year=year;
    }
    display():void{
        console.log(`This is ${this.brand} model: ${this.model} ${this.year}`)
    }
}