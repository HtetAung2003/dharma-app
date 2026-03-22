import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import * as Device from 'expo-device';

// Notification ပေါ်မည့်ပုံစံကို သတ်မှတ်ခြင်း
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return;
    }
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
}

// ဥပုသ်နေ့အတွက် Notification Schedule လုပ်ခြင်း
export async function scheduleSabbathReminder(daysLeft: number, eventName: string) {
  await Notifications.cancelAllScheduledNotificationsAsync();

  if (daysLeft === 0) {
    // ယနေ့သည် ဥပုသ်နေ့ဖြစ်ပါက ချက်ချင်းပြရန်
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🙏 ယနေ့သည် ဥပုသ်နေ့ဖြစ်ပါသည်",
        body: "ကုသိုလ်ကောင်းမှုများ ပြုလုပ်ရန် မမေ့ပါနှင့်။",
        data: { screen: 'Dashboard' },
      },
      trigger: null, // ချက်ချင်း
    });
  } else if (daysLeft === 1) {
    // မနက်ဖြန်ဆိုရင် ကြိုတင်သတိပေးရန်
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `📌 မနက်ဖြန်သည် ${eventName} ဖြစ်ပါသည်`,
        body: "ဥပုသ်စောင့်တည်ရန် သို့မဟုတ် ကုသိုလ်ပြုရန် ပြင်ဆင်နိုင်ပါသည်။",
      },
      trigger: { seconds: 3600 }, // ၁ နာရီအကြာတွင် ပြရန် (နမူနာ)
    });
  }
}