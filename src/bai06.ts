export class Book{
    private title:string;
    private author:string;
    private year:number;
    constructor(title:string, author:string, year:number){
        this.title = title;
        this.author = author;
        this.year = year;
    }
    display():void{
        console.log(`Title: ${this.title}, Author: ${this.author}, Year: ${this.year}`);
    }
}