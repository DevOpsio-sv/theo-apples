import { z } from "zod";

export const ENQUIRY_INTENTS = [
  "artwork",
  "collector",
  "gallery",
  "exhibition",
  "architect",
  "commission",
  "press",
  "general",
] as const;

export type EnquiryIntent = (typeof ENQUIRY_INTENTS)[number];

export const enquirySchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(80).optional().or(z.literal("")),
  intent: z.enum(ENQUIRY_INTENTS),
  message: z.string().trim().min(1).max(5000),
  work: z.string().trim().max(200).optional().or(z.literal("")),
  locale: z.enum(["en", "bg"]),
  consent: z.literal(true),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
