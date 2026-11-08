import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { colors, fontSize, themeMode } = useTheme();
  const insets = useSafeAreaInsets();
  const scale = fontSize / 16;
  const dynamicSize = (base: number) => Math.round(base * scale);

  // Guarantee that bottom navigation content is placed safely above Android 3-button navigation
  // insets.bottom is typically 48dp on 3-button nav, 16-24dp on gesture nav.
  const safeBottomPadding = Math.max(insets.bottom, Platform.OS === "android" ? 14 : 8);

  const getIconColor = (path: string) =>
    pathname === path ? colors.secondary : colors.iconMuted;

  return (
    <View
      style={[
        styles.navBar,
        {
          backgroundColor: themeMode === "dark" ? colors.surface : colors.card,
          borderTopColor: colors.border,
          paddingBottom: safeBottomPadding,
        },
      ]}
    >
      {/* Home */}
      <TouchableOpacity
        style={styles.navItem}
        activeOpacity={0.7}
        onPress={() => router.push("/main/dashboard")}
      >
        <Ionicons
          name={pathname === "/main/dashboard" ? "home" : "home-outline"}
          size={24}
          color={getIconColor("/main/dashboard")}
        />
        <Text
          style={[styles.navText, { color: getIconColor("/main/dashboard"), fontSize: dynamicSize(11) }]}
        >
          ပင်မ
        </Text>
      </TouchableOpacity>

      {/* Favorite */}
      <TouchableOpacity
        style={styles.navItem}
        activeOpacity={0.7}
        onPress={() => router.push("/main/favorite")}
      >
        <Ionicons
          name={pathname === "/main/favorite" ? "heart" : "heart-outline"}
          size={24}
          color={getIconColor("/main/favorite")}
        />
        <Text
          style={[styles.navText, { color: getIconColor("/main/favorite"), fontSize: dynamicSize(11) }]}
        >
          နှစ်သက်
        </Text>
      </TouchableOpacity>

      {/* Scriptures / Albums */}
      <TouchableOpacity
        style={styles.navItem}
        activeOpacity={0.7}
        onPress={() => router.push("/main/albums")}
      >
        <Ionicons
          name={pathname === "/main/albums" ? "book" : "book-outline"}
          size={24}
          color={getIconColor("/main/albums")}
        />
        <Text style={[styles.navText, { color: getIconColor("/main/albums"), fontSize: dynamicSize(11) }]}>
          ဘုရားစာ
        </Text>
      </TouchableOpacity>

      {/* Bead Counter */}
      <TouchableOpacity
        style={styles.navItem}
        activeOpacity={0.7}
        onPress={() => router.push("/main/beadCounter")}
      >
        <Ionicons
          name={pathname === "/main/beadCounter" ? "leaf" : "leaf-outline"}
          size={24}
          color={getIconColor("/main/beadCounter")}
        />
        <Text
          style={[styles.navText, { color: getIconColor("/main/beadCounter"), fontSize: dynamicSize(11) }]}
        >
          ပုတီး
        </Text>
      </TouchableOpacity>

      {/* Plan / Schedule */}
      <TouchableOpacity
        style={styles.navItem}
        activeOpacity={0.7}
        onPress={() => router.push("/main/mycalendar")}
      >
        <Ionicons
          name={
            pathname === "/main/mycalendar" ? "calendar" : "calendar-outline"
          }
          size={24}
          color={getIconColor("/main/mycalendar")}
        />
        <Text
          style={[styles.navText, { color: getIconColor("/main/mycalendar"), fontSize: dynamicSize(11) }]}
        >
          ပြက္ခဒိန်
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    paddingTop: 10,
    paddingHorizontal: 8,
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 12,
  },
  navItem: { flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 4 },
  navText: { marginTop: 4, fontWeight: "500" },
});

export default BottomNav;
