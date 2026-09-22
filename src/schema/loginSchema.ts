import * as z from "zod";

export const loginSchema = z
  .object({
    email: z
      .string()
      .email("Please enter a valid email")
      .nonempty("email is required"),

    password: z
      .string()
      .nonempty("password is required")
  })
