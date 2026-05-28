import { randomBytes } from "crypto"

/**
 * Generate a single unique code for a book purchase.
 * Format: DKLND-XXXX-XXXX-XXXX (16 chars after prefix)
 */
export function generateCode(): string {
  const bytes = randomBytes(9)
  const raw = Buffer.from(bytes).toString("base64url").toUpperCase().replace(/[^A-Z0-9]/g, "")
  const segments = raw.slice(0, 12).match(/.{4}/g) || []
  return `DKLND-${segments.join("-")}`
}

/**
 * Batch generate N unique codes for a book.
 */
export function generateCodes(count: number): string[] {
  const codes = new Set<string>()
  while (codes.size < count) {
    codes.add(generateCode())
  }
  return Array.from(codes)
}

/**
 * Validate code format (doesn't check DB)
 */
export function isValidCodeFormat(code: string): boolean {
  return /^DKLND-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(code)
}