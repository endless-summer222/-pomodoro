import { isPermissionGranted, requestPermission, sendNotification as tauriNotify } from "@tauri-apps/plugin-notification";

export async function isNotificationPermissionGranted(): Promise<boolean> {
  try {
    return await isPermissionGranted();
  } catch {
    return false;
  }
}

export async function requestNotificationPermission(): Promise<boolean> {
  try {
    const result = await requestPermission();
    return result === "granted";
  } catch {
    return false;
  }
}

export async function sendNotification(title: string, body: string): Promise<void> {
  try {
    const granted = await isPermissionGranted();
    if (granted) {
      await tauriNotify({ title, body });
    }
  } catch {
    // Silently fail - notifications are non-critical
  }
}
