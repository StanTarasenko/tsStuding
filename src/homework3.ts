// Calculator

// Interface
interface ICalculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
    multiply(a: number, b: number): number;
    divide(a: number, b: number): number;
}

// Class
class Calculator implements ICalculator {
    add(a: number, b: number): number {
        return a + b;
    }

    subtract(a: number, b: number): number {
        return a - b;
    }

    multiply(a: number, b: number): number {
        return a * b;
    }

    divide(a: number, b: number): number {
        if (b === 0) {
            console.log("Infinity");
        }
        return a / b;
    }
}

function calculate(operation: "add" | "subtract" | "multiply" | "divide", a: number, b: number): number {
    switch (operation) {
        case "add":
            return a + b;
        case "subtract":
            return a - b;
        case "multiply":
            return a * b;
        case "divide":
            if (b === 0) {
                throw new Error("Infinity");
            }
            return a / b;
        default:
            throw new Error("Invalid operation");
    }
}

// Example
// console.log(calculate("add", 5, 3));

// Book-Service
// Interfaces
interface IBook {
    id: number;
    title: string;
    authorId: number;
    year: string;
}

interface IAuthor {
    id: number;
    name: string;
    birthDate: string;
    nationality: string;
}

interface IBookService {
    getBookById(id: number): IBook | undefined;
    getAuthorById(id: number): IAuthor | undefined;
    getAllBooks(): IBook[];
    getAllAuthors(): IAuthor[];
}

const books: IBook[] = [
  { id: 1, title: "English", authorId: 1, year: "1990"},
  { id: 2, title: "Math", authorId: 2, year: "1991"}
];
const authors: IAuthor[] = [
  { id: 1, name: "John T", birthDate: "1950", nationality: "US"},
  { id: 2, name: "Michele P", birthDate: "1970", nationality: "FR"},
];

const bookService = {
    getBookById(id: number): IBook | undefined {
        return books.find((item) => item.id === id);
    },

    getAuthorById(id: number): IAuthor | undefined {
        return authors.find((item) => item.id === id);
    },

    getAllBooks(): IBook[] {
        return books;
    },

    getAllAuthors(): IAuthor[] {
        return authors;
    }
}
