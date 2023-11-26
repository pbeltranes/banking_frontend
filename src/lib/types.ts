export type Currency = "MXN" | "CLP";

export interface Validation {
  regex: RegExp[];
  message: string;
}
export interface Validations {
  [key: string]: Validation;
}
