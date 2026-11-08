import React, { useState } from 'react';
import { Sparkles, Calendar, CircleDot, Headphones, Smartphone } from 'lucide-react';

interface PreviewScreen {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  icon: React.ReactNode;
  description: string;
  points: string[];
}

export const AppPreview: React.FC = () => {
  const screens: PreviewScreen[] = [
    {
      id: 'home',
      title: 'ပင်မစာမျက်နှာ နှင့် ပြက္ခဒိန်',
      subtitle: 'Home Dashboard & Sabbath Day',
      image: '/screenshots/screen-home.png',
      icon: <Calendar className="w-4 h-4" />,
      description: 'နေ့စဉ် မြန်မာရက်စွဲ၊ သက္ကရာဇ်၊ ဥပုသ်နေ့ (လပြည့်/လကွယ်) နှင့် အဖိတ်နေ့ စစ်ဆေးခြင်းတို့ကို သပ်ရပ်ရှင်းလင်းစွာ ကြည့်ရှုနိုင်ပါသည်။',
      points: [
        'မြန်မာသက္ကရာဇ် ၁၃၈၆ ခုနှစ် တိကျသော ရက်စွဲများ',
        'အဖိတ်နေ့နှင့် ဥပုသ်နေ့ Countdown Timer',
        'ယနေ့ စိပ်ရမည့် ပုတီးအရေအတွက် အကျဉ်းချုပ်',
      ],
    },
    {
      id: 'bead',
      title: 'ပုတီးစိပ်လက်ထောက် & Floating စနစ်',
      subtitle: 'Bead Counter & System Overlay',
      image: '/screenshots/screen-bead.png',
      icon: <CircleDot className="w-4 h-4" />,
      description: 'အပလီကေးရှင်းအတွင်းသာမက Facebook သို့မဟုတ် အခြား App များသုံးနေစဉ်တွင်လည်း မျက်နှာပြင်ပေါ်တင်၍ ပုတီးစိပ်နိုင်သော Floating စနစ်ပါဝင်ပါသည်။',
      points: [
        '၁၀၈ လုံး စက်ဝိုင်းပုံ တိုးတက်မှု (Progress Ring)',
        'ထိတွေ့မှုတိုင်းအတွက် Vibration တုန်ခါမှုပေးခြင်း',
        'ကျောက်မျက်နှင့် ရွှေရောင် ပုတီးစေ့ပုံစံ ရွေးချယ်နိုင်မှု',
      ],
    },
    {
      id: 'chanting',
      title: 'ပရိတ်ကြီး ၁၁ သုတ်နှင့် ပဋ္ဌာန်းတရားတော်',
      subtitle: 'Offline Paritta & Patthana Audio',
      image: '/screenshots/screen-chanting.png',
      icon: <Headphones className="w-4 h-4" />,
      description: 'အင်တာနက်လိုင်း မလိုဘဲ အချိန်မရွေး ကြည်ညိုဖွယ်ရာ ရွတ်ဖတ်ပူဇော်သံများနှင့်အတူ ပါဠိ၊ မြန်မာပြန် စာသားများကို ဖတ်ရှုနိုင်ပါသည်။',
      points: [
        '100% အော့ဖ်လိုင်း အသံဖိုင် ဖွင့်စက်',
        'မျက်နှာပြင်ပိတ်ထားစဉ် နောက်ခံဖွင့်နိုင်ခြင်း (Background Audio)',
        'စာလုံးအရွယ်အစား လိုသလို ချိန်ညှိနိုင်ခြင်း',
      ],
    },
    {
      id: 'ios',
      title: 'iOS & Android တစ်ပြေးညီ စနစ်',
      subtitle: 'Cross-Platform Unified Design',
      image: '/screenshots/screen-ios.png',
      icon: <Smartphone className="w-4 h-4" />,
      description: 'Android 15 သာမက iOS 17 စနစ်များအတွက်ပါ လိုက်လျောညီထွေရှိပြီး ချောမွေ့လှပသော အသွင်အပြင်ဖြင့် တည်ဆောက်ထားပါသည်။',
      points: [
        'System Window Insets & Safe Area အပြည့်အဝ ပံ့ပိုးမှု',
        'Gesture Navigation & 3-Button Navigation အဆင်ပြေစေခြင်း',
        'နူးညံ့သော အသံနှင့် တုန်ခါမှု တုံ့ပြန်မှုများ',
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState(screens[0].id);
  const activeScreen = screens.find((s) => s.id === activeTab) || screens[0];

  return (
    <section id="preview" className="py-24 relative bg-[#091019] border-t border-b border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>အက်ပလီကေးရှင်း မျက်နှာပြင်များ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-myanmar">
            သပ်ရပ်လှပပြီး အသုံးပြုရလွယ်ကူသော ဒီဇိုင်း
          </h2>
          <p className="mt-4 text-base text-slate-400 font-myanmar">
            အောက်ပါ ခလုတ်များကို နှိပ်၍ အက်ပ်၏ အဓိက မျက်နှာပြင်များကို ကြည့်ရှုလေ့လာနိုင်ပါသည်။
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
          {screens.map((screen) => {
            const isActive = screen.id === activeTab;
            return (
              <button
                key={screen.id}
                onClick={() => setActiveTab(screen.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 font-myanmar ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-bold scale-105'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {screen.icon}
                <span>{screen.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Screen Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-5xl mx-auto">
          
          {/* Mockup Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-[280px] sm:w-[300px] rounded-[44px] p-2.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 border-4 border-slate-700 shadow-2xl shadow-amber-500/15">
              <div className="rounded-[36px] overflow-hidden bg-slate-950 aspect-[9/19.5] border border-slate-800">
                <img
                  src={activeScreen.image}
                  alt={activeScreen.title}
                  className="w-full h-full object-cover object-top transition duration-300"
                />
              </div>
            </div>
          </div>

          {/* Screen Details Info */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-block px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-300">
              {activeScreen.subtitle}
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-myanmar">
              {activeScreen.title}
            </h3>

            <p className="text-base text-slate-300 font-myanmar leading-relaxed">
              {activeScreen.description}
            </p>

            <div className="space-y-3 pt-2">
              {activeScreen.points.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-sm text-slate-200 font-myanmar">
                    {pt}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="#download"
                className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition"
              >
                <span>ယခုပင် စမ်းသပ်အသုံးပြုကြည့်ရှုပါ</span>
                <span>→</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
