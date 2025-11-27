export function save(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function load(key: string) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

export function remove(key: string) {
  localStorage.removeItem(key);
}
