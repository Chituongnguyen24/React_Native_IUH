export async function bai23() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        const todos = await response.json();
        // Lọc những todo đã hoàn thành
        const completedTodos = todos.filter((todo) => todo.completed);
        console.log(">>> Bài 23 - Completed Todos:", completedTodos);
        return completedTodos;
    }
    catch (error) {
        console.error(">>> Bài 23 - Error:", error.message);
        return [];
    }
}
//# sourceMappingURL=bai23.js.map