import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
// Import all package components
import OkasaCard from '@/components/packages/OkasaCard';
import ThilaRequestCard from '@/components/packages/ThilaRequestCard';
import SaranagonCard from '@/components/packages/SaranagonCard';
import MettaSuttaCard from '@/components/packages/MettaSuttaCard';
import DirectionalMettaCard from '@/components/packages/DirectionalMettaCard';
import MangalaSuttaCard from '@/components/packages/MangalaSuttaCard';
import Metta11Card from '@/components/packages/Metta11Card';
import PancaSilaCard from '@/components/packages/PancaSilaCard';
import ParittaNidannCard from '@/components/packages/ParittaNidannCard';
import RatanaSuttaCard from '@/components/packages/RatanaSuttaCard';
import SabbuddheCard from '@/components/packages/SabbuddheCard';
import SharingMeritCard from '@/components/packages/SharingMeritCard';
import TripleGemVirtuesCard from '@/components/packages/TripleGemVirtuesCard';
import PatthanaCard from '@/components/packages/PatthanaCard';
import PatthanaDetailCard from '@/components/packages/PatthanaDetailCard';
import GunTawKonCharCard from '@/components/packages/GunTawKonCharCard';
import GunTawKonCharFullCard from '@/components/packages/GunTawKonCharFullCard';
import ShinThiwaliGathaCard from '@/components/packages/ShinThiwaliGathaCard';
import AngulimalaSuttaCard from '@/components/packages/AngulimalaSuttaCard';
import DevaInvitationCard from '@/components/packages/DevaInvitationCard';
import MoraSuttaCard from '@/components/packages/MoraSuttaCard';
import KhandhaSuttaCard from '@/components/packages/KhandhaSuttaCard';
import WattaSuttaCard from '@/components/packages/WattaSuttaCard';
import BojjhangaSuttaCard from '@/components/packages/BojjhangaSuttaCard';
import DhammacakkaFourTruthsCard from '@/components/packages/DhammacakkaFourTruthsCard';
import DhammacakkaSuttaCard from '@/components/packages/DhammacakkaSuttaCard';
import PubbanhaSuttaCard from '@/components/packages/PubbanhaSuttaCard';
import MahasamayaSuttaIntroCard from '@/components/packages/MahasamayaSuttaIntroCard';
import DhajaggaSuttaCard from '@/components/packages/DhajaggaSuttaCard';
import AtanatiyaSuttaCard from '@/components/packages/AtanatiyaSuttaCard';
import { checkIfFavorite, toggleFavorite } from '@/constants/favouriteService';

const COMPONENT_MAP: { [key: string]: React.ComponentType<any> } = {
    'OkasaCard': OkasaCard,
    'ThilaRequestCard': ThilaRequestCard,
    'SaranagonCard': SaranagonCard,
    'MettaSuttaCard': MettaSuttaCard,
    'DirectionalMettaCard': DirectionalMettaCard,
    'MangalaSuttaCard': MangalaSuttaCard,
    'Metta11Card': Metta11Card,
    'PancaSilaCard': PancaSilaCard,
    'ParittaNidannCard': ParittaNidannCard,
    'RatanaSuttaCard': RatanaSuttaCard,
    'SabbuddheCard': SabbuddheCard,
    'SharingMeritCard': SharingMeritCard,
    'TripleGemVirtuesCard': TripleGemVirtuesCard,
    'PatthanaCard': PatthanaCard,
    'PatthanaDetailCard': PatthanaDetailCard,
    'GunTawKonCharCard': GunTawKonCharCard,
    'GunTawKonCharFullCard': GunTawKonCharFullCard,
    'ShinThiwaliGathaCard': ShinThiwaliGathaCard,
    'AngulimalaSuttaCard': AngulimalaSuttaCard,
    'DevaInvitationCard': DevaInvitationCard,
    'MoraSuttaCard': MoraSuttaCard,
    'KhandhaSuttaCard': KhandhaSuttaCard,
    'WattaSuttaCard': WattaSuttaCard,
    'BojjhangaSuttaCard': BojjhangaSuttaCard,
    'DhammacakkaFourTruthsCard': DhammacakkaFourTruthsCard,
    'DhammacakkaSuttaCard': DhammacakkaSuttaCard,
    'PubbanhaSuttaCard': PubbanhaSuttaCard,
    'MahasamayaSuttaIntroCard': MahasamayaSuttaIntroCard,
    'DhajaggaSuttaCard': DhajaggaSuttaCard,
    'AtanatiyaSuttaCard': AtanatiyaSuttaCard,
};

export default function ReaderScreen() {
    const router = useRouter();
    const { title, componentKey,id } = useLocalSearchParams();
    const { colors, isDarkMode, fontSize } = useTheme();
const [isFav, setIsFav] = useState(false);
    const scale = fontSize / 16;
    const dynamicSize = (base: number) => base * scale;

    const ComponentToRender = componentKey && typeof componentKey === 'string' ? COMPONENT_MAP[componentKey] : null;
useEffect(() => {
        // id ရှိမရှိ စစ်ပြီးမှ Favorite ဟုတ်မဟုတ် စစ်ဆေးပါ
        if (id) {
            checkIfFavorite(id as string).then(setIsFav);
        }
    }, [id]);

const handleFavoritePress = async () => {
    const status = await toggleFavorite({ 
        id: id as string, 
        title: title as string, 
        componentKey: componentKey as string 
    });
    setIsFav(status);
};
    return (
        <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: isDarkMode ? '#05111D' : '#F5F9FF' }]}>
       <View style={styles.header}>
    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
    </TouchableOpacity>
    
    <Text style={[styles.headerTitle, { color: colors.textPrimary, fontSize: dynamicSize(18) }]} numberOfLines={1}>
        {title}
    </Text>
    
    <TouchableOpacity onPress={handleFavoritePress} >
        <Ionicons 
            name={isFav ? "heart" : "heart-outline"} 
            size={24} 
            color={isFav ? "#FF5252" : colors.textPrimary} 
        />
    </TouchableOpacity>
</View>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} >
                {ComponentToRender ? <ComponentToRender /> : (
                    <Text style={{ color: colors.textPrimary, textAlign: 'center', marginTop: 20 }}>
                        Content not found.
                    </Text>
                )}
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1 
    },
    header: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingHorizontal: 15, 
        paddingVertical: 10, 
        borderBottomWidth: 1, 
        borderBottomColor: 'rgba(0,0,0,0.05)' 
    },
    backButton: { 
        padding: 5 
    },
    headerTitle: { 
        fontWeight: 'bold', 
        flex: 1, 
        textAlign: 'center' 
    },
    placeholder: { 
        width: 34 
    },
    content: { 
        padding: 15 
    },
});