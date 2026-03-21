import { useState, useMemo } from 'react';import { View, FlatList, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'moti';
import { BlurView } from 'expo-blur';

const PACKAGES_DATA = [
    { 
        id: 'okasa', 
        title: 'ဩကာသ ပန်ကြားလွှာ', 
        description: 'နိစ္စသီလအဖြစ် နေ့စဉ်စောင့်ထိန်းရန်',
        duration: '၂ မိနစ်', 
        path: '/packagedetails/reader',
        componentKey: 'OkasaCard'
    },    { 
        id: 'saranagon', 
        title: 'သရဏဂုံ သုံးပါး', 
        description: 'ဗုဒ္ဓံ၊ ဓမ္မံ၊ သံဃံ သရဏံ ဂစ္ဆာမိ', 
        duration: '၁ မိနစ်', 
        path: '/packagedetails/reader', 
        componentKey: 'SaranagonCard' 
    },
    { 
        id: 'triple_gem', 
        title: 'ရတနာသုံးပါး ဂုဏ်တော်', 
        description: 'ဘုရား (၉) ပါး၊ တရား (၆) ပါး၊ သံဃာ (၉) ပါး', 
        duration: '၅ မိနစ်', 
        path: '/packagedetails/reader', 
        componentKey: 'TripleGemVirtuesCard' 
    },
     { 
        id: 'metta_11', 
        title: 'မေတ္တာ (၁၁) နည်း', 
        description: 'လုံးစုံများစွာ သတ္တဝါ၊ ချမ်းသာကိုယ်စိတ် မြဲပါစေ', 
        duration: '၅ မိနစ်', 
        path: '/packagedetails/reader', 
        componentKey: 'Metta11Card' 
    },
      { 
        id: 'paritta_nidann', 
        title: 'ပရိတ်ကြီး နိဒါန်း', 
        description: 'သမန္တာ စက္ကဝါဠေသု အစရှိသော နတ်ပင့်', 
        duration: '၃ မိနစ်', 
        path: '/packagedetails/reader', 
        componentKey: 'ParittaNidannCard' 
    },
        { 
        id: 'patthana', 
        title: 'ပဋ္ဌာန်း (၂၄) ပစ္စည်း', 
        description: 'ဟေတုပစ္စယော အစရှိသော ပဋ္ဌာန်းဒေသနာတော်', 
        duration: '၁၀ မိနစ်', 
        path: '/packagedetails/reader', 
        componentKey: 'PatthanaCard' 
    },
     { 
        id: 'dhammacakka_truth', 
        title: 'ဓမ္မစကြာ (သစ္စာ ၄ ပါး)', 
        description: 'ဒုက္ခ၊ သမုဒယ၊ နိရောဓ၊ မဂ္ဂ သစ္စာ', 
        duration: '၁၀ မိနစ်', 
        path: '/packagedetails/reader', 
        componentKey: 'DhammacakkaFourTruthsCard' 
    },
       { 
        id: 'directional_metta', 
        title: 'ဒိသာဖရဏ မေတ္တာ', 
        description: 'အရပ်ဆယ်မျက်နှာ မေတ္တာပို့', 
        duration: '၈ မိနစ်', 
        path: '/packagedetails/reader', 
        componentKey: 'DirectionalMettaCard' 
    },
     { 
        id: 'sabbuddhe', 
        title: 'သဗ္ဗုဒ္ဓေ ဂါထာတော်', 
        description: 'ဘေးအန္တရာယ် ကင်းရှင်းစေသော', 
        duration: '၃ မိနစ်', 
        path: '/packagedetails/reader', 
        componentKey: 'SabbuddheCard' 
    },
    { 
        id: 'thila_request', 
        title: 'ငါးပါးသီလ တောင်းခံခြင်း', 
        description: 'အဟံ ဘန္တေ အစချီသော သီလတောင်းစာ', 
        duration: '၁ မိနစ်', 
        path: '/packagedetails/reader', 
        componentKey: 'ThilaRequestCard' 
    },

    { 
        id: 'panca_sila', 
        title: 'ငါးပါးသီလ ခံယူဆောက်တည်ခြင်း', 
        description: 'ပါဏာတိပါတာ အစရှိသော သိက္ခာပုဒ် (၅) ပါး', 
        duration: '၂ မိနစ်', 
        path: '/packagedetails/reader', 
        componentKey: 'PancaSilaCard' 
    },
    
   
 
    { 
        id: 'metta_sutta', 
        title: 'မေတ္တာသုတ်', 
        description: 'ဘေးရန်ကင်း၍ ကျက်သရေမင်္ဂလာနှင့် ပြည့်စုံစေသော', 
        duration: '၅ မိနစ်', 
        path: '/packagedetails/reader', 
        componentKey: 'MettaSuttaCard' 
    },
    { 
        id: 'mangala_sutta', 
        title: 'မင်္ဂလသုတ်', 
        description: 'မင်္ဂလာတရား (၃၈) ပါး', 
        duration: '၅ မိနစ်', 
        path: '/packagedetails/reader', 
        componentKey: 'MangalaSuttaCard' 
    },
    { 
        id: 'ratana_sutta', 
        title: 'ရတနသုတ်', 
        description: 'ကပ်ကြီးသုံးပါး ကျော်နင်းစေသော', 
        duration: '၅ မိနစ်', 
        path: '/packagedetails/reader', 
        componentKey: 'RatanaSuttaCard' 
    },
  
   

    { 
        id: 'patthana_detail', 
        title: 'ပဋ္ဌာန်း (အကျယ်)', 
        description: 'ပစ္စယနိဒ္ဒေသ အကျယ်ရွတ်ဆိုပုံ', 
        duration: '၂၀ မိနစ်', 
        path: '/packagedetails/reader', 
        componentKey: 'PatthanaDetailCard' 
    },
    { 
        id: 'dhammacakka', 
        title: 'ဓမ္မစကြာ', 
        description: 'မြတ်စွာဘုရား၏ ပထမဆုံး တရားဦး', 
        duration: '၁၅ မိနစ်', 
        path: '/packagedetails/reader', 
        componentKey: 'DhammacakkaSuttaCard' 
    },
   
    { 
        id: 'gun_taw_kon_char', 
        title: 'ဂုဏ်တော်ကွန်ချာ', 
        description: 'ဘေးအန္တရာယ်ကင်း ဂါထာတော်', 
        duration: '၅ မိနစ်', 
        path: '/packagedetails/reader', 
        componentKey: 'GunTawKonCharCard' 
    },
    { 
        id: 'shin_thiwali', 
        title: 'ရှင်သီဝလိဂါထာ', 
        description: 'လာဘ်လာဘ ပေါများစေသော', 
        duration: '၃ မိနစ်', 
        path: '/packagedetails/reader', 
        componentKey: 'ShinThiwaliGathaCard' 
    },
    { 
        id: 'bojjhanga', 
        title: 'ဗောဇ္ဈင်္ဂသုတ်', 
        description: 'ရောဂါဘယ ကင်းရှင်းစေသော', 
        duration: '၈ မိနစ်', 
        path: '/packagedetails/reader', 
        componentKey: 'BojjhangaSuttaCard' 
    },
    { 
        id: 'sharing_merit', 
        title: 'အမျှပေးဝေခြင်း', 
        description: 'ဤသို့ပြုရ မြတ်ပုညကို', 
        duration: '၂ မိနစ်', 
        path: '/packagedetails/reader', 
        componentKey: 'SharingMeritCard' 
    },
];

export default function AlbumsScreen() {
      const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const { colors,fontSize ,isDarkMode} = useTheme();
    const scale = fontSize / 16;
    const dynamicSize = (base: number) => base * scale;
const filteredData = useMemo(() => {
        return PACKAGES_DATA.filter((item) => 
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);
    const handlePress = (item: typeof PACKAGES_DATA[0]) => {
        router.push({
            pathname: item.path as any,
            params: { 
                id: item.id, 
                title: item.title,
                componentKey: item.componentKey
            }
        });
    };

    const renderItem = ({ item }: { item: typeof PACKAGES_DATA[0] }) => (
        <TouchableOpacity 
            style={[styles.card, { backgroundColor: colors.cardBackground }]} 
            onPress={() => handlePress(item)}
        >
            <View style={styles.cardContent}>
                <Text style={[styles.title, { color: colors.textPrimary }]}>{item.title}</Text>
                <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={2}>
                    {item.description}
                </Text>
                <View style={styles.footer}>
                    <Text style={[styles.duration, { color: colors.primary }]}>{item.duration}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
          <LinearGradient
                    colors={isDarkMode ? ['#0F0F0F', '#1A1A1A', '#000000'] : ['#F5F9FF', '#E0E7FF', '#FFFFFF']}
                    style={styles.background}
                >
         <SafeAreaView style={styles.container} edges={['top']}>
        <View style={[styles.container]}>
                <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: colors.textPrimary, fontSize: dynamicSize(24) }]}>
                    ဘုရားစာများ
                </Text>
                <Text style={[styles.headerSubtitle, { color: colors.textSecondary, fontSize: dynamicSize(14) }]}>
                    နေ့စဉ် ရွတ်ဖတ်ပူဇော်နိုင်သော ဘုရားစာနှင့် သီလများ
                </Text>
            </View>
            <View style={styles.searchContainer}>
                                <BlurView intensity={isDarkMode ? 20 : 40} tint={isDarkMode ? "dark" : "light"} style={[styles.glassInput, { borderColor: colors.border }]}>
                                    <Ionicons name="search-outline" size={20} color={colors.textSecondary} style={styles.searchIcon} />
                                  <TextInput
            placeholder="ဘုရားစာအမည်ဖြင့် ရှာဖွေပါ..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery} // state နဲ့ ချိတ်မယ်
            onChangeText={setSearchQuery} // စာရိုက်တိုင်း state ကို update လုပ်မယ်
            style={[styles.input, { color: colors.textPrimary, fontSize: dynamicSize(16) }]}
        />
        {/* စာသားတွေ အမြန်ဖျက်ဖို့ Close icon လေးပါ ထည့်ပေးနိုင်ပါတယ် */}
        {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={18} color={colors.textSecondary} />
            </TouchableOpacity>
        )}
                                </BlurView>
                            </View>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}>
    <View style={styles.listContainer}>
        {/* PACKAGES_DATA အစား filteredData ကို သုံးပါ */}
        {filteredData.length > 0 ? (
            filteredData.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    onPress={() => handlePress(item)}
                    style={[
                        styles.listItem,
                        {  
                            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
                            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#E0E0E0'
                        }
                    ]}
                >
                        <View style={styles.content}>
                            <Text 
                                style={[styles.packageTitle, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}
                                numberOfLines={1}
                            >
                                {item.title}
                            </Text>
                            
                            <View style={styles.infoRow}>
                                
                           
                             <Text style={[styles.duration, { color: colors.textSecondary, fontSize: dynamicSize(13) }]}>
                                   <Ionicons name="chatbubbles-outline" size={dynamicSize(14)} color={colors.textSecondary} />  {item.description}
                                </Text>
                           
                               
                              
                                <Text style={[styles.duration, { color: colors.textSecondary, fontSize: dynamicSize(13) }]}>
                                     <Ionicons name="time-outline" size={dynamicSize(14)} color={colors.textSecondary} /> {item.duration}
                                </Text>
                            </View>
                        </View>

                        {/* ညာဘက်က မြှားပုံစံလေး */}
                        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                    </TouchableOpacity>
                    
                ))
            ) : (
                <Text style={{ color: colors.textSecondary, textAlign: 'center', marginTop: 20 }}>
                    ရှာဖွေမှုအတွက် ဘုရားစာ မတွေ့ပါ။
                </Text>
            )}
            </View>
            </ScrollView>
        </View>
        </SafeAreaView></LinearGradient>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1 ,paddingHorizontal: 15, paddingVertical:0 },
    container: { flex: 1,  },
        header: {  paddingBottom: 15 },
    headerTitle: { fontWeight: 'bold', marginBottom: 5 },
    headerSubtitle: { fontWeight: '500' },
    listContent: {
        padding: 16,
    },
    searchContainer: { marginTop: 20 },
    glassInput: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 55,
        borderRadius: 15,
        borderWidth: 1,
        overflow: 'hidden',
    },
    searchIcon: { marginRight: 10 },
    input: { flex: 1 },
    card: {
        borderRadius: 12,
        marginBottom: 16,
        padding: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardContent: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 12,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
 listContainer: {
        gap: 12, 
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        // Shadow effect
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    content: {
        flex: 1,
    },
    packageTitle: { 
        fontWeight: '600',
        marginBottom: 6
    },
    infoRow: { 
   
  
        gap: 6 
    },
    duration: { 
        fontWeight: '500' 
    }
});