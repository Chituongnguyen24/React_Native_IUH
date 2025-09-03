export async function fetchUserWithTimeout(id) {
    return new Promise((resolve, reject) => {
        // Timer cho timeout 2 giây
        const timer = setTimeout(() => {
            reject(new Error("Timeout error"));
        }, 2000);
        // Giả lập API call (1–3 giây)
        const delay = Math.floor(Math.random() * 3000) + 500;
        setTimeout(() => {
            clearTimeout(timer); // huỷ timeout nếu API trả về kịp
            resolve({
                id,
                name: `User ${id}`,
                email: `user${id}@example.com`,
            });
        }, delay);
    });
}
//# sourceMappingURL=bai20.js.map