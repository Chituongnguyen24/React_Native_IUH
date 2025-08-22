export class Box<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  public getValue(): T {
    return this.value;
  }

  public setValue(newValue: T): void {
    this.value = newValue;
  }
}