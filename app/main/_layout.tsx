import { Slot } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import BottomNav from './bottomnav'; // Path မှန်အောင်ချိန်ပါ
import MindfulTipsBanner from './MindfulTipsBanner';
import { useTheme } from '@/context/ThemeContext';

export default function MainLayout() {
        const { colors, isDarkMode, fontSize } = useTheme();
    
  return (
<View style={{ flex: 1, backgroundColor: colors.background }}>
  {/*  Main Content Area (Slot) */}
  <View style={{ flex: 1 }}>
    <Slot /> 
  </View>

  {/* ၂။ Overlay Components Container */}
  <View style={styles.overlayWrapper}>
    {/* Tips Banner */}
    <View style={{ backgroundColor: colors.background ,marginBottom: 15 }}>
    <MindfulTipsBanner />
</View>
   
    
  </View>
   {/* Bottom Navigation */}
  <BottomNav />
</View>
  );
}

const styles = StyleSheet.create({
  overlayWrapper: {
    position: 'absolute', 
    bottom: 80,           
    left: 0,
    right: 0,
    zIndex: 999,        
    backgroundColor: 'transparent', 
  }
});