export default class bai29 {
    // Mô phỏng một async task (mất 1-3 giây)
    static async simulateTask(id) {
        const time = Math.floor(Math.random() * 2000) + 1000; // 1000–3000ms
        return new Promise((resolve) => setTimeout(() => {
            const msg = `Task ${id} completed in ${time} ms`;
            console.log(msg);
            resolve(msg);
        }, time));
    }
    static async queueProcess() {
        console.log("Bài 29 - Bắt đầu chạy tasks theo hàng đợi...");
        const tasks = [1, 2, 3, 4, 5];
        for (const id of tasks) {
            await this.simulateTask(id); // chạy lần lượt từng task
        }
        console.log("Bài 29 - Tất cả tasks đã hoàn thành theo hàng đợi.");
    }
}
//# sourceMappingURL=bai29.js.map