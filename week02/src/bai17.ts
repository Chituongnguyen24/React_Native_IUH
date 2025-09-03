import { simulateTask } from "./bai5.js";

export async function bai17(): Promise<void> {
  console.log(">>> Bài 17 - for await...of start");

  const tasks = [
    simulateTask(1000),
    simulateTask(2000),
    simulateTask(1500),
  ];

  for await (const result of tasks) {
    console.log("Task finished:", result);
  }

  console.log(">>> Bài 17 - for await...of end");
}
