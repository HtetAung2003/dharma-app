export interface FeatureItem {
  id: string;
  title: string;
  myanmarTitle: string;
  description: string;
  myanmarDescription: string;
  icon: string;
  badge?: string;
}

export interface VersionChangelog {
  version: string;
  buildNumber: number;
  releaseDate: string;
  isLatest: boolean;
  highlight: string;
  features: string[];
  bugFixes: string[];
}

export interface DonationOption {
  id: string;
  provider: string;
  accountName: string;
  accountNumber: string;
  badge?: string;
  note?: string;
  qrCode?: string;
}

export const APP_INFO = {
  name: "ဓမ္မရေချမ်း",
  englishName: "Dhamma Yay Chan",
  tagline: "စိတ်နှလုံးအေးချမ်းစေမည့် ဓမ္မမိတ်ဆွေ မိုဘိုင်းလက်ထောက်",
  englishTagline: "Your Daily Spiritual Companion for Mindfulness, Paritta Chanting & Sabbath Tracking",
  version: "1.0.0",
  buildNumber: 100,
  releaseDate: "နိုဝင်ဘာ ၂၀၂၆",
  apkFilename: "dhamma-yay-chan-v1.0.0.apk",
  apkDownloadUrl: "/downloads/dhamma-yay-chan-v1.0.0.apk",
  apkSize: "107 MB",
  iosStatus: "Coming Soon (App Store & TestFlight)",
  minAndroid: "Android 8.0 (Oreo) or higher",
  minIos: "iOS 15.0 or higher",
  githubRepoUrl: "https://github.com/dharma-app/dharma-mobile",
  developerEmail: "dharmaapp@outlook.com",
};

export const FEATURES: FeatureItem[] = [
  {
    id: "floating-bead",
    title: "System-Wide Floating Bead Counter",
    myanmarTitle: "ပုတီးစိပ်",
    description: "Keep reciting gathas and counting beads while reading news or using other apps with our non-intrusive floating widget and vibration feedback.",
    myanmarDescription: "အခြား Application များ အသုံးပြုနေစဉ်တွင်လည်း မျက်နှာပြင်ပေါ်၌ အလွယ်တကူတင်၍ ပုတီးစိပ်နိုင်ပြီး တုန်ခါမှုစနစ်ပါဝင်ပါသည်။",
    icon: "CircleDot",
    badge: "Unique",
  },
  {
    id: "sabbath-calendar",
    title: "Myanmar Lunar Calendar & Sabbath Tracker",
    myanmarTitle: "မြန်မာပြက္ခဒိန်",
    description: "Accurate astrological calculation of Myanmar lunar dates, Sabbath eve, full moon, and dark moon days with automatic dawn notifications.",
    myanmarDescription: "အဖိတ်နေ့၊ ဥပုသ်နေ့ (လပြည့်/လကွယ်) နေ့ရက်များကို တိကျစွာ တွက်ချက်ဖော်ပြပေးပြီး အချိန်မီအသိပေးချက်များ ရရှိနိုင်ပါသည်။",
    icon: "Calendar",
    badge: "Accurate",
  },
  {
    id: "offline-chanting",
    title: "Offline Paritta & Patthana",
    myanmarTitle: "ပရိတ်ကြီး ၁၁ သုတ်နှင့် ပဋ္ဌာန်းတရားတော်များ",
    description: "High-quality Pali audio chanting with synchronized Burmese and Romanized text, 100% playable without internet connection.",
    myanmarDescription: "အင်တာနက်လိုင်းမလိုဘဲ အချိန်မရွေး ကြည်ညိုနာယူနိုင်သော ပရိတ်တရားတော်များနှင့် စာသားများ။",
    icon: "Headphones",
    badge: "100% Offline",
  },
  {
    id: "prayer-times",
    title: "Daily Practice History & Streak",
    myanmarTitle: "ပုတီးစိပ်မှတ်တမ်းနှင့် နေ့စဉ်ကုသိုလ်မှတ်တမ်း",
    description: "Track your daily reciting counts, meditation duration, and build positive spiritual habits with beautiful visual progress rings.",
    myanmarDescription: "နေ့စဉ်ပုတီးစိပ်အရေအတွက်နှင့် တရားထိုင်ချိန်များကို စနစ်တကျ မှတ်တမ်းတင်ပေးကာ စိတ်ချမ်းမြေ့ဖွယ်ရာ ပြသပေးပါသည်။",
    icon: "TrendingUp",
  },
  {
    id: "edge-to-edge",
    title: "Privacy Focused & Free",
    myanmarTitle: "ကြော်ငြာလုံးဝမပါ၊ အခမဲ့နှင့် လုံခြုံစိတ်ချရခြင်း",
    description: "Zero advertisements, no third-party tracking, and no unnecessary permissions. Dedicated solely for pure spiritual practice.",
    myanmarDescription: "စိတ်အနှောင့်အယှက်ဖြစ်စေမည့် ကြော်ငြာများလုံးဝမပါဝင်ဘဲ လုံခြုံစိတ်ချစွာ အခမဲ့အသုံးပြုနိုင်ပါသည်။",
    icon: "ShieldCheck",
    badge: "Free & Safe",
  },
];

export const CHANGELOG: VersionChangelog[] = [
  {
    version: "v1.0.0",
    buildNumber: 100,
    releaseDate: "၈ နိုဝင်ဘာ ၂၀၂၆",
    isLatest: true,
    highlight: "Initial Official Production Release for Android & iOS preview",
    features: [
      "✨ မျက်နှာပြင်ပေါ်တင်၍ စိပ်နိုင်သော Floating ပုတီးစိပ်စနစ် (System Overlay Mode)",
      "✨ မြန်မာ တိကျသော ဥပုသ်နေ့ (Sabbath) နှင့် အဖိတ်နေ့ (Sabbath Eve) တွက်ချက်မှု",
      "✨ ပရိတ်ကြီး ၁၁ သုတ်နှင့် ပဋ္ဌာန်းပါဠိတော်",
      "✨ နေ့စဉ် တရားထိုင်ချိန်၊ ပုတီးစိပ်မှတ်တမ်းများကို သီးသန့်သိမ်းဆည်းပေးသည့် စနစ်",
    ],
    bugFixes: [
      "Fixed Android 3-button navigation bar overlap using dynamic window insets",
      "Fixed Sabbath Eve countdown precision to correctly distinguish eve from day",
      "Resolved background audio pause on lock screen",
      "Optimized asset bundle size and cold startup launch latency",
    ],
  },
];

export const DONATION_OPTIONS: DonationOption[] = [
  {
    id: "kbzpay",
    provider: "KBZPay",
    accountName: "U Dharma (မိုဘိုင်းအလှူတော်)",
    accountNumber: "09959106030",
    badge: "မြန်မာနိုင်ငံတွင်း လူကြိုက်အများဆုံး",
    note: "လှူဒါန်းပြီးပါက မှတ်ချက်တွင် 'ဓမ္မရေချမ်း အက်ပ် အလှူ' ဟု ရေးသားနိုင်ပါသည်။",
  },
];
