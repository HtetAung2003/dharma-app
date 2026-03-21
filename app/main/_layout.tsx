import { Slot } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import BottomNav from './bottomnav'; // Path မှန်အောင်ချိန်ပါ
import MindfulTipsBanner from './MindfulTipsBanner';
import { useTheme } from '@/context/ThemeContext';

export default function MainLayout() {
        const { colors, isDarkMode, fontSize } = useTheme();
    
  return (
<View style={{ flex: 1, backgroundColor: colors.background }}>
  {/* ၁။ Main Content Area (Slot) */}
  <View style={{ flex: 1 }}>
    <Slot /> 
  </View>

  {/* ၂။ Overlay Components Container */}
  <View style={styles.overlayWrapper}>
    {/* Tips Banner */}
    <View style={{ backgroundColor: colors.background ,marginBottom: 15 }}>
    <MindfulTipsBanner />
</View>
    {/* Bottom Navigation */}
    
  </View>
  <BottomNav />
</View>
  );
}

const styles = StyleSheet.create({
  overlayWrapper: {
    position: 'absolute', // Screen ရဲ့ အပေါ်မှာ ထပ်နေစေရန်
    bottom: 80,           // အောက်ခြေမှာ ကပ်ထားရန်
    left: 0,
    right: 0,
    zIndex: 999,        // အခြား ဘယ် Screen Content ထက်မဆို ပိုမြင့်နေစေရန်
    backgroundColor: 'transparent', // အနောက်က content တွေကို မကွယ်စေရန်
  }
});