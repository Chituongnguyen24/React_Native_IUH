import { fetchUser } from "./bai18.js";

export async function fetchUsers(ids: number[]) {
  const users = await Promise.all(ids.map((id) => fetchUser(id)));
  return users;
}
