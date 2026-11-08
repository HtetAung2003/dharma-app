import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { AppState, AppStateStatus, DeviceEventEmitter, NativeModules, Platform } from "react-native";
import FloatingBubble from "@increase21/rn-floating-bubble";
import { saveBeadCounterStats } from "@/services/statsService";

export const BEAD_COUNTER_STATE_KEY = "bead_counter_state_v1";
export const BEAD_COUNTER_FAB_KEY = "bead_counter_fab_enabled_v1";
export const APP_GROUP_ID = "group.com.htetaung.dharmamusicapp";

interface BeadCounterContextType {
  count: number;
  rounds: number;
  target: number;
  startTime: number | null;
  isFabVisible: boolean;
  isHydrated: boolean;
  increment: () => Promise<void>;
  reset: () => Promise<void>;
  setTarget: (target: number) => Promise<void>;
  toggleFab: () => Promise<void>;
  setFabVisible: (visible: boolean) => Promise<void>;
  saveSession: () => Promise<void>;
}

const BeadCounterContext = createContext<BeadCounterContextType | null>(null);

export const BeadCounterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [count, setCount] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [target, setTargetState] = useState(108);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isFabVisible, setIsFabVisibleState] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load persisted state
  useEffect(() => {
    const loadState = async () => {
      try {
        const [rawState, rawFab] = await Promise.all([
          AsyncStorage.getItem(BEAD_COUNTER_STATE_KEY),
          AsyncStorage.getItem(BEAD_COUNTER_FAB_KEY),
        ]);

        if (rawState) {
          const saved = JSON.parse(rawState);
          if (typeof saved?.target === "number") setTargetState(saved.target);
          if (typeof saved?.count === "number") setCount(saved.count);
          if (typeof saved?.rounds === "number") setRounds(saved.rounds);
          if (typeof saved?.startTime === "number" || saved?.startTime === null) {
            setStartTime(saved.startTime);
          }
        }

        if (rawFab === "1") {
          setIsFabVisibleState(true);
        }
      } catch (error) {
        console.warn("Failed to load bead counter state", error);
      } finally {
        setIsHydrated(true);
      }
    };

    loadState();
  }, []);

  // Sync to native iOS App Group UserDefaults or Android Floating Bubble
  const syncToNativeWidget = (c: number, r: number, t: number) => {
    if (Platform.OS === "ios" && NativeModules.BeadCounterBridge?.syncData) {
      try {
        NativeModules.BeadCounterBridge.syncData(c, r, t);
      } catch (e) {
        console.warn("Native widget sync failed", e);
      }
    } else if (Platform.OS === "android") {
      FloatingBubble.updateData({ count: c, rounds: r, target: t }).catch(() => {});
    }
  };

  // Listen to external bead count changes from Android Floating Bubble or Widget
  useEffect(() => {
    if (Platform.OS === "android") {
      const sub = DeviceEventEmitter.addListener(
        "onBeadCountChanged",
        (data: { count?: number; rounds?: number; target?: number }) => {
          if (typeof data.count === "number") setCount(data.count);
          if (typeof data.rounds === "number") setRounds(data.rounds);
          if (typeof data.target === "number") setTargetState(data.target);

          const currentStart = startTime ?? Date.now();
          if (!startTime) setStartTime(currentStart);

          AsyncStorage.setItem(
            BEAD_COUNTER_STATE_KEY,
            JSON.stringify({
              target: data.target ?? target,
              count: data.count ?? 0,
              rounds: data.rounds ?? 0,
              startTime: currentStart,
              updatedAt: Date.now(),
            })
          ).catch(() => {});
        }
      );

      const handleAppStateChange = async (nextState: AppStateStatus) => {
        if (nextState === "active") {
          try {
            const data = await FloatingBubble.getData();
            if (data && typeof data.count === "number") {
              setCount(data.count);
              setRounds(data.rounds);
              if (data.target > 0) setTargetState(data.target);
            }
          } catch (_) {}
        }
      };

      const appStateSub = AppState.addEventListener("change", handleAppStateChange);

      return () => {
        sub.remove();
        appStateSub.remove();
      };
    }
  }, [startTime, target]);

  // Persist state changes
  const persistState = async (
    nextCount: number,
    nextRounds: number,
    nextTarget: number,
    nextStartTime: number | null
  ) => {
    setCount(nextCount);
    setRounds(nextRounds);
    setTargetState(nextTarget);
    setStartTime(nextStartTime);

    syncToNativeWidget(nextCount, nextRounds, nextTarget);

    try {
      await AsyncStorage.setItem(
        BEAD_COUNTER_STATE_KEY,
        JSON.stringify({
          target: nextTarget,
          count: nextCount,
          rounds: nextRounds,
          startTime: nextStartTime,
          updatedAt: Date.now(),
        })
      );
    } catch (error) {
      console.warn("Failed to persist bead counter state", error);
    }
  };

  const increment = async () => {
    let currentStartTime = startTime;
    if (count === 0 && rounds === 0 && !currentStartTime) {
      currentStartTime = Date.now();
    }

    const nextCount = count + 1;

    if (nextCount >= target) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      await persistState(0, rounds + 1, target, currentStartTime);
    } else {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await persistState(nextCount, rounds, target, currentStartTime);
    }
  };

  const reset = async () => {
    await persistState(0, 0, target, null);
  };

  const setTarget = async (newTarget: number) => {
    await persistState(0, 0, newTarget, null);
  };

  const toggleFab = async () => {
    const nextVal = !isFabVisible;
    setIsFabVisibleState(nextVal);
    await AsyncStorage.setItem(BEAD_COUNTER_FAB_KEY, nextVal ? "1" : "0");
  };

  const setFabVisible = async (visible: boolean) => {
    setIsFabVisibleState(visible);
    await AsyncStorage.setItem(BEAD_COUNTER_FAB_KEY, visible ? "1" : "0");
  };

  const saveSession = async () => {
    const duration = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
    const totalBeads = rounds * target + count;

    try {
      await saveBeadCounterStats({
        seconds: duration,
        count: totalBeads,
        rounds,
        presetNumber: target,
      });
      await AsyncStorage.removeItem(BEAD_COUNTER_STATE_KEY);
      setCount(0);
      setRounds(0);
      setStartTime(null);
      syncToNativeWidget(0, 0, target);
    } catch (error) {
      console.warn("Failed to save bead counter session", error);
    }
  };

  return (
    <BeadCounterContext.Provider
      value={{
        count,
        rounds,
        target,
        startTime,
        isFabVisible,
        isHydrated,
        increment,
        reset,
        setTarget,
        toggleFab,
        setFabVisible,
        saveSession,
      }}
    >
      {children}
    </BeadCounterContext.Provider>
  );
};

export const useBeadCounter = () => {
  const context = useContext(BeadCounterContext);
  if (!context) {
    throw new Error("useBeadCounter must be used within BeadCounterProvider");
  }
  return context;
};
