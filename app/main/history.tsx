import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { getStatsRangeDays, pruneOldStats, READING_STATS_KEY_PREFIX } from '../../services/statsService';

const BEAD_COUNTER_STATE_KEY = 'bead_counter_state_v1';

type HistoryFilter = 'Daily' | 'Weekly' | 'Monthly';

type HistoryItem = {
  key: string;
  date: string;
  Paritta: number;
  Sutta: number;
  Gatha: number;
  Sila: number;
  Miscellaneous: number;
  Beads: number;
  BeadsCount: number;
};

const formatTime = (seconds: number) => {
  if (seconds < 60) return `${seconds} စက္ကန့်`;
  const mins = Math.floor(seconds / 60);
  return mins >= 60 ? `${(mins / 60).toFixed(1)} နာရီ` : `${mins} မိနစ်`;
};

const FILTER_TABS = [
  { label: 'နေ့စဉ်', value: 'Daily' },
  { label: 'အပတ်စဉ်', value: 'Weekly' },
  { label: 'လစဉ်', value: 'Monthly' },
] as const;

const getFilterLabel = (f: HistoryFilter) => {
  switch (f) {
    case 'Daily':
      return 'နေ့စဉ်';
    case 'Weekly':
      return 'အပတ်စဉ်';
    case 'Monthly':
      return 'လစဉ်';
  }
};

