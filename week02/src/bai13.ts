import { simulateTask } from "./bai5.js";
export async function bai13() {
  try {
    const result = await simulateTask(2000); // đổi thành 500 sẽ lỗi
    console.log(result);
    return result;
  } catch (err) {
    console.error("Error:", (err as Error).message);
    return "Failed";
  }
}