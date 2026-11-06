import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

type TabType = "terms" | "privacy" | "contact";

const SUPPORT_EMAIL = "dharmaapp@outlook.com";

export default function LegalAndSupportScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const params = useLocalSearchParams<{ tab?: string }>();

  const initialTab: TabType =
    params.tab === "privacy" || params.tab === "contact"
      ? (params.tab as TabType)
      : "terms";

  const [activeTab, setActiveTab] = useState<TabType>(initialTab);

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/main/settings");
    }
  };

  const handleOpenEmail = () => {
    if (SUPPORT_EMAIL.includes("[")) {
      // In case the user hasn't replaced the placeholder yet
      Linking.openURL("mailto:support@dharmaapp.com?subject=Dharma%20App%20Support");
    } else {
      Linking.openURL(`mailto:${SUPPORT_EMAIL}?subject=Dharma%20App%20Support`);
    }
  };

  return (
    <LinearGradient
      colors={[
        colors.splashBackground,
        colors.gradientMiddle,
        colors.gradientEnd,
      ]}
      style={styles.background}
    >
      <SafeAreaView style={styles.safeArea}>
        <Stack.Screen options={{ headerShown: false }} />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={goBack}
            style={[styles.backButton, { borderColor: colors.border }]}
          >
            <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
            ဥပဒေနှင့် အကူအညီ
          </Text>
        </View>

        {/* Tab Switcher */}
        <View
          style={[
            styles.tabBar,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <TouchableOpacity
            onPress={() => setActiveTab("terms")}
            style={[
              styles.tabItem,
              activeTab === "terms" && [
                styles.activeTabItem,
                { backgroundColor: colors.primary },
              ],
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === "terms"
                      ? colors.textOnPrimary
                      : colors.textSecondary,
                  fontWeight: activeTab === "terms" ? "700" : "500",
                },
              ]}
            >
              စည်းမျဉ်းများ
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab("privacy")}
            style={[
              styles.tabItem,
              activeTab === "privacy" && [
                styles.activeTabItem,
                { backgroundColor: colors.primary },
              ],
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === "privacy"
                      ? colors.textOnPrimary
                      : colors.textSecondary,
                  fontWeight: activeTab === "privacy" ? "700" : "500",
                },
              ]}
            >
              ကိုယ်ရေးလုံခြုံမှု
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab("contact")}
            style={[
              styles.tabItem,
              activeTab === "contact" && [
                styles.activeTabItem,
                { backgroundColor: colors.primary },
              ],
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === "contact"
                      ? colors.textOnPrimary
                      : colors.textSecondary,
                  fontWeight: activeTab === "contact" ? "700" : "500",
                },
              ]}
            >
              ဆက်သွယ်ရန်
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {activeTab === "terms" && (
            <View style={styles.sectionContainer}>
              <View
                style={[
                  styles.badgeCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Ionicons
                  name="document-text"
                  size={28}
                  color={colors.primary}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={[styles.bannerTitle, { color: colors.textPrimary }]}
                  >
                    စည်းမျဉ်းနှင့် သတ်မှတ်ချက်များ
                  </Text>
                  <Text
                    style={[
                      styles.bannerSubtitle,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Terms and Conditions
                  </Text>
                </View>
              </View>

              <Text
                style={[styles.introText, { color: colors.textSecondary }]}
              >
                Dharma App ကို အသုံးပြုခြင်းအတွက် ကျေးဇူးတင်ရှိပါသည်။ ဤအက်ပ်အား
                အသုံးပြုခြင်းအားဖြင့် အောက်ဖော်ပြပါ စည်းမျဉ်းနှင့်
                သတ်မှတ်ချက်များကို ဖတ်ရှုနားလည်ပြီး သဘောတူလက်ခံပြီးဖြစ်သည်ဟု
                မှတ်ယူမည်ဖြစ်ပါသည်။
              </Text>

              {/* Section 1 */}
              <View
                style={[
                  styles.card,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <View style={styles.cardHeader}>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={colors.primary}
                  />
                  <Text
                    style={[styles.cardTitle, { color: colors.textPrimary }]}
                  >
                    ၁။ အသုံးပြုသူ၏ တာဝန်ယူမှုများ (User Responsibilities)
                  </Text>
                </View>
                <Text
                  style={[styles.cardBody, { color: colors.textSecondary }]}
                >
                  • အက်ပ်တွင် အကောင့်ပြုလုပ်ရာ၌ မိမိ၏ အချက်အလက်အမှန်များကိုသာ
                  ဖြည့်သွင်းအသုံးပြုရမည် ဖြစ်ပါသည်။{"\n"}• အက်ပ်ကို အသုံးပြုရာတွင်
                  တည်ဆဲဥပဒေများနှင့် လူမှုကျင့်ဝတ်များကို အပြည့်အဝ
                  လေးစားလိုက်နာရပါမည်။{"\n"}• အခြားအသုံးပြုသူများ၏ အခွင့်အရေးကို
                  ထိပါးစေခြင်း သို့မဟုတ် အက်ပ်၏ ပုံမှန်လည်ပတ်မှုကို
                  နှောင့်ယှက်စေမည့် မည်သည့်လုပ်ဆောင်ချက်ကိုမျှ
                  မပြုလုပ်ရန် တာဝန်ယူရပါမည်။
                </Text>
              </View>

              {/* Section 2 */}
              <View
                style={[
                  styles.card,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <View style={styles.cardHeader}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={20}
                    color={colors.primary}
                  />
                  <Text
                    style={[styles.cardTitle, { color: colors.textPrimary }]}
                  >
                    ၂။ လက်ခံနိုင်သော အက်ပ်အသုံးပြုမှု (Acceptable Usage)
                  </Text>
                </View>
                <Text
                  style={[styles.cardBody, { color: colors.textSecondary }]}
                >
                  • ဤအက်ပ်သည် တရားတော်များ နာယူခြင်း၊ ပုတီးစိပ်ခြင်းနှင့်
                  ကုသိုလ်စိတ်ပွားများရေး အထောက်အကူပြုရန်အတွက်သာ သီးသန့်
                  ဖန်တီးထားခြင်း ဖြစ်ပါသည်။{"\n"}• စနစ်အား တရားမဝင် ဝင်ရောက်စွက်ဖက်ခြင်း
                  (hacking)၊ အန္တရာယ်ရှိသော ကုဒ်များ (malware) ထည့်သွင်းခြင်းနှင့်
                  ဆာဗာများ ဝန်ပိစေရန် တမင်ဖန်တီးခြင်းများကို တင်းကြပ်စွာ
                  တားမြစ်ထားပါသည်။{"\n"}• ခွင့်ပြုချက်မရှိဘဲ အက်ပ်အတွင်းမှ
                  အချက်အလက်များနှင့် နည်းပညာများကို စီးပွားဖြစ် ကူးယူအသုံးချခြင်း
                  လုံးဝမပြုလုပ်ရပါ။
                </Text>
              </View>

              {/* Section 3 */}
              <View
                style={[
                  styles.card,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <View style={styles.cardHeader}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color={colors.primary}
                  />
                  <Text
                    style={[styles.cardTitle, { color: colors.textPrimary }]}
                  >
                    ၃။ အကောင့်လုံခြုံရေး (Account Safety)
                  </Text>
                </View>
                <Text
                  style={[styles.cardBody, { color: colors.textSecondary }]}
                >
                  • မိမိအကောင့်၏ အီးမေးလ်နှင့် စကားဝှက် (Password)
                  လုံခြုံမှုရှိစေရန် ထိန်းသိမ်းခြင်းသည် အသုံးပြုသူ၏
                  ကိုယ်ပိုင်တာဝန်သာ ဖြစ်ပါသည်။{"\n"}• အကောင့်အား အခြားသူတစ်ဦးဦးမှ
                  ခွင့်ပြုချက်မဲ့ ဝင်ရောက်သုံးစွဲနေသည်ဟု သံသယရှိပါက
                  စကားဝှက်အား ချက်ချင်းပြောင်းလဲခြင်း သို့မဟုတ် ကျွန်ုပ်တို့၏ Support
                  ထံ ချက်ချင်းအကြောင်းကြားသင့်ပါသည်။
                </Text>
              </View>

              {/* Section 4 */}
              <View
                style={[
                  styles.card,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <View style={styles.cardHeader}>
                  <Ionicons
                    name="ribbon-outline"
                    size={20}
                    color={colors.primary}
                  />
                  <Text
                    style={[styles.cardTitle, { color: colors.textPrimary }]}
                  >
                    ၄။ ဉာဏပစ္စည်း မူပိုင်ခွင့်နှင့် ဝန်ဆောင်မှုဆိုင်ရာ အခွင့်အရေးများ (Intellectual Property)
                  </Text>
                </View>
                <Text
                  style={[styles.cardBody, { color: colors.textSecondary }]}
                >
                  • ဤအက်ပ်၏ ဒီဇိုင်း၊ အင်တာဖေ့စ်၊ နည်းပညာနှင့် စနစ်ဆိုင်ရာ
                  မူပိုင်ခွင့်အားလုံးသည် Dharma App ၏ ကိုယ်ပိုင်မူပိုင်ခွင့်များသာ
                  ဖြစ်ပါသည်။{"\n"}• ဓမ္မဒေသနာတော်များသည် သာသနာဆိုင်ရာ
                  အများပြည်သူဆိုင်ရာ အမွေအနှစ်ဖြစ်သော်လည်း အက်ပ်၏ တင်ဆက်မှုပုံစံနှင့်
                  ဆော့ဖ်ဝဲလ်ကုဒ်များကို ခွင့်ပြုချက်မရှိဘဲ ပြန်လည်ထုတ်ဝေခြင်း
                  မပြုရပါ။{"\n"}• အသုံးပြုသူများအတွက် ပိုမိုကောင်းမွန်သော
                  အတွေ့အကြုံရရှိစေရန် အက်ပ်၏ လုပ်ဆောင်ချက်များကို အချိန်နှင့်အမျှ
                  ပြင်ဆင်ခြင်း၊ အဆင့်မြှင့်တင်ခြင်းနှင့် ပြောင်းလဲခြင်း
                  အခွင့်အရေးကို ကျွန်ုပ်တို့မှ ရယူထားပါသည်။
                </Text>
              </View>
            </View>
          )}

          {activeTab === "privacy" && (
            <View style={styles.sectionContainer}>
              <View
                style={[
                  styles.badgeCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Ionicons
                  name="shield-checkmark"
                  size={28}
                  color={colors.primary}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={[styles.bannerTitle, { color: colors.textPrimary }]}
                  >
                    ကိုယ်ရေးကိုယ်တာ မူဝါဒ
                  </Text>
                  <Text
                    style={[
                      styles.bannerSubtitle,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Privacy Policy
                  </Text>
                </View>
              </View>

              <Text
                style={[styles.introText, { color: colors.textSecondary }]}
              >
                ကျွန်ုပ်တို့သည် သင်၏ ကိုယ်ရေးကိုယ်တာ အချက်အလက်များ လုံခြုံမှုကို
                အထူးအလေးထား စောင့်ရှောက်ပါသည်။ ဤမူဝါဒသည် သင်၏
                ဒေတာများကို မည်သို့ကောက်ယူ၊ အသုံးပြု၊ ကာကွယ်ထားသည်ကို
                ရှင်းလင်းစွာ ဖော်ပြထားခြင်း ဖြစ်ပါသည်။
              </Text>

              {/* Privacy 1 */}
              <View
                style={[
                  styles.card,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <View style={styles.cardHeader}>
                  <Ionicons
                    name="file-tray-full-outline"
                    size={20}
                    color={colors.primary}
                  />
                  <Text
                    style={[styles.cardTitle, { color: colors.textPrimary }]}
                  >
                    ၁။ ကောက်ယူသော အချက်အလက်များ (Data Collection)
                  </Text>
                </View>
                <Text
                  style={[styles.cardBody, { color: colors.textSecondary }]}
                >
                  • <Text style={{ fontWeight: "700" }}>အကောင့် အချက်အလက်များ:</Text> အကောင့်မှတ်ပုံတင်ရာတွင် အသုံးပြုသော နာမည်နှင့် အီးမေးလ်လိပ်စာ။{"\n"}
                  • <Text style={{ fontWeight: "700" }}>အသုံးပြုမှု မှတ်တမ်းများ:</Text> ပုတီးစိပ်သည့် အကြိမ်ရေ၊ နေ့စဉ် လေ့ကျင့်မှုမှတ်တမ်းများနှင့် အနှစ်သက်ဆုံး (Favorites) စာရင်းများ။{"\n"}
                  • <Text style={{ fontWeight: "700" }}>စနစ်ဆက်တင်များ:</Text> သင်ရွေးချယ်ထားသော စာလုံးအရွယ်အစား (Font size) နှင့် အရောင်အသွင်အပြင် (Dark/Light mode) စသည့် Personalization ဆက်တင်များ။
                </Text>
              </View>

              {/* Privacy 2 */}
              <View
                style={[
                  styles.card,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <View style={styles.cardHeader}>
                  <Ionicons
                    name="server-outline"
                    size={20}
                    color={colors.primary}
                  />
                  <Text
                    style={[styles.cardTitle, { color: colors.textPrimary }]}
                  >
                    ၂။ ဒေတာ သိမ်းဆည်းခြင်းနှင့် ကာကွယ်မှု (Data Storage & Security)
                  </Text>
                </View>
                <Text
                  style={[styles.cardBody, { color: colors.textSecondary }]}
                >
                  • သင်၏ အချက်အလက်များကို နိုင်ငံတကာ အသိအမှတ်ပြု စံချိန်မီ
                  လုံခြုံရေးအဆင့်မြင့် Cloud Database (ဥပမာ- Google Firebase) တွင်
                  စနစ်တကျ လုံခြုံစွာ သိမ်းဆည်းထားပါသည်။{"\n"}• ဒေတာများအား
                  ခွင့်ပြုချက်မရှိဘဲ ဝင်ရောက်ကြည့်ရှုခြင်း၊ ပေါက်ကြားခြင်းနှင့်
                  ပျက်စီးဆုံးရှုံးခြင်းတို့မှ ကာကွယ်ရန် ခေတ်မီ Data Encryption
                  စနစ်များကို အသုံးပြုထားပါသည်။
                </Text>
              </View>

              {/* Privacy 3 */}
              <View
                style={[
                  styles.card,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <View style={styles.cardHeader}>
                  <Ionicons
                    name="eye-off-outline"
                    size={20}
                    color={colors.primary}
                  />
                  <Text
                    style={[styles.cardTitle, { color: colors.textPrimary }]}
                  >
                    ၃။ ပြင်ပသို့ ထုတ်ဖော်မှု မူဝါဒ (Third-Party Disclosure)
                  </Text>
                </View>
                <Text
                  style={[styles.cardBody, { color: colors.textSecondary }]}
                >
                  • ကျွန်ုပ်တို့သည် အသုံးပြုသူများ၏ ကိုယ်ရေးကိုယ်တာ အချက်အလက်များကို
                  မည်သည့် ပြင်ပစီးပွားရေး ကြော်ငြာလုပ်ငန်း သို့မဟုတ် ကုမ္ပဏီများထံသို့မျှ
                  ငွေကြေးရယူ ရောင်းချခြင်း၊ လဲလှယ်ခြင်း သို့မဟုတ် မျှဝေခြင်း
                  လုံးဝ (လုံးဝ) ပြုလုပ်မည် မဟုတ်ပါ။{"\n"}• အက်ပ်၏ အခြေခံလုပ်ဆောင်ချက်များ
                  (ဥပမာ- အကောင့်လုံခြုံရေးနှင့် ဒေတာ Sync ပြုလုပ်ခြင်း) အတွက်သာ
                  တရားဝင် ဝန်ဆောင်မှုများနှင့် စနစ်တကျ ချိတ်ဆက်ဆောင်ရွက်ပါသည်။
                </Text>
              </View>

              {/* Privacy 4 */}
              <View
                style={[
                  styles.card,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <View style={styles.cardHeader}>
                  <Ionicons
                    name="hand-left-outline"
                    size={20}
                    color={colors.primary}
                  />
                  <Text
                    style={[styles.cardTitle, { color: colors.textPrimary }]}
                  >
                    ၄။ အသုံးပြုသူ၏ ကိုယ်ရေးကိုယ်တာ အခွင့်အရေးများ (Privacy Rights)
                  </Text>
                </View>
                <Text
                  style={[styles.cardBody, { color: colors.textSecondary }]}
                >
                  • မိမိ၏ ကိုယ်ရေးအချက်အလက်များကို Profile ကဏ္ဍမှတစ်ဆင့်
                  အချိန်မရွေး ဝင်ရောက်ကြည့်ရှုခြင်းနှင့် ပြင်ဆင်ခြင်း ပြုလုပ်နိုင်ပါသည်။{"\n"}•
                  မိမိ၏ အကောင့်နှင့် မှတ်တမ်းအချက်အလက်အားလုံးကို အပြီးတိုင်
                  ဖျက်သိမ်းလိုပါက အချိန်မရွေး တောင်းဆိုပိုင်ခွင့်ရှိပါသည်။
                </Text>
              </View>
            </View>
          )}

          {activeTab === "contact" && (
            <View style={styles.sectionContainer}>
              <View
                style={[
                  styles.badgeCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Ionicons
                  name="help-buoy"
                  size={28}
                  color={colors.primary}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={[styles.bannerTitle, { color: colors.textPrimary }]}
                  >
                    ဆက်သွယ်ရန်နှင့် အကူအညီ
                  </Text>
                  <Text
                    style={[
                      styles.bannerSubtitle,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Contact Us & Support
                  </Text>
                </View>
              </View>

              <Text
                style={[styles.introText, { color: colors.textSecondary }]}
              >
                Dharma App ကို အသုံးပြုရာတွင် အခက်အခဲ တစ်စုံတစ်ရာ ရှိပါက သို့မဟုတ်
                အက်ပ်ပိုမို ကောင်းမွန်စေရန် အကြံပြုလိုသည်များ ရှိပါက
                ကျွန်ုပ်တို့ထံ အချိန်မရွေး ဆက်သွယ်နိုင်ပါသည်။
              </Text>

              {/* Email Support Card */}
              <View
                style={[
                  styles.card,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    alignItems: "center",
                    paddingVertical: 24,
                  },
                ]}
              >
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: colors.surfaceAlt },
                  ]}
                >
                  <Ionicons name="mail" size={32} color={colors.primary} />
                </View>
                <Text
                  style={[
                    styles.contactTitle,
                    { color: colors.textPrimary, marginTop: 12 },
                  ]}
                >
                  အီးမေးလ်ဖြင့် ဆက်သွယ်ရန်
                </Text>
                <Text
                  style={[
                    styles.emailDisplay,
                    { color: colors.textPrimary },
                  ]}
                >
                  {SUPPORT_EMAIL}
                </Text>

                <TouchableOpacity
                  onPress={handleOpenEmail}
                  style={[
                    styles.primaryButton,
                    { backgroundColor: colors.primary },
                  ]}
                >
                  <Ionicons
                    name="paper-plane"
                    size={18}
                    color={colors.textOnPrimary}
                  />
                  <Text
                    style={[
                      styles.buttonText,
                      { color: colors.textOnPrimary },
                    ]}
                  >
                    အီးမေးလ် ပေးပို့ရန်
                  </Text>
                </TouchableOpacity>
              </View>

              {/* What can we help with */}
              <View
                style={[
                  styles.card,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <View style={styles.cardHeader}>
                  <Ionicons
                    name="chatbubbles-outline"
                    size={20}
                    color={colors.primary}
                  />
                  <Text
                    style={[styles.cardTitle, { color: colors.textPrimary }]}
                  >
                    ကျွန်ုပ်တို့ ကူညီပေးနိုင်သော ကိစ္စရပ်များ
                  </Text>
                </View>
                <Text
                  style={[styles.cardBody, { color: colors.textSecondary }]}
                >
                  • အကောင့်ဝင်ရောက်ခြင်း သို့မဟုတ် စကားဝှက်ဆိုင်ရာ ပြဿနာများ{"\n"}
                  • ပုတီးစိပ်မှတ်တမ်းနှင့် ဒေတာပျောက်ဆုံးမှု အခက်အခဲများ{"\n"}
                  • အက်ပ်အတွင်း ချွတ်ယွင်းချက် (Bugs) များကို အကြောင်းကြားခြင်း{"\n"}
                  • အက်ပ် ပိုမိုပြည့်စုံကောင်းမွန်လာစေရန် အကြံဉာဏ်သစ်များ ပေးပို့ခြင်း
                </Text>
              </View>

              {/* Response Time */}
              <View
                style={[
                  styles.card,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <View style={styles.cardHeader}>
                  <Ionicons
                    name="time-outline"
                    size={20}
                    color={colors.primary}
                  />
                  <Text
                    style={[styles.cardTitle, { color: colors.textPrimary }]}
                  >
                    တုံ့ပြန်မှုကြာချိန် (Response Time)
                  </Text>
                </View>
                <Text
                  style={[styles.cardBody, { color: colors.textSecondary }]}
                >
                  ကျွန်ုပ်တို့အဖွဲ့သည် သင်ပေးပို့သော မေးခွန်းများနှင့် အကြံပြုချက်များကို
                  ဂရုတစိုက် စစ်ဆေးပြီး အလုပ်ဖွင့်ရက် ၂၄ နာရီမှ ၄၈ နာရီအတွင်း
                  အမြန်ဆုံး အကြောင်းပြန်ပေးပါမည်။
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 14,
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
  },
  tabBar: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    padding: 4,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  activeTabItem: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 13,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionContainer: {
    gap: 14,
  },
  badgeCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  bannerTitle: {
    fontSize: 17,
    fontWeight: "700",
  },
  bannerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  introText: {
    fontSize: 14,
    lineHeight: 22,
    marginVertical: 4,
  },
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    gap: 10,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    flex: 1,
  },
  cardBody: {
    fontSize: 13.5,
    lineHeight: 22,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  contactTitle: {
    fontSize: 17,
    fontWeight: "700",
  },
  emailDisplay: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 4,
    marginBottom: 16,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "700",
  },
});
