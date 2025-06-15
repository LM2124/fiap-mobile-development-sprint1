import type { User } from "types/User"

import * as storage from "@/utils/storage"

import placeholderUsers from "./placeholderUsers"

export const STORAGE_KEYS = {
  USER: "@gtech-local:user",
  AUTHTOKEN: "@gtech-local:token",

  // "Não deveria estar aqui, mas..."
  USERS: "@gtech-back:registeredUsers",
}

export const loadUsers = () => storage.load<User[]>(STORAGE_KEYS.USERS) || placeholderUsers
export const saveUsers = (users: User[]) => storage.save(STORAGE_KEYS.USERS, users)
