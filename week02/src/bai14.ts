export async function bai14(num:number): Promise<number> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(num*3);
        }, 1000);
    });
}