
import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  type: 'heart' | 'star';
}

const HeartBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (i % 5 === 0 ? 20 : 8) + 4,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * -20,
      opacity: Math.random() * 0.4 + 0.1,
      type: i % 4 === 0 ? 'heart' as const : 'star' as const
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[radial-gradient(circle_at_50%_50%,_rgba(255,46,99,0.05)_0%,_transparent_50%)]">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute select-none will-change-transform"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            filter: 'blur(0.5px)',
            animation: `float ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.type === 'heart' ? '❤️' : '✨'}
        </div>
      ))}
      <style>{`
        @keyframes float {
          0% { transform: translateY(100vh) rotate(0deg); }
          100% { transform: translateY(-100px) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default HeartBackground;
