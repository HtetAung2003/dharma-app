
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Stack, usePathname } from 'expo-router';
import { View } from 'react-native';
import MindfulTipsBanner from './main/MindfulTipsBanner';


export default function RootLayout() {
  return (
    <AuthProvider>
    <ThemeProvider>
    <Stack screenOptions={{ headerShown: false }}>
     
      <Stack.Screen name="index" /> 
     
      <Stack.Screen name="auth/login" />
      <Stack.Screen name="main/personalization" />
      <Stack.Screen name="main/dashboard" options={{ gestureEnabled: false, headerShown: false }} />

     
    </Stack> 
    
    </ThemeProvider></AuthProvider>
  );
}