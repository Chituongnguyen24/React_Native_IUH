import { simulateTask } from "./bai5.js";
export async function bai13() {
    try {
        const result = await simulateTask(2000); // đổi thành 500 sẽ lỗi
        console.log(result);
        return result;
    }
    catch (err) {
        console.error("Error:", err.message);
        return "Failed";
    }
}
//# sourceMappingURL=bai13.js.map