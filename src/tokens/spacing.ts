export const spacing = {
  "4XS": "2px",
  "3XS": "4px",
  "2XS": "6px",
  XS: "8px",
  S: "12px",
  M: "16px",
  L: "20px",
  XL: "24px",
  "2XL": "32px",
  "3XL": "40px",
  "4XL": "48px",
  "5XL": "64px",
  "6XL": "128px",
  "7XL": "256px",
} as const;

export type SpacingToken = keyof typeof spacing;
