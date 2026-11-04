import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

const SETTINGS_LINKS = [
  {
    title: "My Profile",
    subtitle: "အကောင့်အချက်အလက်များ",
    icon: "person-circle-outline" as const,
    route: "/main/profile",
  },
  {
    title: "Personalization",
    subtitle: "အသွင်အပြင်နှင့် စာလုံးအရွယ်အစား",
    icon: "color-palette-outline" as const,
    route: "/personalization",
  },
  {
    title: "History (Analysis)",
    subtitle: "လေ့ကျင့်မှုမှတ်တမ်းနှင့် ဆန်းစစ်ချက်",
    icon: "stats-chart-outline" as const,
    route: "/main/analysis",
  },
  {
    title: "Terms & Privacy Policy",
    subtitle: "စည်းမျဉ်းစည်းကမ်းနှင့် ကိုယ်ရေးလုံခြုံမှု",
    icon: "shield-checkmark-outline" as const,
    route: "/main/legal",
  },
  {
    title: "Contact Us & Support",
    subtitle: "ဆက်သွယ်ရန်နှင့် အကူအညီရယူရန်",
    icon: "help-buoy-outline" as const,
    route: "/main/legal?tab=contact",
  },
];

export default function SettingsScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const goBack = () =>
    router.canGoBack() ? router.back() : router.replace("/main/dashboard");

  return (
    <LinearGradient
      colors={[
        colors.splashBackground,
        colors.gradientMiddle,
        colors.gradientEnd,
      ]}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.header}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={goBack}
            style={[styles.backButton]}
          >
            <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            Settings
          </Text>
        </View>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          သင့်အကောင့်နှင့် အက်ပ်ဆက်တင်များကို စီမံပါ။
        </Text>
        <View style={styles.links}>
          {SETTINGS_LINKS.map((item) => (
            <TouchableOpacity
              key={item.title}
              onPress={() => router.push(item.route as never)}
              style={[
                styles.link,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Ionicons name={item.icon} size={27} color={colors.primary} />
              <View style={styles.linkCopy}>
                <Text style={[styles.linkTitle, { color: colors.textPrimary }]}>
                  {item.title}
                </Text>
                <Text
                  style={[styles.linkSubtitle, { color: colors.textSecondary }]}
                >
                  {item.subtitle}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, padding: 22 },
  title: { fontSize: 28, fontWeight: "700" },
  header: { flexDirection: "row", alignItems: "center", gap: 12 },
  backButton: {
    width: 42,
    height: 42,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: { fontSize: 15, marginTop: 8, marginBottom: 28 },
  links: { gap: 14 },
  link: {
    minHeight: 78,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  linkCopy: { flex: 1, gap: 4 },
  linkTitle: { fontSize: 16, fontWeight: "700" },
  linkSubtitle: { fontSize: 13 },
});
