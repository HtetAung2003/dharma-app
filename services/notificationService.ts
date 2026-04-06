import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import { ceMmDateTime } from '@/services/ceMmDateTime';

// ၁။ Notification ပေါ်မည့်ပုံစံကို သတ်မှတ်ခြင်း
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function registerForPushNotificationsAsync() {
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

  // ၂။ Android အတွက် Channel ဆောက်ခြင်း (Custom Sound ပါဝင်သည်)
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('sabbath-reminders', {
      name: 'ဥပုသ်နေ့ သတိပေးချက်များ',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FFD700',
      sound: 'notibell.mp3', // app.json ထဲမှာ ထည့်ခဲ့တဲ့ အသံဖိုင်အမည်
    });
  }
}

function isTomorrowSabbath() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return new ceMmDateTime(tomorrow).isSabbath();
}

// ၃။ ဥပုသ်နေ့အတွက် Notification Schedule လုပ်ခြင်း
export async function scheduleSabbathReminder(daysLeft: number, eventName: string) {
  // အဟောင်းများကို အကုန်ဖျက်ပစ်ပါ
  await Notifications.cancelAllScheduledNotificationsAsync();

  if (daysLeft === 0) {
    // ယနေ့ (ချက်ချင်းပြရန်)
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🙏 ယနေ့သည် ဥပုသ်နေ့ဖြစ်ပါသည်",
        body: "ကုသိုလ်ကောင်းမှုများ ပြုလုပ်ရန် မမေ့ပါနှင့်။",
        data: { screen: 'Dashboard' },
        sound: true,
        // @ts-ignore
        android: {
          channelId: 'sabbath-reminders', // အပေါ်က Channel ID နဲ့ ကိုက်ရမည်
          color: '#FFD700',
        },
      },
     trigger: {
    // 🚀 ERROR FIX: ဤနေရာတွင် Type ကို အတိအကျ ထည့်ပေးပါ
    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, 
    seconds: 10,
    repeats: false,
  },
    });
  } else if (daysLeft === 1 && isTomorrowSabbath()) {
    // မနက်ဖြန် (၁ နာရီအကြာတွင် စမ်းသပ်ပြရန်)
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `📌 မနက်ဖြန်သည် ${eventName} ဖြစ်ပါသည်`,
        body: "ဥပုသ်စောင့်တည်ရန် သို့မဟုတ် ကုသိုလ်ပြုရန် ပြင်ဆင်နိုင်ပါသည်။",
        sound: true,
        // @ts-ignore
        android: {
          channelId: 'sabbath-reminders',
        },
      },
      // 🚀 ERROR FIX: Trigger type ကို ထည့်သွင်းထားပါသည်
      trigger: { 
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 3600, 
        repeats: false 
      }, 
    });
  }
}
