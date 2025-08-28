// Bài 3: Promise reject "Something went wrong" sau 1s
export const bai3 = () => {
  return new Promise((_, reject) => {
    setTimeout(() => reject("Something went wrong"), 1000);
  });
};
