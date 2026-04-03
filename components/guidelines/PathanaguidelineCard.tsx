import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PathanaGuidelineCard = () => {
  const { colors, fontSize, themeMode } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  const GuideSection = ({ title, items, type }: { title: string, items: string[], type: 'do' | 'dont' }) => (
    <View style={styles.section}>
      <Text style={[
        styles.sectionTitle, 
        { color: type === 'do' ? '#10B981' : '#EF4444', fontSize: dynamicSize(18) }
      ]}>
        {title}
      </Text>
      {items.map((item, index) => {
        const [boldText, ...rest] = item.split(':');
        return (
          <View key={index} style={styles.itemRow}>
            <View style={[
              styles.bullet, 
              { backgroundColor: type === 'do' ? '#10B981' : '#EF4444' }
            ]} />
            <Text style={[styles.itemText, { color: colors.textPrimary, fontSize: dynamicSize(16) }]}>
              <Text style={{ fontWeight: '800' }}>{boldText}:</Text>
              {rest.join(':')}
            </Text>
          </View>
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.mainTitle, { color: colors.primary, fontSize: dynamicSize(17) }]}>
          ပဋ္ဌာန်းရွတ်ဆိုရာတွင် လိုက်နာရန် လမ်းညွှန်
        </Text>
      </View>

      {/* Main Card */}
      <View style={[
        styles.card, 
        { 
          backgroundColor: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : '#FFFFFF',
          borderColor: colors.border
        }
      ]}>
        
        <GuideSection 
          title="✅ ဆောင်ရန် (Do's)" 
          type="do"
          items={[
            "သန့်ရှင်းစင်ကြယ်ခြင်း: ရွတ်ဖတ်မည့်နေရာနှင့် မိမိကိုယ်တိုင် သန့်ရှင်းစွာ နေထိုင်ပါ။",
            "ရိုသေလေးစားခြင်း: တည်ငြိမ်စွာထိုင်၍ လက်အုပ်ချီကာ ရိုသေစွာ ရွတ်ဆိုပါ။",
            "စိတ်တည်ငြိမ်ခြင်း: မရွတ်မီ ခဏတာ အသက်ရှူခြင်း (သို့) မေတ္တာပို့ခြင်းဖြင့် စိတ်ကို ငြိမ်သက်စေပါ။",
            "အသံအနေအထား: မိမိနားလည်နိုင်သော အသံဖြင့် ညီညာမှန်ကန်စွာ ရွတ်ဆိုပါ။",
            "အဆုံးသတ်ဆုတောင်း: ရွတ်ဖတ်ပြီးနောက် အမျှဝေခြင်းနှင့် ဆုတောင်းခြင်းကို ပြုလုပ်ပါ။"
          ]}
        />

        <View style={styles.divider} />

        <GuideSection 
          title="❌ ရှောင်ရန် (Don'ts)" 
          type="dont"
          items={[
            "အာရုံလွဲခြင်း: ရွတ်ဆိုနေစဉ် ဖုန်းကြည့်ခြင်း၊ စကားပြောခြင်းတို့ကို ရှောင်ကြဉ်ပါ။",
            "အလျင်စလိုရွတ်ခြင်း: အသံထွက်မှန်ကန်ရန် ဂရုစိုက်ပါ။ အချိန်ကုန်စေရန်သက်သက် အလျင်စလို မရွတ်ပါနှင့်။",
            "မသန့်ရှင်းသောနေရာ: ဆူညံပူလောင်သော သို့မဟုတ် အညစ်အကြေးရှိသော နေရာများကို ရှောင်ပါ။",
            "မူးယစ်သေစာ သောက်စားခြင်း: အရက်၊ မူးယစ်ဆေး သုံးစွဲထားချိန်တွင် လုံးဝရှောင်ကြဉ်ပါ။",
            "အဓိပ္ပာယ်မဲ့ခြင်း: စက်ရုပ်သဖွယ် ရွတ်ဆိုခြင်းထက် ကြည်ညိုစိတ်ဖြင့် ရွတ်ဆိုပါ။"
          ]}
        />

        {/* Note Box */}
        <View style={[
          styles.noteBox, 
          { backgroundColor: themeMode === 'dark' ? 'rgba(99, 102, 241, 0.1)' : '#EEF2FF' }
        ]}>
          <Text style={[styles.noteText, { color: colors.primary, fontSize: dynamicSize(14) }]}>
            မှတ်ချက်။ ။ ပဋ္ဌာန်းတရားတော်သည် အလွန်နက်နဲသောအစွမ်းရှိသဖြင့် စိတ်စေတနာသန့်ရှင်းစွာဖြင့် ရွတ်ဆိုပူဇော်ခြင်းက အကျိုးကျေးဇူး အရှိဆုံးဖြစ်ပါသည်။
          </Text>
        </View>
      </View>
    </View>
  );
};

// Styles remain identical to your provided guideline for consistency
const styles = StyleSheet.create({
  container: { width: '100%', paddingVertical: 10 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, paddingHorizontal: 5 },
  titleLine: { width: 4, height: 18, borderRadius: 2, marginRight: 10 },
  mainTitle: { fontWeight: '700' },
  card: { borderRadius: 24, borderWidth: 1, padding: 20, elevation: 1 },
  section: { marginBottom: 20 },
  sectionTitle: { fontWeight: '800', marginBottom: 12 },
  itemRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10, paddingLeft: 5 },
  bullet: { width: 6, height: 6, borderRadius: 3, marginTop: 10, marginRight: 12 },
  itemText: { flex: 1, lineHeight: 26, fontWeight: '500' },
  divider: { height: 1, width: '100%', backgroundColor: '#E5E7EB', opacity: 0.3, marginBottom: 20 },
  noteBox: { padding: 15, borderRadius: 15, marginTop: 5 },
  noteText: { lineHeight: 22, fontWeight: '600', fontStyle: 'italic', textAlign: 'center' },
});

export default PathanaGuidelineCard;

