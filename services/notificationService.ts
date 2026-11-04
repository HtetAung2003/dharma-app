import { ceMmDateTime } from "@/services/ceMmDateTime";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Configure how notifications are displayed when the app is foregrounded
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * Register notification channels and request user permissions for notifications.
 */
export async function registerForPushNotificationsAsync() {
  if (Platform.OS === "web") return;

  // Request permissions
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") return;

  // Create notification channel for Android (with custom sound)
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("sabbath-reminders", {
      name: "Sabbath Reminders",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FFD700",
      sound: "notibell.mp3",
    });
  }
}

/**
 * Check if tomorrow is a Sabbath day.
 */
function isTomorrowSabbath(): boolean {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return new ceMmDateTime(tomorrow).isSabbath();
}

/**
 * Schedule Sabbath day reminder notifications.
 *
 * @param daysLeft Number of days left until next Sabbath
 * @param eventName Name of the next Sabbath event
 */
export async function scheduleSabbathReminder(
  daysLeft: number,
  eventName: string,
) {
  if (Platform.OS === "web") return;

  try {
    // Clear all previously scheduled notifications
    await Notifications.cancelAllScheduledNotificationsAsync();

    if (daysLeft === 0) {
      // Today is Sabbath day: schedule reminder to fire shortly
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "🙏 ယနေ့သည် ဥပုသ်နေ့ဖြစ်ပါသည်",
          body: "ကုသိုလ်ကောင်းမှုများ ပြုလုပ်ရန် မမေ့ပါနှင့်။",
          data: { screen: "Dashboard" },
          sound: Platform.OS === "ios" ? "notibell.mp3" : true,
          color: "#FFD700",
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 1,
          repeats: false,
          channelId: Platform.OS === "android" ? "sabbath-reminders" : undefined,
        },
      });
    } else if (daysLeft === 1 && isTomorrowSabbath()) {
      // Tomorrow is Sabbath day: schedule preview reminder
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `📌 မနက်ဖြန်သည် ${eventName} ဖြစ်ပါသည်`,
          body: "ဥပုသ်စောင့်တည်ရန် သို့မဟုတ် ကုသိုလ်ပြုရန် ပြင်ဆင်နိုင်ပါသည်။",
          data: { screen: "Dashboard" },
          sound: Platform.OS === "ios" ? "notibell.mp3" : true,
          color: "#FFD700",
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 5,
          repeats: false,
          channelId: Platform.OS === "android" ? "sabbath-reminders" : undefined,
        },
      });
    }
  } catch (error) {
    console.warn("Failed to schedule Sabbath reminder notification:", error);
  }
}
