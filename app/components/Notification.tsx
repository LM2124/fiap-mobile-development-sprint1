import { IconTypes } from "./Icon"

export type Notification = {
  date: Date
  icon: IconTypes
  title: string
  about: string
  details: string
}
