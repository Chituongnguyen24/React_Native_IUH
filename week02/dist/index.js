import { bai1 } from "./bai1.js";
import { bai2 } from "./bai2.js";
import { bai3 } from "./bai3.js";
async function run() {
    console.log(">>> Bài 1");
    console.log(await bai1());
    console.log(">>> Bài 2");
    console.log(await bai2());
    console.log(">>> Bài 3");
    try {
        await bai3();
    }
    catch (err) {
        console.error("Error:", err);
    }
}
run();
//# sourceMappingURL=index.js.map