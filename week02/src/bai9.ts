export function bai9(numbers: number[]): Promise<number[]> {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(numbers)) {
      reject(new Error("Input must be an array"));
      return;
    }

    setTimeout(() => {
      const evens = numbers.filter((num) => num % 2 === 0);
      resolve(evens);
    }, 1000);
  });
}
