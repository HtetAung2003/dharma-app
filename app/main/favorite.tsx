import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

export default function FavoriteScreen() {
    const [favs, setFavs] = useState<any[]>([]);
    const router = useRouter();
    const { colors, fontSize } = useTheme();

    const scale = fontSize / 16;
    const dynamicSize = (base: number) => base * scale;

    // refresh data when screen is focused
    useFocusEffect(
        useCallback(() => {
            const loadFavs = async () => {
                const data = await AsyncStorage.getItem('user_favorites');
                setFavs(data ? JSON.parse(data) : []);
            };
            loadFavs();
        }, [])
    );

    const renderFavItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={[styles.favItem, { 
                backgroundColor: colors.card,
                borderColor: colors.border 
            }]}
            onPress={() => router.push({ 
                pathname: '/packagedetails/reader', 
                params: { id: item.id, title: item.title, componentKey: item.componentKey } 
            })}
        >
            <View style={styles.itemInfo}>
                <View style={[styles.iconContainer, { backgroundColor: colors.textOnSecondary }]}>
                    <Ionicons name="heart" size={20} color={colors.favorite}/>
                </View>
                <Text style={[styles.itemTitle, { color: colors.textPrimary, fontSize: dynamicSize(16) }]}>
                    {item.title}
                </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: colors.textPrimary, fontSize: dynamicSize(20) }]}>
                    အနှစ်သက်ဆုံးများ
                </Text>
            </View>

            {/* List */}
            {favs.length > 0 ? (
                <FlatList
                    data={favs}
                    renderItem={renderFavItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Ionicons name="heart-dislike-outline" size={60} color={colors.textSecondary} />
                    <Text style={[styles.emptyText, { color: colors.textSecondary, fontSize: dynamicSize(16) }]}>
                        အနှစ်သက်ဆုံးများ မရှိသေးပါ။
                    </Text>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    headerTitle: {
        fontWeight: 'bold',
    },
    listContent: {
        padding: 15,
        gap: 12,
    },
    favItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        // Shadow for iOS/Android
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    itemInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    itemTitle: {
        fontWeight: '600',
        flex: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100,
    },
    emptyText: {
        marginTop: 15,
        fontWeight: '500',
    },
});