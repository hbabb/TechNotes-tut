import { createEnv } from "@t3-oss/env-nextjs";
import { config } from "dotenv";
import { type ZodError, z } from "zod";

config({ path: ".env.local" });

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    SENTRY_AUTH_TOKEN: z.string(),
    SENTRY_SUPPRESS_TURBOPACK_WARNING: z.coerce.number(),
    CI: z
      .string()
      .refine((s) => s === "true" || s === "false")
      .transform((s) => s === "true")
      .optional(),
    KINDE_CLIENT_ID: z.string(),
    KINDE_CLIENT_SECRET: z.string(),
    KINDE_ISSUER_URL: z.string().url(),
    KINDE_SITE_URL: z.string().url(),
    KINDE_POST_LOGOUT_REDIRECT_URL: z.string().url(),
    KINDE_POST_LOGIN_REDIRECT_URL: z.string().url(),
    KINDE_DOMAIN: z.string().url(),
    KINDE_MANAGEMENT_CLIENT_ID: z.string(),
    KINDE_MANAGEMENT_CLIENT_SECRET: z.string(),
    DATABASE_URL: z.string().url(),
  },
  onValidationError: (error: ZodError) => {
    console.error("❌ Invalid environment variables:", error.message);
    process.exit(1);
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: process.env,
});
