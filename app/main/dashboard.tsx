import Packages from "@/components/dashboard/PracticePackages";
import { useAuth } from "@/context/AuthContext";
import { ceMmDateTime } from "@/services/ceMmDateTime";
import {
  registerForPushNotificationsAsync
} from "@/services/notificationService";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import React, { useEffect, useMemo } from "react";
import {
  Alert,
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

const Dashboard = () => {
  const { colors, fontSize, themeMode } = useTheme();
  const { userData } = useAuth();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;
  useEffect(() => {
    const backAction = () => {
    
      Alert.alert("သတိပေးချက်", "App မှ ထွက်လိုပါသလား?", [
        { text: "မထွက်ပါ", onPress: () => null, style: "cancel" },
        { text: "ထွက်မည်", onPress: () => BackHandler.exitApp() },
      ]);
      return true; 
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove(); 
  }, []);
  const dateInfo = useMemo(() => {
    const now = new Date();
    const mdt = new ceMmDateTime(now);

    const todaySpecials = mdt.getSpecialDay();
    const isTodaySabbath = mdt.isSabbath();
    const astro = mdt.getAstrologyInfo();

    let daysToSabbath = 0;
    let nextSabbathName = "ဥပုသ်နေ့";

    // find sabbath within next 32 days
    if (!isTodaySabbath) {
      for (let i = 1; i <= 32; i++) {
        const nextDate = new Date();
        nextDate.setDate(now.getDate() + i);
        const nextMdt = new ceMmDateTime(nextDate);
        if (nextMdt.isSabbath()) {
          daysToSabbath = i;
          // to show details of next sabbath, check if it's full moon or new moon
          nextSabbathName =
            nextMdt.ToMString().split(" ").pop() === "လပြည့်"
              ? "လပြည့်နေ့"
              : "ဥပုသ်နေ့";
          break;
        }
      }
    }

    return {
      engDate: now.toDateString(),
      mmDate: mdt.ToMString(),
      isTodaySabbath,
      todaySpecial: todaySpecials.join(", "),
      daysLeft: daysToSabbath,
      nextEvent: nextSabbathName,
      astroText: astro.length > 0 ? astro.join(" / ") : "သာမန်ရက်",
      isYatyaza: astro.some(item => item.includes("ရက်ရာဇာ")),
      isPyathada: astro.some(item => item.includes("ပြဿဒါး")),
    };
  }, []);
  
  // Display name logic with truncation for long names
  const displayName = userData?.fullName
    ? userData.fullName.length > 10
      ? `${userData.fullName.substring(0, 10)}..`
      : userData.fullName
    : "ဧည့်သည်";
 useEffect(() => {
  //  Permission 
  registerForPushNotificationsAsync();

  
  const subscription = Notifications.addNotificationResponseReceivedListener(() => {
    router.push("/main/dashboard");
  });

  
  const setupSabbathNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    const now = new Date();
    const currentHour = now.getHours();

    if (dateInfo.daysLeft === 1 && currentHour < 18) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `📌 မနက်ဖြန်သည် ${dateInfo.nextEvent} ဖြစ်ပါသည်`,
          body: "ဥပုသ်စောင့်တည်ရန် သို့မဟုတ် ကုသိုလ်ပြုရန် ပြင်ဆင်နိုင်ပါသည်။",
          android: { channelId: "sabbath-reminders" },
        },
        trigger: { hour: 18, minute: 0, repeats: false },
      });
    }

    
    if (dateInfo.isTodaySabbath && currentHour < 9) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "🙏 ယနေ့သည် ဥပုသ်နေ့ဖြစ်ပါသည်",
          body: "ကုသိုလ်ကောင်းမှုများ ပြုလုပ်ရန် မမေ့ပါနှင့်။",
          android: { channelId: "sabbath-reminders" },
        },
        trigger: { hour: 9, minute: 0, repeats: false },
      });
    }
  };

  setupSabbathNotifications();

  return () => subscription.remove();
}, [dateInfo.daysLeft, dateInfo.isTodaySabbath]); 


  return (
    <LinearGradient
      colors={
        [colors.splashBackground , colors.gradientMiddle , colors.gradientEnd]
      
      }
      
      style={styles.background}
    >
      <SafeAreaView style={styles.container} edges={["top"]}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={{ width: "70%" }}>
            <Text
              numberOfLines={1}
              style={[
                styles.userName,
                { color: colors.textPrimary, fontSize: dynamicSize(24) },
              ]}
            >
              မင်္ဂလာပါ {displayName} !
            </Text>
            {/* <Text
              style={[
                styles.subText,
                { color: colors.textSecondary, fontSize: dynamicSize(16) },
              ]}
            >
              သင့်ရဲ့ ဓမ္မလမ်းခရီးကို အကောင်းဆုံး စတင်နိုင်ဖို့ ဒီနေ့ ဘာတွေ ရှိလဲ ကြည့်ကြပါစို့။
            </Text> */}
          </View>

          <TouchableOpacity onPress={() => router.push("/personalization")}>
            <Ionicons
              name="cog-outline"
              size={dynamicSize(35)}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
        </View>

        {/* body section */}

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Dashboard Card */}
          <View style={[styles.dateContainer, { backgroundColor: colors.card }]}>
          
              <View style={styles.dateRow}>
             
                {/* tag of normal day .. */}
              <View
                  style={[
                    styles.astroBadge,
                    {
                      backgroundColor: dateInfo.isYatyaza
                        ? "#4CAF5022"
                        : dateInfo.isPyathada
                          ? "#F4433622"
                          : "rgba(255,215,0,0.1)",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.engDateText,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {dateInfo.engDate}
                  </Text>
                  <Text
                    style={[styles.mmDateText, { color: colors.textPrimary }]}
                  >
                    {dateInfo.mmDate}
                  </Text>
                  <Text
                    style={[
                      styles.astroText,
                      {
                        color: dateInfo.isYatyaza
                          ? colors.success
                          : dateInfo.isPyathada
                            ? colors.error
                            : "#202020",
                      },
                    ]}
                  >
                    {dateInfo.astroText}
                  </Text>
                </View>
              </View>
  
              <View style={styles.divider} />

              <View style={styles.countdownRow}>
                {/* calendar icon */}
                <Ionicons
                  name={
                    dateInfo.isTodaySabbath
                      ? "sparkles"
                      : "calendar-number-outline"
                  }
                  size={22}
                  color={
                    dateInfo.isTodaySabbath ? colors.success : colors.primary
                  }
                />
                <View style={{ marginLeft: 10, flex: 1 }}>
                  {dateInfo.isTodaySabbath ? (
                    <Text
                      style={[
                        styles.statusText,
                        { color: colors.success, fontWeight: "bold" },
                      ]}
                    >
                      ယနေ့သည် {dateInfo.todaySpecial} ဖြစ်ပါသည်။
                    </Text>
                  ) : (
                    <Text
                      style={[styles.statusText, { color: colors.textPrimary }]}
                    >
                      နောက်ထပ်{" "}
                      <Text
                        style={{ color: colors.textPrimary, fontWeight: "800" }}
                      >
                        {dateInfo.daysLeft}
                      </Text>{" "}
                      ရက်အကြာတွင်{" "}
                      <Text style={{ fontWeight: "700" }}>
                        {dateInfo.nextEvent}
                      </Text>{" "}
                      ရောက်ပါမည်။
                    </Text>
                  )}
                </View>
              </View>
         
          </View>
          {/* other components */}
          <Packages />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 15 },
  header: {
   flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 20,
  paddingVertical: 15,
  width: "100%",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 4, 
  },
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 8,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
  zIndex: 1000,
  },
  userName: { fontWeight: "bold" },
  subText: { marginTop: 4 },
  dateContainer: { marginTop: 15, marginBottom: 10,     padding: 18,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    overflow: "hidden", },
 
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    
  },
  engDateText: { fontSize: 12, fontWeight: "600", marginBottom: 2 },
  mmDateText: { fontSize: 18, fontWeight: "800" },
  astroBadge: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  astroText: { fontSize: 11, fontWeight: "bold" },
  divider: {
    height: 1,
    backgroundColor: "rgba(128,128,128,0.15)",
    marginVertical: 15,
  },
  countdownRow: { flexDirection: "row", alignItems: "center" },
  statusText: { fontSize: 14, lineHeight: 20, padding: 10 },
});

export default Dashboard;


