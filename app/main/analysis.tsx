import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";
import {
    getStatsRangeDays,
    pruneOldStats,
    READING_STATS_KEY_PREFIX,
} from "../../services/statsService";

const BEAD_COUNTER_STATE_KEY = "bead_counter_state_v1";

type AggregatedStats = {
  Sila: number;
  Miscellaneous: number;
  Paritta: number;
  Sutta: number;
  Gatha: number;
  Beads: number;
  BeadsCount: number;
  BeadsRounds: number;
  BeadsPresets: number[];
};

const createInitialStats = (): AggregatedStats => ({
  Sila: 0,
  Miscellaneous: 0,
  Paritta: 0,
  Sutta: 0,
  Gatha: 0,
  Beads: 0,
  BeadsCount: 0,
  BeadsRounds: 0,
  BeadsPresets: [],
});

const AnalysisScreen = () => {
  const router = useRouter();
  const { colors, themeMode } = useTheme();
  const [filter, setFilter] = useState<"Daily" | "Weekly" | "Monthly">("Daily");
  const [rawStats, setRawStats] =
    useState<AggregatedStats>(createInitialStats());

  const fetchAndAggregateData = useCallback(async () => {
    await pruneOldStats();
    const allKeys = await AsyncStorage.getAllKeys();
    const statKeys = allKeys.filter((key) =>
      key.startsWith(READING_STATS_KEY_PREFIX),
    );
    const now = new Date();
    const aggregated = createInitialStats();
    const rangeDays = getStatsRangeDays(filter);

    for (const key of statKeys) {
      const dateStr = key.replace(READING_STATS_KEY_PREFIX, "");
      const recordDate = new Date(dateStr);
      const diffDays =
        (now.getTime() - recordDate.getTime()) / (1000 * 3600 * 24);

      const isIncluded = diffDays < rangeDays;

      if (!isIncluded) continue;

      const data = await AsyncStorage.getItem(key);
      if (!data) continue;

      const parsed = JSON.parse(data);
      aggregated.Sila += parsed.Sila || 0;
      aggregated.Miscellaneous += parsed.Miscellaneous || 0;
      aggregated.Paritta += parsed.Paritta || 0;
      aggregated.Sutta += parsed.Sutta || 0;
      aggregated.Gatha += parsed.Gatha || 0;
      aggregated.Beads += parsed.Beads || 0;
      aggregated.BeadsCount += parsed.BeadsCount || 0;
      aggregated.BeadsRounds += parsed.BeadsRounds || 0;

      if (Array.isArray(parsed.BeadsPresets)) {
        aggregated.BeadsPresets = Array.from(
          new Set([...aggregated.BeadsPresets, ...parsed.BeadsPresets]),
        ).sort((a, b) => a - b);
      }
    }

    const liveBeadState = await AsyncStorage.getItem(BEAD_COUNTER_STATE_KEY);
    if (liveBeadState) {
      const parsedLiveState = JSON.parse(liveBeadState);
      const liveTarget =
        typeof parsedLiveState?.target === "number"
          ? parsedLiveState.target
          : 0;
      const liveCount =
        typeof parsedLiveState?.count === "number" ? parsedLiveState.count : 0;
      const liveRounds =
        typeof parsedLiveState?.rounds === "number"
          ? parsedLiveState.rounds
          : 0;
      const liveStartTime =
        typeof parsedLiveState?.startTime === "number"
          ? parsedLiveState.startTime
          : null;
      const liveTotalCount = liveRounds * liveTarget + liveCount;

      if (liveTotalCount > 0) {
        aggregated.BeadsCount += liveTotalCount;
        aggregated.BeadsRounds += liveRounds;

        if (liveTarget > 0) {
          aggregated.BeadsPresets = Array.from(
            new Set([...aggregated.BeadsPresets, liveTarget]),
          ).sort((a, b) => a - b);
        }
      }

      if (liveStartTime) {
        aggregated.Beads += Math.floor((Date.now() - liveStartTime) / 1000);
      }
    }

    setRawStats(aggregated);
  }, [filter]);

  useFocusEffect(
    useCallback(() => {
      fetchAndAggregateData();
    }, [fetchAndAggregateData]),
  );

  const chartData = useMemo(
    () => [
      {
        value: Math.round(rawStats.Paritta / 60) || 0,
        label: "ပရိတ်",
        frontColor: "#4CAF50",
      },
      {
        value: Math.round(rawStats.Sutta / 60) || 0,
        label: "သုတ္တန်",
        frontColor: "#2196F3",
      },
      {
        value: Math.round(rawStats.Gatha / 60) || 0,
        label: "ဂါထာ",
        frontColor: "#FF9800",
      },
    ],
    [rawStats],
  );

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds} စက္ကန့်`;
    const mins = Math.floor(seconds / 60);
    return mins >= 60 ? `${(mins / 60).toFixed(1)} နာရီ` : `${mins} မိနစ်`;
  };

  const statsList = [
    {
      id: "1",
      title: "ပရိတ်",
      time: formatTime(rawStats.Paritta),
      icon: "book-outline",
      color: "#4CAF50",
      detail: "စုစုပေါင်း ဖတ်ရှုချိန်",
    },
    {
      id: "2",
      title: "သုတ္တန်",
      time: formatTime(rawStats.Sutta),
      icon: "document-text-outline",
      color: "#2196F3",
      detail: "စုစုပေါင်း ဖတ်ရှုချိန်",
    },
    {
      id: "3",
      title: "ဂါထာ",
      time: formatTime(rawStats.Gatha),
      icon: "star-outline",
      color: "#FF9800",
      detail: "စုစုပေါင်း ဖတ်ရှုချိန်",
    },
    {
      id: "4",
      title: "ပုတီးစိပ်ကောင်တာ",
      time: `${rawStats.BeadsCount} အကြိမ်`,
      icon: "disc-outline",
      color: "#9C27B0",
      detail: `${rawStats.BeadsRounds} ပတ်၊ ကြိုတင်သတ်မှတ်မှု ${rawStats.BeadsPresets.length} ခု`,
    },
    {
      id: "5",
      title: "သီလ",
      time: formatTime(rawStats.Sila),
      icon: "shield-checkmark-outline",
      color: "#E91E63",
      detail: "စုစုပေါင်း လေ့ကျင့်ချိန်",
    },
    {
      id: "6",
      title: "အထွေထွေ",
      time: formatTime(rawStats.Miscellaneous),
      icon: "ellipsis-horizontal-outline",
      color: "#607D8B",
      detail: "စုစုပေါင်း လေ့ကျင့်ချိန်",
    },
  ];

  return (
    <LinearGradient
      colors={[
        colors.splashBackground,
        colors.gradientMiddle,
        colors.gradientEnd,
      ]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Go back to settings"
            onPress={() => router.canGoBack() ? router.back() : router.replace("/main/settings")}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={26} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
            ဆန်းစစ်ချက်
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/main/history")}
            style={[styles.historyButton, { borderColor: colors.primary }]}
          >
            <Text style={[styles.historyButtonText, { color: colors.primary }]}>
              မှတ်တမ်း
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabContainer}>
          {(
            [
              { label: "နေ့စဉ်", value: "Daily" },
              { label: "အပတ်စဉ်", value: "Weekly" },
              { label: "လစဉ်", value: "Monthly" },
            ] as const
          ).map(({ label, value }) => (
            <TouchableOpacity
              key={value}
              onPress={() => setFilter(value)}
              style={[
                styles.tab,
                filter === value && {
                  backgroundColor: colors.primary,
                  borderColor: colors.primary,
                },
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: filter === value ? "#FFF" : colors.textSecondary },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={[
              styles.card,
              { backgroundColor: themeMode === "dark" ? "#1E1E1E" : "#FFF" },
            ]}
          >
            <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
              အမျိုးအစားအလိုက် အချိန် (မိနစ်)
            </Text>
            <View style={styles.chartWrapper}>
              <BarChart
                data={chartData}
                barWidth={35}
                noOfSections={3}
                barBorderRadius={6}
                frontColor={colors.primary}
                yAxisThickness={0}
                xAxisThickness={0}
                hideRules
                yAxisTextStyle={{ color: colors.textSecondary }}
                xAxisLabelTextStyle={{
                  color: colors.textSecondary,
                  fontSize: 10,
                }}
              />
            </View>
          </View>

          <View style={styles.listContainer}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              အသေးစိတ်
            </Text>
            {statsList.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.listItem,
                  {
                    backgroundColor:
                      themeMode === "dark" ? "#1E1E1E" : "#F9F9F9",
                  },
                ]}
              >
                <View
                  style={[
                    styles.iconBox,
                    { backgroundColor: item.color + "22" },
                  ]}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={22}
                    color={item.color}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text
                    style={[styles.itemTitle, { color: colors.textPrimary }]}
                  >
                    {item.title}
                  </Text>
                  <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
                    {item.detail}
                  </Text>
                </View>
                <Text style={[styles.itemTime, { color: item.color }]}>
                  {item.time}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  header: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { fontSize: 24, fontWeight: "bold" },
  backButton: { padding: 10, alignItems: "center", justifyContent: "center" },
  historyButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  historyButtonText: { fontWeight: "700", fontSize: 13 },
  tabContainer: { flexDirection: "row", marginBottom: 20, gap: 10 },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DDD",
    alignItems: "center",
  },
  tabText: { fontWeight: "600", fontSize: 13 },
  card: {
    padding: 20,
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  cardTitle: { fontSize: 15, fontWeight: "700", marginBottom: 20 },
  chartWrapper: { alignItems: "center", justifyContent: "center" },
  listContainer: { marginTop: 25 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 16,
    marginBottom: 12,
  },
  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  itemTitle: { fontSize: 16, fontWeight: "600" },
  itemTime: { fontSize: 15, fontWeight: "bold", letterSpacing: 1 },
});

export default AnalysisScreen;
