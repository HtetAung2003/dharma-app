import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { db } from '../../services/firebaseConfig'; // လမ်းကြောင်းမှန်အောင် ပြန်စစ်ပေးပါ
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { useRouter } from 'expo-router';

// Theme နဲ့ Store Context များ
import { useTheme } from '../../context/ThemeContext';


interface Song {
    id: string;
    title: string;
    artist: string;
    artwork: string;
    url: string;
}

const LatestStream = () => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    
    // Theme နဲ့ Music Store မှ လိုအပ်သည်များယူခြင်း
    const { colors, fontSize, themeMode } = useTheme();
   

    // Font scaling logic
    const scale = fontSize / 16;
    const dynamicSize = (base: number) => base * scale;

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const q = query(collection(db, "dharma_contents"), orderBy("createdAt", "desc"), limit(10));
                const querySnapshot = await getDocs(q);
                const fetchedSongs = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Song[];
                setSongs(fetchedSongs);
            } catch (error) {
                console.error("Error fetching songs: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSongs();
    }, []);

    if (loading) return <ActivityIndicator size="small" color={colors.primary} style={{ marginVertical: 20 }} />;

    const handleSongPress = async (item: Song) => {
        // await playSong(item);
        // router.push({
        //     pathname: '/music-player',
        //     params: {
        //         title: item.title,
        //         url: item.url,
        //         artwork: item.artwork,
        //         artist: item.artist
        //     }
        // });
    };

    return (
        <View style={styles.section}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.textPrimary, fontSize: dynamicSize(20) }]}>
                    နောက်ဆုံးနာယူမှုများ
                </Text>
                <TouchableOpacity>
                    <Text style={[styles.seeMore, { color: colors.primary, fontSize: dynamicSize(14) }]}>
                        အားလုံးကြည့်ရန်
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={songs}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 15 }}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.card, 
                            { 
                                backgroundColor: themeMode === 'dark' ? '#1E293B' : '#FFFFFF',
                                shadowColor: themeMode === 'dark' ? '#000' : '#94A3B8'
                            }
                        ]}
                        onPress={() => handleSongPress(item)}
                    >
                        <Image source={{ uri: item.artwork }} style={styles.image} />
                        <Text 
                            style={[styles.songTitle, { color: colors.textPrimary, fontSize: dynamicSize(14) }]} 
                            numberOfLines={1}
                        >
                            {item.title}
                        </Text>
                        <Text 
                            style={[styles.artistName, { color: colors.textSecondary, fontSize: dynamicSize(12) }]} 
                            numberOfLines={1}
                        >
                            {item.artist}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    section: { marginTop: 25 },
    header: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
     
        marginBottom: 15 
    },
    title: { fontWeight: 'bold' },
    seeMore: { fontWeight: '500' },
    card: { 
        width: 155, 
        borderRadius: 20, 
        padding: 10, 
        marginRight: 15, 
        marginBottom: 10,
        shadowOpacity: 0.1, 
        shadowRadius: 8, 
        elevation: 3 
    },
    image: { width: '100%', height: 120, borderRadius: 15, backgroundColor: '#E2E8F0' },
    songTitle: { fontWeight: 'bold', marginTop: 10 },
    artistName: { marginTop: 4 }
});

export default LatestStream;

