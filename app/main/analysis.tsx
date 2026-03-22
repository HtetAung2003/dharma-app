import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart } from 'react-native-gifted-charts'; // npm install react-native-gifted-charts
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

const AnalysisScreen = () => {
    const { colors, isDarkMode } = useTheme();
    const [filter, setFilter] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
const [rawStats, setRawStats] = useState<any>({ Paritta: 0, Sutta: 0, Gatha: 0, Beads: 0 });
 
const fetchAndAggregateData = useCallback(async () => {
        const allKeys = await AsyncStorage.getAllKeys();
        const statKeys = allKeys.filter(key => key.startsWith('@reading_stats_'));
        const now = new Date();
        
        let aggregated = { Paritta: 0, Sutta: 0, Gatha: 0, Beads: 0 };

        for (const key of statKeys) {
            const dateStr = key.replace('@reading_stats_', '');
            const recordDate = new Date(dateStr);
            const diffDays = (now.getTime() - recordDate.getTime()) / (1000 * 3600 * 24);

            // Filter အလိုက် စစ်ထုတ်ခြင်း
            let isIncluded = false;
            if (filter === 'Daily' && diffDays < 1) isIncluded = true;
            if (filter === 'Weekly' && diffDays < 7) isIncluded = true;
            if (filter === 'Monthly' && diffDays < 30) isIncluded = true;

            if (isIncluded) {
                const data = await AsyncStorage.getItem(key);
                if (data) {
                    const parsed = JSON.parse(data);
                    aggregated.Paritta += (parsed.Paritta || 0);
                    aggregated.Sutta += (parsed.Sutta || 0);
                    aggregated.Gatha += (parsed.Gatha || 0);
                    aggregated.Beads += (parsed.Beads || 0);
                }
            }
        }
        setRawStats(aggregated);
    }, [filter]);
    // Screen ကို ရောက်တိုင်း ဒေတာအသစ် ပြန်ဆွဲရန်
    useFocusEffect(
        useCallback(() => {
            fetchAndAggregateData();
        }, [fetchAndAggregateData])
    );

   const chartData = useMemo(() => [
    { value: Math.round(rawStats.Daily / 60) || 0, label: 'ဝတ်ပြု', frontColor: '#E91E63' }, // 👈 Daily အတွက် အသစ်ထည့်ပါ
    { value: Math.round(rawStats.Paritta / 60) || 0, label: 'ပရိတ်', frontColor: '#4CAF50' },
    { value: Math.round(rawStats.Sutta / 60) || 0, label: 'သုတ်', frontColor: '#2196F3' },
    { value: Math.round(rawStats.Gatha / 60) || 0, label: 'ဂါထာ', frontColor: '#FF9800' },
    { value: Math.round(rawStats.Beads / 60) || 0, label: 'ပုတီး', frontColor: '#9C27B0' },
], [rawStats]);

    const formatTime = (seconds: number) => {
        if (seconds < 60) return `${seconds} စက္ကန့်`;
        const mins = Math.floor(seconds / 60);
        return mins >= 60 ? `${(mins / 60).toFixed(1)} နာရီ` : `${mins} မိနစ်`;
    };

    const statsList = [
        { id: '1', title: 'ပရိတ်တော်များ', time: formatTime(rawStats.Paritta), icon: 'book-outline', color: '#4CAF50' },
        { id: '2', title: 'သုတ်တော်များ', time: formatTime(rawStats.Sutta), icon: 'document-text-outline', color: '#2196F3' },
        { id: '3', title: 'ဂါထာတော်များ', time: formatTime(rawStats.Gatha), icon: 'star-outline', color: '#FF9800' },
        { id: '4', title: 'ပုတီးစိပ်ခြင်း', time: formatTime(rawStats.Beads), icon: 'disc-outline', color: '#9C27B0' },
    ];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>မှတ်တမ်းများ</Text>
            </View>

            {/* 🗓 Filter Tabs */}
            <View style={styles.tabContainer}>
                {['Daily', 'Weekly', 'Monthly'].map((item) => (
                    <TouchableOpacity
                        key={item}
                        onPress={() => setFilter(item as any)}
                        style={[
                            styles.tab,
                            filter === item && { backgroundColor: colors.primary, borderColor: colors.primary }
                        ]}
                    >
                        <Text style={[styles.tabText, { color: filter === item ? '#FFF' : colors.textSecondary }]}>
                            {item === 'Daily' ? 'ယနေ့' : item === 'Weekly' ? 'ယခုအပတ်' : 'ယခုလ'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* 📈 Chart Card */}
                <View style={[styles.card, { backgroundColor: isDarkMode ? '#1E1E1E' : '#FFF' }]}>
                    <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>အမျိုးအစားအလိုက် အချိန်ပေးမှု (မိနစ်)</Text>
                    <View style={styles.chartWrapper}>
                        <BarChart
                            data={chartData}
                            barWidth={35}
                            noOfSections={3}
                            barBorderRadius={6}
                            frontColor={colors.primary}
                            yAxisThickness={0}
                            xAxisThickness={0}
                            hideRules
                            yAxisTextStyle={{ color: colors.textSecondary }}
                            xAxisLabelTextStyle={{ color: colors.textSecondary, fontSize: 10 }}
                        />
                    </View>
                </View>

                {/* 📜 Detailed List */}
                <View style={styles.listContainer}>
                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>အသေးစိတ်ကြည့်ရန်</Text>
                    {statsList.map((item) => (
                        <View key={item.id} style={[styles.listItem, { backgroundColor: isDarkMode ? '#1E1E1E' : '#F9F9F9' }]}>
                            <View style={[styles.iconBox, { backgroundColor: item.color + '22' }]}>
                                <Ionicons name={item.icon as any} size={22} color={item.color} />
                            </View>
                            <View style={{ flex: 1, marginLeft: 12 }}>
                                <Text style={[styles.itemTitle, { color: colors.textPrimary }]}>{item.title}</Text>
                                <Text style={{ color: colors.textSecondary, fontSize: 12 }}>စုစုပေါင်းဖတ်ချိန်</Text>
                            </View>
                            <Text style={[styles.itemTime, { color: item.color }]}>{item.time}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 20 },
    header: { marginVertical: 20 },
    headerTitle: { fontSize: 24, fontWeight: 'bold' },
    tabContainer: { flexDirection: 'row', marginBottom: 20, gap: 10 },
    tab: { flex: 1, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: '#DDD', alignItems: 'center' },
    tabText: { fontWeight: '600', fontSize: 13 },
    card: { padding: 20, borderRadius: 20, elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
    cardTitle: { fontSize: 15, fontWeight: '700', marginBottom: 20 },
    chartWrapper: { alignItems: 'center', justifyContent: 'center' },
    listContainer: { marginTop: 25 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
    listItem: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 16, marginBottom: 12 },
    iconBox: { width: 45, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
    itemTitle: { fontSize: 16, fontWeight: '600' },
    itemTime: { fontSize: 15, fontWeight: 'bold' },
});

export default AnalysisScreen;