import MahasamayaSuttaAsurasAndDevas from '@/components/packages/MahasamayaSuttaAsurasAndDevas';
import MahasamayaSuttaFinalPart from '@/components/packages/MahasamayaSuttaFinalPart';
import MahasamayaSuttaFourKings from '@/components/packages/MahasamayaSuttaFourKings';
import MahasamayaSuttaIntroCard from '@/components/packages/MahasamayaSuttaIntroCard';
import MahasamayaSuttaPart2 from '@/components/packages/MahasamayaSuttaPart2';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

export default function PracticeDetailMahasamaya() {

  const { fontSize, themeMode } = useTheme();

  const scale = fontSize / 16;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeMode === 'dark' ? '#05111D' : '#F5F9FF' }]}>
      {/* Header Area */}
 

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
          
            <MahasamayaSuttaIntroCard/>
            <MahasamayaSuttaPart2/>
            <MahasamayaSuttaFourKings/>
            <MahasamayaSuttaAsurasAndDevas/>
            <MahasamayaSuttaFinalPart/>
  
        <View style={{ height: 100 }} /> 
      </ScrollView>

   

   
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  scrollContent: {
   
    paddingTop: 10,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  modalContent: {
    height: '80%', 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  modalHandleWrapper: {
    alignSelf: 'center', 
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
  },
  modalHandle: {
    width: 40, 
    height: 5, 
    borderRadius: 3, 
    backgroundColor: '#CCC',
  },
});

