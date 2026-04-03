import AsyncStorage from '@react-native-async-storage/async-storage';

const FAV_KEY = 'user_favorites';

export const toggleFavorite = async (item: { id: string, title: string, componentKey: string }) => {
    // need to have id , title and component key to navigate to the correct screen when click on fav item
    try {
        const jsonValue = await AsyncStorage.getItem(FAV_KEY);
        let favorites = jsonValue ? JSON.parse(jsonValue) : [];
        
        const isExist = favorites.find((f: any) => f.id === item.id);
            // hceck it is already in fav or not if it is already in fav then remove it from fav if not then add it to fav
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