import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { VersionUpdates } from './components/VersionUpdates';
import { Developer } from './components/Developer';
import { Donate } from './components/Donate';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#060B11] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <VersionUpdates />
        <Developer />
        <Donate />
      </main>
      <Footer />
    </div>
  );
}

export default App;
