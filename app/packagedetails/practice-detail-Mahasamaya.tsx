import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import PreceptsGuidelineCard from '@/components/guidelines/PreceptsGuidelineCard';
import MahasamayaSuttaIntroCard from '@/components/packages/MahasamayaSuttaIntroCard';
import MahasamayaSuttaPart2 from '@/components/packages/MahasamayaSuttaPart2';
import MahasamayaSuttaFourKings from '@/components/packages/MahasamayaSuttaFourKings';
import MahasamayaSuttaAsurasAndDevas from '@/components/packages/MahasamayaSuttaAsurasAndDevas';
import MahasamayaSuttaFinalPart from '@/components/packages/MahasamayaSuttaFinalPart';

export default function PracticeDetail() {
  const router = useRouter();
  const { id, title } = useLocalSearchParams();
  const { colors, isDarkMode, fontSize } = useTheme();
  const [showModal, setShowModal] = useState(false);

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#05111D' : '#F5F9FF' }]}>
      {/* Header Area */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={26} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary, fontSize: dynamicSize(20) }]}>
          {title || 'ဥပုသ်စောင့်တည်ခြင်း'}
        </Text>
        <View style={{ width: 40 }} />
      </View>

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

      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => setShowModal(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="book" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Guidelines Modal */}
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' }}>
          <View style={[
            styles.modalContent, 
            { backgroundColor: isDarkMode ? '#161B22' : '#FFF' }
          ]}>
            {/* Handle Bar to close */}
            <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalHandleWrapper}>
               {/* <View style={styles.modalHandle} />  */}
               <Text style={{ marginLeft: 10, color: colors.textPrimary, fontSize: dynamicSize(16) }}>ပိတ်ရန် နှိပ်ပါ</Text>
            </TouchableOpacity>
            
            <ScrollView showsVerticalScrollIndicator={false}>
               <PreceptsGuidelineCard />
               <View style={{ height: 40 }} />
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    paddingHorizontal: 20,
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