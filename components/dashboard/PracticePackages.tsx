import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { router } from 'expo-router';
import { RelativePathString } from 'expo-router';
const PRACTICE_DATA = [
    { id: '1', title: 'ဥပုသ်စောင့်တည်ခြင်း ( ၅ ပါးသီလ )', duration: '၁ ရက်' },
     { id: '2', title: 'ဥပုသ်စောင့်တည်ခြင်း ( ၈ ပါးသီလ )', duration: '၁ ရက်' },
    { id: '3', title: 'ဝိပဿနာတရားပွားများခြင်း', duration: '၁၅ မိနစ်' },
    { id: '4', title: 'မေတ္တာဘာဝနာ ပွားများခြင်', duration: '၁၅ မိနစ်' },
    { id: '5', title: 'သတ္တဝါအားလုံးကို မေတ္တာပို့သခြင်း', duration: '၁၅ မိနစ်' },
];

const PracticePackages = () => {
    const { colors, isDarkMode, fontSize } = useTheme();

    // Font scaling logic
    const scale = fontSize / 16;
    const dynamicSize = (base: number) => base * scale;
const handlePress = (item: any) => {
    let targetPath: any; // သို့မဟုတ် targetPath: string

    switch (item.id) {
        case '1':
            targetPath = '/main/practice-detail';
            break;
        case '2':
            targetPath = '/main/dashboard'; // သင်သွားချင်တဲ့ တခြား path တစ်ခုခု
            break;
        default:
            targetPath = '/main/practice-detail';
    }

    router.push({
        // as any သုံးပြီး TypeScript error ကို ကျော်လိုက်ပါ
        pathname: targetPath as any, 
        params: { 
            id: item.id, 
            title: item.title 
        }
    });
};
    return (
        <View style={styles.section}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.textPrimary, fontSize: dynamicSize(20) }]}>
                    အစီအစဉ်များ
                </Text>
                   <TouchableOpacity>
                                    <Text style={[styles.seeMore, { color: colors.primary, fontSize: dynamicSize(14) }]}>
                                        အားလုံးကြည့်ရန်
                                    </Text>
                                </TouchableOpacity>
                        
            </View>

            {/* Vertical List - FlatList ထဲမှာ scroll မလုပ်စေဘဲ Dashboard ရဲ့ ScrollView နဲ့ တွဲသုံးရင် scrollEnabled={false} ပေးထားပါ */}
            <View style={styles.listContainer}>
                {PRACTICE_DATA.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => handlePress(item)} // ဒီနေရာမှာ navigation ကို ခေါ်လိုက်ပါမယ်
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
                                <Ionicons name="time-outline" size={dynamicSize(14)} color={colors.textSecondary} />
                                <Text style={[styles.duration, { color: colors.textSecondary, fontSize: dynamicSize(13) }]}>
                                    {item.duration}
                                </Text>
                            </View>
                        </View>

                        {/* ညာဘက်က မြှားပုံစံလေး */}
                        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    section: { 
        marginTop: 25,
     
    },
    header: { 
               flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 15 
    },
    title: { 
        fontWeight: 'bold',
    },
      seeMore: { fontWeight: '500' },
    listContainer: {
        gap: 12, // List တစ်ခုနဲ့တစ်ခု ကြားအကွာအဝေး
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
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 6 
    },
    duration: { 
        fontWeight: '500' 
    }
});

export default PracticePackages;