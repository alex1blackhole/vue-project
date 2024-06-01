export function isArray(value: any): boolean {
  return (
    Array.isArray(value) ||
    value instanceof ArrayBuffer ||
    value instanceof SharedArrayBuffer ||
    ArrayBuffer.isView(value)
  )
}

export function isObject(value: unknown): boolean {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function isString(value: unknown): boolean {
  return Object.prototype.toString.call(value) === '[object String]'
}

export function isNumber(value: unknown): boolean {
  console.log(Object.prototype.toString.call(value))
  return Object.prototype.toString.call(value) === '[object Number]'
}
