import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MahasamayaSuttaFourKings = () => {
  const { colors, isDarkMode, fontSize } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.titleLine, { backgroundColor: colors.secondary }]} />
        <Text style={[styles.mainTitle, { color: colors.secondary, fontSize: dynamicSize(18) }]}>
          မဟာသမယသုတ် (နတ်မင်းကြီးလေးပါးကဏ္ဍ)
        </Text>
      </View>

      <View style={[
        styles.card, 
        { 
          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : '#FFFFFF',
          borderColor: colors.border
        }
      ]}>
      
         <View style={styles.kingSection}>
          <Text style={[styles.directionTitle, { color: colors.secondary }]}>၁၂။သာတာဂိရာ တိသဟဿာ၊</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(16.5) }]}>
      

   ယက္ခာ နာနတ္တဝဏ္ဏိနော။
   ဣဒ္ဓိမန္တော ဇုတိမန္တော၊ 
   ဝဏ္ဏဝန္တော ယသဿိနော။
   မောဒမာနာ အဘိက္ကာမုံ၊ 
   ဘိက္ခူနံ သမိတိံ ဝနံ။
          </Text>
        </View>
         <View style={styles.divider} />
         <View style={styles.kingSection}>
          <Text style={[styles.directionTitle, { color: colors.secondary }]}>၁၃။ဣစ္စေတေ သောဠသသဟဿာ၊</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(16.5) }]}>
   ယက္ခာ နာနတ္တဝဏ္ဏိနော။
   ဣဒ္ဓိမန္တော ဇုတိမန္တော၊ 
   ဝဏ္ဏဝန္တော ယသဿိနော။
   မောဒမာနာ အဘိက္ကာမုံ၊ 
   ဘိက္ခူနံ သမိတိံ ဝနံ။
          </Text>
        </View>
         <View style={styles.divider} />
         <View style={styles.kingSection}>
          <Text style={[styles.directionTitle, { color: colors.secondary }]}>၁၄။ဝေဿာမိတ္တာ ပဉ္စသတာ၊</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(16.5) }]}>
    

   ယက္ခာ နာနတ္တဝဏ္ဏိနော။
   ဣဒ္ဓိမန္တော ဇုတိမန္တော၊ 
   ဝဏ္ဏဝန္တော ယသဿိနော။
   မောဒမာနာ အဘိက္ကာမုံ၊ 
   ဘိက္ခူနံ သမိတိံ ဝနံ။
          </Text>
        </View>
         <View style={styles.divider} />
         <View style={styles.kingSection}>
          <Text style={[styles.directionTitle, { color: colors.secondary }]}>၁၅။ကုမ္ဘိီရော ရာဇဂဟိကော၊</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(16.5) }]}>
   ဝေပုလ္လ’ဿ နိဝေသနံ။
   ဘိယျော နံ သတသဟဿံ၊ 
   ယက္ခာနံ ပယိရုပါသတိ။
   ကုမ္ဘီရော ရာဇဂဟိကော၊ 
   သောပါဂါ သမိတိံ ဝနံ။
          </Text>
        </View>
         <View style={styles.divider} />
        {/* ၁၆။ အရှေ့အရပ် - ဓတရဋ္ဌနတ်မင်း */}
        <View style={styles.kingSection}>
          <Text style={[styles.directionTitle, { color: colors.secondary }]}>၁၆။ပုရိမဉ္စ ဒိသံ ရာဇာ၊</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(16.5) }]}>
   ဓတရဋ္ဌော ပသာသတိ။
   ဂန္ဓဗ္ဗာနံ အဓိပတိ၊ 
   မဟာရာဇာ ယသဿိသော။
   ပုတ္တာပိ တဿ ဗဟဝေါ၊ 
   ဣန္ဒနာမာ မဟဗ္ဗလာ။
   ဣဒ္ဓိမန္တော ဇုတိမန္တော၊ 
   ဝဏ္ဏဝန္တော ယသဿိနော။
   မောဒမာနာ အဘိက္ကာမုံ၊ 
   ဘိက္ခူနံ သမိတိံ ဝနံ။
          </Text>
        </View>

        <View style={styles.divider} />

        {/* ၁၇။ တောင်အရပ် - ဝိရူဠှကနတ်မင်း */}
        <View style={styles.kingSection}>
          <Text style={[styles.directionTitle, { color: colors.secondary }]}>၁၇။ဝိရူဠှော တံ ပသာသတိ။</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(16.5) }]}>
           
   ကုမ္ဘဏ္ဍာနံ အဓိပတိ၊ 
   မဟာရာဇာ ယသဿိသော။
   ပုတ္တာပိ တဿ ဗဟဝေါ၊ 
   ဣန္ဒနာမာ မဟဗ္ဗလာ။
   ဣဒ္ဓိမန္တော ဇုတိမန္တော၊ 
   ဝဏ္ဏဝန္တော ယသဿိနော။
   မောဒမာနာ အဘိက္ကာမုံ၊ 
   ဘိက္ခူနံ သမိတိံ ဝနံ။
          </Text>
        </View>

        <View style={styles.divider} />

        {/* ၁၈။ အနောက်အရပ် - ဝိရူပက္ခနတ်မင်း */}
        <View style={styles.kingSection}>
          <Text style={[styles.directionTitle, { color: colors.secondary }]}>၁၈။ပစ္ဆိမဉ္စ ဒိသံ ရာဇာ၊</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(16.5) }]}>
            

   ဝိရူပက္ခော ပသာသတိ။
   နာဂါနဉ္စ အဓိပတိ၊ 
   မဟာရာဇာ ယသဿိသော။
   ပုတ္တာပိ တဿ ဗဟဝေါ၊ 
   ဣန္ဒနာမာ မဟဗ္ဗလာ။
   ဣဒ္ဓိမန္တော ဇုတိမန္တော၊ 
   ဝဏ္ဏဝန္တော ယသဿိနော။
   မောဒမာနာ အဘိက္ကာမုံ၊ 
   ဘိက္ခူနံ သမိတိံ ဝနံ။
          </Text>
        </View>

        <View style={styles.divider} />

        {/* ၁၉။ မြောက်အရပ် - ကုဝေရ (ဝေဿဝဏ) နတ်မင်း */}
        <View style={styles.kingSection}>
          <Text style={[styles.directionTitle, { color: colors.secondary }]}>၁၉။ဥတ္တရဉ္စ ဒိသံ ရာဇာ၊</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(16.5) }]}>
         

   ကုဝေရော တံ ပသာသတိ။
   ယက္ခာနဉ္စ အဓိပတိ၊ 
   မဟာရာဇာ ယသဿိသော။
   ပုတ္တာပိ တဿ ဗဟဝေါ၊ 
   ဣန္ဒနာမာ မဟဗ္ဗလာ။
   ဣဒ္ဓိမန္တော ဇုတိမန္တော၊ 
   ဝဏ္ဏဝန္တော ယသဿိနော။
   မောဒမာနာ အဘိက္ကာမုံ၊ 
   ဘိက္ခူနံ သမိတိံ ဝနံ။
          </Text>
        </View>
         <View style={styles.divider} />
   <View style={styles.kingSection}>
          <Text style={[styles.directionTitle, { color: colors.secondary }]}>၂၀။ပုရိမံ ဒိသံ ဓတရဋ္ဌော၊</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(16.5) }]}>
         

   ဒက္ခိဏေန ဝိရူဠှကော။
   ပစ္ဆိမေန ဝိရူပက္ခော၊ 
   ကုဝေရော ဥတ္တရံ ဒိသံ။
          </Text>
        </View>
         <View style={styles.divider} />
          <View style={styles.kingSection}>
          <Text style={[styles.directionTitle, { color: colors.secondary }]}>၂၁။စတ္တာရော တေ မဟာရာဇာ၊</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(16.5) }]}>
    သမန္တာ စတုရော ဒိသာ။
   ဒဒ္ဒလ္လမာနာ အဋ္ဌံသု၊ 
   ဝနေ ကာပိလဝတ္ထဝေ။
          </Text>
        </View>
         <View style={styles.divider} />
         <View style={styles.kingSection}>
          <Text style={[styles.directionTitle, { color: colors.secondary }]}>၂၂။တေသံ မာယာဝိနော ဒါသာ၊</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(16.5) }]}>
     အာဂုံ ဝဉ္စနိကာ သဌာ။
   မာယာ ကုဋေဏ္ဍု ဝိဋေဏ္ဍု၊ 
   ဝိဋုစ္စ ဝိဋုဋော သဟ။
   စန္ဒနော ကာမသေဋ္ဌော စ၊ 
   ကိန္နိဃဏ္ဍု နိဃဏ္ဍု စ။
   ပနာဒေါ ဩပမညော စ၊ 
   ဒေဝသူတော စ မာတလိ။
          </Text>
        </View>
         <View style={styles.divider} />
         <View style={styles.kingSection}>
          <Text style={[styles.directionTitle, { color: colors.secondary }]}>၂၃။စိတ္တသေနော စ ဂန္ဓဗ္ဗော၊</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(16.5) }]}>
  နဠောရာဇာ ဇနေသဘော။
   အာဂါ ပဉ္စသိခေါ စေဝ၊ 
   တိမ္ဗရူ သူရိယဝစ္ဆသာ။
   ဧတေ စညေ စ ရာဇာနော၊ 
   ဂန္ဓဗ္ဗာ သဟ ရာဇုဘိ။
   မောဒမာနာ အဘိက္ကာမုံ၊ 
   ဘိက္ခူနံ သမိတိံ ဝနံ။
          </Text>
        </View>
         <View style={styles.divider} />
         <View style={styles.kingSection}>
          <Text style={[styles.directionTitle, { color: colors.secondary }]}>၂၄။အထာဂုံ နာဂသာ နာဂါ၊</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(16.5) }]}>
    ဝေသာလာ သဟ တစ္ဆကာ။
   ကမ္ဗလဿတရာ အာဂုံ၊ 
   ပါယာဂါ သဟ ဉာတိဘိ။
   ယာမုနာ ဓတရဋ္ဌာ စ၊ 
   အာဂုံ “နာဂါ” ယသဿိနော။
   ဧရာဝဏော မဟာနာဂေါ၊ 
   သောပါဂါ သမိတိံ ဝနံ။
          </Text>
        </View>
     

     
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', paddingVertical: 10 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, paddingHorizontal: 5 },
  titleLine: { width: 4, height: 20, borderRadius: 2, marginRight: 10 },
  mainTitle: { fontWeight: '700' },
  card: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  kingSection: { marginVertical: 5 },
  directionTitle: { fontWeight: '800', marginBottom: 8, fontSize: 14, textTransform: 'uppercase' },
  stanzaText: { lineHeight: 28, fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 15, opacity: 0.3 },
  summaryBox: { 
    marginTop: 20, 
    padding: 15, 
    borderRadius: 15, 
    backgroundColor: 'rgba(99, 102, 241, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.1)'
  },
  summaryText: { lineHeight: 28, textAlign: 'center', fontWeight: '700' },
  footer: { marginTop: 20, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  footerLabel: { fontSize: 13, fontStyle: 'italic', lineHeight: 20 }
});

export default MahasamayaSuttaFourKings;