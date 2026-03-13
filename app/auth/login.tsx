import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View as RNView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { View } from 'moti'; 
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

// Theme Context ကို import လုပ်ပါ
import { useTheme } from '../../context/ThemeContext';
import { SIZES } from '../../constants/Theme';
import { auth, db } from '../../services/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const LoginScreen = () => {
  const router = useRouter();
  const { colors, isDarkMode, fontSize } = useTheme(); // Context မှ dynamic data များယူပါ
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState(false);

  const isNextDisabled = !email || !password;

  const handleSignup = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/(auth)/register');
  };

  const handleLogin = async () => {
    if (email && password) {
      setConfirm(true);
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userDoc = await getDoc(doc(db, "users", user.uid));
        
        console.log("Login success");
        router.push('/main/personalization'); // Personalization screen သို့အရင်ပို့ပါ
      } catch (error: any) {
        setConfirm(false);
        alert("အီးမေးလ် သို့မဟုတ် လျှို့ဝှက်နံပါတ် မှားယွင်းနေပါသည်။");
      }
    } else {
      router.push('/main/personalization');
    }
  };

  return (
    <LinearGradient
      colors={isDarkMode ? ['#0F0F0F', '#1A1A1A'] : ['#F5F9FF', '#E0E7FF']} 
      style={styles.background}
    >
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Screen
          options={{
            headerTitle: "",
            headerTransparent: true,
            headerRight: () => (
              <TouchableOpacity
                onPress={handleLogin}
                style={{ paddingHorizontal: 16 }}
              >
                <Text style={[styles.headerBtnText, { color: colors.primary }]}>
                  {email || password ? (confirm ? 'ခေတ္တစောင့်ပါ...' : 'အတည်ပြုမည်') : 'ကျော်မည်'}
                </Text>
              </TouchableOpacity>
            ),
          }}
        />

        <View 
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          style={styles.welcomeSection}
        >
          <Text style={[styles.mainTitle, { color: colors.textPrimary, fontSize: fontSize + 12 }]}>
            အကောင့်ဝင်ရန်
          </Text>
          <Text style={[styles.subTitle, { color: colors.textSecondary, fontSize: fontSize }]}>
            App ရဲ့ လုပ်ဆောင်ချက်များကို အပြည့်အဝ အသုံးပြုနိုင်ဖို့ အကောင့်ဝင်ပေးပါ။ အကယ်၍ အကောင့်မရှိသေးပါက{' '}
            <Text style={[styles.linkText, { color: colors.primary }]} onPress={handleSignup}>
               ဤနေရာတွင် အကောင့်သစ်ဖွင့်ပါ
            </Text>
          </Text>
        </View>

        <View style={styles.formSection}>
          <View style={styles.inputWrapper}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>အီးမေးလ် လိပ်စာ</Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: isDarkMode ? '#1E1E1E' : '#FFF',
                borderColor: colors.border,
                color: colors.textPrimary 
              }]}
              placeholder="example@email.com"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>လျှို့ဝှက်နံပါတ်</Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: isDarkMode ? '#1E1E1E' : '#FFF',
                borderColor: colors.border,
                color: colors.textPrimary 
              }]}
              placeholder="Password ရိုက်ထည့်ပါ"
              placeholderTextColor="#666"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        <View style={styles.socialSection}>
          <Text style={[styles.orText, { color: colors.textSecondary }]}>သို့မဟုတ် အခြားနည်းလမ်းဖြင့် ဝင်ရန်</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.glassIconWrapper}>
              <AntDesign name="google" size={28} color="#EA4335" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.glassIconWrapper}>
              <AntDesign name="apple" size={30} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footerSection}>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: colors.secondary }]}
            onPress={handleLogin}
          >
            <Text style={[styles.buttonText, { color: '#FFF' }]}>အကောင့် ဝင်မည်</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={handleLogin}
          >
            <Text style={[styles.buttonText, { color: '#1A3C5A' }]}>ကျော်မည်</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

// Styles များတွင် Dynamic Colors များ ထည့်သွင်းရန် မလိုအပ်တော့ပါ (Inline သုံးထားသောကြောင့်)
const styles = StyleSheet.create({
  background: { flex: 1 },
  headerBtnText: { fontSize: 18, fontWeight: 'bold' },
  welcomeSection: { margin: 20, rowGap: 10, marginTop: 40 },
  mainTitle: { fontWeight: "bold" },
  subTitle: { lineHeight: 26 },
  linkText: { textDecorationLine: 'underline', fontWeight: '600' },
  formSection: { rowGap: 20, margin: 20 },
  inputWrapper: { rowGap: 8 },
  label: { fontSize: 14, fontWeight: '600', marginLeft: 4 },
  input: {
    height: 55,
    borderRadius: SIZES.radius,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  socialSection: { alignItems: 'center', marginTop: 30, rowGap: 20 },
  orText: { fontSize: 14, fontWeight: '500' },
  iconContainer: { flexDirection: 'row', columnGap: 25 },
  glassIconWrapper: { borderRadius: 50, padding: 10 },
  footerSection: { margin: 20, flexDirection: 'row', gap: 15, justifyContent: 'center' },
  button: {
    height: 55,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1, // ၅၀% စီ ညီတူညီမျှ ခွဲယူရန်
  },
  buttonText: { fontSize: 16, fontWeight: 'bold' },
});

export default LoginScreen;