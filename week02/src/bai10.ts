export function bai10(success: boolean): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (success) resolve("Promise resolved successfully!");
      else reject(new Error("Promise rejected!"));
    }, 1000);
  })
    .then((result): string => {
      console.log("Result:", result);
      return result;
    })
    .catch((err): string => {
      console.error("Error:", (err instanceof Error) ? err.message : String(err));
      return "Handled error"; // đảm bảo Promise<string>
    })
    .finally(() => {
      console.log("Done");
    });
}
