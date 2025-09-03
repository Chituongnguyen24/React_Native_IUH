type User = {
  id: number;
  name: string;
  email: string;
};

export async function fetchUser(id: number): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: `User ${id}`,
        email: `user${id}@example.com`,
      });
    }, 1000);
  });
}
