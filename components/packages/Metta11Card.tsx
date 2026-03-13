import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

const Metta11Card = () => {
  const { colors, isDarkMode, fontSize } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  const mettaSteps = [
    { id: 1, text: "လုံးစုံများစွာ သတ္တဝါ၊ ချမ်းသာကိုယ်စိတ် မြဲပါစေ။\nဥပဒ်ရန်ဘေး၊ ကင်းစင်ဝေး၊ ငြိမ်းအေးကြပါစေ။" },
    { id: 2, text: "ကြောက်တတ်၊ မကြောက်တတ်၊ နှစ်ရပ်များစွာ သတ္တဝါ၊ ချမ်းသာကိုယ်စိတ် မြဲပါစေ။\nဥပဒ်ရန်ဘေး၊ ကင်းစင်ဝေး၊ ငြိမ်းအေးကြပါစေ။" },
    { id: 3, text: "မြင်အပ်၊ မမြင်အပ်၊ နှစ်ရပ်များစွာ သတ္တဝါ၊ ချမ်းသာကိုယ်စိတ် မြဲပါစေ။\nဥပဒ်ရန်ဘေး၊ ကင်းစင်ဝေး၊ ငြိမ်းအေးကြပါစေ။" },
    { id: 4, text: "ဝေးနေ၊ နီးနေ၊ နှစ်ထွေများစွာ သတ္တဝါ၊ ချမ်းသာကိုယ်စိတ် မြဲပါစေ။\nဥပဒ်ရန်ဘေး၊ ကင်းစင်ဝေး၊ ငြိမ်းအေးကြပါစေ။" },
    { id: 5, text: "ဘဝဇာတ်ဆုံး၊ မဆုံးများစွာ သတ္တဝါ၊ ချမ်းသာကိုယ်စိတ် မြဲပါစေ။\nဥပဒ်ရန်ဘေး၊ ကင်းစင်ဝေး၊ ငြိမ်းအေးကြပါစေ။" },
    { id: 6, text: "ရှည်-တို-အလတ်၊ သုံးရပ်ခန္ဓာ၊ သတ္တဝါ၊ ချမ်းသာကိုယ်စိတ် မြဲပါစေ။\nဥပဒ်ရန်ဘေး၊ ကင်းစင်ဝေး၊ ငြိမ်းအေးကြပါစေ။" },
    { id: 7, text: "ကြီး-ငယ်-အလတ်၊ သုံးရပ်ခန္ဓာ၊ သတ္တဝါ၊ ချမ်းသာကိုယ်စိတ် မြဲပါစေ။\nဥပဒ်ရန်ဘေး၊ ကင်းစင်ဝေး၊ ငြိမ်းအေးကြပါစေ။" },
    { id: 8, text: "ဆု-ကြုံ-အလတ်၊ သုံးရပ်ခန္ဓာ၊ သတ္တဝါ၊ ချမ်းသာကိုယ်စိတ် မြဲပါစေ။\nဥပဒ်ရန်ဘေး၊ ကင်းစင်ဝေး၊ ငြိမ်းအေးကြပါစေ။" },
    { id: 9, text: "လူအချင်းချင်း၊ လှည့်ပတ်ခြင်း၊ ကင်းရှင်းကြပါစေ။" },
    { id: 10, text: "အထင်သေးခြင်း၊ အချင်းချင်း၊ ကင်းရှင်းကြပါစေ။" },
    { id: 11, text: "ဆင်းရဲလိုခြင်း၊ အချင်းချင်း၊ ကင်းရှင်းကြပါစေ။" },
  ];

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.titleWrapper}>
        <View style={[styles.titleLine, { backgroundColor: '#10B981' }]} />
        <Text style={[styles.subtitle, { color: '#10B981', fontSize: dynamicSize(17) }]}>
          မေတ္တာ (၁၁) နည်း ပို့သပုံ
        </Text>
      </View>

      {/* Main Card */}
      <View style={[
        styles.card, 
        { 
          backgroundColor: isDarkMode ? 'rgba(16, 185, 129, 0.05)' : '#F0FDF4',
          borderColor: isDarkMode ? 'rgba(16, 185, 129, 0.2)' : '#DCFCE7'
        }
      ]}>
        {mettaSteps.map((step, index) => (
          <View key={step.id}>
            <View style={styles.stepRow}>
              <View style={[styles.numberCircle, { backgroundColor: isDarkMode ? '#065F46' : '#10B981' }]}>
                <Text style={styles.numberText}>{step.id}</Text>
              </View>
              <Text style={[
                styles.mettaText, 
                { 
                  color: colors.textPrimary, 
                  fontSize: dynamicSize(19),
                  lineHeight: dynamicSize(34)
                }
              ]}>
                {step.text}
              </Text>
            </View>
            {index !== mettaSteps.length - 1 && (
              <View style={[styles.innerDivider, { backgroundColor: isDarkMode ? '#065F46' : '#BBF7D0', opacity: 0.5 }]} />
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 25,
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
  },
  card: {
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 24,
    borderWidth: 1,
  },
  stepRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'flex-start',
  },
  numberCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 4,
  },
  numberText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  mettaText: {
    flex: 1,
    fontWeight: '500',
  },
  innerDivider: {
    height: 1,
    width: '85%',
    alignSelf: 'flex-end',
  }
});

export default Metta11Card;