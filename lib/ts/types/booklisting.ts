export type TError = {
  fieldName: string;
  reason: string;
  part: string;
  severity: "Red" | "Yellow";
  violation: string;
};
