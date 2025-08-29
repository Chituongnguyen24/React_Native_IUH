export async function bai4() {
    return new Promise((resolve, reject) => {
        const num = Math.floor(Math.random() * 10);
        if (num >= 3) {
            resolve(num);
        }
        else {
            reject("Số quá nhỏ: " + num);
        }
    });
}
//# sourceMappingURL=bai4.js.map