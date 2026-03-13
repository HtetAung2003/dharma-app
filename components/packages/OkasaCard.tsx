import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';


const OkasaCard = () => {
  const { colors, isDarkMode, fontSize } = useTheme();

  // Font scaling logic
  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <View style={styles.container}>
      {/* Title Section */}
      <View style={styles.titleWrapper}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.subtitle, { color: colors.primary, fontSize: dynamicSize(16) }]}>
          ဩကာသ ပန်ကြားလွှာ
        </Text>
      </View>

      {/* Script Card */}
      <View style={[
        styles.card, 
        { 
          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#E2E8F0'
        }
      ]}>
        <Text style={[
          styles.scriptText, 
          { 
            color: colors.textPrimary, 
            fontSize: dynamicSize(20), 
            lineHeight: dynamicSize(36) 
          }
        ]}>
          ဩကာသ၊ ဩကာသ၊ ဩကာသ၊{"\n"}
          ကာယကံ၊ ဝစီကံ၊ မနောကံ သဗ္ဗဒေါသ ခပ်သိမ်းသော အပြစ်တို့ကို ပျောက်ပါစေခြင်းအကျိုးငှာ ပထမ၊ ဒုတိယ၊ တတိယ၊ တစ်ကြိမ်၊ နှစ်ကြိမ်၊ သုံးကြိမ်မြောက်အောင် ဘုရားရတနာ၊ တရားရတနာ၊ သံဃာရတနာ၊ ရတနာမြတ်သုံးပါးတို့ကို အရိုအသေ အလေးအမြတ် လက်အုပ်မိုး၍ ရှိခိုးပူဇော် ဖူးမြော်မာန်လျှော့ ကန်တော့ပါ၏ အရှင်ဘုရား။{"\n\n"}
          ကန်တော့ရသော အကျိုးအားကြောင့် အပါယ်လေးပါး၊ ကပ်သုံးပါး၊ ရပ်ပြစ်ရှစ်ပါး၊ ရန်သူမျိုးငါးပါး၊ ဝိပ္ပတ္တိတရားလေးပါး၊ ဗျသနတရားငါးပါးတို့မှ အခါခပ်သိမ်း ကင်းလွတ်ငြိမ်းသည်ဖြစ်၍ မဂ်တရား၊ ဖိုလ်တရား၊ နိဗ္ဗာန်တရားတော်မြတ်ကို ရပါလို၏ အရှင်ဘုရား။
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 5,
  },
  titleLine: {
    width: 4,
    height: 18,
    borderRadius: 2,
    marginRight: 10,
  },
  subtitle: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  card: {
    padding: 22,
    borderRadius: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  scriptText: {
    textAlign: 'justify', // စာသားဘယ်ညာညီစေရန်
    fontWeight: '500',
  },
});

export default OkasaCard;