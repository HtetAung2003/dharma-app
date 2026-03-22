import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { saveReadingTime } from '@/services/statsService';

// အားလုံးသော Card Component များကို Import လုပ်ပါ
import OkasaCard from '@/components/packages/OkasaCard';
import ThilaRequestCard from '@/components/packages/ThilaRequestCard';
import SaranagonCard from '@/components/packages/SaranagonCard';
import MettaSuttaCard from '@/components/packages/MettaSuttaCard';
import DirectionalMettaCard from '@/components/packages/DirectionalMettaCard';
import MangalaSuttaCard from '@/components/packages/MangalaSuttaCard';
import Metta11Card from '@/components/packages/Metta11Card';
import PancaSilaCard from '@/components/packages/PancaSilaCard';
import ParittaNidannCard from '@/components/packages/ParittaNidannCard';
import RatanaSuttaCard from '@/components/packages/RatanaSuttaCard';
import SabbuddheCard from '@/components/packages/SabbuddheCard';
import SharingMeritCard from '@/components/packages/SharingMeritCard';
import TripleGemVirtuesCard from '@/components/packages/TripleGemVirtuesCard';
import PreceptsGuidelineCard from '@/components/guidelines/PreceptsGuidelineCard';

export default function PracticeDetail() {
  const router = useRouter();
  // PlanScreen မှ ပို့လိုက်သော params များကို လက်ခံခြင်း
  const { id, title, category, componentKey } = useLocalSearchParams<{ 
    id: string; 
    title: string; 
    category: 'Paritta' | 'Sutta' | 'Gatha' | 'Daily';
    componentKey: string;
  }>();
  
  const { colors, isDarkMode, fontSize } = useTheme();
  const [showModal, setShowModal] = useState(false);

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  // ⏱ အချိန်မှတ်သားသည့် Logic
  useEffect(() => {
    const startTime = Date.now();
    return () => {
      const endTime = Date.now();
      const secondsRead = Math.floor((endTime - startTime) / 1000);
      if (secondsRead > 5) {
        // category မပါလာပါက default 'Paritta' ဟု သတ်မှတ်မည်
        saveReadingTime(category || 'Paritta', secondsRead);
      }
    };
  }, [category]);

  // 🗂 ComponentKey အလိုက် ပြသမည့် Card ကို ရွေးချယ်ခြင်း
  const SelectedCard = useMemo(() => {
    switch (componentKey) {
      case 'OkasaCard': return <OkasaCard />;
      case 'ThilaRequestCard': return <ThilaRequestCard />;
      case 'SaranagonCard': return <SaranagonCard />;
      case 'MettaSuttaCard': return <MettaSuttaCard />;
      case 'DirectionalMettaCard': return <DirectionalMettaCard />;
      case 'MangalaSuttaCard': return <MangalaSuttaCard />;
      case 'Metta11Card': return <Metta11Card />;
      case 'PancaSilaCard': return <PancaSilaCard />;
      case 'ParittaNidannCard': return <ParittaNidannCard />;
      case 'RatanaSuttaCard': return <RatanaSuttaCard />;
      case 'SabbuddheCard': return <SabbuddheCard />;
      case 'SharingMeritCard': return <SharingMeritCard />;
      case 'TripleGemVirtuesCard': return <TripleGemVirtuesCard />;
      default: 
        return (
          <View style={styles.errorBox}>
            <Text style={{ color: colors.textSecondary }}>ဤစာမျက်နှာအတွက် အချက်အလက်များကို ပြင်ဆင်နေဆဲဖြစ်ပါသည်။</Text>
          </View>
        );
    }
  }, [componentKey, colors]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#05111D' : '#F5F9FF' }]}>
      {/* Header Area */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={26} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary, fontSize: dynamicSize(18) }]}>
          {title}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* ရွေးချယ်ထားသော Card ကို ဤနေရာတွင် ပြပါသည် */}
        {SelectedCard}
      
        <View style={{ height: 100 }} /> 
      </ScrollView>

      {/* Guide ခလုတ် */}
      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => setShowModal(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="book" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Guidelines Modal */}
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#161B22' : '#FFF' }]}>
            <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalHandleWrapper}>
               <Text style={{ color: colors.textPrimary, fontSize: dynamicSize(16) }}>ပိတ်ရန်</Text>
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
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 15 },
  backButton: { padding: 10 },
  headerTitle: { fontWeight: 'bold', flex: 1, textAlign: 'center' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10 },
  fab: { position: 'absolute', right: 20, bottom: 30, width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 8 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContent: { height: '80%', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 20, paddingTop: 10 },
  modalHandleWrapper: { alignSelf: 'center', paddingVertical: 15, width: '100%', alignItems: 'center' },
  errorBox: { padding: 40, alignItems: 'center' }
});