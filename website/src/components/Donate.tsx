import React, { useState } from 'react';
import { Heart, Copy, Check, Sparkles } from 'lucide-react';
import { DONATION_OPTIONS } from '../data/appData';

export const Donate: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  return (
    <section id="donate" className="py-24 relative bg-[#060B11]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/20" />
            <span>သာသနာပြု ကုသိုလ်ပါဝင် လှူဒါန်းရန်</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-myanmar">
            Support Our Dhamma Mission
          </h2>
          <p className="mt-4 text-base text-slate-300 font-myanmar leading-relaxed">
            ဤအက်ပလီကေးရှင်းကို ကြော်ငြာလုံးဝမပါဘဲ လူတိုင်း အခမဲ့ အသုံးပြုနိုင်ရန် Server စရိတ်၊ အသံဖိုင် သိုလှောင်မှုနှင့် ဆော့ဖ်ဝဲလ် ရေရှည်ထိန်းသိမ်းမှုများအတွက် စေတနာသဒ္ဓါတရား ထက်သန်သလောက် ပါဝင်ကုသိုလ်ယူနိုင်ပါသည်။
          </p>
        </div>

        {/* Donation Card */}
        <div className="max-w-md mx-auto">
          {DONATION_OPTIONS.map((opt) => {
            const isCopied = copiedId === opt.id;
            return (
              <div
                key={opt.id}
                className="relative p-7 rounded-3xl bg-slate-900/90 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-200 shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-lg">
                        K
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white tracking-wide">
                          {opt.provider}
                        </h3>
                        <span className="text-xs text-slate-400">
                          {opt.accountName}
                        </span>
                      </div>
                    </div>

                    {opt.badge && (
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-amber-300 border border-slate-700 font-myanmar">
                        {opt.badge}
                      </span>
                    )}
                  </div>

                  {/* Account Number Box with One-Click Copy */}
                  <div className="mt-5 p-4 rounded-2xl bg-slate-950/90 border border-slate-800 flex items-center justify-between group">
                    <div className="overflow-hidden">
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">KBZPay Account</div>
                      <div className="font-mono font-bold text-base sm:text-lg text-amber-300 tracking-wider">
                        {opt.accountNumber}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(opt.id, opt.accountNumber)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex-shrink-0 ${
                        isCopied
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'bg-amber-500/15 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30'
                      }`}
                      title="Copy to clipboard"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Note */}
                  {opt.note && (
                    <p className="mt-4 text-xs text-slate-400 font-myanmar leading-relaxed">
                      {opt.note}
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-myanmar text-amber-400/80">သာဓု... သာဓု... သာဓုပါခင်ဗျာ။</span>
                  <Heart className="w-4 h-4 text-rose-500" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Gratitude Message Banner */}
        <div className="mt-12 max-w-2xl mx-auto p-6 rounded-3xl bg-amber-500/5 border border-amber-500/20 text-center">
          <Sparkles className="w-6 h-6 text-amber-400 mx-auto mb-2" />
          <h4 className="text-base font-bold text-white font-myanmar">
            စေတနာရှင် အလှူရှင်များအားလုံးကို အထူးပင် ကျေးဇူးတင်ရှိပါသည်
          </h4>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 font-myanmar leading-relaxed">
            လှူဒါန်းငွေများအားလုံးကို အပလီကေးရှင်း အဆင့်မြှင့်တင်ခြင်း၊ အသံဖိုင်အရည်အသွေး ကောင်းမွန်စေရန် ဆောင်ရွက်ခြင်းနှင့် ဆာဗာလစဉ်ကျသင့်ငွေများတွင်သာ အကျိုးရှိစွာ သုံးစွဲသွားမည် ဖြစ်ပါသည်။
          </p>
        </div>

      </div>
    </section>
  );
};
