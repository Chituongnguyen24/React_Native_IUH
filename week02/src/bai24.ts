export default class bai24 {
  static async postData(): Promise<any> {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Hello world",
          body: "This is a test post",
          userId: 1,
        }),
      });

      const data = await response.json();
      console.log(">>> Bài 24 - Response:", data);
      return data;
    } catch (error) {
      console.error(">>> Bài 24 - Error:", (error as Error).message);
      return null;
    }
  }
}
