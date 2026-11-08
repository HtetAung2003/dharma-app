import { BeadCounterProvider } from "@/context/BeadCounterContext";
import { DraggableBeadFAB } from "@/components/DraggableBeadFAB";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import * as QuickActions from "expo-quick-actions";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { COLORS } from "../constants/Theme";

function AppNavigator() {
  const { loading: authLoading } = useAuth();
  const { themeMode, loading: themeLoading } = useTheme();
  const router = useRouter();
  const handledInitialQuickAction = useRef(false);
  const loading = authLoading || themeLoading;

  useEffect(() => {
    const handleQuickAction = (action?: QuickActions.Action) => {
      const href = action?.params?.href;
      if (typeof href === "string" && href.length > 0) router.push(href as any);
    };
    const setupQuickActions = async () => {
      try {
        if (!(await QuickActions.isSupported())) return;
        await QuickActions.setItems([
          {
            id: "bead-counter",
            title: "Bead Counter",
            subtitle: "Continue your count",
            icon: "task",
            params: { href: "/main/beadCounter" },
          },
        ]);
        if (!handledInitialQuickAction.current) {
          handledInitialQuickAction.current = true;
          handleQuickAction(QuickActions.initial);
        }
      } catch (error) {
        console.warn("Quick actions setup failed", error);
      }
    };
    setupQuickActions();
    let subscription: { remove: () => void } | undefined;
    try {
      subscription = QuickActions.addListener(handleQuickAction);
    } catch (error) {
      console.warn("Quick actions listener failed", error);
    }
    return () => subscription?.remove();
  }, [router]);

  if (loading)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.dark.splashBackground,
        }}
      >
        <ActivityIndicator size="large" color={COLORS.dark.splashSpinner} />
      </View>
    );
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style={themeMode === "dark" ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/register" />
        <Stack.Screen name="personalization" />
        <Stack.Screen name="main" options={{ gestureEnabled: false }} />
      </Stack>
      <DraggableBeadFAB />
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <ThemeProvider>
        <AuthProvider>
          <BeadCounterProvider>
            <AppNavigator />
          </BeadCounterProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
