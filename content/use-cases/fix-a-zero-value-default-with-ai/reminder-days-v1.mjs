// Aiplorer code practice v1: deliberately buggy.
// Contract: non-negative integer, null or undefined.
// Preserve integers, including zero; default only missing values to seven.
export function reminderDays(value) {
  return value || 7;
}
