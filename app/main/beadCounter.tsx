import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import FloatingBubble from "@increase21/rn-floating-bubble";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { useKeepAwake } from "expo-keep-awake";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AnimatePresence, View } from "moti";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  View as RNView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Theme Context (သင့် project လမ်းကြောင်းအတိုင်း ပြင်ပါ)
import { useTheme } from "../../context/ThemeContext";

const PRESET_NUMBERS = [9, 27, 45, 108, 1000];
const BEAD_COUNTER_STATE_KEY = "bead_counter_state_v1";
const BEAD_COUNTER_BUBBLE_KEY = "bead_counter_bubble_enabled_v1";

const BeadCounterScreen = () => {
  useKeepAwake();
  const router = useRouter();
  const { colors, isDarkMode, fontSize } = useTheme();

  // States
  const [target, setTarget] = useState(108);
  const [count, setCount] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);
  const [hasBubblePermission, setHasBubblePermission] = useState(false);
  const [isBubbleShowing, setIsBubbleShowing] = useState(false);
  const isAndroid = Platform.OS === "android";

  useEffect(() => {
    const loadSavedState = async () => {
      try {
        const raw = await AsyncStorage.getItem(BEAD_COUNTER_STATE_KEY);
        if (!raw) return;

        const saved = JSON.parse(raw);
        if (typeof saved?.target === "number") setTarget(saved.target);
        if (typeof saved?.count === "number") setCount(saved.count);
        if (typeof saved?.rounds === "number") setRounds(saved.rounds);
        if (typeof saved?.startTime === "number" || saved?.startTime === null) {
          setStartTime(saved.startTime);
        }
      } catch (error) {
        console.warn("Failed to load bead counter state", error);
      } finally {
        setIsHydrated(true);
      }
    };

    loadSavedState();
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const persistState = async () => {
      try {
        await AsyncStorage.setItem(
          BEAD_COUNTER_STATE_KEY,
          JSON.stringify({
            target,
            count,
            rounds,
            startTime,
            updatedAt: Date.now(),
          }),
        );
      } catch (error) {
        console.warn("Failed to save bead counter state", error);
      }
    };

    persistState();
  }, [target, count, rounds, startTime, isHydrated]);

  useEffect(() => {
    if (!isAndroid) return;

    const bootstrapBubble = async () => {
      try {
        const [permission, showing, enabled] = await Promise.all([
          FloatingBubble.hasPermission(),
          FloatingBubble.isShowing(),
          AsyncStorage.getItem(BEAD_COUNTER_BUBBLE_KEY),
        ]);

        setHasBubblePermission(permission);
        setIsBubbleShowing(showing);

        if (enabled === "1" && permission && !showing) {
          await FloatingBubble.show({ size: 64, initialX: 0, initialY: 240 });
          setIsBubbleShowing(true);
        }
      } catch (error) {
        console.warn("Bubble bootstrap failed", error);
      }
    };

    bootstrapBubble();
  }, [isAndroid]);

  const enableBubble = async () => {
    if (!isAndroid) return;

    try {
      let granted = await FloatingBubble.hasPermission();
      if (!granted) {
        granted = await FloatingBubble.requestPermission();
      }

      setHasBubblePermission(granted);
      if (!granted) {
        Alert.alert(
          "Permission required",
          'Please allow "Display over other apps" to enable floating bubble.',
        );
        return;
      }

      await FloatingBubble.show({ size: 64, initialX: 0, initialY: 240 });
      await AsyncStorage.setItem(BEAD_COUNTER_BUBBLE_KEY, "1");
      setIsBubbleShowing(true);
    } catch (error) {
      console.warn("Failed to enable floating bubble", error);
      Alert.alert("Error", "Could not start floating bubble.");
    }
  };

  const disableBubble = async () => {
    if (!isAndroid) return;

    try {
      await FloatingBubble.hide();
      await AsyncStorage.setItem(BEAD_COUNTER_BUBBLE_KEY, "0");
      setIsBubbleShowing(false);
    } catch (error) {
      console.warn("Failed to disable floating bubble", error);
      Alert.alert("Error", "Could not stop floating bubble.");
    }
  };

  const handleTap = async () => {
    if (count === 0 && rounds === 0 && !startTime) {
      setStartTime(Date.now());
    }

    const nextCount = count + 1;
    setAnimationKey((prev) => prev + 1);

    if (nextCount >= target) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setRounds((prev) => prev + 1);
      setCount(0);
    } else {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setCount(nextCount);
    }
  };

  const handleResetCount = () => {
    if (count > 0 || rounds > 0) {
      Alert.alert("အတည်ပြုပါ", "လက်ရှိရေတွက်ထားသည်ကို ဖျက်ပါမည်လား?", [
        { text: "မဖျက်ပါ", style: "cancel" },
        {
          text: "ဖျက်မည်",
          onPress: () => {
            setCount(0);
            setRounds(0);
            setStartTime(null);
          },
        },
      ]);
    }
  };

  const handleFinish = () => {
    if (!startTime) return;
    Alert.alert(
      "သာဓု ခေါ်ဆိုပါသည်",
      "ယနေ့ ပုတီးစိပ်မှတ်တမ်းကို သိမ်းဆည်းလိုပါသလား?",
      [
        { text: "မသိမ်းပါ", style: "cancel", onPress: () => router.back() },
        { text: "သိမ်းဆည်းမည်", onPress: saveAndExit },
      ],
    );
  };

  const saveAndExit = () => {
    const duration = startTime
      ? Math.floor((Date.now() - startTime) / 1000)
      : 0;
    const record = {
      target_type: target,
      total_beads: rounds * target + count,
      duration_seconds: duration,
      date: new Date().toISOString(),
    };
    console.log("Saving...", record);
    router.back();
  };

  // Progress calculation
  const rotateVal = `${(count / target) * 360 + 180}deg`;

  return (
    <LinearGradient
      colors={isDarkMode ? ["#0F172A", "#1E293B"] : ["#F0F9FF", "#E0F2FE"]}
      style={styles.background}
    >
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <SafeAreaView style={styles.safeArea}>
        <Stack.Screen
          options={{
            headerTitle: "ပုတီးစိပ်ခြင်း",
            headerTransparent: true,
            headerTintColor: colors.textPrimary,
            headerRight: () => (
              <TouchableOpacity
                onPress={handleFinish}
                disabled={!startTime}
                style={styles.headerRightBtn}
              >
                <Text
                  style={{
                    color: startTime ? colors.primary : colors.textSecondary,
                    fontWeight: "bold",
                  }}
                >
                  ပြီးမည်
                </Text>
              </TouchableOpacity>
            ),
          }}
        />

        {/* ၁။ Selector & Reset Section */}
        <RNView style={styles.topSection}>
          <RNView style={styles.selectorHeader}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>
              စိပ်လိုသည့် အရေအတွက် ရွေးပါ
            </Text>
            <TouchableOpacity
              onPress={handleResetCount}
              disabled={count === 0 && rounds === 0}
            >
              <Ionicons
                name="refresh-circle-outline"
                size={28}
                color={
                  count > 0 || rounds > 0
                    ? colors.secondary
                    : colors.textSecondary + "50"
                }
              />
            </TouchableOpacity>
          </RNView>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {PRESET_NUMBERS.map((num) => (
              <TouchableOpacity
                key={num}
                onPress={() => {
                  if (count > 0 || rounds > 0) {
                    Alert.alert(
                      "သတိပေးချက်",
                      "စိပ်လက်စကို ဖျက်ပြီး အရေအတွက် အသစ်ပြောင်းမလား?",
                      [
                        { text: "မပြောင်းပါ", style: "cancel" },
                        {
                          text: "ပြောင်းမည်",
                          onPress: () => {
                            setTarget(num);
                            setCount(0);
                            setRounds(0);
                            setStartTime(null);
                          },
                        },
                      ],
                    );
                  } else {
                    setTarget(num);
                  }
                }}
                style={[
                  styles.chip,
                  {
                    backgroundColor:
                      target === num ? colors.primary : colors.card,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    { color: target === num ? "#1A3C5A" : colors.textPrimary },
                  ]}
                >
                  {num} လုံး
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </RNView>

        {/* ၂။ Rounds Display */}
        <RNView style={styles.middleSection}>
          <RNView
            style={[
              styles.roundBadge,
              { backgroundColor: colors.secondary + "20" },
            ]}
          >
            <MaterialCommunityIcons
              name="counter"
              size={18}
              color={colors.secondary}
            />
            <Text style={[styles.roundText, { color: colors.secondary }]}>
              {rounds} ပတ်ပြည့်
            </Text>
          </RNView>
        </RNView>

        {/* ၃။ Tap Area (The Bead) */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleTap}
          style={styles.tapArea}
        >
          <AnimatePresence exitBeforeEnter>
            <View
              key={animationKey}
              from={{ scale: 0.96, opacity: 0.9 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 12, stiffness: 150 }}
              style={[
                styles.mainBead,
                {
                  backgroundColor: isDarkMode ? colors.card : "#FFF",
                  borderColor: isDarkMode ? colors.border : colors.border,
                },
              ]}
            >
              <RNView
                style={[
                  styles.progressRing,
                  {
                    borderColor: colors.border + "30",
                    borderTopColor: colors.primary,
                    transform: [{ rotate: rotateVal }],
                  },
                ]}
              />
              <Text
                style={[
                  styles.countText,
                  { color: colors.textPrimary, fontSize: fontSize + 40 },
                ]}
              >
                {count}
              </Text>
              <Text
                style={[styles.targetText, { color: colors.textSecondary }]}
              >
                / {target}
              </Text>
            </View>
          </AnimatePresence>
        </TouchableOpacity>

        {/* ၄။ Footer Hint */}
        <RNView style={styles.footer}>
          <Ionicons
            name="finger-print"
            size={20}
            color={colors.textSecondary + "80"}
          />
          <Text
            style={[styles.footerText, { color: colors.textSecondary + "80" }]}
          >
            ပုတီးတစ်လုံးချတိုင်း စက်ဝိုင်းအား နှိပ်ပေးပါ။
          </Text>
        </RNView>

        {isAndroid && (
          <RNView style={styles.bubbleSection}>
            <RNView
              style={[
                styles.bubbleBadge,
                {
                  backgroundColor: isBubbleShowing
                    ? colors.primary + "20"
                    : colors.card,
                },
              ]}
            >
              <Ionicons
                name={isBubbleShowing ? "radio-button-on" : "radio-button-off"}
                size={16}
                color={isBubbleShowing ? colors.primary : colors.textSecondary}
              />
              <Text
                style={[
                  styles.bubbleStatusText,
                  { color: colors.textSecondary },
                ]}
              >
                {isBubbleShowing ? "Floating bubble ON" : "Floating bubble OFF"}
              </Text>
            </RNView>

            <TouchableOpacity
              onPress={isBubbleShowing ? disableBubble : enableBubble}
              style={[
                styles.bubbleButton,
                {
                  backgroundColor: isBubbleShowing
                    ? colors.secondary
                    : colors.primary,
                },
              ]}
            >
              <Text style={styles.bubbleButtonText}>
                {isBubbleShowing ? "Disable Bubble" : "Enable Bubble"}
              </Text>
            </TouchableOpacity>

            {!hasBubblePermission && (
              <Text
                style={[
                  styles.bubbleHint,
                  { color: colors.textSecondary + "B3" },
                ]}
              >
                Requires Android "Display over other apps" permission.
              </Text>
            )}
          </RNView>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  safeArea: { flex: 1 },
  headerRightBtn: { paddingHorizontal: 16 },
  topSection: { marginTop: 10 },
  selectorHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  label: { fontSize: 13, fontWeight: "600" },
  scrollContent: { gap: 10, paddingHorizontal: 24 },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
  },
  chipText: { fontWeight: "bold", fontSize: 14 },
  middleSection: { alignItems: "center", marginTop: 40 },
  roundBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  roundText: { fontWeight: "bold" },
  tapArea: { flex: 1, justifyContent: "center", alignItems: "center" },
  mainBead: {
    width: 240,
    height: 240,
    borderRadius: 120,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  progressRing: {
    position: "absolute",
    width: 264,
    height: 264,
    borderRadius: 132,
    borderWidth: 6,
  },
  countText: { fontWeight: "bold" },
  targetText: { fontSize: 18, marginTop: -4 },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingBottom: 30,
  },
  footerText: { fontSize: 13, textAlign: "center" },
  bubbleSection: {
    alignItems: "center",
    paddingBottom: 22,
    gap: 10,
  },
  bubbleBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  bubbleStatusText: { fontSize: 12, fontWeight: "600" },
  bubbleButton: {
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  bubbleButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
  bubbleHint: {
    fontSize: 11,
    textAlign: "center",
    paddingHorizontal: 18,
  },
});

export default BeadCounterScreen;