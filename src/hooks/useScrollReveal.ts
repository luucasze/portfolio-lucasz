'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Hook para detectar quando um elemento entra na viewport.
 * Uma vez que o elemento se torna visível, ele permanece visível.
 * 
 * @param threshold Porcentagem de visibilidade para disparar (padrão 0.15)
 * @returns [ref, isVisible]
 */
export function useScrollReveal(threshold = 0.15) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Uma vez visível, para de observar
          if (elementRef.current) observer.unobserve(elementRef.current);
        }
      },
      { threshold }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  return { elementRef, isVisible };
}
