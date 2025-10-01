'use client';

import { useEffect, useState } from 'react';

export function ConfettiEffect() {
  const [particles, setParticles] = useState<Array<{ id: number; left: number; color: string }>>([]);

  useEffect(() => {
    const colors = ['#FF6B9D', '#4F46E5', '#10B981', '#F59E0B', '#8B5CF6'];
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="confetti absolute w-2 h-2 rounded-full"
          style={{
            left: `${particle.left}%`,
            backgroundColor: particle.color,
            top: '100%',
          }}
        />
      ))}
    </div>
  );
}
