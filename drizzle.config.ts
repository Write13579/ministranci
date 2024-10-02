import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/database/scheme.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.MINISTRANCI_USERS_DB!,
  },
});