const HistoryScreen = () => {
  const router = useRouter();
  const { colors, themeMode } = useTheme();
  const [filter, setFilter] = useState<HistoryFilter>('Daily');
  const [items, setItems] = useState<HistoryItem[]>([]);

  const loadHistory = useCallback(async () => {
    await pruneOldStats();
    const allKeys = await AsyncStorage.getAllKeys();
    const statKeys = allKeys.filter((key) => key.startsWith(READING_STATS_KEY_PREFIX));
    const now = new Date();
    const rangeDays = getStatsRangeDays(filter);

    const records = await Promise.all(
      statKeys.map(async (key) => {
        const dateStr = key.replace(READING_STATS_KEY_PREFIX, '');
        const recordDate = new Date(dateStr);
        const diffDays = (now.getTime() - recordDate.getTime()) / (1000 * 3600 * 24);

        if (diffDays >= rangeDays) return null;

        const raw = await AsyncStorage.getItem(key);
        if (!raw) return null;

        const parsed = JSON.parse(raw);
        return {
          key,
          date: dateStr,
          Paritta: parsed.Paritta || 0,
          Sutta: parsed.Sutta || 0,
          Gatha: parsed.Gatha || 0,
          Sila: parsed.Sila || 0,
          Miscellaneous: parsed.Miscellaneous || 0,
          Beads: parsed.Beads || 0,
          BeadsCount: parsed.BeadsCount || 0,
        } satisfies HistoryItem;
      }),
    );

    const liveBeadState = await AsyncStorage.getItem(BEAD_COUNTER_STATE_KEY);
    if (liveBeadState) {
      const parsedLiveState = JSON.parse(liveBeadState);
      const liveTarget = typeof parsedLiveState?.target === 'number' ? parsedLiveState.target : 0;
      const liveCount = typeof parsedLiveState?.count === 'number' ? parsedLiveState.count : 0;
      const liveRounds = typeof parsedLiveState?.rounds === 'number' ? parsedLiveState.rounds : 0;
      const liveStartTime = typeof parsedLiveState?.startTime === 'number' ? parsedLiveState.startTime : null;
      const liveTotalCount = liveRounds * liveTarget + liveCount;

      if (liveTotalCount > 0) {
        const liveDate = new Date().toISOString().split('T')[0];
        const existingIndex = records.findIndex((item) => item?.date === liveDate);
        const liveDuration = liveStartTime ? Math.floor((Date.now() - liveStartTime) / 1000) : 0;

        if (existingIndex >= 0 && records[existingIndex]) {
          const current = records[existingIndex] as HistoryItem;
          records[existingIndex] = {
            ...current,
            Beads: current.Beads + liveDuration,
            BeadsCount: current.BeadsCount + liveTotalCount,
          };
        } else {
          records.push({
            key: `${BEAD_COUNTER_STATE_KEY}-${liveDate}`,
            date: liveDate,
            Paritta: 0,
            Sutta: 0,
            Gatha: 0,
            Sila: 0,
            Miscellaneous: 0,
            Beads: liveDuration,
            BeadsCount: liveTotalCount,
          });
        }
      }
    }

    setItems(
      records
        .filter((item): item is HistoryItem => item !== null)
        .sort((a, b) => (a.date < b.date ? 1 : -1)),
    );
  }, [filter]);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [loadHistory]),
  );

  const totals = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        acc.Paritta += item.Paritta;
        acc.Sutta += item.Sutta;
        acc.Gatha += item.Gatha;
        acc.Sila += item.Sila;
        acc.Miscellaneous += item.Miscellaneous;
        acc.BeadsCount += item.BeadsCount;
        return acc;
      },
      { Paritta: 0, Sutta: 0, Gatha: 0, Sila: 0, Miscellaneous: 0, BeadsCount: 0 },
    );
  }, [items]);

  return (
    <LinearGradient
      colors={[colors.splashBackground, colors.gradientMiddle, colors.gradientEnd]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="နောက်သို့"
            onPress={() => (router.canGoBack() ? router.back() : router.replace('/main/analysis'))}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <View style={styles.headerTextWrapper}>
            <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>မှတ်တမ်း</Text>
            <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
              ရက်ပေါင်း ၃၀ ထက်ကျော်လွန်သော မှတ်တမ်းများကို အလိုအလျောက် ဖယ်ရှားပါသည်
            </Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          {FILTER_TABS.map(({ label, value }) => (
            <TouchableOpacity
              key={value}
              onPress={() => setFilter(value)}
              style={[
                styles.tab,
                filter === value && { backgroundColor: colors.primary, borderColor: colors.primary },
              ]}
            >
              <Text style={[styles.tabText, { color: filter === value ? '#FFF' : colors.textSecondary }]}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.summaryCard, { backgroundColor: themeMode === 'dark' ? '#1E1E1E' : '#FFF' }]}>
            <View style={styles.summaryTitleRow}>
              <Ionicons name="stats-chart" size={18} color={colors.primary} />
              <Text style={[styles.summaryTitle, { color: colors.textPrimary }]}>
                {getFilterLabel(filter)} စုစုပေါင်း
              </Text>
            </View>

            <View style={styles.summaryGrid}>
              <View style={styles.summaryItem}>
                <View style={[styles.iconDot, { backgroundColor: '#4CAF5020' }]}>
                  <Ionicons name="book-outline" size={15} color="#4CAF50" />
                </View>
                <View style={styles.summaryItemContent}>
                  <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>ပရိတ်</Text>
                  <Text style={[styles.summaryValue, { color: colors.textPrimary }]}>{formatTime(totals.Paritta)}</Text>
                </View>
              </View>

              <View style={styles.summaryItem}>
                <View style={[styles.iconDot, { backgroundColor: '#2196F320' }]}>
                  <Ionicons name="document-text-outline" size={15} color="#2196F3" />
                </View>
                <View style={styles.summaryItemContent}>
                  <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>သုတ္တန်</Text>
                  <Text style={[styles.summaryValue, { color: colors.textPrimary }]}>{formatTime(totals.Sutta)}</Text>
                </View>
              </View>

              <View style={styles.summaryItem}>
                <View style={[styles.iconDot, { backgroundColor: '#FF980020' }]}>
                  <Ionicons name="star-outline" size={15} color="#FF9800" />
                </View>
                <View style={styles.summaryItemContent}>
                  <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>ဂါထာ</Text>
                  <Text style={[styles.summaryValue, { color: colors.textPrimary }]}>{formatTime(totals.Gatha)}</Text>
                </View>
              </View>

              <View style={styles.summaryItem}>
                <View style={[styles.iconDot, { backgroundColor: '#9C27B020' }]}>
                  <Ionicons name="disc-outline" size={15} color="#9C27B0" />
                </View>
                <View style={styles.summaryItemContent}>
                  <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>ပုတီးရေတွက်မှု</Text>
                  <Text style={[styles.summaryValue, { color: colors.textPrimary }]}>{totals.BeadsCount} အကြိမ်</Text>
                </View>
              </View>

              {totals.Sila > 0 && (
                <View style={styles.summaryItem}>
                  <View style={[styles.iconDot, { backgroundColor: '#E91E6320' }]}>
                    <Ionicons name="shield-checkmark-outline" size={15} color="#E91E63" />
                  </View>
                  <View style={styles.summaryItemContent}>
                    <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>သီလ</Text>
                    <Text style={[styles.summaryValue, { color: colors.textPrimary }]}>{formatTime(totals.Sila)}</Text>
                  </View>
                </View>
              )}

              {totals.Miscellaneous > 0 && (
                <View style={styles.summaryItem}>
                  <View style={[styles.iconDot, { backgroundColor: '#607D8B20' }]}>
                    <Ionicons name="ellipsis-horizontal-outline" size={15} color="#607D8B" />
                  </View>
                  <View style={styles.summaryItemContent}>
                    <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>အထွေထွေ</Text>
                    <Text style={[styles.summaryValue, { color: colors.textPrimary }]}>{formatTime(totals.Miscellaneous)}</Text>
                  </View>
                </View>
              )}
            </View>
          </View>

          <View style={styles.listContainer}>
            {items.length === 0 ? (
              <View style={[styles.emptyCard, { backgroundColor: themeMode === 'dark' ? '#1E1E1E' : '#FFF' }]}>
                <Ionicons name="hourglass-outline" size={36} color={colors.textSecondary + '80'} style={{ marginBottom: 8 }} />
                <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>မှတ်တမ်းမရှိသေးပါ</Text>
                <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
                  သင်၏ {getFilterLabel(filter)} မှတ်တမ်းများ ဤနေရာတွင် ပေါ်လာပါမည်။
                </Text>
              </View>
            ) : (
              items.map((item) => (
                <View key={item.key} style={[styles.historyCard, { backgroundColor: themeMode === 'dark' ? '#1E1E1E' : '#FFF' }]}>
                  <View style={styles.historyHeader}>
                    <View style={styles.dateRow}>
                      <Ionicons name="calendar-outline" size={18} color={colors.primary} />
                      <Text style={[styles.historyDate, { color: colors.textPrimary }]}>{item.date}</Text>
                    </View>
                    {item.BeadsCount > 0 && (
                      <View style={[styles.pillBadge, { backgroundColor: '#9C27B020' }]}>
                        <Text style={[styles.pillText, { color: '#9C27B0' }]}>{item.BeadsCount} အကြိမ်</Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.cardContentRows}>
                    <View style={styles.cardRow}>
                      <Text style={[styles.rowLabel, { color: colors.textSecondary }]}>ပရိတ်</Text>
                      <Text style={[styles.rowValue, { color: colors.textPrimary }]}>{formatTime(item.Paritta)}</Text>
                    </View>
                    <View style={styles.cardRow}>
                      <Text style={[styles.rowLabel, { color: colors.textSecondary }]}>သုတ္တန်</Text>
                      <Text style={[styles.rowValue, { color: colors.textPrimary }]}>{formatTime(item.Sutta)}</Text>
                    </View>
                    <View style={styles.cardRow}>
                      <Text style={[styles.rowLabel, { color: colors.textSecondary }]}>ဂါထာ</Text>
                      <Text style={[styles.rowValue, { color: colors.textPrimary }]}>{formatTime(item.Gatha)}</Text>
                    </View>
                    {item.Sila > 0 && (
                      <View style={styles.cardRow}>
                        <Text style={[styles.rowLabel, { color: colors.textSecondary }]}>သီလ</Text>
                        <Text style={[styles.rowValue, { color: colors.textPrimary }]}>{formatTime(item.Sila)}</Text>
                      </View>
                    )}
                    {item.Miscellaneous > 0 && (
                      <View style={styles.cardRow}>
                        <Text style={[styles.rowLabel, { color: colors.textSecondary }]}>အထွေထွေ</Text>
                        <Text style={[styles.rowValue, { color: colors.textPrimary }]}>{formatTime(item.Miscellaneous)}</Text>
                      </View>
                    )}
                    <View style={styles.cardRow}>
                      <Text style={[styles.rowLabel, { color: colors.textSecondary }]}>ပုတီးရေတွက်မှု</Text>
                      <Text style={[styles.rowValue, { color: colors.textPrimary }]}>{item.BeadsCount} အကြိမ်</Text>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginVertical: 16, gap: 12 },
  backButton: { padding: 4 },
  headerTextWrapper: { flex: 1 },
  headerTitle: { fontSize: 22, fontWeight: 'bold' },
  headerSubtitle: { marginTop: 4, fontSize: 12 },
  tabContainer: { flexDirection: 'row', marginBottom: 16, gap: 10 },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
  },
  tabText: { fontWeight: '600', fontSize: 13 },
  summaryCard: { padding: 18, borderRadius: 18, marginBottom: 16 },
  summaryTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  summaryTitle: { fontSize: 16, fontWeight: '700' },
  summaryGrid: { gap: 12 },
  summaryItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryItemContent: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryLabel: { fontSize: 13, fontWeight: '500' },
  summaryValue: { fontSize: 14, fontWeight: '700' },
  listContainer: { paddingBottom: 24 },
  emptyCard: { padding: 28, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  emptySubtitle: { fontSize: 13, textAlign: 'center' },
  historyCard: { padding: 16, borderRadius: 18, marginBottom: 12 },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#8882',
  },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  historyDate: { fontSize: 15, fontWeight: '700' },
  pillBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  pillText: { fontSize: 12, fontWeight: '700' },
  cardContentRows: { gap: 6 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rowLabel: { fontSize: 13 },
  rowValue: { fontSize: 13, fontWeight: '600' },
});

export default HistoryScreen;
