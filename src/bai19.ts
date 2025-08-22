export class Furniture {
  describe(): void {
    console.log("This is a piece of furniture.");
  }
}

// Lớp con Chair ghi đè phương thức
export class Chair extends Furniture {
  describe(): void {
    console.log("This is a Chair with 4 legs.");
  }
}

// Lớp con Table ghi đè phương thức
export class Table extends Furniture {
  describe(): void {
    console.log("This is a Table, usually used for dining or working.");
  }
}

// Lớp con Sofa ghi đè phương thức
export class Sofa extends Furniture {
  describe(): void {
    console.log("This is a Sofa, comfortable for sitting.");
  }
}

// Thể hiện đa hình
const furnitures: Furniture[] = [new Furniture(), new Chair(), new Table(), new Sofa()];

for (const f of furnitures) {
  f.describe(); // Gọi đúng phương thức của đối tượng thực tế
}
