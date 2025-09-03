export default class bai25 {
    static async downloadFile() {
        console.log("Bài 25 - Bắt đầu tải file...");
        await new Promise((resolve) => setTimeout(() => {
            console.log("Bài 25 - Tải file hoàn tất sau 3 giây!");
            resolve();
        }, 3000));
    }
}
//# sourceMappingURL=bai25.js.map