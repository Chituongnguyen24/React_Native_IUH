import { fetchUser } from "./bai18.js";
export async function fetchUsers(ids) {
    const users = await Promise.all(ids.map((id) => fetchUser(id)));
    return users;
}
//# sourceMappingURL=bai19.js.map