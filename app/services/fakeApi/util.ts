import * as Crypto from "expo-crypto"

import { delay } from "@/utils/delay"

import type { AuthToken } from "./types"

export function generateToken(salt = "default"): AuthToken {
  return `token-${salt}-${Crypto.randomUUID()}`
}

const fakeDelay = true
export async function fakeApiDelay(baseMs = 500, variationMs = 1000) {
  if (fakeDelay) await delay(baseMs + Math.random() * variationMs)
}
