import React from 'react';
import { Mail, Users } from 'lucide-react';
import { APP_INFO } from '../data/appData';

export const Developer: React.FC = () => {
  return (
    <section id="developer" className="py-24 relative bg-[#091019] border-t border-b border-amber-500/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Mission Card */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>ပြုစုသူ အဖွဲ့အကြောင်း</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-myanmar leading-tight">
              သာသနာကို ပူဇော်ခြင်း
            </h2>

            <p className="mt-5 text-base sm:text-lg text-slate-300 font-myanmar leading-relaxed">
              <strong className="text-amber-400 font-semibold">{APP_INFO.name}</strong> မိုဘိုင်းအက်ပလီကေးရှင်းကို မြန်မာနိုင်ငံတွင်းနှင့် ကမ္ဘာအရပ်ရပ်ရှိ ဗုဒ္ဓဘာသာဝင် ညီအစ်ကိုမောင်နှမများ နေ့စဉ် တရားဘာဝနာ ပွားများရာ၌ စိတ်အေးချမ်းသာစွာ သုံးစွဲနိုင်စေရန် သာသနာပြုကုသိုလ်ဖြစ် စေတနာသဒ္ဓါတရား ထက်သန်စွာဖြင့် ရေးသားဖန်တီးထားခြင်း ဖြစ်ပါသည်။
            </p>

            <p className="mt-4 text-sm text-slate-400 font-myanmar leading-relaxed">
              စီးပွားဖြစ် ကြော်ငြာများ (Advertisements) လုံးဝမပါဝင်ဘဲ၊ အသုံးပြုသူ၏ ကိုယ်ရေးလုံခြုံမှုကို အပြည့်အဝ လေးစားလိုက်နာပြီး အင်တာနက်မရှိသည့် နေရာဒေသများတွင်ပင် တရားဒေသနာတော်များကို အဆင်ပြေပြေ နာယူနိုင်အောင် ရည်ရွယ်ချက်ထား တည်ဆောက်ထားပါသည်။
            </p>
          </div>

          {/* Right Column: Contact & Quote Box */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md p-8 rounded-3xl bg-slate-900/90 border border-amber-500/25 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 text-sm text-slate-300 leading-relaxed font-myanmar mb-6">
                "သဗ္ဗဒါနံ ဓမ္မဒါနံ ဇိနာတိ — အလှူတကာတို့တွင် တရားအလှူသည် အမြတ်ဆုံး ဖြစ်၏။"
                <br />
                <span className="text-xs text-slate-400 mt-2 block">
                  ဗုဒ္ဓမြတ်စွာ၏ တရားတော်များ လူတိုင်းလက်လှမ်းမီစေရန် အားထုတ်ကြိုးပမ်းလျက် ရှိပါသည်။
                </span>
              </div>

              <div>
                <a
                  href={`mailto:${APP_INFO.developerEmail}`}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-amber-500/20 hover:border-amber-500/40 text-slate-100 hover:text-amber-300 transition text-sm font-medium"
                >
                  <span className="flex items-center gap-2.5 font-mono text-xs sm:text-sm">
                    <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>{APP_INFO.developerEmail}</span>
                  </span>
                  <span className="text-xs text-amber-400 font-myanmar">ဆက်သွယ်ရန် →</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
