export default class bai27 {
  static async fetchWithRetry(url: string, retries: number): Promise<any> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`Bài 27 - Attempt ${attempt} gọi API: ${url}`);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Bài 27 - Thành công:", data);
        return data;
      } catch (error) {
        console.error(`Bài 27 - Lỗi lần ${attempt}:`, (error as Error).message);

        if (attempt === retries) {
          console.error("Bài 27 - Hết số lần thử, thất bại!");
          throw error;
        }

        console.log("Bài 27 - Thử lại...");
      }
    }
  }
}
