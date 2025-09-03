export default class bai30 {
    static async callApi(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
    static async run() {
        console.log("Bài 30 - Bắt đầu gọi nhiều API...");
        const urls = [
            "https://jsonplaceholder.typicode.com/todos/1",
            "https://jsonplaceholder.typicode.com/todos/2",
            "https://jsonplaceholder.typicode.com/invalid-url", //故意 cho fail
            "https://jsonplaceholder.typicode.com/todos/4",
        ];
        const results = await Promise.allSettled(urls.map((url) => this.callApi(url)));
        results.forEach((result, index) => {
            if (result.status === "fulfilled") {
                console.log(`Bài 30 - API ${index + 1} thành công:`, result.value);
            }
            else {
                console.error(`Bài 30 - API ${index + 1} thất bại:`, result.reason);
            }
        });
    }
}
//# sourceMappingURL=bai30.js.map