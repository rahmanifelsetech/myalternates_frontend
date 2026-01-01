import { z } from "zod";

/**
 * Auth Form Data Types
 * Kept here since they're needed for Zod schema typing
 */
export interface SignInFormData {
  username: string;
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignUpStep1Data {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  countryCode: string;
  phone: string;
}

export interface SignUpStep2Data {
  username: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export interface ResetPasswordFormData {
  email: string;
}

export interface SetNewPasswordFormData {
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

/**
 * Sign In Form Schema
 * Validates username, email, password, and rememberMe option
 */
export const SignInSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
}) as z.ZodType<SignInFormData>;

/**
 * Sign Up Step 1 Schema
 * Validates firstName, lastName, email, role, phone, and country code
 */
export const SignUpStep1Schema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  role: z
    .string()
    .min(1, "Role is required")
    .refine(
      (val) => ["investor", "distributor"].includes(val),
      "Role must be either Investor or Distributor"
    ),
  countryCode: z
    .string()
    .min(1, "Country code is required")
    .regex(/^\d{1,3}$/, "Invalid country code format"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .min(7, "Phone number must be at least 7 digits")
    .max(15, "Phone number must be less than 15 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
}) as z.ZodType<SignUpStep1Data>;

/**
 * Sign Up Step 2 Schema
 * Validates username, password, and password confirmation
 */
export const SignUpStep2Schema = z.object({
    username: z
      .string()
      .min(1, "Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be less than 30 characters")
      .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscore, and hyphen"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain uppercase, lowercase, and number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    terms: z.boolean()
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
    }
  }) as z.ZodType<SignUpStep2Data>;

/**
 * Reset Password Form Schema
 * Validates email for password reset
 */
export const ResetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
}) as z.ZodType<ResetPasswordFormData>;

/**
 * Set New Password Schema
 * Validates new password and confirmation
 */
export const SetNewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain uppercase, lowercase, and number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }) as z.ZodType<SetNewPasswordFormData>;

/**
 * Change Password Schema
 * Validates old password, new password and confirmation
 */
export const ChangePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z
      .string()
      .min(1, "New password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain uppercase, lowercase, and number"
      ),
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  }) as z.ZodType<ChangePasswordFormData>;

export const IdentifierSchema = z.object({
  identifier: z.string().refine(
    (value) => {
      const isEmail = z.string().email().safeParse(value).success;
      const isPhone = /^\d{10}$/.test(value);
      const isPan = /^[A-Z]{5}\d{4}[A-Z]{1}$/.test(value);
      return isEmail || isPhone || isPan;
    },
    {
      message: 'Invalid PAN, Email or Phone',
    }
  ),
});

export const OtpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

export const SignInWithPasswordSchema = z.object({
  identifier: z.string().refine(
    (value) => {
      const isEmail = z.string().email().safeParse(value).success;
      const isPhone = /^\d{10}$/.test(value);
      const isPan = /^[A-Z]{5}\d{4}[A-Z]{1}$/.test(value);
      return isEmail || isPhone || isPan;
    },
    {
      message: 'Invalid PAN, Email or Phone',
    }
  ),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
