import { useTheme } from '@/context/ThemeContext';
import { Slot } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomNav from './bottomnav';

export default function MainLayout() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const safeBottomPadding = Math.max(insets.bottom, Platform.OS === 'android' ? 14 : 8);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* 1. Main Content Area (Slot) */}
      <View style={{ flex: 1 }}>
        <Slot /> 
      </View>

      {/* 2. Overlay Components Container */}
      <View style={[styles.overlayWrapper, { bottom: 64 + safeBottomPadding }]}>
        {/* Tips Banner */}
        <View style={{ backgroundColor: colors.background, marginBottom: 15 }}>
          {/* <MindfulTipsBanner /> */}
        </View>
      </View>

      {/* 3. Bottom Navigation (sitting cleanly above system nav bar) */}
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  overlayWrapper: {
    position: 'absolute', 
    left: 0,
    right: 0,
    zIndex: 999,        
    backgroundColor: 'transparent', 
  }
});
