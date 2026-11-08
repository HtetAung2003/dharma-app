import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { SIZES } from "../constants/Theme";
import { useTheme } from "../context/ThemeContext";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
const isSmallScreen = SCREEN_HEIGHT < 700;

export default function WelcomeScreen() {
  const router = useRouter();
  const { colors, fontSize, themeMode } = useTheme();
  const insets = useSafeAreaInsets();

  // Dynamic font scaling relative to base 16
  const scale = fontSize / 16;
  const dynamicSize = (base: number) => Math.round(base * scale);

  // Animation shared values for logo halo breathing and line expansion
  const haloScale = useSharedValue(1);
  const haloOpacity = useSharedValue(0.35);
  const dividerWidth = useSharedValue(0);
  const dividerOpacity = useSharedValue(0);

  useEffect(() => {
    // Subtle pulsating glow behind the sacred logo
    haloScale.value = withRepeat(
      withSequence(
        withTiming(1.15, { duration: 2400, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0, { duration: 2400, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );

    haloOpacity.value = withRepeat(
      withSequence(
        withTiming(0.65, { duration: 2400, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.25, { duration: 2400, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );

    // Sleek divider expansion animation from center outward
    dividerWidth.value = withDelay(
      500,
      withTiming(68, { duration: 900, easing: Easing.out(Easing.cubic) }),
    );
    dividerOpacity.value = withDelay(500, withTiming(1, { duration: 700 }));
  }, []);

  const animatedHaloStyle = useAnimatedStyle(() => ({
    transform: [{ scale: haloScale.value }],
    opacity: haloOpacity.value,
  }));

  const animatedDividerStyle = useAnimatedStyle(() => ({
    width: dividerWidth.value,
    opacity: dividerOpacity.value,
  }));

  return (
    <>
      <StatusBar style={themeMode === "dark" ? "light" : "dark"} />

      <LinearGradient
        colors={[
          colors.gradientStart,
          colors.gradientMiddle,
          colors.gradientEnd,
        ]}
        style={styles.gradient}
      >
        <SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
          <View style={styles.container}>
            {/* Header / Sacred Branding Section */}
            <View style={styles.headerSection}>
              {/* Logo with breathing aura */}

              <Animated.View />
              <Image
                source={require("../assets/images/logo.png")}
                style={[
                  styles.logo,
                  {
                    tintColor: colors.primary,
                    width: isSmallScreen ? 104 : 124,
                    height: isSmallScreen ? 104 : 124,
                  },
                ]}
              />

              {/* Greeting */}
              <Animated.Text
                entering={FadeInDown.delay(260).duration(700)}
                style={[
                  styles.greetingText,
                  {
                    color: colors.secondary,
                    fontSize: dynamicSize(isSmallScreen ? 18 : 20),
                  },
                ]}
              >
                မင်္ဂလာပါ
              </Animated.Text>

              {/* App Name: Updated to ဓမ္မရေချမ်း */}
              <Animated.Text
                entering={FadeInDown.delay(380)
                  .duration(800)
                  .springify()
                  .damping(12)}
                style={[
                  styles.appName,
                  {
                    color: colors.primary,
                    fontSize: dynamicSize(isSmallScreen ? 38 : 46),
                  },
                ]}
              >
                ဓမ္မရေချမ်း
              </Animated.Text>
            </View>

            {/* Description & Tagline Section with Expanding Accent Lines */}
            <View style={styles.centerSection}>
              {/* Top Animated Expanding Divider */}
              <Animated.View
                style={[
                  styles.animatedDivider,
                  { backgroundColor: colors.primary },
                  animatedDividerStyle,
                ]}
              />

              {/* Tagline */}
              <Animated.Text
                entering={FadeInDown.delay(520).duration(750)}
                style={[
                  styles.tagline,
                  {
                    color: colors.secondary,
                    fontSize: dynamicSize(isSmallScreen ? 16 : 18),
                  },
                ]}
              >
                စိတ်နှလုံးအေးချမ်းစေဖို့ ဓမ္မလမ်းကိုလျှောက်လှမ်းစို့
              </Animated.Text>

              {/* Body Description */}
              <Animated.View
                entering={FadeInDown.delay(680).duration(800)}
                style={[
                  styles.descriptionCard,
                  {
                    backgroundColor:
                      themeMode === "dark"
                        ? "rgba(255, 255, 255, 0.03)"
                        : "rgba(26, 60, 90, 0.03)",
                    borderColor:
                      themeMode === "dark"
                        ? "rgba(255, 215, 0, 0.12)"
                        : "rgba(26, 60, 90, 0.08)",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.description,
                    {
                      color: colors.textSecondary,
                      fontSize: dynamicSize(isSmallScreen ? 14 : 15),
                      lineHeight: dynamicSize(isSmallScreen ? 24 : 27),
                    },
                  ]}
                >
                  နေ့စဉ်ဘဝရဲ့ ပင်ပန်းနွမ်းနယ်မှုတွေကို{"\n"}
                  တရားတော်များ၊ ပဋ္ဌာန်းဒေသနာတော်များ နာယူရင်း{"\n"}
                  ငြိမ်းချမ်းစွာ ဖြတ်သန်းလိုက်ပါ။
                </Text>
              </Animated.View>

              {/* Bottom Animated Expanding Divider */}
              <Animated.View
                style={[
                  styles.animatedDivider,
                  { backgroundColor: colors.primary },
                  animatedDividerStyle,
                ]}
              />
            </View>

            {/* Action Buttons / Footer Section */}
            <View
              style={[
                styles.footerSection,
                { marginBottom: Math.max(insets.bottom, isSmallScreen ? 8 : 16) },
              ]}
            >
              {/* Primary Action Button */}
              <Animated.View
                entering={FadeInUp.delay(820)
                  .duration(750)
                  .springify()
                  .damping(13)}
              >
                <TouchableOpacity
                  activeOpacity={0.82}
                  style={[
                    styles.button,
                    {
                      backgroundColor: colors.primary,
                      shadowColor: colors.primary,
                    },
                  ]}
                  onPress={() => router.replace("/auth/login")}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        color: colors.textOnPrimary || colors.secondary,
                        fontSize: dynamicSize(17),
                      },
                    ]}
                  >
                    စတင်အသုံးပြုမည်
                  </Text>
                </TouchableOpacity>
              </Animated.View>

              {/* Secondary Outline Action Button */}
              <Animated.View
                entering={FadeInUp.delay(950)
                  .duration(750)
                  .springify()
                  .damping(13)}
              >
                <TouchableOpacity
                  activeOpacity={0.82}
                  style={[
                    styles.outlineButton,
                    {
                      borderColor: colors.primary,
                      backgroundColor:
                        themeMode === "dark"
                          ? "rgba(255, 215, 0, 0.04)"
                          : "rgba(255, 255, 255, 0.6)",
                    },
                  ]}
                  onPress={() => router.replace("/auth/register")}
                >
                  <Text
                    style={[
                      styles.outlineText,
                      {
                        color: colors.primary,
                        fontSize: dynamicSize(16),
                      },
                    ]}
                  >
                    အကောင့်အသစ်ပြုလုပ်ရန်
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding + 4,
    paddingVertical: isSmallScreen ? 12 : 24,
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerSection: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: isSmallScreen ? 4 : 16,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  logoHalo: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  logo: {
    resizeMode: "contain",
  },
  greetingText: {
    fontWeight: "500",
    marginTop: 6,
    letterSpacing: 0.3,
  },
  appName: {
    fontWeight: "bold",
    marginTop: 2,
    letterSpacing: 0.5,
  },
  centerSection: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 8,
    marginVertical: isSmallScreen ? 8 : 16,
  },
  animatedDivider: {
    height: 2.5,
    borderRadius: 2,
    marginVertical: 12,
  },
  tagline: {
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 0.2,
    marginVertical: 4,
  },
  descriptionCard: {
    borderRadius: SIZES.radius + 4,
    borderWidth: 1,
    paddingVertical: isSmallScreen ? 12 : 16,
    paddingHorizontal: 16,
    marginVertical: 8,
    width: "100%",
  },
  description: {
    textAlign: "center",
    fontWeight: "400",
  },
  footerSection: {
    width: "100%",
    gap: 12,
    marginBottom: isSmallScreen ? 6 : 14,
  },
  button: {
    height: isSmallScreen ? 54 : 58,
    borderRadius: SIZES.radius + 2,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    fontWeight: "bold",
    letterSpacing: 0.3,
  },
  outlineButton: {
    height: isSmallScreen ? 54 : 58,
    borderRadius: SIZES.radius + 2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
  },
  outlineText: {
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});
