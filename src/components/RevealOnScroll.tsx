'use client';

import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
  translateY?: number;
  display?: React.CSSProperties['display'];
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  delay = 0,
  className = "",
  threshold = 0.15,
  translateY = 24,
  display,
}) => {
  const { elementRef, isVisible } = useScrollReveal(threshold);

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : `translateY(${translateY}px)`,
    transition: 'opacity 0.7s ease, transform 0.7s ease',
    transitionDelay: `${delay}ms`,
    willChange: 'opacity, transform',
    ...(display ? { display } : {}),
  };

  return (
    <div ref={elementRef} style={style} className={className}>
      {children}
    </div>
  );
};