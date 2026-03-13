import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import { useTheme } from '../context/ThemeContext';
import { SIZES } from '../constants/Theme';

const { height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const { colors, isDarkMode, fontSize } = useTheme();

  // အခြေခံ fontSize အပေါ်မူတည်ပြီး အချိုးကျ တွက်ချက်ခြင်း
  const scale = fontSize / 16; // Default size 16 ကို base ထားပါသည်
  const dynamicSize = (base: number) => base * scale;

  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      
      <LinearGradient
        colors={isDarkMode 
          ? [colors.secondary, '#0D2137', '#000000'] 
          : ['#E0F2F1', '#B2DFDB', '#F5F9FF']} 
        style={styles.background}
      >
        <View style={styles.innerContent}>
          
          <View style={styles.headerSection}>
            <View style={styles.logoCircle}>
              <Image 
                source={require('../assets/images/logo.png')} 
                style={[styles.logo, { tintColor: colors.primary }]} 
              />
            </View>
            {/* မင်္ဂလာပါ စာသား - အခြေခံ ၂၀ အပေါ်မူတည်ပြီး ကြီးလာမည် */}
            <Text style={[styles.welcomeText, { 
              color: isDarkMode ? '#FFF' : colors.secondary,
              fontSize: dynamicSize(20) 
            }]}>
              မင်္ဂလာပါ
            </Text>
            {/* App Name - အခြေခံ ၄၂ အပေါ်မူတည်ပြီး ကြီးလာမည် */}
            <Text style={[styles.appName, { 
              color: colors.primary, 
              fontSize: dynamicSize(46) 
            }]}>
              Dharma
            </Text>
          </View>

          <View style={styles.descriptionSection}>
            <View style={[styles.divider, { backgroundColor: colors.primary }]} />
            
            <Text style={[styles.tagline, { 
              color: isDarkMode ? '#FFF' : colors.secondary, 
              fontSize: dynamicSize(18) 
            }]}>
              စိတ်နှလုံးအေးချမ်းစေဖို့ ဓမ္မလမ်းကိုလျှောက်လှမ်းစို့
            </Text>

            <Text style={[styles.description, { 
              color: isDarkMode ? '#B0BEC5' : '#546E7A', 
              fontSize: dynamicSize(16) 
            }]}>
              နေ့စဉ်ဘဝရဲ့ ပင်ပန်းနွမ်းနယ်မှုတွေကို {"\n"}
              တရားတော်များ၊ ပဋ္ဌာန်းဒေသနာတော်များ နာယူရင်း {"\n"}
              ငြိမ်းချမ်းစွာ ဖြတ်သန်းလိုက်ပါ။
            </Text>
            
            <View style={[styles.divider, { backgroundColor: colors.primary }]} />
          </View>

          <View style={styles.footerSection}>
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={() => router.push('/auth/login')}
            >
              <Text style={[styles.buttonText, { 
                color: colors.secondary, 
                fontSize: dynamicSize(18) 
              }]}>
                စတင်အသုံးပြုမည်
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.outlineButton, { borderColor: colors.primary }]}
              onPress={() => router.push('/auth/register')}
            >
              <Text style={[styles.outlineText, { 
                color: colors.primary, 
                fontSize: dynamicSize(16) 
              }]}>
                အကောင့်အသစ်ပြုလုပ်ရန်
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  innerContent: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    justifyContent: 'space-between',
    paddingVertical: height * 0.05, // Font ကြီးရင် နေရာဆံ့အောင် Padding ကို လျှော့ထားသည်
  },
  headerSection: { alignItems: 'center' },
  logoCircle: { justifyContent: 'center', alignItems: 'center', marginBottom: 5 },
  logo: { width: 120, height: 120, resizeMode: 'contain' },
  appName: { fontWeight: 'bold', marginTop: 5 },
  descriptionSection: { alignItems: 'center' },
  divider: { width: 40, height: 2, marginVertical: 10, opacity: 0.6 },
  tagline: { fontWeight: '600', textAlign: 'center', marginBottom: 10 },
  description: { textAlign: 'center', lineHeight: 28 },
  footerSection: { width: '100%', gap: 12 },
  button: {
    height: 60,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: { fontWeight: 'bold' },
  outlineButton: {
    height: 60,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  outlineText: { fontWeight: '600' },
});