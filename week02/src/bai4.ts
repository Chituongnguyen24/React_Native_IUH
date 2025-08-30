// Bài 4: Use .then() and .catch() to handle a Promise that returns a random number

export async function bai4(): Promise<number> {
  return new Promise((resolve, reject) => {
    const num = Math.floor(Math.random() * 10);

    if (num >= 3) {
      resolve(num);
    } else {
      reject("Số quá nhỏ: " + num);
    }
  });
}
