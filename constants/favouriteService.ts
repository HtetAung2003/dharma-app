import AsyncStorage from '@react-native-async-storage/async-storage';

const FAV_KEY = 'user_favorites';

export const toggleFavorite = async (item: { id: string, title: string, componentKey: string }) => {
    try {
        const jsonValue = await AsyncStorage.getItem(FAV_KEY);
        let favorites = jsonValue ? JSON.parse(jsonValue) : [];
        
        const isExist = favorites.find((f: any) => f.id === item.id);
        
        if (isExist) {
            favorites = favorites.filter((f: any) => f.id !== item.id);
        } else {
            favorites = [item, ...favorites];
        }
        
        await AsyncStorage.setItem(FAV_KEY, JSON.stringify(favorites));
        return !isExist; // true = added, false = removed
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const checkIfFavorite = async (id: string) => {
    const jsonValue = await AsyncStorage.getItem(FAV_KEY);
    const favorites = jsonValue ? JSON.parse(jsonValue) : [];
    return favorites.some((f: any) => f.id === id);
};