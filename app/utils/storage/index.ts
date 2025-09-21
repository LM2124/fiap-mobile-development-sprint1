import { Platform } from "react-native"
import * as Crypto from "expo-crypto"
import * as SecureStore from "expo-secure-store"
import { MMKV } from "react-native-mmkv"

// https://ignitecookbook.com/docs/recipes/Authentication/#encrypting-the-user-session
const fetchOrGenerateEncryptionKey = (): string => {
  const encryptionKey = SecureStore.getItem("session-encryption-key")

  if (encryptionKey) {
    return encryptionKey
  } else {
    const uuid = Crypto.randomUUID()
    SecureStore.setItem("session-encryption-key", uuid)
    return uuid
  }
}

// Usando criptografia para armazenar dados no Android e iOS
export const storage = new MMKV({
  id: "gtech-xp",
  // MMKV não suporta encryptionKey na web
  encryptionKey: Platform.OS === "web" ? undefined : fetchOrGenerateEncryptionKey(),
})

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export function loadString(key: string): string | null {
  try {
    return storage.getString(key) ?? null
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export function saveString(key: string, value: string): boolean {
  try {
    storage.set(key, value)
    return true
  } catch {
    return false
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export function load<T>(key: string): T | null {
  let almostThere: string | null = null
  try {
    almostThere = loadString(key)
    return JSON.parse(almostThere ?? "") as T
  } catch {
    return (almostThere as T) ?? null
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export function save(key: string, value: unknown): boolean {
  try {
    saveString(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export function remove(key: string): void {
  try {
    storage.delete(key)
  } catch {}
}

/**
 * Burn it all to the ground.
 */
export function clear(): void {
  try {
    storage.clearAll()
  } catch {}
}
