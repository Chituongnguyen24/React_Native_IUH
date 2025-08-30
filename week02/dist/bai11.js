// Hàm trả về Promise
function sayHelloAsync() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Hello Async");
        }, 2000);
    });
}
export function bai1() {
    return sayHelloAsync().then((message) => {
        console.log(message);
        return message;
    });
}
//# sourceMappingURL=bai11.js.map