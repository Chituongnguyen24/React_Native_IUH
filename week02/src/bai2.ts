// Bài 2: Promise trả về số 10 sau 1s
export const bai2 = () => {
  return new Promise<number>((resolve) => {
    setTimeout(() => resolve(10), 1000);
  });
};
