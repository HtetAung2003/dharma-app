import React from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useBeadCounter } from "@/context/BeadCounterContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const FAB_SIZE = 68;
const PADDING = 16;

export const DraggableBeadFAB = () => {
  const { count, rounds, target, isFabVisible, increment } = useBeadCounter();
  const { colors } = useTheme();
  const router = useRouter();

  // Initial position: Bottom right
  const translateX = useSharedValue(SCREEN_WIDTH - FAB_SIZE - PADDING);
  const translateY = useSharedValue(SCREEN_HEIGHT - 220);
  const startX = useSharedValue(SCREEN_WIDTH - FAB_SIZE - PADDING);
  const startY = useSharedValue(SCREEN_HEIGHT - 220);
  const scale = useSharedValue(1);

  const navigateToCounter = () => {
    router.push("/main/beadCounter" as any);
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
      scale.value = withSpring(1.05);
    })
    .onUpdate((event) => {
      // Clamp within screen boundaries
      const nextX = startX.value + event.translationX;
      const nextY = startY.value + event.translationY;

      translateX.value = Math.min(
        Math.max(nextX, PADDING),
        SCREEN_WIDTH - FAB_SIZE - PADDING
      );
      translateY.value = Math.min(
        Math.max(nextY, 60),
        SCREEN_HEIGHT - FAB_SIZE - 80
      );
    })
    .onEnd(() => {
      scale.value = withSpring(1);
      // Magnetic snap to the nearest side (left or right edge)
      const snapX =
        translateX.value > SCREEN_WIDTH / 2
          ? SCREEN_WIDTH - FAB_SIZE - PADDING
          : PADDING;
      translateX.value = withSpring(snapX, { damping: 15, stiffness: 120 });
    });

  const tapGesture = Gesture.Tap()
    .maxDuration(250)
    .onEnd(() => {
      scale.value = withSpring(0.88, { damping: 12, stiffness: 200 }, () => {
        scale.value = withSpring(1, { damping: 10, stiffness: 150 });
      });
      runOnJS(increment)();
    });

  const longPressGesture = Gesture.LongPress()
    .minDuration(500)
    .onEnd(() => {
      runOnJS(navigateToCounter)();
    });

  const composedGesture = Gesture.Race(
    panGesture,
    Gesture.Exclusive(longPressGesture, tapGesture)
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  if (!isFabVisible) return null;

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={[styles.fabContainer, animatedStyle]}>
        {/* Rounds Badge on top */}
        <View style={[styles.roundsBadge, { backgroundColor: colors.secondary }]}>
          <MaterialCommunityIcons name="counter" size={12} color="#FFFFFF" />
          <Text style={styles.roundsBadgeText}>{rounds} ပတ်</Text>
        </View>

        {/* Main Floating Action Button */}
        <View style={[styles.fabButton, { backgroundColor: colors.primary }]}>
          <Text style={styles.beadCountText}>{count}</Text>
          <Text style={styles.targetSubText}>/{target}</Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "center",
    zIndex: 99999,
    elevation: 12,
  },
  roundsBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginBottom: -8,
    zIndex: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  roundsBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
  fabButton: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 7,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  beadCountText: {
    color: "#1A3C5A",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 26,
  },
  targetSubText: {
    color: "#1A3C5A",
    fontSize: 10,
    fontWeight: "600",
    opacity: 0.75,
    marginTop: -2,
  },
});

export default DraggableBeadFAB;
