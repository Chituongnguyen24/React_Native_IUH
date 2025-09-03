export default class bai26 {
  static async waitFiveSeconds(): Promise<void> {
    console.log("Bài 26 - Bắt đầu chờ 5 giây...");

    await new Promise<void>((resolve) =>
      setTimeout(() => {
        console.log("Bài 26 - Đã chờ xong 5 giây!");
        resolve();
      }, 5000)
    );
  }
}
