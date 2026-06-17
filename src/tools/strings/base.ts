import { Buffer } from "node:buffer"

const NUMBER_REGEX = /\d/
const SPECIAL_CHAR_REGEX = /[!?@#$&^*_\-=+]/
const LOWERCASE_CHAR_REGEX = /[a-z]/
const UPPERCASE_CHAR_REGEX = /[A-Z]/

function truncateString(str: string, maxBytes = 2048): string {
  const buf = Buffer.from(str, "utf8")

  if (buf.length <= maxBytes) {
    return str
  }

  let end = maxBytes

  while (end > 0) {
    const prev = buf[end - 1]
    if (prev === undefined) {
      break
    }
    // eslint-disable-next-line unicorn/number-literal-case
    if ((prev & 0xc0) !== 0x80) {
      break
    }
    end -= 1
  }

  const value = buf.subarray(0, end).toString("utf8")
  const extra = `[truncated - bytes total: ${buf.length}; bytes allowed: ${maxBytes}]`

  return `${value}...${extra}`
}

export function strings(str: string) {
  return {
    lowercase() {
      return str.toLowerCase()
    },
    uppercase() {
      return str.toUpperCase()
    },
    capitalize() {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    hasNumber: () => {
      return NUMBER_REGEX.test(str)
    },
    hasSpecialChar: () => {
      return SPECIAL_CHAR_REGEX.test(str)
    },
    hasLowercaseChar: () => {
      return LOWERCASE_CHAR_REGEX.test(str)
    },
    hasUppercaseChar: () => {
      return UPPERCASE_CHAR_REGEX.test(str)
    },
    truncate: (maxBytes: number) => {
      return truncateString(str, maxBytes)
    },
  }
}
