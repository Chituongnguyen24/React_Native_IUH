export default class bai28 {
    // Mô phỏng một async task (mất 1-3 giây)
    static async simulateTask(id) {
        const time = Math.floor(Math.random() * 2000) + 1000; // 1000–3000ms
        return new Promise((resolve) => setTimeout(() => resolve(`Task ${id} completed in ${time} ms`), time));
    }
    static async batchProcess() {
        console.log("Bài 28 - Bắt đầu chạy 5 tasks song song...");
        const tasks = [
            this.simulateTask(1),
            this.simulateTask(2),
            this.simulateTask(3),
            this.simulateTask(4),
            this.simulateTask(5),
        ];
        const results = await Promise.all(tasks);
        console.log("Bài 28 - Kết quả:", results);
    }
}
//# sourceMappingURL=bai28.js.map