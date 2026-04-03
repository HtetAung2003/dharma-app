import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';
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
  Beads: number;
  BeadsCount: number;
};

const formatTime = (seconds: number) => {
  if (seconds < 60) return `${seconds} sec`;
  const mins = Math.floor(seconds / 60);
  return mins >= 60 ? `${(mins / 60).toFixed(1)} hr` : `${mins} min`;
};

const HistoryScreen = () => {
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
        acc.BeadsCount += item.BeadsCount;
        return acc;
      },
      { Paritta: 0, Sutta: 0, Gatha: 0, BeadsCount: 0 },
    );
  }, [items]);

  return (
    <LinearGradient
      colors={[colors.splashBackground, colors.gradientMiddle, colors.gradientEnd]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>History</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Older than 30 days is removed automatically</Text>
        </View>

        <View style={styles.tabContainer}>
          {['Daily', 'Weekly', 'Monthly'].map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setFilter(item as HistoryFilter)}
              style={[
                styles.tab,
                filter === item && { backgroundColor: colors.primary, borderColor: colors.primary },
              ]}
            >
              <Text style={[styles.tabText, { color: filter === item ? '#FFF' : colors.textSecondary }]}> 
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.summaryCard, { backgroundColor: themeMode === 'dark' ? '#1E1E1E' : '#FFF' }]}>
            <Text style={[styles.summaryTitle, { color: colors.textPrimary }]}>{filter} totals</Text>
            <Text style={[styles.summaryText, { color: colors.textSecondary }]}>Paritta {formatTime(totals.Paritta)}</Text>
            <Text style={[styles.summaryText, { color: colors.textSecondary }]}>Sutta {formatTime(totals.Sutta)}</Text>
            <Text style={[styles.summaryText, { color: colors.textSecondary }]}>Gatha {formatTime(totals.Gatha)}</Text>
            <Text style={[styles.summaryText, { color: colors.textSecondary }]}>Bead Count {totals.BeadsCount}</Text>
          </View>

          <View style={styles.listContainer}>
            {items.length === 0 ? (
              <View style={[styles.emptyCard, { backgroundColor: themeMode === 'dark' ? '#1E1E1E' : '#FFF' }]}>
                <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>No history yet</Text>
                <Text style={{ color: colors.textSecondary }}>Your {filter.toLowerCase()} records will appear here.</Text>
              </View>
            ) : (
              items.map((item) => (
                <View key={item.key} style={[styles.historyCard, { backgroundColor: themeMode === 'dark' ? '#1E1E1E' : '#FFF' }]}>
                  <View style={styles.historyHeader}>
                    <Ionicons name="calendar-outline" size={18} color={colors.primary} />
                    <Text style={[styles.historyDate, { color: colors.textPrimary }]}>{item.date}</Text>
                  </View>
                  <Text style={[styles.historyText, { color: colors.textSecondary }]}>Paritta: {formatTime(item.Paritta)}</Text>
                  <Text style={[styles.historyText, { color: colors.textSecondary }]}>Sutta: {formatTime(item.Sutta)}</Text>
                  <Text style={[styles.historyText, { color: colors.textSecondary }]}>Gatha: {formatTime(item.Gatha)}</Text>
                  <Text style={[styles.historyText, { color: colors.textSecondary }]}>Bead count: {item.BeadsCount}</Text>
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
  header: { marginVertical: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  headerSubtitle: { marginTop: 6, fontSize: 12 },
  tabContainer: { flexDirection: 'row', marginBottom: 20, gap: 10 },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: '#DDD', alignItems: 'center' },
  tabText: { fontWeight: '600', fontSize: 13 },
  summaryCard: { padding: 18, borderRadius: 18, marginBottom: 18 },
  summaryTitle: { fontSize: 17, fontWeight: '700', marginBottom: 10 },
  summaryText: { fontSize: 14, marginBottom: 6 },
  listContainer: { paddingBottom: 24 },
  emptyCard: { padding: 20, borderRadius: 18 },
  emptyTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  historyCard: { padding: 18, borderRadius: 18, marginBottom: 12 },
  historyHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  historyDate: { fontSize: 16, fontWeight: '700' },
  historyText: { fontSize: 14, marginBottom: 6 },
});

export default HistoryScreen;
