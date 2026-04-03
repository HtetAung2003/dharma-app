import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

import { usePathname, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { colors, fontSize } = useTheme();
  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;
 
  const getIconColor = (path: string) =>
    pathname === path ? colors.secondary : colors.iconMuted;

  return (
 
      <View style={styles.navBar}>
        {/* Home */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/main/dashboard")}
        >
          <Ionicons
            name={pathname === "/main/dashboard" ? "home" : "home-outline"}
            size={24}
            color={getIconColor("/main/dashboard")}
          />
          <Text style={[styles.navText, { color: getIconColor("/main/dashboard") }]}>
            ပင်မ
          </Text>
        </TouchableOpacity>

        {/* Favorite */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/main/favorite")}
        >
          <Ionicons
            name={pathname === "/main/favorite" ? "heart" : "heart-outline"}
            size={24}
            color={getIconColor("/main/favorite")}
          />
          <Text style={[styles.navText, { color: getIconColor("/main/favorite") }]}>
            နှစ်သက်
          </Text>
        </TouchableOpacity>

        {/* History */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/main/albums")}
        >
          <Ionicons
            name={pathname === "/main/albums" ? "book" : "book-outline"}
            size={24}
            color={getIconColor("/main/albums")}
          />
          <Text
            style={[styles.navText, { color: getIconColor("/main/albums") }]}
          >
            ဘုရားစာ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/main/beadCounter")}
        >
          <Ionicons
            name={
              pathname === "/main/beadCounter"
                ? "leaf"
                : "leaf-outline"
            }
            size={24}
            color={getIconColor("/main/beadCounter")}
          />

          <Text
            style={[
              styles.navText,
              { color: getIconColor("/main/beadCounter") },
            ]}
          >
            ပုတီး
          </Text>
        </TouchableOpacity>
        {/* Plan / Schedule */}
        {/* <TouchableOpacity
          style={styles.navItem}
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
            style={[
              styles.navText,
              { color: getIconColor("/main/mycalendar") },
            ]}
          >
            ပြက္ခဒိန်
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/main/analysis")}
        >
          <Ionicons
            name={
              pathname === "/main/analysis"
                ? "stats-chart"
                : "stats-chart-outline"
            }
            size={24}
            color={getIconColor("/main/analysis")}
          />

          <Text
            style={[styles.navText, { color: getIconColor("/main/analysis") }]}
          >
            စစ်ဆေး
          </Text>
        </TouchableOpacity>
      </View>
  
  );
};

const styles = StyleSheet.create({

  navBar: {
    flexDirection: "row",
   

    padding: 12,
    justifyContent: "space-around",
    alignItems: "center",
    // Shadow (iOS/Android)

    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 10,
  },
  navItem: { flex: 1, alignItems: "center", justifyContent: "center" },
  navText: { fontSize: 10, marginTop: 4, fontWeight: "500" },
});

export default BottomNav;


