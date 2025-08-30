export function bai10(success) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success)
                resolve("Promise resolved successfully!");
            else
                reject(new Error("Promise rejected!"));
        }, 1000);
    })
        .then((result) => {
        console.log("Result:", result);
        return result;
    })
        .catch((err) => {
        console.error("Error:", (err instanceof Error) ? err.message : String(err));
        return "Handled error"; // đảm bảo Promise<string>
    })
        .finally(() => {
        console.log("Done");
    });
}
//# sourceMappingURL=bai10.js.map