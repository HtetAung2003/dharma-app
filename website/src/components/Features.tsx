import React from 'react';
import {
  CircleDot,
  Calendar,
  Headphones,
  TrendingUp,
  Moon,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { FEATURES } from '../data/appData';

const iconMap: Record<string, React.ReactNode> = {
  CircleDot: <CircleDot className="w-6 h-6 text-amber-400" />,
  Calendar: <Calendar className="w-6 h-6 text-amber-400" />,
  Headphones: <Headphones className="w-6 h-6 text-amber-400" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-amber-400" />,
  Moon: <Moon className="w-6 h-6 text-amber-400" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
};

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 relative bg-[#060B11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>အဓိက ပါဝင်သော လုပ်ဆောင်ချက်များ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-myanmar">
            နေ့စဉ် ကုသိုလ်ပွားများဖို့
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 font-myanmar leading-relaxed">
            ဓမ္မရေချမ်း အက်ပ်တွင် နေ့စဉ်တရားဘာဝနာ ပွားများသူများအတွက် လိုအပ်မည့် အရာအားလုံးကို အဆင်ပြေပြေနှင့် စိတ်အေးချမ်းသာစွာ သုံးစွဲနိုင်ရန် ဖန်တီးထားပါသည်။
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="relative group p-7 rounded-3xl bg-slate-900/60 border border-amber-500/15 hover:border-amber-500/40 hover:bg-slate-900/90 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-black/40 hover:shadow-amber-500/10 flex flex-col justify-between"
            >
              {/* Glow Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 group-hover:bg-amber-500/10 rounded-full blur-2xl transition duration-300 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500/20 transition duration-200">
                    {iconMap[feature.icon] || <CircleDot className="w-6 h-6 text-amber-400" />}
                  </div>
                  {feature.badge && (
                    <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      {feature.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-2 font-myanmar group-hover:text-amber-300 transition duration-200">
                  {feature.myanmarTitle}
                </h3>
                <div className="text-xs font-semibold text-slate-400 mb-3 tracking-wide">
                  {feature.title}
                </div>
                <p className="text-sm text-slate-300 font-myanmar leading-relaxed">
                  {feature.myanmarDescription}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
