
export const bai1 = () => {
  return new Promise<string>((resolve) => {
    setTimeout(() => resolve("Hello Async"), 2000);
  });
};
