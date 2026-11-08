import React, { useState } from 'react';
import { Send, MessageSquare, CheckCircle, Mail, Sparkles, Star, AlertCircle } from 'lucide-react';
import { APP_INFO } from '../data/appData';

export const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'suggestion',
    rating: 5,
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Simulate submission delay
    setTimeout(() => {
      setStatus('success');
    }, 800);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      category: 'suggestion',
      rating: 5,
      message: '',
    });
    setStatus('idle');
  };

  const mailtoLink = `mailto:${APP_INFO.developerEmail}?subject=[Feedback - ${formData.category}] from ${encodeURIComponent(formData.name || 'User')}&body=${encodeURIComponent(formData.message)}`;

  return (
    <section id="feedback" className="py-24 relative bg-[#091019] border-t border-amber-500/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
            <span>အကြံပြုချက် နှင့် သဘောထားမှတ်ချက်</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-myanmar">
            Send Feedback & Suggestions
          </h2>
          <p className="mt-4 text-base text-slate-300 font-myanmar">
            စာလုံးပေါင်းအမှားများ၊ ထပ်မံထည့်သွင်းစေလိုသော တရားတော်များနှင့် စနစ်ပိုင်းဆိုင်ရာ ချို့ယွင်းချက်များကို အချိန်မရွေး ပေးပို့အကြံပြုနိုင်ပါသည်။
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-slate-900/90 border border-amber-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {status === 'success' ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white font-myanmar">
                အကြံပြုချက် ပေးပို့မှု အောင်မြင်ပါသည်!
              </h3>
              <p className="text-sm text-slate-300 font-myanmar max-w-md mx-auto leading-relaxed">
                သင်၏ အဖိုးတန်သော အကြံပြုချက်အတွက် အထူးပင် ကျေးဇူးတင်ရှိပါသည်။ လိုအပ်သည်များကို စစ်ဆေး၍ နောက်ထွက်မည့် ဗားရှင်းများတွင် တိုးတက်ပြင်ဆင်သွားပါမည်။
              </p>
              <div className="pt-4 flex justify-center gap-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition"
                >
                  အသစ်ပြန်လည် ပေးပို့ရန်
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 font-myanmar">
                    အမည် (Name) <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ဥပမာ - မောင်မောင်"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-slate-100 placeholder-slate-500 text-sm transition outline-none font-myanmar"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 font-myanmar">
                    အီးမေးလ် (Email) <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@gmail.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-slate-100 placeholder-slate-500 text-sm transition outline-none"
                  />
                </div>
              </div>

              {/* Category & Rating */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 font-myanmar">
                    အကြံပြုလိုသည့် အမျိုးအစား (Category)
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-slate-100 text-sm transition outline-none font-myanmar"
                  >
                    <option value="suggestion">💡 အကြံပြုချက်အသစ် (Feature Suggestion)</option>
                    <option value="bug">🐛 ချို့ယွင်းချက်အမှားတင်ပြရန် (Bug Report)</option>
                    <option value="text">📖 ပါဠိတော်/စာလုံးပေါင်းပြင်ဆင်ရန် (Text Correction)</option>
                    <option value="audio">🔊 အသံဖိုင်ပိုင်းဆိုင်ရာ အကြံပြုရန် (Audio Issue)</option>
                    <option value="other">💬 အခြားအထွေထွေ (General Feedback)</option>
                  </select>
                </div>

                {/* Star Rating */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 font-myanmar">
                    အက်ပ်အပေါ် သဘောကျနှစ်သက်မှု (Rating)
                  </label>
                  <div className="flex items-center gap-2 h-11 px-4 rounded-xl bg-slate-950/80 border border-slate-700">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="text-amber-400 hover:scale-125 transition duration-150"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= formData.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-3 text-xs text-amber-300 font-semibold font-mono">
                      {formData.rating} / 5
                    </span>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 font-myanmar">
                  အသေးစိတ် အကြောင်းအရာ (Message) <span className="text-amber-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="သင်၏ အကြံပြုချက် သို့မဟုတ် ပြင်ဆင်စေလိုသည့် အချက်များကို အသေးစိတ် ရေးသားပေးပါရန်..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-slate-100 placeholder-slate-500 text-sm transition outline-none font-myanmar leading-relaxed"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <a
                  href={mailtoLink}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-300 transition"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>တိုက်ရိုက် Email ဖြင့် ပို့လိုပါက နှိပ်ပါ</span>
                </a>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition transform active:scale-95 disabled:opacity-50"
                >
                  {status === 'submitting' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>ပေးပို့နေပါသည်...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>အကြံပြုချက် ပေးပို့မည် (Submit)</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
