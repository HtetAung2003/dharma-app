import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toggleFavorite } from '@/constants/favouriteService';

interface PlanItem {
  id: string;
  title: string;
  subTitle?: string;
  description?: string;
  duration: string;
  componentKey: string;
  category: 'Paritta' | 'Sutta' | 'Gatha' | 'Daily';
}

interface PlanSection {
  sectionTitle: string;
  data: PlanItem[];
}

const PlanScreen = () => {
  const router = useRouter();
  const { colors, isDarkMode, fontSize } = useTheme();
const [favorites, setFavorites] = useState<string[]>([]); // Favorite id များကို သိမ်းရန်
  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;
useEffect(() => {
    const loadFavorites = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user_favorites');
        const favList = jsonValue ? JSON.parse(jsonValue) : [];
        setFavorites(favList.map((f: any) => f.id));
      } catch (e) {
        console.error(e);
      }
    };
    loadFavorites();
  }, []);

  // ❤️ Favorite Icon ကို နှိပ်သည့်အခါ
  const handleToggleFav = async (item: any) => {
    const isAdded = await toggleFavorite({
      id: item.id,
      title: item.title,
      componentKey: item.componentKey
    });

    if (isAdded) {
      setFavorites([...favorites, item.id]);
    } else {
      setFavorites(favorites.filter(id => id !== item.id));
    }
  };
