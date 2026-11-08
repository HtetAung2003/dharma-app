import React from 'react';
import { Sparkles, Calendar, CheckCircle2, Download, Tag } from 'lucide-react';
import { CHANGELOG, APP_INFO } from '../data/appData';

export const VersionUpdates: React.FC = () => {
  return (
    <section id="updates" className="py-24 relative bg-[#060B11]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Tag className="w-3.5 h-3.5 text-amber-400" />
            <span>ဗားရှင်း အသစ်ထုတ်ပြန်ချက်များ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-myanmar">
            What's New in {APP_INFO.name}
          </h2>
          <p className="mt-4 text-base text-slate-400 font-myanmar">
            အသစ်ထည့်သွင်းထားသော စွမ်းဆောင်ရည်များနှင့် စနစ်ပိုင်းဆိုင်ရာ ပြုပြင်မွမ်းမံမှုမှတ်တမ်းများ။
          </p>
        </div>

        {/* Changelog Cards */}
        <div className="space-y-8">
          {CHANGELOG.map((log) => (
            <div
              key={log.version}
              className="relative p-7 sm:p-9 rounded-3xl bg-slate-900/70 border border-amber-500/20 shadow-xl overflow-hidden"
            >
              {/* Version meta */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
                <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tracking-tight">
                  {log.version}
                </span>
                <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-myanmar">{log.releaseDate}</span>
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Build #{log.buildNumber}
                </span>
              </div>

              <p className="text-base font-semibold text-slate-200 mb-6 font-myanmar">
                {log.highlight}
              </p>

              {/* New Features List */}
              <div className="pt-4 border-t border-slate-800">
                <h4 className="flex items-center gap-2 text-sm font-bold text-amber-300 uppercase tracking-wider mb-4 font-myanmar">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>အသစ်ပါဝင်သော (Features)</span>
                </h4>
                <ul className="space-y-2.5">
                  {log.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300 font-myanmar leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick download button footer */}
              <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-slate-400 font-myanmar">
                  အသင့်သုံး ဗားရှင်းကို ယခုပင် တိုက်ရိုက် ရယူနိုင်ပါပြီ။
                </span>
                <a
                  href={APP_INFO.apkDownloadUrl}
                  download={APP_INFO.apkFilename}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-bold transition duration-150"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download {log.version} APK ({APP_INFO.apkSize})</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
