export class Rectangle {
    private width:number;
    private height:number;
    constructor(h:number,w:number){
        this.height=h;
        this.width=w;
    }
    Calculate():[number,number]{
        const s=this.height*this.width;
        const p=2*(this.height+this.width);
        console.log("Rectangle's Area is: "+s +" and Perimeter is "+p);
        return [s,p]
    }
}