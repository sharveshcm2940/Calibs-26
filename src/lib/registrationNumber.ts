import crypto from "crypto";

/**
 * Generates a human-friendly, uppercase alphanumeric registration number
 * Format: CAL-26-XXXXXX (e.g., CAL-26-TN7R92)
 * Avoids ambiguous characters like 0/O and 1/I for clarity.
 */
const CHARSET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

export function generateRegistrationNumber(): string {
  const bytes = crypto.randomBytes(6);
  let code = "";
  for (let i = 0; i < 6; i++) {
    const index = bytes[i] % CHARSET.length;
    code += CHARSET[index];
  }
  return `CAL-26-${code}`;
}
