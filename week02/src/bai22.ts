// Định nghĩa kiểu Todo
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default async function bai22(): Promise<void> {
  try {
    const response1 = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const todo1: Todo = await response1.json();

    const response2 = await fetch("https://jsonplaceholder.typicode.com/todos/2");
    const todo2: Todo = await response2.json();

    const response3 = await fetch("https://jsonplaceholder.typicode.com/todos/3");
    const todo3: Todo = await response3.json();

    console.log(">>> Bài 22 - Todo 1:", todo1);
    console.log(">>> Bài 22 - Todo 2:", todo2);
    console.log(">>> Bài 22 - Todo 3:", todo3);
  } catch (error) {
    console.error(">>> Bài 22 - Error:", (error as Error).message);
  }
}
