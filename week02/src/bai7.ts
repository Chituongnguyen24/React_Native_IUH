import { simulateTask } from "./bai5.js";

export function bai7(): Promise<string> {
  const tasks = [
    simulateTask(1000),
    simulateTask(2000),
    simulateTask(1500),
  ];

  return Promise.race(tasks);
}
