// Định nghĩa kiểu Todo
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export async function bai23(): Promise<Todo[]> {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos: Todo[] = await response.json();

    // Lọc những todo đã hoàn thành
    const completedTodos = todos.filter((todo) => todo.completed);

    console.log(">>> Bài 23 - Completed Todos:", completedTodos);
    return completedTodos;
  } catch (error) {
    console.error(">>> Bài 23 - Error:", (error as Error).message);
    return [];
  }
}
