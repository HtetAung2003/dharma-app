import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SIZES } from "../constants/Theme";
import { useTheme } from "../context/ThemeContext";

const { height } = Dimensions.get("window");

export default function WelcomeScreen() {
  const router = useRouter();
  const { colors, fontSize, themeMode } = useTheme();

  // Calculate scale proportionally based on base font size (default base: 16)
  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <>
      <StatusBar style={themeMode === "dark" ? "light" : "dark"} />

      <LinearGradient
        colors={
          themeMode === "dark"
            ? [colors.gradientStart, colors.gradientMiddle, colors.gradientEnd]
            : [colors.gradientStart, colors.gradientMiddle, colors.gradientEnd]
        }
        style={styles.background}
      >
        <View style={styles.innerContent}>
          <View style={styles.headerSection}>
            <View style={styles.logoCircle}>
              <Image
                source={require("../assets/images/logo.png")}
                style={[styles.logo, { tintColor: colors.primary }]}
              />
            </View>
            {/* Greeting text - dynamically scaled based on base size 20 */}
            <Text
              style={[
                {
                  color: colors.secondary,
                  fontSize: dynamicSize(20),
                },
              ]}
            >
              မင်္ဂလာပါ
            </Text>
            {/* App name - dynamically scaled based on base size 46 */}
            <Text
              style={[
                styles.appName,
                {
                  color: colors.primary,
                  fontSize: dynamicSize(46),
                },
              ]}
            >
              Dharma
            </Text>
          </View>

          <View style={styles.descriptionSection}>
            <View
              style={[styles.divider, { backgroundColor: colors.primary }]}
            />

            <Text
              style={[
                styles.tagline,
                {
                  color: colors.secondary,
                  fontSize: dynamicSize(18),
                },
              ]}
            >
              စိတ်နှလုံးအေးချမ်းစေဖို့ ဓမ္မလမ်းကိုလျှောက်လှမ်းစို့
            </Text>

            <Text
              style={[
                styles.description,
                {
                  color: colors.textSecondary,
                  fontSize: dynamicSize(16),
                },
              ]}
            >
              နေ့စဉ်ဘဝရဲ့ ပင်ပန်းနွမ်းနယ်မှုတွေကို {"\n"}
              တရားတော်များ၊ ပဋ္ဌာန်းဒေသနာတော်များ နာယူရင်း {"\n"}
              ငြိမ်းချမ်းစွာ ဖြတ်သန်းလိုက်ပါ။
            </Text>

            <View
              style={[styles.divider, { backgroundColor: colors.primary }]}
            />
          </View>

          <View style={styles.footerSection}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={() => router.replace("/auth/login")}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: colors.secondary,
                    fontSize: dynamicSize(18),
                  },
                ]}
              >
                စတင်အသုံးပြုမည်
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.outlineButton, { borderColor: colors.primary }]}
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
          </View>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  innerContent: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    justifyContent: "space-between",
    paddingVertical: height * 0.05, // Reduce padding for larger font sizes to prevent overflow
  },
  headerSection: { alignItems: "center" },
  logoCircle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  logo: { width: 120, height: 120, resizeMode: "contain" },
  appName: { fontWeight: "bold", marginTop: 5 },
  descriptionSection: { alignItems: "center" },
  divider: { width: 40, height: 2, marginVertical: 10, opacity: 0.6 },
  tagline: { fontWeight: "600", textAlign: "center", marginBottom: 10 },
  description: { textAlign: "center", lineHeight: 28 },
  footerSection: { width: "100%", gap: 12 },
  button: {
    height: 60,
    borderRadius: SIZES.radius,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { fontWeight: "bold" },
  outlineButton: {
    height: 60,
    borderRadius: SIZES.radius,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
  },
  outlineText: { fontWeight: "600" },
});
