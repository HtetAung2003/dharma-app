import AsyncStorage from '@react-native-async-storage/async-storage';

export type Category = 'Paritta' | 'Sutta' | 'Gatha' | 'Beads' | 'Daily';
export const READING_STATS_KEY_PREFIX = '@reading_stats_';
const MAX_HISTORY_DAYS = 30;

type StoredStats = {
    Paritta?: number;
    Sutta?: number;
    Gatha?: number;
    Beads?: number;
    Daily?: number;
    BeadsCount?: number;
    BeadsRounds?: number;
    BeadsPresets?: number[];
};

const getTodayStatsKey = () => {
    const today = new Date().toISOString().split('T')[0];
    return `${READING_STATS_KEY_PREFIX}${today}`;
};

const getDiffDays = (from: Date, to: Date) => {
    return (to.getTime() - from.getTime()) / (1000 * 3600 * 24);
};

export const pruneOldStats = async () => {
    try {
        const allKeys = await AsyncStorage.getAllKeys();
        const statsKeys = allKeys.filter((key) => key.startsWith(READING_STATS_KEY_PREFIX));
        const now = new Date();
        const removableKeys = statsKeys.filter((key) => {
            const dateStr = key.replace(READING_STATS_KEY_PREFIX, '');
            const recordDate = new Date(dateStr);
            return Number.isFinite(recordDate.getTime()) && getDiffDays(recordDate, now) >= MAX_HISTORY_DAYS;
        });

        if (removableKeys.length > 0) {
            await AsyncStorage.multiRemove(removableKeys);
        }
    } catch (e) {
        console.error('Error pruning stats', e);
    }
};

export const getStatsRangeDays = (filter: 'Daily' | 'Weekly' | 'Monthly') => {
    if (filter === 'Daily') return 1;
    if (filter === 'Weekly') return 7;
    return 30;
};

export const saveReadingTime = async (category: Category, seconds: number) => {
    try {
        await pruneOldStats();
        const storageKey = getTodayStatsKey();
        const existingData = await AsyncStorage.getItem(storageKey);
        const stats: StoredStats = existingData ? JSON.parse(existingData) : {};

        stats[category] = (stats[category] || 0) + seconds;

        await AsyncStorage.setItem(storageKey, JSON.stringify(stats));
    } catch (e) {
        console.error('Error saving stats', e);
    }
};

export const saveBeadCounterStats = async ({
    seconds,
    count,
    rounds,
    presetNumber,
}: {
    seconds: number;
    count: number;
    rounds: number;
    presetNumber: number;
}) => {
    try {
        await pruneOldStats();
        const storageKey = getTodayStatsKey();
        const existingData = await AsyncStorage.getItem(storageKey);
        const stats: StoredStats = existingData ? JSON.parse(existingData) : {};

        stats.Beads = (stats.Beads || 0) + seconds;
        stats.BeadsCount = (stats.BeadsCount || 0) + count;
        stats.BeadsRounds = (stats.BeadsRounds || 0) + rounds;

        const presets = Array.isArray(stats.BeadsPresets) ? [...stats.BeadsPresets] : [];
        if (!presets.includes(presetNumber)) {
            presets.push(presetNumber);
        }
        stats.BeadsPresets = presets.sort((a, b) => a - b);

        await AsyncStorage.setItem(storageKey, JSON.stringify(stats));
    } catch (e) {
        console.error('Error saving bead counter stats', e);
    }
};
