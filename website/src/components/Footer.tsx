import React from 'react';
import { ArrowUp, Heart, Sparkles, Smartphone, Download, Mail } from 'lucide-react';
import { APP_INFO } from '../data/appData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#04070B] border-t border-amber-500/15 text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Col 1 & 2: Brand & Sacred Quote */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="ဓမ္မရေချမ်း Logo"
                className="w-10 h-10 rounded-2xl object-cover ring-1 ring-amber-500/30"
              />
              <span className="text-xl font-bold text-white font-myanmar">
                {APP_INFO.name}
              </span>
            </div>

            <p className="text-xs text-amber-300 font-myanmar italic">
              "သဗ္ဗဒါနံ ဓမ္မဒါနံ ဇိနာတိ" — အလှူတကာတို့တွင် တရားအလှူသည် အမြတ်ဆုံးဖြစ်၏။
            </p>

            <p className="text-xs text-slate-400 font-myanmar leading-relaxed max-w-sm">
              နေ့စဉ် တရားဘာဝနာ ပွားများခြင်း၊ ပုတီးစိပ်ခြင်းနှင့် ဥပုသ်သီလ စောင့်ထိန်းခြင်းတို့ကို အချိန်မရွေး လွယ်ကူစေရန် သာသနာပြု ကုသိုလ်ဖြစ် ဖန်တီးထားသော မိုဘိုင်းလက်ထောက်။
            </p>
          </div>

          {/* Col 3: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 font-myanmar">
              မာတိကာ (Navigation)
            </h4>
            <ul className="space-y-2.5 text-xs font-myanmar">
              <li>
                <a href="#features" className="hover:text-amber-400 transition">အဓိက အင်္ဂါရပ်များ</a>
              </li>
              <li>
                <a href="#updates" className="hover:text-amber-400 transition">ဗားရှင်းမှတ်တမ်း</a>
              </li>
              <li>
                <a href="#developer" className="hover:text-amber-400 transition">ပြုစုသူအကြောင်း</a>
              </li>
              <li>
                <a href="#donate" className="hover:text-amber-400 transition">ကုသိုလ်ပါဝင်ရန်</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Downloads */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 font-myanmar">
              ဒေါင်းလုဒ် (Downloads)
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={APP_INFO.apkDownloadUrl}
                  download={APP_INFO.apkFilename}
                  className="flex items-center gap-1.5 hover:text-amber-400 transition"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Android APK ({APP_INFO.apkSize})</span>
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-slate-500">
                <Smartphone className="w-3.5 h-3.5" />
                <span>iOS App Store (Coming Soon)</span>
              </li>
              <li>
                <span className="text-[11px] text-slate-500">
                  ဗားရှင်း: {APP_INFO.version} (Build {APP_INFO.buildNumber})
                </span>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Privacy */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 font-myanmar">
              ဆက်သွယ်ရန် & မူဝါဒ
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={`mailto:${APP_INFO.developerEmail}`}
                  className="flex items-center gap-1.5 hover:text-amber-400 transition"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>{APP_INFO.developerEmail}</span>
                </a>
              </li>
              <li className="text-slate-400 font-myanmar">
                ✓ 100% ကြော်ငြာမပါဝင်ပါ
              </li>
              <li className="text-slate-400 font-myanmar">
                ✓ အချက်အလက်များ မယူဆောင်ပါ
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="text-center sm:text-left font-myanmar">
            © 2026 {APP_INFO.name} ({APP_INFO.englishName}). မေတ္တာဖြင့် အခမဲ့ မျှဝေပါသည်။
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              Made with devotion & <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for Buddha Sasana
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-amber-400 transition"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
