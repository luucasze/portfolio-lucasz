"use client";

import React, { useEffect, useRef } from 'react';
import { SectionWrapper } from '@/components/SectionWrapper';
import { Container } from '@/components/Container';
import { HighlightText } from '@/components/HighlightText';
import { cta } from '@/content/cta';

export const CTA = () => {
    const btnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const btn = btnRef.current;
        if (!btn) return;

        const handleMove = (e: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px) scale(1.07)`;
            btn.style.boxShadow = `0 0 70px rgba(255,90,0,0.8), 0 8px 40px rgba(0,0,0,0.5)`;
        };

        const handleLeave = () => {
            btn.style.transform = 'translate(0px, 0px) scale(1)';
            btn.style.boxShadow = '0 0 40px rgba(252,79,0,0.5)';
        };

        btn.addEventListener('mousemove', handleMove);
        btn.addEventListener('mouseleave', handleLeave);
        return () => {
            btn.removeEventListener('mousemove', handleMove);
            btn.removeEventListener('mouseleave', handleLeave);
        };
    }, []);

    return (
        <SectionWrapper id="cta" className="fade-section bg-transparent py-16 md:py-24 relative overflow-hidden">
            <Container className="py-12 md:py-16 relative z-10 flex flex-col items-center text-center space-y-10 max-w-4xl">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                    {cta.title}<HighlightText className="block mt-2">{cta.highlight}</HighlightText>
                </h2>

                <p className="text-gray text-xl md:text-3xl max-w-2xl font-normal leading-relaxed">
                    {cta.subtitle}
                </p>

                <div className="pt-8">
                    <a
                        href="https://pay.hotmart.com/L105417451C?checkoutMode=10"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                    >
                        <button
                            ref={btnRef}
                            className="h-16 px-12 md:text-xl rounded-full font-bold text-white text-lg transition-all duration-300 ease-out"
                            style={{
                                background: 'linear-gradient(135deg, #ff5a00, #ff3d00)',
                                boxShadow: '0 0 40px rgba(252,79,0,0.5)',
                                willChange: 'transform, box-shadow',
                            }}
                        >
                            {cta.buttonText}
                        </button>
                    </a>
                </div>
            </Container>
        </SectionWrapper>
    );
};
