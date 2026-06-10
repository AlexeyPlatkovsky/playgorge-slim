import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

import { ZodError } from "zod";

import { parseEnv } from "./schema";

function loadDotEnv(): void {
  const envPath = resolve(process.cwd(), ".env");

  if (!existsSync(envPath)) {
    process.stderr.write(
      "\n[playforge] WARNING: .env file not found. Create a .env file in the project root and set BASE_URL.\n\n"
    );
    return;
  }

  const lines = readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadDotEnv();

export interface EnvConfig {
  readonly BASE_URL: string;
  readonly HIGHLIGHT: boolean;
  readonly TEST_PASSWORD?: string;
  readonly TEST_USERNAME?: string;
}

function formatEnvError(error: ZodError): string {
  const details = error.issues
    .map((issue) => {
      const path = issue.path.join(".") || "ROOT";
      return `- ${path}: ${issue.message}`;
    })
    .join("\n");

  return `Invalid environment configuration:\n${details}`;
}

export function loadEnv(rawEnv: NodeJS.ProcessEnv = process.env): EnvConfig {
  try {
    const parsed = parseEnv(rawEnv);

    return {
      BASE_URL: parsed.BASE_URL,
      HIGHLIGHT: parsed.HIGHLIGHT === "1",
      TEST_PASSWORD: parsed.TEST_PASSWORD,
      TEST_USERNAME: parsed.TEST_USERNAME
    };
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(formatEnvError(error), { cause: error });
    }

    throw error;
  }
}

export const env = loadEnv();

export interface Config {
  readonly baseUrl: string;
  readonly highlight: boolean;
  readonly testPassword?: string;
  readonly testUsername?: string;
}

export const getConfig = (): Config => ({
  baseUrl: env.BASE_URL,
  highlight: env.HIGHLIGHT,
  testPassword: env.TEST_PASSWORD,
  testUsername: env.TEST_USERNAME
});
