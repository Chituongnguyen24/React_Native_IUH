import { bai1 } from "./bai1.js";
import { bai10 } from "./bai10.js";
import { bai1 as bai11 } from "./bai11.js";
import { bai12 } from "./bai12.js";
import { bai13 } from "./bai13.js";
import { bai14 } from "./bai14.js";
import { bai15 } from "./bai15.js";
import { bai16 } from "./bai16.js";
import { bai17 } from "./bai17.js";
import { fetchUser } from "./bai18.js";
import { fetchUsers } from "./bai19.js";
import { bai2 } from "./bai2.js";
import { fetchUserWithTimeout } from "./bai20.js";
import { bai21 } from "./bai21.js";
import bai22 from "./bai22.js";
import { bai23 } from "./bai23.js";
import bai24 from "./bai24.js";
import bai25 from "./bai25.js";
import bai27 from "./bai27.js";
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
  } catch (err) {
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
  } catch (err) {
    console.error("Bài 6 - Error:", err);
  }

  try {
    const result7 = await bai7();
    console.log("Bài 7 - Fastest result:", result7);
  } catch (err) {
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
bai15()
    .then(() => {
      console.log("Bài 15 - Completed");
    })
    .catch((err) => {
      console.error("Bài 15 - Error:", err.message);
    });

    bai16()
      .then(() => {
        console.log("Bài 16 - Completed");
      })
      .catch((err) => {
        console.error("Bài 16 - Error:", err.message);
      });
bai17()
  .then(() => {
    console.log("Bài 17 - Completed");
  })
  .catch((err) => {
    console.error("Bài 17 - Error:", err.message);
  });

// Bài 18
fetchUser(1)
  .then((user) => {
    console.log(">>> Bài 18 - User fetched:", user);
  })
  .catch((err) => {
    console.error(">>> Bài 18 - Error:", err.message);
  });


// Bài 19
fetchUsers([1, 2, 3])
  .then((users) => {
    console.log(">>> Bài 19 - Users fetched:", users);
  })
  .catch((err) => {
    console.error(">>> Bài 19 - Error:", err.message);
  });
// Bài 20
fetchUserWithTimeout(1)
  .then((user) => {
    console.log(">>> Bài 20 - User fetched:", user);
  })
  .catch((err) => {
    console.error(">>> Bài 20 - Error:", err.message);
  });

bai21()
  .then((result) => {
    console.log("Bài 21 - Result:", result);
  })
  .catch((err) => {
    console.error("Bài 21 - Error:", err.message);
  });
bai22();
bai23();
bai24.postData();
bai25.downloadFile();
bai27.fetchWithRetry("https://jsonplaceholder.typicode.com/posts/1", 3);
}

run();
