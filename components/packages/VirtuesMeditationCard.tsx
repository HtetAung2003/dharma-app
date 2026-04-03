import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { useTheme } from '@/context/ThemeContext';

const { width } = Dimensions.get('window');

const VirtuesMeditationCard = () => {
    const { colors, themeMode } = useTheme();

    return (
        <View style={styles.container}>
            {/* ရောင်ခြည်တော် အာရုံပြုရန် Animation အဝိုင်းလေးများ */}
            <View style={styles.animationWrapper}>
                {[1, 1.5, 2].map((scale, index) => (
                    <MotiView
                        key={index}
                        from={{ opacity: 0.6, scale: 1 }}
                        animate={{ opacity: 0, scale: scale }}
                        transition={{
                            type: 'timing',
                            duration: 3000,
                            loop: true,
                            delay: index * 1000,
                        }}
                        style={[styles.halo, { borderColor: themeMode === 'dark' ? '#FFD700' : '#4FC3F7' }]}
                    />
                ))}
                
                <LinearGradient
                    colors={themeMode === 'dark' ? ['#FFD700', '#F9A825'] : ['#B3E5FC', '#4FC3F7']}
                    style={styles.centerCircle}
                >
                    <Text style={styles.omSymbol}>ဗုဒ္ဓံ</Text>
                </LinearGradient>
            </View>

            {/* ဂုဏ်တော် စာသားအပိုင်း */}
            <View style={[styles.card, { backgroundColor: themeMode === 'dark' ? 'rgba(255,255,255,0.05)' : '#FFFFFF', borderColor: colors.border }]}>
                <Text style={[styles.paliText, { color: colors.textPrimary }]}>
                    "ဣတိပိသော ဘဂဝါ အရဟံ၊ သမ္မာသမ္ဗုဒ္ဓေါ၊ ဝိဇ္ဇာစရဏသမ္ပန္နော၊ သုဂတော၊ လောကဝိဒူ၊ အနုတ္တရော ပုရိသဒမ္မသာရထိ၊ သတ္တာ ဒေဝမနုဿာနံ၊ ဗုဒ္ဓေါ၊ ဘဂဝါ။"
                </Text>
                
                <View style={styles.guideBox}>
                    <Text style={[styles.guideText, { color: themeMode === 'dark' ? '#FFD700' : '#0277BD' }]}>
                        💡 ဘုရားရှင်ရဲ့ အေးချမ်းတဲ့ ရောင်ခြည်တော်တွေ မိမိကိုယ်ပေါ်ကို လွှမ်းခြုံထားတယ်လို့ အာရုံပြုပါ။
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    animationWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 180,
        marginBottom: 20,
    },
    halo: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
    },
    centerCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#FFD700',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
    },
    omSymbol: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
    },
    card: {
        width: width * 0.9,
        padding: 25,
        borderRadius: 20,
        borderWidth: 1,
        alignItems: 'center',
    },
    paliText: {
        fontSize: 19,
        lineHeight: 34,
        textAlign: 'center',
        fontWeight: '600',
        fontFamily: 'sans-serif-medium', // မြန်မာစာလုံးအတွက် သင့်တော်သော font သုံးပါ
    },
    guideBox: {
        marginTop: 20,
        padding: 12,
        borderRadius: 10,
        backgroundColor: 'rgba(79, 195, 247, 0.1)',
    },
    guideText: {
        fontSize: 14,
        textAlign: 'center',
        fontStyle: 'italic',
        lineHeight: 22,
    },
});

export default VirtuesMeditationCard;

