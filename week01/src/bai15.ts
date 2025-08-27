import { Book } from "./bai06.js";
import { User } from "./bai07.js";

export class Library {
    private books: Book[];
    private users: User[];

    constructor() {
        this.books = [];
        this.users = [];
    }

    public addBook(book: Book): void {
        this.books.push(book);
    }

    public addUser(user: User): void {
        this.users.push(user);
    }

    public displayBooks(): void {
        console.log("Library Books:");
        this.books.forEach(book => book.display());
    }

    public displayUsers(): void {
        console.log("Library Users:");
        this.users.forEach(user => console.log(user.getName()));
    }
}
