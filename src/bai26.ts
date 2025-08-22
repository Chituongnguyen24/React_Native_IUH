import { Product } from "./bai08.js";


export class Order{
    private products: Product[] = [];

    addProduct(product: Product): void {
        this.products.push(product);
    }
    calculateTotal(): number {
        return this.products.reduce((total, product) => total + product.getPrice(), 0);
    }
}