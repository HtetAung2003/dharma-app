import React, { useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import Packages from '@/components/dashboard/PracticePackages';
import { router } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { ceMmDateTime } from '@/services/ceMmDateTime';
import { registerForPushNotificationsAsync, scheduleSabbathReminder } from '@/services/notificationService';

const Dashboard = () => {
    const { colors, isDarkMode, fontSize } = useTheme();
    const { userData } = useAuth();
    
    const scale = fontSize / 16;
    const dynamicSize = (base: number) => base * scale;

    // Memo function to calculate today's date info, astrology, and countdown to next special day
    const dateInfo = useMemo(() => {
        const now = new Date();
        const mdt = new ceMmDateTime(now);
        
      
        const todaySpecial = mdt.getSpecialDay();
        const isTodaySabbath = todaySpecial.includes("ဥပုသ်နေ့");
        const astro = mdt.getAstrologyInfo();

    
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
// Display name logic with truncation for long names
    const displayName = userData?.fullName 
        ? (userData.fullName.length > 10 ? `${userData.fullName.substring(0, 10)}..` : userData.fullName)
        : 'ဧည့်သည်';
useEffect(() => {
        // ၁။ Permission တောင်းခြင်း
        registerForPushNotificationsAsync();

        // ၂။ Notification နှိပ်လိုက်ရင် ဘယ်သွားမလဲဆိုတာ ဖမ်းခြင်း
        const subscription = Notifications.addNotificationResponseReceivedListener(response => {
            router.push('/main/dashboard'); // Dashboard သို့ ပြန်လာရန်
        });

        // ၃။ ဥပုသ်နေ့ ရှိမရှိ စစ်ဆေးပြီး Reminder ပေးခြင်း
        if (dateInfo.daysLeft <= 1) {
            scheduleSabbathReminder(dateInfo.daysLeft, dateInfo.nextEvent || "ဥပုသ်နေ့");
        }

        return () => subscription.remove();
    }, [dateInfo]);
    useEffect(() => {
    const setupNotifications = async () => {
        // ၁။ Permission တောင်းခြင်း
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') return;

       
        await Notifications.cancelAllScheduledNotificationsAsync();
        if (dateInfo.isTodaySabbath) {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "🙏 ယနေ့သည် ဥပုသ်နေ့ဖြစ်ပါသည်",
                    body: "ကုသိုလ်ကောင်းမှုများ ပြုလုပ်ရန် မမေ့ပါနှင့်။",
                },
                trigger: null, 
            });
        } else if (dateInfo.daysLeft === 1) {
            
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: `📌 မနက်ဖြန်သည် ${dateInfo.nextEvent} ဖြစ်ပါသည်`,
                    body: "ဥပုသ်စောင့်တည်ရန် သို့မဟုတ် ကုသိုလ်ပြုရန် ပြင်ဆင်နိုင်ပါသည်။",
                },
                trigger: {
                    hour: 18,
                    minute: 0,
                    repeats: false,
                },
            });
        }
    };

    setupNotifications();
}, [dateInfo]);
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

              {/* body section */}

                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Dashboard Card */}
                    <View style={styles.dateContainer}>
                        <BlurView intensity={isDarkMode ? 30 : 60} tint={isDarkMode ? "dark" : "light"} style={styles.dateCard}>
                            <View style={styles.dateRow}>
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.engDateText, { color: colors.textSecondary }]}>{dateInfo.engDate}</Text>
                                    <Text style={[styles.mmDateText, { color:  colors.textPrimary  }]}>{dateInfo.mmDate}</Text>
                                </View>
                                {/* tag of normal day .. */}
                                <View style={[styles.astroBadge, { backgroundColor: dateInfo.isYatyaza ? '#4CAF5022' : dateInfo.isPyathada ? '#F4433622' : 'rgba(255,215,0,0.1)' }]}>
                                    <Text style={[styles.astroText, { color: dateInfo.isYatyaza ? '#4CAF50' : dateInfo.isPyathada ? '#F44336' : '#FF9100' }]}>
                                        {dateInfo.astroText}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.countdownRow}>
                                {/* calendar icon */}
                                <Ionicons 
                                    name={dateInfo.isTodaySabbath ? "sparkles" : "calendar-number-outline"} 
                                    size={22} 
                                    color={dateInfo.isTodaySabbath ? colors.success : colors.primary} 
                                />
                                <View style={{ marginLeft: 10, flex: 1 }}>
                                    {dateInfo.isTodaySabbath ? (
                                        <Text style={[styles.statusText, { color: colors.success, fontWeight: 'bold' }]}>
                                            ယနေ့သည် {dateInfo.todaySpecial} ဖြစ်ပါသည်။ 
                                        </Text>
                                    ) : (
                                        <Text style={[styles.statusText, { color: colors.textPrimary }]}>
                                            နောက်ထပ် <Text style={{ color: colors.textPrimary, fontWeight: '800' }}>{dateInfo.daysLeft}</Text> ရက်အကြာတွင် <Text style={{ fontWeight: '700' }}>{dateInfo.nextEvent}</Text> ရောက်ပါမည်။
                                        </Text>
                                    )}
                                </View>
                            </View>
                        </BlurView>
                    </View>
{/* other components */}
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