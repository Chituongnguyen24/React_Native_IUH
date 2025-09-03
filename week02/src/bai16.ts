import { simulateTask } from "./bai5.js";

export async function bai16(): Promise<void> {
  console.log(">>> Bài 16 - Parallel start");

  const results = await Promise.all([
    simulateTask(1000),
    simulateTask(1500),
    simulateTask(500),
  ]);

  console.log("Parallel results:", results);

  console.log(">>> Bài 16 - Parallel end");
}
