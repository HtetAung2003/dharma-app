import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import * as QuickActions from "expo-quick-actions";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useRef } from "react";
import { ActivityIndicator, View } from "react-native";
import { COLORS } from "../constants/Theme";

function AppNavigator() {
  const { user, loading: authLoading } = useAuth();
  const { loading: themeLoading } = useTheme();
  const segments = useSegments();
  const router = useRouter();
  const handledInitialQuickAction = useRef(false);
  const loading = authLoading || themeLoading;

  // useEffect(() => {
  //   if (loading) return;
  //   const rootRoute = segments.length === 0 || segments[0] === "index";
  //   const inAuthGroup = segments[0] === "auth";
  //   const isPersonalization = segments[0] === "personalization";
  //   if ((!rootRoute && !inAuthGroup) || isPersonalization)
  //     router.replace("/auth/login");
  //   else if (user && inAuthGroup) router.replace("/main/dashboard");
  // }, [user, loading, segments, router]);

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
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="auth/login" />
      <Stack.Screen name="auth/register" />
      <Stack.Screen name="personalization" />
      <Stack.Screen name="main" options={{ gestureEnabled: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}
