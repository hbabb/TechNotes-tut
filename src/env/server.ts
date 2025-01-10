import * as Sentry from "@sentry/nextjs";
import { createEnv } from "@t3-oss/env-nextjs";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { type ZodError, z } from "zod";

expand(config({ path: ".env.local" }));

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
    KINDE_POST_LOGOUT_REDIRECT_URL: z.string(),
    KINDE_POST_LOGIN_REDIRECT_URL: z.string(),
    KINDE_DOMAIN: z.string().url(),
    KINDE_M2M_CLIENT_ID: z.string(),
    KINDE_M2M_CLIENT_SECRET: z.string(),
    DATABASE_URL: z.string().url(),
  },
  onValidationError: (error: ZodError) => {
    // Original error code from T3Env
    // console.error("❌ Invalid Environment Configuration", error.errors);
    // process.exit(1);

    // Updated using Sentry
    const errorMessage = "❌ Invalid Environment Configuration";
    console.error(errorMessage, error.errors);

    // Log validation error to Sentry
    Sentry.captureException(new Error(`${errorMessage}: ${JSON.stringify(error.errors)}`));

    // Exit process
    process.exit(1);
  },
  onInvalidAccess: (variable: string) => {
    // Original error code from T3Env
    // throw new Error(`❌ Attempted to access a server-side environment variable: ${variable} on the client`);

    // Updated using Sentry
    const errorMessage = `❌ Attempted to access a server-side environment variable: ${variable} on the client`;
    console.error(errorMessage);

    // Log invalid access to Sentry
    Sentry.captureException(new Error(errorMessage));

    // throw error
    throw new Error(errorMessage);
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: true,
});
