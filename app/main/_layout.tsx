import { useTheme } from '@/context/ThemeContext';
import { Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import BottomNav from './bottomnav';
import MindfulTipsBanner from './MindfulTipsBanner';

export default function MainLayout() {
        const { colors } = useTheme();
    
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
