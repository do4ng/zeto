export function isJSON(v: any, includeArray: boolean = false): boolean {
  if (typeof v !== 'string') return false;
  try {
    const result = JSON.parse(v);
    const type = Object.prototype.toString.call(result);

    if (type === '[object Array]' && includeArray) {
      return true;
    }

    return type === '[object Object]';
  } catch (err) {
    return false;
  }
}
