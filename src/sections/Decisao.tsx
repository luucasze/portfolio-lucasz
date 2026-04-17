"use client";

import React, { useEffect, useRef } from 'react';
import { SectionWrapper } from '@/components/SectionWrapper';
import { Container } from '@/components/Container';
import { HighlightText } from '@/components/HighlightText';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { decisao } from '@/content/decisao';

export const Decisao = () => {
    const btnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const btn = btnRef.current;
        if (!btn) return;

        const handleMove = (e: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px) scale(1.04)`;
            btn.style.boxShadow = '0 0 80px rgba(252,79,0,0.9), 0 8px 40px rgba(0,0,0,0.5)';
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
        <SectionWrapper id="decisao" className="fade-section bg-[#111] border-y border-white/5">
            <Container className="py-20 md:py-32 flex flex-col items-center text-center max-w-4xl">
                <RevealOnScroll>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 leading-tight">
                        {decisao.title}<HighlightText>{decisao.highlight}</HighlightText>
                    </h2>
                </RevealOnScroll>

                <RevealOnScroll delay={150}>
                    <p className="text-gray text-xl md:text-2xl mb-16 leading-relaxed max-w-3xl font-normal group">
                        Tudo isso facilmente custaria {" "}
                        <span className="relative inline-block text-white/50 font-medium strike-container">
                            R$ 110
                            <span className="strike-line absolute left-0 top-1/2 -translate-y-1/2 h-[2px] md:h-[3px] bg-red-600 -rotate-3 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
                        </span>. Hoje, sai tudo por:
                    </p>
                </RevealOnScroll>

                <style jsx>{`
                    .strike-container {
                        padding: 2px 4px;
                    }
                    .strike-line {
                        width: 0;
                        animation: strike-draw 1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards;
                        animation-delay: 1s;
                    }
                    @keyframes strike-draw {
                        from { width: 0; opacity: 0; }
                        to { width: 100%; opacity: 1; }
                    }
                `}</style>

                <RevealOnScroll delay={300} translateY={40}>
                    <div className="bg-background p-10 md:p-16 rounded-3xl border-2 border-primary w-full max-w-2xl relative shadow-[0_0_80px_rgba(252,79,0,0.15)] flex flex-col items-center">
                        <div className="absolute -top-5 bg-primary text-white px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase shadow-lg">
                            Oferta Exclusiva
                        </div>

                        <div className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-4 tracking-tight">
                            {decisao.price}
                        </div>
                        <p className="text-gray mb-10 text-lg font-normal">{decisao.cash}</p>

                        {/* Botão com efeito magnético */}
                        <a
                            href={decisao.checkoutLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full"
                        >
                            <button
                                ref={btnRef}
                                className="w-full h-16 md:h-20 text-lg md:text-xl mb-6 rounded-2xl font-bold text-white tracking-wide uppercase transition-all duration-300 ease-out"
                                style={{
                                    background: 'linear-gradient(135deg, #fc4f00, #e03a00)',
                                    boxShadow: '0 0 40px rgba(252,79,0,0.5)',
                                    willChange: 'transform, box-shadow',
                                }}
                            >
                                QUERO BLINDAR MEU NEGÓCIO
                            </button>
                        </a>

                        <p className="text-white/50 text-sm md:text-base font-light">{decisao.guaranteeText}</p>
                    </div>
                </RevealOnScroll>
            </Container>
        </SectionWrapper>
    );
};
