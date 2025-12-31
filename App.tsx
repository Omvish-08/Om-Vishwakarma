
import React, { useState, useEffect } from 'react';
import HeartBackground from './components/HeartBackground';
import MusicPlayer, { SONGS } from './components/MusicPlayer';
import { generateNewYearMessage } from './services/gemini';
import { PoemResponse } from './types';

const MEMORY_IMAGES = [
   "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg"
];

const App: React.FC = () => {
  const [poemData, setPoemData] = useState<PoemResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showGift, setShowGift] = useState(false);
  const [activeSongIndex, setActiveSongIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const data = await generateNewYearMessage("Bhumi");
      setPoemData(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  if (!showGift) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-pink-600/5 animate-pulse blur-[120px]"></div>
        <HeartBackground />
        <div className="z-10 glass-card p-16 rounded-[4rem] border-white/5 shadow-[0_0_80px_rgba(255,46,99,0.2)] max-w-xl w-full transform hover:scale-[1.01] transition-transform duration-700">
          <h1 className="text-6xl md:text-7xl text-white font-luxury mb-8 tracking-tighter text-glow uppercase">Bhumi</h1>
          <div className="h-px w-24 bg-pink-500 mx-auto mb-8 shadow-[0_0_10px_rgba(255,46,99,0.8)]"></div>
          <p className="text-pink-100 text-sm mb-12 font-bold tracking-[0.5em] uppercase opacity-80">
            A Cinematic Journey Into 2025
          </p>
          <button 
            onClick={() => setShowGift(true)}
            className="group relative px-12 py-5 bg-transparent border border-pink-500/50 text-white rounded-full font-bold overflow-hidden transition-all hover:border-pink-500 shadow-xl"
          >
            <div className="absolute inset-0 bg-pink-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <span className="relative z-10 uppercase tracking-[0.3em] text-xs">Unveil The Magic 🌹</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-pink-50 selection:bg-pink-600">
      <HeartBackground />
      
      <nav className="fixed top-0 w-full z-50 bg-slate-950/40 backdrop-blur-xl border-b border-white/5 px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-xl font-luxury text-white tracking-[0.4em] uppercase text-glow">Everlasting Love</span>
          <div className="flex gap-6 items-center">
             <span className="hidden md:block text-[10px] font-bold tracking-[0.3em] uppercase text-pink-500/60">Established Forever</span>
             <div className="w-10 h-10 rounded-full border border-pink-500/30 flex items-center justify-center text-xs">✨</div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-40 pb-32 space-y-48 relative z-10">
        
        {/* Hero Section */}
        <section className="text-center relative py-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-pink-600/5 blur-[120px] -z-10"></div>
          <h1 className="text-8xl md:text-[12rem] font-luxury text-white uppercase tracking-tighter leading-none opacity-90 drop-shadow-2xl">
            Bhumi
          </h1>
          <div className="mt-12 space-y-8">
            <p className="text-3xl md:text-5xl font-light tracking-[0.1em] text-white/90 italic">
              "You are my <span className="text-pink-500 font-bold not-italic">EVERYTHING</span>"
            </p>
            <div className="flex justify-center items-center gap-8">
               <div className="h-px w-20 bg-gradient-to-r from-transparent to-pink-500"></div>
               <span className="text-2xl animate-bounce">💍</span>
               <div className="h-px w-20 bg-gradient-to-l from-transparent to-pink-500"></div>
            </div>
          </div>
        </section>

        {/* Narrative & Audio Section */}
        <section className="grid lg:grid-cols-2 gap-24 items-start">
          <div className="lg:sticky lg:top-32 space-y-12">
            <MusicPlayer activeIndex={activeSongIndex} onSongChange={setActiveSongIndex} />
            
            {/* Playlist Cards */}
            <div className="grid grid-cols-2 gap-4">
              {SONGS.map((s, idx) => (
                <button 
                  key={s.id}
                  onClick={() => setActiveSongIndex(idx)}
                  className={`p-6 rounded-3xl border transition-all duration-500 text-left group ${activeSongIndex === idx ? 'bg-pink-600 border-transparent shadow-lg shadow-pink-600/20' : 'glass-card border-white/5 hover:border-pink-500/30'}`}
                >
                  <p className={`text-[9px] font-bold tracking-[0.3em] mb-2 uppercase ${activeSongIndex === idx ? 'text-white/60' : 'text-pink-500/60'}`}>Track 0{idx+1}</p>
                  <h4 className="text-white font-luxury text-xs tracking-widest uppercase truncate">{s.title}</h4>
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-12">
            <header className="space-y-4">
              <h2 className="text-sm font-bold tracking-[0.6em] text-pink-500 uppercase">A Love Story in Verse</h2>
              <div className="h-1 w-12 bg-pink-500"></div>
            </header>
            
            {isLoading ? (
              <div className="space-y-6">
                {[1,2,3].map(i => <div key={i} className="h-8 bg-white/5 rounded-lg w-full animate-pulse"></div>)}
              </div>
            ) : (
              <div className="glass-card p-14 rounded-[3rem] relative group hover:bg-slate-900/40 transition-colors shadow-2xl">
                <div className="absolute top-8 right-8 text-4xl opacity-10 group-hover:opacity-30 transition-opacity">“</div>
                <p className="text-3xl md:text-4xl font-light leading-tight text-white mb-12 tracking-wide font-luxury opacity-90 whitespace-pre-line">
                  {poemData?.poem}
                </p>
                <div className="pt-10 border-t border-white/5">
                   <p className="text-sm text-pink-400 uppercase tracking-[0.4em] font-bold leading-loose">
                    {poemData?.message}
                   </p>
                </div>
              </div>
            )}
            
            <div className="p-10 rounded-[3rem] border border-pink-500/10 bg-pink-500/5 text-center">
              <p className="text-pink-200/60 text-xs font-bold tracking-[0.4em] uppercase mb-4 leading-relaxed">Dedicated songs chosen for you:</p>
              <div className="flex flex-wrap justify-center gap-4 text-xs font-luxury tracking-widest text-white/80">
                <span>ISHQ HAI</span> • <span>ZAROORAT</span> • <span>TUM SE HI</span> • <span>ENNA SONA</span>
              </div>
            </div>
          </div>
        </section>

        {/* The Three Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Safe", text: "I am always here for you", icon: "🛡️", desc: "Your constant sanctuary." },
              { title: "Unending", text: "I love you most", icon: "❤️", desc: "No end, only more.", special: true },
              { title: "Complete", text: "You are my EVERYTHING", icon: "♾️", desc: "My universe's center." }
            ].map((pillar, idx) => (
              <div key={idx} className={`p-12 rounded-[3.5rem] border transition-all duration-500 group ${pillar.special ? 'bg-gradient-to-br from-pink-600 to-fuchsia-800 border-transparent shadow-[0_20px_60px_rgba(255,46,99,0.3)] hover:-translate-y-3' : 'glass-card border-white/5 hover:border-pink-500/40'}`}>
                <div className="text-5xl mb-10 group-hover:scale-125 transition-transform duration-500">{pillar.icon}</div>
                <h3 className={`text-xl font-luxury mb-6 tracking-widest uppercase ${pillar.special ? 'text-white' : 'text-pink-500'}`}>{pillar.title}</h3>
                <p className={`text-2xl font-bold mb-4 ${pillar.special ? 'text-white' : 'text-white/90'}`}>"{pillar.text}"</p>
                <p className={`text-xs uppercase tracking-[0.3em] ${pillar.special ? 'text-pink-100/60' : 'text-pink-200/40'}`}>{pillar.desc}</p>
              </div>
            ))}
        </section>

        {/* Cinematic Gallery */}
        <section className="space-y-24">
           <div className="text-center space-y-6">
              <h2 className="text-5xl font-luxury text-white tracking-[0.2em] uppercase">The Collection</h2>
              <div className="flex justify-center items-center gap-4">
                 <div className="h-px w-8 bg-pink-500"></div>
                 <p className="text-pink-500 text-xs font-bold tracking-[0.8em] uppercase">Framed Memories of Us</p>
                 <div className="h-px w-8 bg-pink-500"></div>
              </div>
           </div>
           
           <div className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10">
              {MEMORY_IMAGES.map((src, i) => (
                <div key={i} className="break-inside-avoid relative p-4 bg-white shadow-2xl rotate-[-1deg] hover:rotate-0 hover:scale-105 transition-all duration-500 group">
                   <div className="overflow-hidden bg-slate-200 aspect-[4/5]">
                     <img 
                      src={src} 
                      className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" 
                      alt={`Bhumi Moment ${i+1}`} 
                     />
                   </div>
                   <div className="pt-6 pb-2 px-2 flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Moment {i+1}</span>
                      <span className="text-pink-500">❤️</span>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Final Act */}
        <section className="text-center py-40 rounded-[5rem] glass-card border-white/5 relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
           
           <div className="relative space-y-16">
              <div className="flex justify-center gap-12 text-5xl opacity-40 group-hover:opacity-100 transition-all duration-1000">
                <span>🥂</span><span>✨</span><span>🥂</span>
              </div>
              <h2 className="text-7xl md:text-9xl font-luxury text-white tracking-tighter leading-none px-4">
                Happy New Year <span className="text-pink-500 drop-shadow-[0_0_30px_rgba(255,46,99,0.5)]">Bhumi</span>
              </h2>
              <p className="text-2xl md:text-4xl text-white/40 font-light max-w-3xl mx-auto uppercase tracking-[0.5em] leading-relaxed">
                Our greatest adventure is just beginning.
              </p>
              <div className="flex justify-center gap-16 pt-10">
                 {['💑', '💍', '🏠'].map((emoji, i) => (
                   <span key={i} className="text-6xl grayscale hover:grayscale-0 transition-all duration-500 cursor-none hover:scale-150">{emoji}</span>
                 ))}
              </div>
           </div>
        </section>
      </main>

      <footer className="text-center py-32 border-t border-white/5">
        <div className="mb-10 text-4xl opacity-30">🕊️</div>
        <p className="text-pink-900/40 text-[10px] font-bold tracking-[1em] uppercase">
          Curated for the love of my life — Bhumi
        </p>
      </footer>
    </div>
  );
};

export default App;
