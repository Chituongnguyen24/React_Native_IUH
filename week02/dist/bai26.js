export default class bai26 {
    static async waitFiveSeconds() {
        console.log("Bài 26 - Bắt đầu chờ 5 giây...");
        await new Promise((resolve) => setTimeout(() => {
            console.log("Bài 26 - Đã chờ xong 5 giây!");
            resolve();
        }, 5000));
    }
}
//# sourceMappingURL=bai26.js.map