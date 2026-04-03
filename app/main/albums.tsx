import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

import { toggleFavorite } from '@/constants/favouriteService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';


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
  const { colors, fontSize, themeMode } = useTheme();
const [favorites, setFavorites] = useState<string[]>([]); // Favorite id 
const [searchQuery, setSearchQuery] = useState(''); //  Search State  
const scale = fontSize / 16;
const dynamicSize = (base: number) => base * scale;

useEffect(() => {
    const loadFavorites = async () => {
      try {
        // take fav data from async storage
        const jsonValue = await AsyncStorage.getItem('user_favorites');
        const favList = jsonValue ? JSON.parse(jsonValue) : [];
        setFavorites(favList.map((f: any) => f.id));  
      } catch (e) {
        console.error(e);
      }
    };
    loadFavorites();
  }, []);

  // fav  function
  const handleToggleFav = async (item: any) => {
    // call fav service to toggle fav in async storage and get the result (added or removed)
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
      { id: '5', title: 'ဘုရားဂုဏ်တော် (၉) ပါး', description: 'ဣတိပိသော ဘဂဝါ စသော ဂုဏ်တော်များ', category: 'Daily', duration: '၃ မိနစ်', componentKey: 'BuddhaCard' },
      { id: '6', title: 'တရားဂုဏ်တော် (၆) ပါး', description: 'သွာက္ခာတော စသော ဂုဏ်တော်များ', category: 'Daily', duration: '၁ မိနစ်', componentKey: 'DhammaCard' },
      { id: '7', title: 'သံဃာ့ဂုဏ်တော် (၉) ပါး', description: 'သုပ္ပဋိပန္နော စသော ဂုဏ်တော်များ', category: 'Daily', duration: '၂ မိနစ်', componentKey: 'SanghaCard' },
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
      { id: 's1', title: 'ဓမ္မစကြာသုတ် ( အနှစ်ချုပ် )', description: 'တရားဦး ဒေသနာတော်', category: 'Sutta', duration: '၁၅ မိနစ်', componentKey: 'DhammacakkaSuttaCard' },
      { id: 's2', title: 'အနတ္တလက္ခဏသုတ်', description: 'အတ္တမဟုတ်ကြောင်း ဟောကြားတော်မူသောသုတ်', category: 'Sutta', duration: '၁၂ မိနစ်', componentKey: 'AnattalakkhanaSuttaCard' },
      { id: 's3', title: 'မဟာသမယသုတ်', description: 'နတ်ချစ်ဂါထာတော်', category: 'Sutta', duration: '၂၀ မိနစ်', componentKey: 'practice-detail-mahasamaya' },
      { id: 's4', title: 'ပဋ္ဌာန်း အကျဉ်း', description: 'အကြောင်းတရား ၂၄ ပါး ကျမ်းမြတ်', category: 'Sutta', duration: '၃ မိနစ်', componentKey: 'PatthanaCard' },
            { id: 's5', title: 'ပဋ္ဌာန်း အကျယ်', description: 'အကြောင်းတရား ၂၄ ပါး ကျမ်းမြတ်', category: 'Sutta', duration: '၁၅ မိနစ်', componentKey: 'PatthanaDetailsCard' },

      { id: 's6', title: 'ဥပ္ပါတသန္တိ', description: 'ဘေးရန်ကင်းရန် ကျမ်းကြီး', category: 'Sutta', duration: '၃၀ မိနစ်', componentKey: 'UppatasantiCard' },
    ]
  },
  {
    sectionTitle: "၄။ ဂါထာတော်များနှင့် အဓိဌာန်များ (Chants)",
    data: [
      { id: 'g1', title: 'ဂုဏ်တော်ကွန်ချာ အန္တရာယ် ကင်းဂါထာ', description: 'အစွမ်းထက် ဂါထာတော်ကြီး', category: 'Gatha', duration: '၅ မိနစ်', componentKey: 'GunTawKonCharCard' },
            { id: 'g6', title: 'ဂုဏ်တော်ကွန်ချာ အပြည့်အစုံ', description: 'အစွမ်းထက် ဂါထာတော်ကြီး', category: 'Gatha', duration: '၁၅ မိနစ်', componentKey: 'GunTawKonCharFullCard' },

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
    ]
  }
];
// for search function that used useMemo to optimize performance by memoizing the filtered results based on the search query and sections data
const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;

    return sections
      .map((section) => ({
        ...section,
        data: section.data.filter((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter((section) => section.data.length > 0); // Only show sections that have results
  }, [searchQuery]);
  // frame navigation handler to navigate to detail screen with component key and id when click on item and also pass the function to toggle fav in detail screen
const handlePress = (item: PlanItem) => {
  router.push({
  
    pathname: '/packagedetails/package-details', 
    params: { 
      id: item.id, 
      title: item.title, 
      category: item.category,
      componentKey: item.componentKey // whwich card to show in detail screen
    }
  });
};

  return (
     <LinearGradient
                  colors={
                    [colors.splashBackground , colors.gradientMiddle , colors.gradientEnd]
                  
                  }
                  
                  style={{ flex: 1 }}
                >
    <SafeAreaView edges={['top']} style={[styles.container]} >
      <View style={styles.header}>
     
        <Text style={[styles.headerTitle, { color: colors.textPrimary, fontSize: dynamicSize(20) }]}>
          ရွတ်ဖတ်ရန် အစီအစဉ်များ
        </Text>
        <View style={{ width: 40 }} />
      </View>
<View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors.inputBackground }]}>
          <Ionicons name="search" size={20} color={colors.textSecondary} style={{ marginRight: 10 }} />
          <TextInput
            placeholder="ခေါင်းစဉ်ဖြင့် ရှာဖွေပါ..."
            placeholderTextColor={colors.textSecondary}
            style={[styles.searchInput, { color: colors.textPrimary }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
     <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {filteredSections.length > 0 ? (
          filteredSections.map((section, sIndex) => (
            <View key={sIndex} style={styles.sectionWrapper}>
              <Text style={[styles.sectionHeader, { color: colors.textPrimary, fontSize: dynamicSize(16) }]}>
                {section.sectionTitle}
              </Text>
              
              <View style={[styles.card]}>
                {section.data.map((item) => {
                  const isFav = favorites.includes(item.id);
                  return (
                    <TouchableOpacity 
                      key={item.id} 
                      style={[styles.itemRow, { backgroundColor: colors.card } ]} 
                      onPress={() => handlePress(item)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.itemTextContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={[styles.itemTitle, { color: colors.textPrimary, fontSize: dynamicSize(16) }]} numberOfLines={1}>
                            {item.title}
                          </Text>
                          <TouchableOpacity style={{ marginLeft: 8, padding: 4 }} onPress={() => handleToggleFav(item)}>
                            <Ionicons name={isFav ? "heart" : "heart-outline"} size={18} color={isFav ? "#FF4B4B" : colors.textSecondary} />
                          </TouchableOpacity>
                        </View>
                        {item.description && (
                          <Text style={[styles.itemSubTitle, { color: colors.textSecondary, fontSize: dynamicSize(12) }]} numberOfLines={1}>
                            {item.description}
                          </Text>
                        )}
                      </View>

                      <View style={styles.itemRightContainer}>
                        {item.duration && (
                          <Text style={[styles.durationText, { color: colors.textPrimary, fontSize: dynamicSize(11) }]}>
                            {item.duration}
                          </Text>
                        )}
                        <Ionicons name="chevron-forward" size={18} color={colors.primary} style={{ marginLeft: 4 }} />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))
        ) : (
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Text style={{ color: colors.textSecondary }}>ရှာဖွေမှု မတွေ့ရှိပါ</Text>
          </View>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 15 },
  backButton: { padding: 5 },
  headerTitle: { fontWeight: 'bold' },
  searchContainer: { paddingHorizontal: 20, marginBottom: 10 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 12,
    height: 45,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  searchInput: { flex: 1, fontSize: 14 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10 },
  sectionWrapper: { marginBottom: 25 },
  sectionHeader: { fontWeight: 'bold', marginBottom: 12, marginLeft: 5 },
  card: { borderRadius: 16, overflow: 'hidden', elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
  itemRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 , marginBottom: 10 },
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

