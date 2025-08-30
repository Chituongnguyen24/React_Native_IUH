export function bai8() {
    return Promise.resolve(2)
        .then((num) => {
        console.log("Square:", num * num);
        return num * num;
    })
        .then((num) => {
        console.log("Double:", num * 2);
        return num * 2;
    })
        .then((num) => {
        console.log("Add 5:", num + 5);
        return num + 5;
    });
}
//# sourceMappingURL=bai8.js.map