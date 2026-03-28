import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import * as QuickActions from "expo-quick-actions";

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);
  const segments = useSegments();
  const router = useRouter();
  const handledInitialQuickAction = useRef(false);

  // ၁။ Firebase Auth State ကို စောင့်ကြည့်ခြင်း
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      if (initializing) setInitializing(false);
    });

    return unsubscribe; // Cleanup listener on unmount
  }, []);

  // ၂။ Auth State ပေါ်မူတည်ပြီး Redirect လုပ်ခြင်း
  useEffect(() => {
    if (initializing) return;

    const inAuthGroup = segments[0] === 'auth';

    if (!user && !inAuthGroup) {
      // User login မဝင်ထားရင် Login screen ကို ပို့မည်
      router.replace('/auth/login');
    } else if (user && inAuthGroup) {
      // Login ဝင်ထားပြီးသားဆိုရင် Dashboard ကို တိုက်ရိုက်ပို့မည်
      router.replace('/main/dashboard');
    }
  }, [user, initializing, segments]);

  useEffect(() => {
    const handleQuickAction = (action?: QuickActions.Action) => {
      const href = action?.params?.href;
      if (typeof href === "string" && href.length > 0) {
        router.push(href as any);
      }
    };

    const setupQuickActions = async () => {
      const supported = await QuickActions.isSupported();
      if (!supported) return;

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
    };

    setupQuickActions();
    const subscription = QuickActions.addListener(handleQuickAction);
    return () => subscription.remove();
  }, [router]);

  // Loading ဖြစ်နေစဉ် Screen ဗလာမပြဘဲ Spinner ပြထားခြင်း
  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" /> 
          <Stack.Screen name="auth/login" />
          <Stack.Screen name="auth/register" />
          <Stack.Screen name="main/personalization" />
          <Stack.Screen name="main/dashboard" options={{ gestureEnabled: false }} />
        </Stack> 
      </ThemeProvider>
    </AuthProvider>
  );
}
