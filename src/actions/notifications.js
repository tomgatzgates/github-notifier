import { SAVE_NOTIFICATIONS } from "./types";

export function saveNotifications(notifications) {
  return { type: SAVE_NOTIFICATIONS, payload: notifications };
}
