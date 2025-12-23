import { z } from "zod";

/**
 * Product Form Schema - Base schema for all product types
 * Used for PMS, AIF, SIF, MF, GIFT
 */
export const ProductBaseSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  category: z
    .enum(["PMS", "AIF", "SIF", "MF", "GIFT"])
    .refine((val) => val, "Please select a valid product category"),
  minimumInvestment: z
    .number()
    .min(1000, "Minimum investment must be at least ₹1,000")
    .max(10000000, "Minimum investment cannot exceed ₹10,000,000"),
  status: z
    .enum(["active", "inactive", "draft"])
    .refine((val) => val, "Please select a valid status")
    .optional(),
});

export type ProductFormData = z.infer<typeof ProductBaseSchema>;

/**
 * Transaction Form Schema
 * Used for investment purchases, redemptions, etc.
 */
export const TransactionSchema = z.object({
  productId: z.string().min(1, "Product selection is required"),
  transactionType: z
    .enum(["purchase", "redemption", "sip"])
    .refine((val) => val, "Please select a transaction type"),
  amount: z
    .number()
    .min(1000, "Amount must be at least ₹1,000")
    .max(10000000, "Amount cannot exceed ₹10,000,000"),
  quantity: z
    .number()
    .min(1, "Quantity must be at least 1")
    .optional(),
  narration: z
    .string()
    .max(500, "Narration must be less than 500 characters")
    .optional(),
  transactionDate: z.date().refine(
    (date) => date <= new Date(),
    "Transaction date cannot be in the future"
  ),
});

export type TransactionFormData = z.infer<typeof TransactionSchema>;

/**
 * Portfolio Rebalancing Schema
 */
export const PortfolioRebalanceSchema = z.object({
  portfolioId: z.string().min(1, "Portfolio selection is required"),
  rebalancingType: z
    .enum(["percentage", "absolute"])
    .refine((val) => val, "Please select a rebalancing type"),
  allocation: z
    .array(
      z.object({
        productId: z.string().min(1, "Product is required"),
        percentage: z
          .number()
          .min(0, "Percentage cannot be negative")
          .max(100, "Percentage cannot exceed 100"),
      })
    )
    .min(1, "At least one allocation is required"),
  reason: z
    .string()
    .max(500, "Reason must be less than 500 characters")
    .optional(),
});

export type PortfolioRebalanceFormData = z.infer<
  typeof PortfolioRebalanceSchema
>;

/**
 * User Profile Update Schema
 */
export const UserProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .optional(),
  address: z
    .string()
    .max(200, "Address must be less than 200 characters")
    .optional(),
  dateOfBirth: z
    .date()
    .refine(
      (date) => {
        const age = new Date().getFullYear() - date.getFullYear();
        return age >= 18;
      },
      "You must be at least 18 years old"
    )
    .optional(),
  panNumber: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Please enter a valid PAN number")
    .optional(),
});

export type UserProfileFormData = z.infer<typeof UserProfileSchema>;
