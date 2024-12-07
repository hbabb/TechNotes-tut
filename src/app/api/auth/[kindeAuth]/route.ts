import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
console.log("Runtime VERCEL_URL: ", process.env.VERCEL_URL);
export const GET = handleAuth();
