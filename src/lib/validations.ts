import { z } from "zod";

export const memberSchema = z.object({
  name: z.string().trim().min(2, "Member name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid member email address").optional().or(z.literal("")),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+ -]{7,15}$/, "Invalid phone format")
    .optional()
    .or(z.literal("")),
});

export const registrationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .email("Please provide a valid college or personal email"),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, "Please provide a valid 10-digit mobile number"),
  department: z
    .string()
    .trim()
    .min(2, "Department name required")
    .max(100),
  year: z.literal("1st Year", {
    errorMap: () => ({ message: "Registration is strictly restricted to First Year students only (Calibrations Freshers Edition)." }),
  }),
  college: z.string().trim().max(120).optional().default("Sri Venkateswara College of Engineering (SVCE)"),
  members: z.array(memberSchema).optional().default([]),
});

export const adminLoginSchema = z.object({
  username: z.string().trim().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const eventUpdateSchema = z.object({
  capacity: z.number().int().min(1, "Capacity must be at least 1").optional(),
  registrationOpen: z.boolean().optional(),
  name: z.string().trim().min(3).optional(),
  venue: z.string().trim().min(2).optional(),
  description: z.string().trim().min(10).optional(),
  rules: z.string().trim().min(5).optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
});

export const eventCreateSchema = z.object({
  name: z.string().trim().min(3, "Event name must be at least 3 characters"),
  slug: z.string().trim().min(3).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric and hyphens"),
  tagline: z.string().trim().max(150).optional(),
  category: z.string().trim().min(2),
  venue: z.string().trim().min(2),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  capacity: z.number().int().min(1, "Capacity must be at least 1"),
  registrationOpen: z.boolean().default(true),
  posterImage: z.string().optional(),
  description: z.string().trim().min(10),
  rules: z.string().trim().min(5),
  maxTeamSize: z.number().int().min(1).default(1),
  isTeamEvent: z.boolean().default(false),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
export type EventUpdateInput = z.infer<typeof eventUpdateSchema>;
export type EventCreateInput = z.infer<typeof eventCreateSchema>;
