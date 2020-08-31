export function mask(value, len, char = '*') {
  return String(value).replace(/./g, (c, i) => (i < len ? char : c));
}
