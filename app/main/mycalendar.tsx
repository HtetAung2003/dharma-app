import { useTheme } from "@/context/ThemeContext";
import { ceMmDateTime } from "@/services/ceMmDateTime";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

// Thingyan Month Overlay
const PataukOverlay = () => (
  <View style={styles.overlayContainer} pointerEvents="none">
    <View style={styles.pataukPlaceholder} />
  </View>
);

const MyanmarBuddhistCalendar = () => {
  const { colors, isDarkMode } = useTheme();
  const [selected, setSelected] = useState(
    new Date().toISOString().split("T")[0],
  );

  const todayStr = useMemo(() => new Date().toISOString().split("T")[0], []);

  // 🚀 Helper to get all detailed info at once
  const getDetailedInfo = (dateString: string) => {
    const mdt = new ceMmDateTime(new Date(dateString));

    // Astrology array ကို Class ထဲကနေ တိုက်ရိုက်ယူမယ်
    const astroData = mdt.getAstrologyInfo ? mdt.getAstrologyInfo() : [];

    return {
      isSabbath: mdt.isSabbath(),
      isFullMoon: mdt.isFullMoon,
      isNewMoon: mdt.isNewMoon,
      mmDay: mdt.mdText,
      mpName: mdt.mpText,
      fullString: mdt.ToMString(),
      astrology: astroData, // ["နှစ်အမည်: ...", "မဟာဘုတ်: ..."]
      // အကယ်၍ Class ထဲမှာ yatyaza တွက်ချက်မှု မပါသေးရင် error မတက်အောင် default false ထားပါ
      isYatyaza: (mdt as any).isYatyaza || false,
      specialDays: mdt.getSpecialDay(),
      holidays: mdt.getHolidays ? mdt.getHolidays() : [],
      // Manual Data တွေကို တိုက်ရိုက်သုံးချင်လျှင်
      mahabote: (mdt as any).mahabote || "N/A",
      nagaHead: (mdt as any).nagaHead || "N/A",
    };
  };

  const selectedInfo = useMemo(() => getDetailedInfo(selected), [selected]);

  const isApril = useMemo(
    () => new Date(selected).getMonth() === 3,
    [selected],
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        {isApril && <PataukOverlay />}

        <Calendar
          current={selected}
          onDayPress={(day) => setSelected(day.dateString)}
          theme={{
            calendarBackground: "transparent",
            monthTextColor: colors.textPrimary,
            dayTextColor: colors.textPrimary,
            todayTextColor: "#FF5252",
            selectedDayBackgroundColor: "transparent", // custom render သုံးထား၍ transparent ထားပါ
          }}
          dayComponent={({ date, state, onPress }) => {
            if (!date) return <View style={styles.dayBox} />;

            const info = getDetailedInfo(date.dateString);
            const isSelected = selected === date.dateString;
            const isHoliday = info.holidays.length > 0;
            const isSpecialMoon = info.isFullMoon || info.isNewMoon;

            return (
              <TouchableOpacity
                onPress={() => onPress && onPress(date)}
                style={[
                  styles.dayBox,
                  isSelected && {
                    backgroundColor: isDarkMode ? "#FFD70044" : "#0288D122",
                    borderRadius: 8,
                  },
                  isHoliday && {
                    backgroundColor: isDarkMode ? "#FF525215" : "#FF525208",
                    borderRadius: 8,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.englishDay,
                    {
                      color:
                        state === "disabled"
                          ? colors.textSecondary
                          : colors.textPrimary,
                    },
                    isHoliday && { color: "#FF5252" },
                  ]}
                >
                  {date.day}
                </Text>

                <Text
                  style={[
                    styles.myanmarDay,
                    { color: isSpecialMoon ? "#E91E63" : colors.textSecondary },
                  ]}
                >
                  {info.isFullMoon
                    ? "ပြည့်"
                    : info.isNewMoon
                      ? "ကွယ်"
                      : info.mmDay}
                </Text>

                <View style={styles.dotRow}>
                  {info.isSabbath && (
                    <View
                      style={[styles.dot, { backgroundColor: "#FFD700" }]}
                    />
                  )}
                  {isHoliday && (
                    <View
                      style={[styles.dot, { backgroundColor: "#FF5252" }]}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />

        {/* Selected Date Details Card */}
        {selectedInfo && (
          <View
            style={[
              styles.detailCard,
              { backgroundColor: isDarkMode ? "#1A2634" : "#F5F5F5" },
            ]}
          >
            <Text style={[styles.detailTitle, { color: colors.textPrimary }]}>
              {selected === todayStr
                ? "🌟 ယနေ့အတွက် အချက်အလက်"
                : `📅 ${selected} အချက်အလက်`}
            </Text>

            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                မြန်မာရက်စွဲ:
              </Text>
              <Text
                style={[
                  styles.infoValue,
                  { color: isDarkMode ? "#FFD700" : "#0288D1" },
                ]}
              >
                {selectedInfo.fullString}
              </Text>
            </View>

            {/* Astrology Details Section */}
            {selectedInfo.astrology.length > 0 && (
              <View style={styles.specialContainer}>
                {selectedInfo.astrology.map((item, index) => (
                  <Text
                    key={index}
                    style={[
                      styles.astroText,
                      { color: colors.textPrimary, marginBottom: 4 },
                    ]}
                  >
                    • {item}
                  </Text>
                ))}

                {/* ရက်ရာဇာ သို့မဟုတ် ပြဿဒါး အခြေအနေကို သီးသန့်ပြခြင်း */}
                <Text
                  style={[
                    styles.astroText,
                    {
                      marginTop: 8,
                      color: selectedInfo.isYatyaza ? "#FF9100" : "#F44336",
                    },
                  ]}
                >
                  📍{" "}
                  {selectedInfo.isYatyaza
                    ? "ရက်ရာဇာ (မင်္ဂလာရှိသောနေ့)"
                    : "ပြဿဒါး (သတိထားရမည့်နေ့)"}
                </Text>
              </View>
            )}

            {selectedInfo.specialDays.length > 0 && (
              <View style={styles.specialContainer}>
                <Text
                  style={[
                    styles.specialText,
                    { color: isDarkMode ? "#FFD700" : "#0288D1" },
                  ]}
                >
                  ✨ {selectedInfo.specialDays.join(", ")}
                </Text>
              </View>
            )}

            {selectedInfo.holidays.length > 0 && (
              <View style={styles.specialContainer}>
                <Text style={styles.holidayText}>
                  📌 ပိတ်ရက်: {selectedInfo.holidays.join(", ")}
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
// ... component code ...

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
    position: "relative",
  },

  // Thingyan Overlay Style
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  pataukPlaceholder: {
    width: "100%",
    height: "100%",
    opacity: 0.1,
    backgroundColor: "#FF910022",
  },

  // Calendar Day Box Style
  dayBox: {
    width: 45,
    height: 55, // အနည်းငယ် ပိုရှည်ထားခြင်းဖြင့် မြန်မာရက်စွဲ ပေါ်ရန် နေရာရစေသည်
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 2,
  },
  englishDay: {
    fontSize: 16,
    fontWeight: "600",
  },
  myanmarDay: {
    fontSize: 10,
    marginTop: 2,
    fontWeight: "500",
  },

  // Dot Indicators (Sabbath, Holiday)
  dotRow: {
    flexDirection: "row",
    marginTop: 4,
    gap: 3,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },

  // Detail Card Styles
  detailCard: {
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    marginHorizontal: 10,
    marginBottom: 30,
    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Android Shadow
    elevation: 4,
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoRow: {
    flexDirection: "column",
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 13,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 20,
    fontWeight: "800", // ပိုပြီး ထင်ရှားစေရန်
  },

  // Special Indicators (Astro, Sabbath, Holiday)
  specialContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(128,128,128,0.15)",
  },
  astroText: {
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 20,
  },
  specialText: {
    fontSize: 15,
    fontWeight: "700",
  },
  holidayText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FF5252",
  },

  // Today Header (Dashboard style)
  todayHeader: {
    margin: 15,
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    elevation: 2,
  },
  todayLabel: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    opacity: 0.8,
  },
  todayEng: {
    fontSize: 15,
    fontWeight: "600",
  },
  todayMM: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 6,
  },
});
