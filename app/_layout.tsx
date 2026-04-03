import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import * as QuickActions from "expo-quick-actions";
import { Stack, useRouter, useSegments } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { COLORS } from '../constants/Theme';
import { auth } from '../services/firebaseConfig';
export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);
  const segments = useSegments();
  const router = useRouter();
  const handledInitialQuickAction = useRef(false);

  //  Firebase Auth State 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      if (initializing) setInitializing(false);
    });

    return unsubscribe; // Cleanup listener on unmount
  }, []);

  
  useEffect(() => {
    if (initializing) return;

    const inAuthGroup = segments[0] === 'auth';

    if (!user && !inAuthGroup) {
     
      router.replace('/auth/login');
    } else if (user && inAuthGroup) {
    
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
      try {
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
      } catch (error) {
        console.warn("Quick actions setup failed", error);
      }
    };

    setupQuickActions();
    let subscription:
      | {
          remove: () => void;
        }
      | undefined;

    try {
      subscription = QuickActions.addListener(handleQuickAction);
    } catch (error) {
      console.warn("Quick actions listener failed", error);
    }

    return () => subscription?.remove();
  }, [router]);

  // Loading ဖြစ်နေစဉ် Screen ဗလာမပြဘဲ Spinner ပြထားခြင်း
  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.dark.splashBackground }}>
        <ActivityIndicator size="large" color={COLORS.dark.splashSpinner} />
      </View>
    );
  }

  return (
    // <SafeAreaView style={{ flex: 1 }} >
      <AuthProvider>
        <ThemeProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="auth/login" />
            <Stack.Screen name="auth/register" />
            <Stack.Screen name="personalization" />
            <Stack.Screen name="main" options={{ gestureEnabled: false }} />
          </Stack>
        </ThemeProvider>
      </AuthProvider>
    // </SafeAreaView>
  );
}

