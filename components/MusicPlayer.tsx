
import React, { useState, useRef, useEffect } from 'react';
import { Song } from '../types';

export const SONGS: Song[] = [
  {
    id: '1',
    title: 'ISHQ HAI',
    artist: 'ROMANTIC VIBES',
    url: 'Ishq Hai.mp3',
    cover: '16.jpg'
  },
  // {
  //   id: '2',
  //   title: 'ZAROORAT',
  //   artist: 'SOULFUL DEPTH',
  //   url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  //   cover: 'input_file_1.png'
  // },
  // {
  //   id: '3',
  //   title: 'TUM SE HI',
  //   artist: 'ETERNAL MELODY',
  //   url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  //   cover: 'input_file_2.png'
  // },
  // {
  //   id: '4',
  //   title: 'ENNA SONA',
  //   artist: 'PURE LOVE',
  //   url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  //   cover: 'input_file_3.png'
  // }
];

const MusicPlayer: React.FC<{ activeIndex?: number, onSongChange?: (index: number) => void }> = ({ activeIndex = 0, onSongChange }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(activeIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const song = SONGS[currentSongIndex];

  useEffect(() => {
    setCurrentSongIndex(activeIndex);
  }, [activeIndex]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextSong = () => {
    const nextIdx = (currentSongIndex + 1) % SONGS.length;
    setCurrentSongIndex(nextIdx);
    onSongChange?.(nextIdx);
    setIsPlaying(false);
  };

  const prevSong = () => {
    const prevIdx = (currentSongIndex - 1 + SONGS.length) % SONGS.length;
    setCurrentSongIndex(prevIdx);
    onSongChange?.(prevIdx);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Playback failed", e));
    }
  }, [currentSongIndex]);

  return (
    <div className="relative group w-full max-w-md">
      {/* Dynamic Glow Background */}
      <div className={`absolute inset-0 bg-pink-600/20 rounded-[4rem] blur-[60px] transition-all duration-1000 ${isPlaying ? 'scale-110 opacity-100' : 'scale-90 opacity-0'}`}></div>
      
      <div className="relative glass-card p-10 rounded-[3.5rem] border-white/10 shadow-2xl flex flex-col items-center gap-8 overflow-hidden">
        {/* Animated Visualizer Bars (Simulated) */}
        <div className="absolute top-0 left-0 w-full flex justify-center gap-1 opacity-20 h-16 items-end">
           {[...Array(20)].map((_, i) => (
             <div 
               key={i} 
               className={`w-1 bg-pink-500 rounded-full transition-all duration-300 ${isPlaying ? 'animate-pulse' : 'h-2'}`}
               style={{ height: isPlaying ? `${Math.random() * 40 + 10}px` : '4px', animationDelay: `${i * 0.1}s` }}
             ></div>
           ))}
        </div>

        <div className="relative mt-4">
          <div className={`w-48 h-48 rounded-full overflow-hidden border-4 border-pink-500/20 shadow-[0_0_50px_rgba(255,46,99,0.3)] transition-all duration-[30s] linear infinite ${isPlaying ? 'rotate-[360deg]' : ''}`}>
            <img src={song.cover} alt="Vinyl Cover" className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-slate-950 rounded-full border-2 border-pink-500/40 z-10"></div>
        </div>

        <div className="text-center space-y-2 z-10">
          <h3 className="text-white font-luxury text-3xl tracking-widest text-glow uppercase leading-tight">{song.title}</h3>
          <p className="text-pink-500 font-bold tracking-[0.5em] text-[10px] uppercase">{song.artist}</p>
        </div>

        <audio 
          ref={audioRef} 
          src={song.url} 
          onEnded={nextSong}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        <div className="flex items-center gap-10 z-10">
          <button onClick={prevSong} className="text-pink-100/30 hover:text-pink-500 transition-all hover:scale-110 active:scale-90">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
          </button>

          <button 
            onClick={togglePlay}
            className="w-20 h-20 rounded-full bg-white/5 hover:bg-pink-600 transition-all flex items-center justify-center text-white border border-pink-500/20 shadow-2xl active:scale-95 group/play"
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>

          <button onClick={nextSong} className="text-pink-100/30 hover:text-pink-500 transition-all hover:scale-110 active:scale-90">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
          </button>
        </div>

        <div className="w-full space-y-4 px-4 z-10">
           <div className="h-[2px] w-full bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r from-pink-500 to-rose-400 ${isPlaying ? 'w-full' : 'w-0'}`}
                style={{ transition: isPlaying ? 'width 180s linear' : 'width 0.5s ease' }}
              ></div>
           </div>
           <div className="flex justify-between items-center text-[10px] text-pink-500/50 font-bold tracking-[0.3em] uppercase">
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse"></span> {song.title}</span>
              <span>PLAYLIST {currentSongIndex + 1}/{SONGS.length}</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
