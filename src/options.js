import { apiKey } from "./env";

export const catOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": apiKey,
  },
};
