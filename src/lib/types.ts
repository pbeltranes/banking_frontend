import { Dispatch } from "react";

export type Currency = "MXN" | "CLP";

export interface Validation {
  regex: RegExp[];
  message: string;
}
export interface Validations {
  [key: string]: Validation;
}

export interface Props {
  type: ToastType;
  description: string;
  setMessage: Dispatch<React.SetStateAction<string | null>>;
}

export type ToastType = "success" | "error" | "warning" | "info";
export type ToastColor = "green" | "red" | "yellow" | "blue";

export const COLORS = {
  success: "green",
  error: "red",
  warning: "yellow",
  info: "blue",
};