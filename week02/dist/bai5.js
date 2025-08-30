export function simulateTask(time) {
    return new Promise((resolve, reject) => {
        if (time < 0) {
            reject(new Error("Invalid time value"));
        }
        else {
            setTimeout(() => {
                resolve("Task done");
            }, time);
        }
    });
}
export function bai5(time) {
    return simulateTask(time);
}
//# sourceMappingURL=bai5.js.map