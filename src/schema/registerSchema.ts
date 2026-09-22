import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be less than 20 characters")
      .regex(/^[A-Za-z ]+$/, "Name can contain letters only"),

    username: z
      .string()
      .nonempty("username is required")
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be less than 20 characters")
      .regex(
        /^[A-Za-z0-9_]+$/,
        "Username can contain letters, numbers and _ only",
      ),

    email: z
      .string()
      .email("Please enter a valid email")
      .nonempty("email is required"),

    dateOfBirth: z
      .string()
      .nonempty("date of birth is required")
      .refine(function (valdate) {
        let currentYear = new Date().getFullYear();
        let year = new Date(valdate).getFullYear();
        let age = currentYear - year;

        return age >= 16;
      }, "You must be at least 16 years old"),

    gender: z.enum(["male", "female"], "Please select your gender"),

    password: z
      .string()
      .nonempty("password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[a-z]/, "Password must contain a lowercase letter")
      .regex(/[0-9]/, "Password must contain a number"),

    rePassword: z.string().nonempty("please confirm your password"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });
