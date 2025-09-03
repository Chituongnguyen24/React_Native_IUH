export async function fetchUser(id) {
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
//# sourceMappingURL=bai18.js.map