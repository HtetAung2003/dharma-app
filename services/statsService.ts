import AsyncStorage from '@react-native-async-storage/async-storage';

export type Category = 'Paritta' | 'Sutta' | 'Gatha' | 'Beads' | 'Daily';

export const saveReadingTime = async (category: Category, seconds: number) => {
    try {
        const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
        const storageKey = `@reading_stats_${today}`;
        
        const existingData = await AsyncStorage.getItem(storageKey);
        const stats = existingData ? JSON.parse(existingData) : {};
        
        // အမျိုးအစားအလိုက် အချိန်ကို ပေါင်းထည့်ခြင်း (စက္ကန့်ဖြင့်)
        stats[category] = (stats[category] || 0) + seconds;
        
        await AsyncStorage.setItem(storageKey, JSON.stringify(stats));
    } catch (e) {
        console.error("Error saving stats", e);
    }
};