const sections: PlanSection[] = [
  {
    sectionTitle: "၁။ အခြေခံ ဝတ်ပြုခြင်း (Daily Devotion)",
    data: [
      { id: '1', title: 'နမောတဿ', description: 'မြတ်စွာဘုရားအား ကန်တော့ခြင်း', category: 'Daily', duration: '၁ မိနစ်', componentKey: 'OkasaCard' },
      { id: '2', title: 'တိသရဏဂုံ', description: 'သရဏဂုံ သုံးပါးဆောက်တည်ခြင်း', category: 'Daily', duration: '၂ မိနစ်', componentKey: 'SaranagonCard' },
      { id: '3', title: 'ငါးပါးသီလ', description: 'သီလခံယူခြင်း', category: 'Daily', duration: '၃ မိနစ်', componentKey: 'PancaSilaCard' },
      { id: '4', title: 'ဩကာသ', description: 'ကန်တော့ခန်း', category: 'Daily', duration: '၂ မိနစ်', componentKey: 'OkasaCard' },
      { id: '5', title: 'ဘုရားဂုဏ်တော် (၉) ပါး', description: 'ဣတိပိသော ဘဂဝါ စသော ဂုဏ်တော်များ', category: 'Daily', duration: '၃ မိနစ်', componentKey: 'TripleGemVirtuesCard' },
      { id: '6', title: 'တရားဂုဏ်တော် (၆) ပါး', description: 'သွာက္ခာတော စသော ဂုဏ်တော်များ', category: 'Daily', duration: '၁ မိနစ်', componentKey: 'TripleGemVirtuesCard' },
      { id: '7', title: 'သံဃာ့ဂုဏ်တော် (၉) ပါး', description: 'သုပ္ပဋိပန္နော စသော ဂုဏ်တော်များ', category: 'Daily', duration: '၂ မိနစ်', componentKey: 'TripleGemVirtuesCard' },
    ]
  },
  {
    sectionTitle: "၂။ ပရိတ်ကြီး (၁၁) သုတ် (Protective Discourses)",
    data: [
      { id: 'p1', title: 'မင်္ဂလသုတ်', description: 'ကြီးပွားကြောင်း မင်္ဂလာတရားများ', category: 'Paritta', duration: '၅ မိနစ်', componentKey: 'MangalaSuttaCard' },
      { id: 'p2', title: 'ရတနသုတ်', description: 'ဘေးဥပဒ်အန္တရာယ် ကင်းဝေးစေရန်', category: 'Paritta', duration: '၇ မိနစ်', componentKey: 'RatanaSuttaCard' },
      { id: 'p3', title: 'မေတ္တသုတ်', description: 'မေတ္တာပွားများခြင်း', category: 'Paritta', duration: '၄ မိနစ်', componentKey: 'MettaSuttaCard' },
      { id: 'p4', title: 'ခန္ဓသုတ်', description: 'သတ္တဝါတို့၏ ဘေးမှ ကာကွယ်ရန်', category: 'Paritta', duration: '၄ မိနစ်', componentKey: 'KhandhaSuttaCard' },
      { id: 'p5', title: 'မောရသုတ်', description: 'အစောင့်အရှောက်ယူခြင်း', category: 'Paritta', duration: '၃ မိနစ်', componentKey: 'MoraSuttaCard' },
      { id: 'p6', title: 'ဝဋ္ဋသုတ်', description: 'မီးဘေးမှ ကာကွယ်ရန်', category: 'Paritta', duration: '၂ မိနစ်', componentKey: 'WattaSuttaCard' },
      { id: 'p7', title: 'ဓဇဂ္ဂသုတ်', description: 'ကြောက်ရွံ့ခြင်းကို ဖယ်ရှားရန်', category: 'Paritta', duration: '၈ မိနစ်', componentKey: 'DhajaggaSuttaCard' },
      { id: 'p8', title: 'အာဋာနာဋိယသုတ်', description: 'နတ်ဆိုးဘေးမှ ကာကွယ်ရန်', category: 'Paritta', duration: '၁၀ မိနစ်', componentKey: 'AtanatiyaSuttaCard' },
      { id: 'p9', title: 'အင်္ဂုလိမာလသုတ်', description: 'မီးဖွားရလွယ်ကူစေရန်', category: 'Paritta', duration: '၂ မိနစ်', componentKey: 'AngulimalaSuttaCard' },
      { id: 'p10', title: 'ဗောဇ္ဈင်္ဂသုတ်', description: 'ရောဂါကင်းဝေးစေရန်', category: 'Paritta', duration: '၄ မိနစ်', componentKey: 'BojjhangaSuttaCard' },
      { id: 'p11', title: 'ပုဗ္ဗဏှသုတ်', description: 'နံနက်ခင်း ကောင်းကျိုးများ ရရှိရန်', category: 'Paritta', duration: '၅ မိနစ်', componentKey: 'PubbanhaSuttaCard' },
    ]
  },
  {
    sectionTitle: "၃။ ဒေသနာတော်နှင့် ကျမ်းစာများ (Major Discourses)",
    data: [
      { id: 's1', title: 'ဓမ္မစကြာသုတ်', description: 'တရားဦး ဒေသနာတော်', category: 'Sutta', duration: '၁၅ မိနစ်', componentKey: 'DhammacakkaCard' },
      { id: 's2', title: 'အနတ္တလက္ခဏသုတ်', description: 'အတ္တမဟုတ်ကြောင်း ဟောကြားတော်မူသောသုတ်', category: 'Sutta', duration: '၁၂ မိနစ်', componentKey: 'AnattalakkhanaCard' },
      { id: 's3', title: 'မဟာသမယသုတ်', description: 'နတ်ချစ်ဂါထာတော်', category: 'Sutta', duration: '၂၀ မိနစ်', componentKey: 'MahasamayaCard' },
      { id: 's4', title: 'ပဋ္ဌာန်း', description: 'အကြောင်းတရား ၂၄ ပါး ကျမ်းမြတ်', category: 'Sutta', duration: '၁၅ မိနစ်', componentKey: 'PatthanaCard' },
      { id: 's5', title: 'ဥပ္ပါတသန္တိ', description: 'ဘေးရန်ကင်းရန် ကျမ်းကြီး', category: 'Sutta', duration: '၃၀ မိနစ်', componentKey: 'UppatasantiCard' },
    ]
  },
  {
    sectionTitle: "၄။ ဂါထာတော်များနှင့် အဓိဌာန်များ (Chants)",
    data: [
      { id: 'g1', title: 'ဂုဏ်တော်ကွန်ချာ', description: 'အစွမ်းထက် ဂါထာတော်ကြီး', category: 'Gatha', duration: '၅ မိနစ်', componentKey: 'GundawKunchaCard' },
      { id: 'g2', title: 'ရှင်သီဝလိဂါထာ', description: 'လာဘ်လာဘ ပေါများရန်', category: 'Gatha', duration: '၃ မိနစ်', componentKey: 'ShinThiwaliCard' },
      { id: 'g3', title: 'သမ္ဗုဒ္ဓေဂါထာ', description: 'ဘုရားပေါင်းများစွာကို ရှိခိုးခြင်း', category: 'Gatha', duration: '၂ မိနစ်', componentKey: 'SabbuddheCard' },
      { id: 'g4', title: 'ဇယန္တော ဂါထာ', description: 'အောင်ဂါထာတော်', category: 'Gatha', duration: '၂ မိနစ်', componentKey: 'JayantoCard' },
      { id: 'g5', title: 'သောဠသ မင်္ဂလာ', description: '၁၆ ပါးသော မင်္ဂလာဂါထာ', category: 'Gatha', duration: '၃ မိနစ်', componentKey: 'SolasaMangalaCard' },
    ]
  },
  {
    sectionTitle: "၅။ မေတ္တာပို့နှင့် အမျှဝေ (Loving-kindness)",
    data: [
      { id: 'm1', title: 'မေတ္တာပို့', description: 'အရပ်မျက်နှာအလိုက် မေတ္တာပို့သခြင်း', category: 'Daily', duration: '၅ မိနစ်', componentKey: 'DirectionalMettaCard' },
      { id: 'm2', title: 'အမျှဝေခြင်း', subTitle: 'ပြုပြုသမျှ ကုသိုလ်အမျှဝေခြင်း', category: 'Daily', duration: '၂ မိနစ်', componentKey: 'SharingMeritCard' },
      { id: 'm3', title: 'ဆုတောင်းခြင်း', description: 'နိဗ္ဗာန်ဆုတောင်းနှင့် လိုရာဆုတောင်း', category: 'Daily', duration: '၂ မိနစ်', componentKey: 'PrayerCard' },
    ]
  }
];
const handlePress = (item: PlanItem) => {
  router.push({
    // ⚠️ Path ကို သေချာစစ်ဆေးပါ (app folder ထဲက လမ်းကြောင်းအတိုင်း ဖြစ်ရပါမယ်)
    pathname: '/packagedetails/package-details', 
    params: { 
      id: item.id, 
      title: item.title, 
      category: item.category,
      componentKey: item.componentKey // Detail screen မှာ ဘယ် Card ပြရမလဲ သိအောင် ပို့ပေးခြင်း
    }
  });
};

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#05111D' : '#F5F9FF' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={26} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary, fontSize: dynamicSize(20) }]}>
          ရွတ်ဖတ်ရန် အစီအစဉ်များ
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {sections.map((section, sIndex) => (
          <View key={sIndex} style={styles.sectionWrapper}>
            <Text style={[styles.sectionHeader, { color: colors.primary, fontSize: dynamicSize(16) }]}>
              {section.sectionTitle}
            </Text>
            
            <View style={[styles.card, { backgroundColor: isDarkMode ? '#161B22' : '#FFFFFF' }]}>
             {section.data.map((item, index) => {
      const isFav = favorites.includes(item.id); // Favorite ဖြစ်မဖြစ် စစ်ဆေးခြင်း

      return (
     <TouchableOpacity 
  key={item.id} 
  style={styles.itemRow} 
  onPress={() => handlePress(item)}
  activeOpacity={0.7}
>
  {/* ဘယ်ဘက်ခြမ်း: ခေါင်းစဉ်၊ Favourite နှင့် ဖော်ပြချက် */}
  <View style={styles.itemTextContainer}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text 
        style={[styles.itemTitle, { color: colors.textPrimary, fontSize: dynamicSize(16) }]}
        numberOfLines={1}
      >
        {item.title}
      </Text>
      
      {/* 🌟 Favorite Icon Button */}
      <TouchableOpacity 
        style={{ marginLeft: 8, padding: 4 }} 
        onPress={() => handleToggleFav(item)}
      >
        <Ionicons 
          name={isFav ? "heart" : "heart-outline"} 
          size={18} 
          color={isFav ? "#FF4B4B" : colors.textSecondary} 
        />
      </TouchableOpacity>
    </View>
    
    {item.description && (
      <Text 
        style={[styles.itemSubTitle, { color: colors.textSecondary, fontSize: dynamicSize(12) }]}
        numberOfLines={1}
      >
        {item.description}
      </Text>
    )}
  </View>

  {/* ညာဘက်ခြမ်း: ကြာချိန် နှင့် မြှားခေါင်း */}
  <View style={styles.itemRightContainer}>
    {item.duration && (
      <Text style={[styles.durationText, { color: colors.primary, fontSize: dynamicSize(11) }]}>
        {item.duration}
      </Text>
    )}
    <Ionicons 
      name="chevron-forward" 
      size={18} 
      color={colors.textSecondary} 
      style={{ marginLeft: 4 }}
    />
  </View>
</TouchableOpacity>
      );
    })}
            </View>
          </View>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 15 },
  backButton: { padding: 5 },
  headerTitle: { fontWeight: 'bold' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10 },
  sectionWrapper: { marginBottom: 25 },
  sectionHeader: { fontWeight: 'bold', marginBottom: 12, marginLeft: 5 },
  card: { borderRadius: 16, overflow: 'hidden', elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
  itemRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  itemTextContainer: { flex: 1 },
  itemTitle: { fontWeight: '600' },
  itemSubTitle: { marginTop: 4 },

 
  itemRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minWidth: 60, // နေရာလွတ် အနည်းဆုံး သတ်မှတ်ခြင်း
  },
  durationText: {
    fontWeight: '600',
    textAlign: 'right',
  },
 
});

export default PlanScreen;