import { bai1 } from "./bai1.js";
import { bai10 } from "./bai10.js";
import { bai1 as bai11 } from "./bai11.js";
import { bai12 } from "./bai12.js";
import { bai13 } from "./bai13.js";
import { bai14 } from "./bai14.js";
import { bai2 } from "./bai2.js";
import { bai3 } from "./bai3.js";
import { bai4 } from "./bai4.js";
import { bai5 } from "./bai5.js";
import { bai6 } from "./bai6.js";
import { bai7 } from "./bai7.js";
import { bai8 } from "./bai8.js";
import { bai9 } from "./bai9.js";
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
    bai9([1, 2, 3, 4, 5, 6, 7, 8, 9])
        .then((evens) => {
        console.log("Bài 9 - Even numbers:", evens);
    })
        .catch((err) => {
        console.error("Bài 9 - Error:", err.message);
    });
    bai10(true)
        .then((result) => {
        console.log("Bài 10 - Result:", result);
    })
        .catch((err) => {
        console.error("Bài 10 - Error:", err.message);
    });
    bai11()
        .then((result) => {
        console.log("Bài 11 - Result:", result);
    })
        .catch((err) => {
        console.error("Bài 11 - Error:", err.message);
    });
    bai12()
        .then((result) => {
        console.log("Bài 12 - Result:", result);
    })
        .catch((err) => {
        console.error("Bài 12 - Error:", err.message);
    });
    bai13()
        .then((result) => {
        console.log("Bài 13 - Result:", result);
    })
        .catch((err) => {
        console.error("Bài 13 - Error:", err.message);
    });
    bai14(5)
        .then((result) => {
        console.log("Bài 14 - Result:", result);
    })
        .catch((err) => {
        console.error("Bài 14 - Error:", err.message);
    });
}
run();
//# sourceMappingURL=index.js.map