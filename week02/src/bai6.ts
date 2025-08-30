import { simulateTask } from "./bai5.js";
export function bai6(): Promise<string[]> {
  const tasks = [
    simulateTask(1000),
    simulateTask(2000),
    simulateTask(3000),
  ];
  return Promise.all(tasks);
}