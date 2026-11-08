import React, { useState } from 'react';
import { Download, Smartphone, Apple, CheckCircle2, ShieldCheck, Flame, BellRing, Sparkles, ExternalLink } from 'lucide-react';
import { APP_INFO } from '../data/appData';

export const Hero: React.FC = () => {
  const [showIosModal, setShowIosModal] = useState(false);

  return (
    <section className="relative pt-12 pb-24 overflow-hidden bg-gold-glow">
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-amber-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Version Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs sm:text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-semibold">{APP_INFO.version} Official Release</span>
              <span className="text-amber-500/50">•</span>
              <span className="font-myanmar">100% အခမဲ့ & ကြော်ငြာမပါ</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.25] sm:leading-[1.2] font-myanmar">
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                ဓမ္မရေချမ်း
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-base sm:text-lg text-slate-300 font-myanmar leading-relaxed max-w-2xl mx-auto lg:mx-0">
              မြန်မာပြက္ခဒိန် ၊ အင်တာနက်မလိုဘဲ ပရိတ်ကြီး ၁၁ သုတ်နှင့် ပဋ္ဌာန်းဒေသနာတော်များ၊ ပုတီပါဝင်သည့် အပြည့်စုံဆုံး ဓမ္မရေချမ်း ။
            </p>

            {/* Download CTA Buttons */}
            <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4">
              {/* Android Download Button */}
              <a
                href={APP_INFO.apkDownloadUrl}
                download={APP_INFO.apkFilename}
                className="group relative inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-base shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transform hover:-translate-y-1 active:translate-y-0 transition-all duration-200"
              >
                <div className="p-1.5 bg-slate-950/15 rounded-xl">
                  <Smartphone className="w-5 h-5 text-slate-950" />
                </div>
                <div className="text-left">
                  <div className="text-base font-black leading-tight flex items-center gap-1.5">
                    <span>Android အတွက် ရယူရန်</span>
                    <Download className="w-4 h-4 stroke-[2.5] group-hover:translate-y-0.5 transition" />
                  </div>
                </div>
                <span className="ml-2 text-xs bg-slate-950/20 px-2 py-0.5 rounded-full font-medium">
                  {APP_INFO.apkSize}
                </span>
              </a>

              {/* iOS Button (Coming Soon) */}
              <button
                type="button"
                onClick={() => setShowIosModal(true)}
                className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 hover:border-amber-500/40 text-slate-200 hover:text-white text-base font-semibold transition-all duration-200 group"
              >
                <Apple className="w-5 h-5 text-slate-300 group-hover:text-amber-400 transition" />
                <div className="text-left">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium leading-none">
                    Apple iOS
                  </div>
                  <div className="text-sm font-semibold leading-tight mt-0.5 text-slate-300">
                    App Store
                  </div>
                </div>
                <span className="ml-2 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/25">
                  Coming Soon
                </span>
              </button>
            </div>

            {/* Quick Specs & Compatibility */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>100% ကြော်ငြာမပါ</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>အော့ဖ်လိုင်းအသုံးပြုနိုင်</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Android 8.0+ / iOS 15+</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Mockup */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Glow Aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-amber-400/10 to-transparent blur-3xl -z-10 rounded-full scale-110" />

            {/* Modern Phone Frame Container */}
            <div className="relative w-[290px] sm:w-[320px] rounded-[48px] p-3 bg-gradient-to-b from-slate-700/80 via-slate-800/60 to-slate-900 border-4 border-slate-700 shadow-2xl shadow-amber-500/20">
              
              {/* Speaker Notch */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-20 flex items-center justify-center">
                <div className="w-10 h-1 bg-slate-800 rounded-full" />
                <div className="w-2.5 h-2.5 bg-slate-900 rounded-full ml-3 ring-1 ring-slate-800" />
              </div>

              {/* Screen Inner Frame */}
              <div className="relative rounded-[38px] overflow-hidden bg-slate-950 aspect-[9/19.5] border border-slate-800">
                <img
                  src="/screenshots/screen-home.png"
                  alt="ဓမ္မရေချမ်း App Dashboard"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    // Fallback to logo placeholder if screenshot is loading
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* iOS Modal */}
      {showIosModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative max-w-md w-full bg-slate-900 border border-amber-500/30 rounded-3xl p-6 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
              <Apple className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-myanmar">
              iOS ဗားရှင်း မကြာမီလာမည်
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-myanmar mb-6">
              ဓမ္မရေချမ်း iOS ဗားရှင်းကို Apple App Store နှင့် TestFlight တွင် တင်သွင်းရန် ပြင်ဆင်နေပါသည်။ မကြာမီ အချိန်အတွင်း iPhone နှင့် iPad အသုံးပြုသူများ အခမဲ့ ရယူနိုင်တော့မည် ဖြစ်ပါသည်။
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowIosModal(false)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition"
              >
                ပိတ်မည် (Close)
              </button>
              <a
                href={`mailto:${APP_INFO.developerEmail}`}
                onClick={() => setShowIosModal(false)}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm text-center transition"
              >
                သတင်းစုံစမ်းရန်
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
