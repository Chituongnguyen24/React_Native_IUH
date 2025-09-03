import { simulateTask } from "./bai5.js";
export async function bai15() {
    console.log(">>> Bài 15 - Sequential start");
    const r1 = await simulateTask(1000);
    console.log("Task 1:", r1);
    const r2 = await simulateTask(1500);
    console.log("Task 2:", r2);
    const r3 = await simulateTask(500);
    console.log("Task 3:", r3);
    console.log(">>> Bài 15 - Sequential end");
}
//# sourceMappingURL=bai15.js.map