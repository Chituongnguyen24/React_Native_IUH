import { bai1 } from "./bai1.js";
import { bai2 } from "./bai2.js";
import { bai3 } from "./bai3.js";
import { bai4 } from "./bai4.js";
import { bai5 } from "./bai5.js";
import { bai6 } from "./bai6.js";
import { bai7 } from "./bai7.js";
import { bai8 } from "./bai8.js";
async function run() {
    console.log("Bài 1");
    console.log(await bai1());
    console.log("Bài 2");
    console.log(await bai2());
    console.log("Bài 3");
    try {
        await bai3();
    }
    catch (err) {
        console.error("Error:", err);
    }
    bai4()
        .then((result) => {
        console.log("Bài 4 - Số ngẫu nhiên:", result);
    })
        .catch((err) => {
        console.error("Bài 4 - Lỗi: Số quá nhỏ:", err);
    });
    bai5(1000)
        .then((result) => {
        console.log("Bài 5 - Success:", result);
    })
        .catch((err) => {
        console.error("Bài 5 - Error:", err);
    });
    try {
        const results6 = await bai6();
        console.log("Bài 6 - Success:", results6);
    }
    catch (err) {
        console.error("Bài 6 - Error:", err);
    }
    try {
        const result7 = await bai7();
        console.log("Bài 7 - Fastest result:", result7);
    }
    catch (err) {
        console.error("Bài 7 - Error:", err);
    }
    bai8()
        .then((result) => {
        console.log("Bài 8 - Success:", result);
    })
        .catch((err) => {
        console.error("Bài 8 - Error:", err);
    });
}
run();
//# sourceMappingURL=index.js.map