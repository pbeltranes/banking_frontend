import { Validations } from "./types";

export const MAX_AMOUNT = 1000000000.0;

export const OUTCOME = "OUTCOME";
export const INCOME = "INCOME";

export const BACKEND_BASEPATH = process.env.BACKEND_BASEPATH || "http://localhost:4000";

export const Validation: Validations = {
    name: {
      regex: [/^[A-Za-z]{3,30}$/],
      message: "Name must be less than 30 characters and least 3 characters",
    },
    account_number: {
      regex: [/^\d{10,15}$/],
      message: "Account Number only allowed numbers, least 10 and max 15 digits",
    },
    initial_balance: {
      regex: [/^\d{0,20}$/],
      message: "Balance: Only numbers are allowed, max 10 digits",
    },
  };