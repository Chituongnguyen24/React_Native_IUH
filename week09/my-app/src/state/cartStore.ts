// src/state/cartStore.ts
// Simple in-memory pub/sub store for cart count

let count = 0;
const listeners: Array<(n: number) => void> = [];

export function subscribe(fn: (n: number) => void) {
  listeners.push(fn);
  return () => unsubscribe(fn);
}

export function unsubscribe(fn: (n: number) => void) {
  const idx = listeners.indexOf(fn);
  if (idx >= 0) listeners.splice(idx, 1);
}

export function setCartCount(n: number) {
  count = n;
  listeners.forEach(l => {
    try { l(count); } catch (e) { /* ignore */ }
  });
}

export function getCartCount() {
  return count;
}
