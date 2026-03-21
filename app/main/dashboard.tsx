import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import Packages from '@/components/dashboard/PracticePackages';
import { router } from 'expo-router';
import { ceMmDateTime } from '@/services/ceMmDateTime';

const Dashboard = () => {
    const { colors, isDarkMode, fontSize } = useTheme();
    const { userData } = useAuth();
    
    const scale = fontSize / 16;
    const dynamicSize = (base: number) => base * scale;

    // ၁။ ရက်စွဲ၊ Countdown နှင့် ဗေဒင်အချက်အလက်များကို တစ်ခါတည်းတွက်ချက်ခြင်း
    const dateInfo = useMemo(() => {
        const now = new Date();
        const mdt = new ceMmDateTime(now);
        
        // ယနေ့ အခြေအနေ
        const todaySpecial = mdt.getSpecialDay();
        const isTodaySabbath = todaySpecial.includes("ဥပုသ်နေ့");
        const astro = mdt.getAstrologyInfo();

        // နောက်ထပ် ဥပုသ်နေ့ သို့မဟုတ် ပိတ်ရက် ရှာဖွေခြင်း
        let daysToSabbath = 0;
        let nextSabbathName = "";

        if (!isTodaySabbath) {
            for (let i = 1; i <= 30; i++) {
                const nextDate = new Date();
                nextDate.setDate(now.getDate() + i);
                const nextMdt = new ceMmDateTime(nextDate);
                const specials = nextMdt.getSpecialDay();
                const holidays = nextMdt.getHolidays(nextDate);
                
                if (specials.includes("ဥပုသ်နေ့") || holidays.length > 0) {
                    daysToSabbath = i;
                    nextSabbathName = specials.includes("ဥပုသ်နေ့") ? "ဥပုသ်နေ့" : holidays[0];
                    break;
                }
            }
        }

        return {
            engDate: now.toDateString(),
            mmDate: mdt.ToMString(),
            isTodaySabbath,
            todaySpecial: todaySpecial.join(', '),
            daysLeft: daysToSabbath,
            nextEvent: nextSabbathName,
            astroText: astro.length > 0 ? astro.join(' / ') : "သာမန်ရက်",
            isYatyaza: astro.includes("ရက်ရာဇာ"),
            isPyathada: astro.includes("ပြဿဒါး"),
        };
    }, []);

    const displayName = userData?.fullName 
        ? (userData.fullName.length > 4 ? `${userData.fullName.substring(0, 4)}...` : userData.fullName)
        : 'ဧည့်သည်';

    return (
        <LinearGradient
            colors={isDarkMode ? ['#0F0F0F', '#1A1A1A', '#000000'] : ['#F5F9FF', '#E0E7FF', '#FFFFFF']}
            style={styles.background}
        >
            <SafeAreaView style={styles.container} edges={['top']}>
                {/* Header Section */}
                <View style={styles.header}>
                    <View>
                        <Text 
                            numberOfLines={1} 
                            style={[styles.userName, { color: colors.textPrimary, fontSize: dynamicSize(24) }]}
                        >
                            မင်္ဂလာပါ {displayName} !
                        </Text>
                        <Text style={[styles.subText, { color: colors.textSecondary, fontSize: dynamicSize(16) }]}>
                            How are you feeling today?
                        </Text>
                    </View>

                    <TouchableOpacity onPress={() => router.push('/personalization')}>
                        <Ionicons name="cog-outline" size={dynamicSize(35)} color={colors.textPrimary} />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <BlurView intensity={isDarkMode ? 20 : 40} tint={isDarkMode ? "dark" : "light"} style={[styles.glassInput, { borderColor: colors.border }]}>
                        <Ionicons name="search-outline" size={20} color={colors.textSecondary} style={styles.searchIcon} />
                        <TextInput
                            placeholder="Search for meditation, music..."
                            placeholderTextColor={colors.textSecondary}
                            style={[styles.input, { color: colors.textPrimary, fontSize: dynamicSize(16) }]}
                        />
                    </BlurView>
                </View>

                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* 🌟 통합 မြန်မာ့ရက်စွဲ Dashboard Card */}
                    <View style={styles.dateContainer}>
                        <BlurView intensity={isDarkMode ? 30 : 60} tint={isDarkMode ? "dark" : "light"} style={styles.dateCard}>
                            <View style={styles.dateRow}>
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.engDateText, { color: colors.textSecondary }]}>{dateInfo.engDate}</Text>
                                    <Text style={[styles.mmDateText, { color: isDarkMode ? '#FFD700' : '#0288D1' }]}>{dateInfo.mmDate}</Text>
                                </View>
                                <View style={[styles.astroBadge, { backgroundColor: dateInfo.isYatyaza ? '#4CAF5022' : dateInfo.isPyathada ? '#F4433622' : 'rgba(255,215,0,0.1)' }]}>
                                    <Text style={[styles.astroText, { color: dateInfo.isYatyaza ? '#4CAF50' : dateInfo.isPyathada ? '#F44336' : '#FF9100' }]}>
                                        {dateInfo.astroText}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.countdownRow}>
                                <Ionicons 
                                    name={dateInfo.isTodaySabbath ? "sparkles" : "calendar-number-outline"} 
                                    size={22} 
                                    color={dateInfo.isTodaySabbath ? "#4CAF50" : "#FF9100"} 
                                />
                                <View style={{ marginLeft: 10, flex: 1 }}>
                                    {dateInfo.isTodaySabbath ? (
                                        <Text style={[styles.statusText, { color: "#4CAF50", fontWeight: 'bold' }]}>
                                            ✨ ယနေ့သည် {dateInfo.todaySpecial} ဖြစ်ပါသည်။ ✨
                                        </Text>
                                    ) : (
                                        <Text style={[styles.statusText, { color: colors.textPrimary }]}>
                                            နောက်ထပ် <Text style={{ color: '#FF9100', fontWeight: '800' }}>{dateInfo.daysLeft}</Text> ရက်အကြာတွင် <Text style={{ fontWeight: '700' }}>{dateInfo.nextEvent}</Text> ရောက်ပါမည်။
                                        </Text>
                                    )}
                                </View>
                            </View>
                        </BlurView>
                    </View>

                    <Packages/>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    background: { flex: 1 },
    container: { flex: 1, paddingHorizontal: 15 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
    },
    userName: { fontWeight: 'bold' },
    subText: { marginTop: 4 },
    searchContainer: { marginTop: 15, marginBottom: 5 },
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

    // Date Card Styles (Cleaned up)
    dateContainer: { marginTop: 15, marginBottom: 10 },
    dateCard: {
        padding: 18,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
        overflow: 'hidden',
    },
    dateRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    engDateText: { fontSize: 12, fontWeight: '600', marginBottom: 2 },
    mmDateText: { fontSize: 18, fontWeight: '800' },
    astroBadge: { 
        paddingHorizontal: 10, 
        paddingVertical: 5, 
        borderRadius: 10 
    },
    astroText: { fontSize: 11, fontWeight: 'bold' },
    divider: { height: 1, backgroundColor: 'rgba(128,128,128,0.15)', marginVertical: 15 },
    countdownRow: { flexDirection: 'row', alignItems: 'center' },
    statusText: { fontSize: 14, lineHeight: 20 , padding:10 },
});

export default Dashboard;