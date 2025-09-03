type User = {
  id: number;
  name: string;
  email: string;
};

export async function fetchUserWithTimeout(id: number): Promise<User> {
  return new Promise((resolve, reject) => {
    // Timer cho timeout 2 giây
    const timer = setTimeout(() => {
      reject(new Error("Timeout error"));
    }, 2000);

    const delay = Math.floor(Math.random() * 3000) + 500;

    setTimeout(() => {
      clearTimeout(timer); 
      resolve({
        id,
        name: `User ${id}`,
        email: `user${id}@example.com`,
      });
    }, delay);
  });
}
