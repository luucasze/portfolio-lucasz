'use client';

import { useEffect, useState } from 'react';

export const CountdownBar = () => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const tick = () => {
      // Hora atual de Brasília
      const now = new Date();
      const brasilia = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
      
      // Calcula segundos restantes até meia-noite de Brasília
      const midnight = new Date(brasilia);
      midnight.setHours(24, 0, 0, 0);
      
      const diff = Math.floor((midnight.getTime() - brasilia.getTime()) / 1000);
      
      const h = Math.floor(diff / 3600).toString().padStart(2, '0');
      const m = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
      const s = (diff % 60).toString().padStart(2, '0');
      
      setTimeLeft(`${h}:${m}:${s}`);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      width: '100%',
      backgroundColor: '#FC4F00',
      padding: '10px 24px',
      textAlign: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 100,
    }}>
      <span style={{
        fontSize: '14px',
        fontWeight: '600',
        color: '#000',
        letterSpacing: '0.02em',
      }}>
        Oferta especial termina em {timeLeft}
      </span>
    </div>
  );
};
