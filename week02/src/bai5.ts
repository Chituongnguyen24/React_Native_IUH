export function simulateTask(time: number): Promise<string> {
  return new Promise((resolve, reject) => {
    if (time < 0) {
      reject(new Error("Invalid time value"));
    } else {
      setTimeout(() => {
        resolve("Task done");
      }, time);
    }
  });
}
export function bai5(time: number): Promise<string> {
  return simulateTask(time);
}