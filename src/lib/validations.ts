import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  topic: z.enum(["Partnership", "Volunteer", "Donation", "Press", "Other"]),
  message: z.string().trim().min(10).max(5000),
});

export const volunteerSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  skills: z.string().trim().min(5).max(2000),
  availability: z.string().trim().min(3).max(500),
  motivation: z.string().trim().min(10).max(5000),
});

export const newsletterSchema = z.object({
  email: z.string().trim().email().max(200),
  source: z.string().trim().max(80).optional(),
});

export const eventRegisterSchema = z.object({
  eventSlug: z.string().trim().min(2).max(120),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const donateCreateSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  amountInr: z.number().int().min(100).max(500000),
  frequency: z.enum(["one_time", "monthly"]),
});

export const donateVerifySchema = z.object({
  donationId: z.string().uuid(),
  razorpay_order_id: z.string().optional(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
  razorpay_subscription_id: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type VolunteerInput = z.infer<typeof volunteerSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type EventRegisterInput = z.infer<typeof eventRegisterSchema>;
export type DonateCreateInput = z.infer<typeof donateCreateSchema>;
