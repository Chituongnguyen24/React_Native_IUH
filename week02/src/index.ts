import { bai1 } from "./bai1.js";
import { bai2 } from "./bai2.js";
import { bai3 } from "./bai3.js";
import { bai4 } from "./bai4.js";

async function run() {
  console.log("Bài 1");
  console.log(await bai1());

  console.log("Bài 2");
  console.log(await bai2());

  console.log("Bài 3");
  try {
    await bai3();
  } catch (err) {
    console.error("Error:", err);
  }

  console.log("Bài 4");
  try {
    console.log(await bai4());
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
