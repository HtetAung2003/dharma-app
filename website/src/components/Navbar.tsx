import React, { useState } from 'react';
import { Download, Menu, X, Sparkles, Heart } from 'lucide-react';
import { APP_INFO } from '../data/appData';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'အင်္ဂါရပ်များ', href: '#features' },
    { label: 'ဗားရှင်းအသစ်', href: '#updates' },
    { label: 'ပြုစုသူအကြောင်း', href: '#developer' },
    { label: 'သာသနာပြုအလှူ', href: '#donate' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#060B11]/85 backdrop-blur-md border-b border-amber-500/15 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-amber-500/30 blur-md group-hover:bg-amber-400/50 transition duration-300"></div>
              <img
                src="/logo.png"
                alt="ဓမ္မရေချမ်း Logo"
                className="relative w-11 h-11 rounded-2xl object-cover ring-1 ring-amber-500/40 shadow-lg transform group-hover:scale-105 transition duration-200"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5 font-myanmar">
                {APP_INFO.name}
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </span>
              <span className="text-xs text-amber-300/80 tracking-wider uppercase font-medium">
                {APP_INFO.englishName}
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition duration-150 font-myanmar"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="#donate"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-300 px-3 py-2 transition"
            >
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>လှူဒါန်းရန်</span>
            </a>
            <a
              href={APP_INFO.apkDownloadUrl}
              download={APP_INFO.apkFilename}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-sm shadow-md shadow-amber-500/20 hover:shadow-amber-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition duration-200"
            >
              <Download className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              <span>ဒေါင်းလုဒ်ရယူရန်</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-amber-500/20 bg-[#091019]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:text-amber-400 hover:bg-amber-500/10 font-myanmar"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <a
              href={APP_INFO.apkDownloadUrl}
              download={APP_INFO.apkFilename}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Android APK ဒေါင်းလုဒ် ({APP_INFO.apkSize})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
