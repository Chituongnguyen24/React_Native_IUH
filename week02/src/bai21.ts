export async function bai21(): Promise<any> {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    return await response.json();
  }