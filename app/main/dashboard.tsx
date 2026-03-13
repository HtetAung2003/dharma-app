import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

// Theme Context ကို ခေါ်ယူခြင်း
import { useTheme } from '../../context/ThemeContext';

import { useAuth } from '@/context/AuthContext';
import LatestStream from '@/components/dashboard/LatestStream';
import Packages from '@/components/dashboard/PracticePackages';


const Dashboard = () => {
    const { colors, isDarkMode, fontSize } = useTheme();
    const { userData , loading } = useAuth();
    // Font scaling logic
    const scale = fontSize / 16;
    const dynamicSize = (base: number) => base * scale;
const displayName = userData?.fullName 
        ? (userData.fullName.length > 4 
            ? `${userData.fullName.substring(0, 4)}...` 
            : userData.fullName)
        : 'ဧည့်သည်';
    return (
        <LinearGradient
            colors={isDarkMode ? ['#0F0F0F', '#1A1A1A', '#000000'] : ['#F5F9FF', '#E0E7FF', '#FFFFFF']}
            style={styles.background}
        >
            <SafeAreaView style={styles.container}>
                {/* Header Section */}
                <View style={styles.header}>
                    <View>
                       <Text 
                            numberOfLines={1} 
                            style={[styles.userName, { color: colors.textPrimary, fontSize: dynamicSize(24) }]}
                        >
                            မင်္ဂလာပါ {displayName} !
                        </Text>
                        <Text style={[styles.subText, { color: colors.textSecondary, fontSize: dynamicSize(16) }]}>
                            How are you feeling today?
                        </Text>
                    </View>

                    <TouchableOpacity>
                        <Ionicons name="person-circle-outline" size={dynamicSize(45)} color={colors.textPrimary} />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <BlurView intensity={isDarkMode ? 20 : 40} tint={isDarkMode ? "dark" : "light"} style={[styles.glassInput, { borderColor: colors.border }]}>
                        <Ionicons name="search-outline" size={20} color={colors.textSecondary} style={styles.searchIcon} />
                        <TextInput
                            placeholder="Search for meditation, music..."
                            placeholderTextColor={colors.textSecondary}
                            style={[styles.input, { color: colors.textPrimary, fontSize: dynamicSize(16) }]}
                        />
                    </BlurView>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                >
                    <View style={styles.bodycontainer}>
                      

                        {/* Featured Card */}
                    
                     <LatestStream />
                   <Packages/>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    background: { flex: 1 },
    container: { flex: 1, paddingHorizontal: 15 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
    },
    userName: { fontWeight: 'bold' },
    subText: { marginTop: 4 },
    bodycontainer: { marginTop: 20 },
    title: { fontWeight: 'bold' },
    searchContainer: { marginTop: 20, marginBottom: 10 },
    glassInput: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 55,
        borderRadius: 15,
        borderWidth: 1,
        overflow: 'hidden',
    },
    searchIcon: { marginRight: 10 },
    input: { flex: 1 },
   
});

export default Dashboard;