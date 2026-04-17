import React from 'react';
import { SectionWrapper } from '@/components/SectionWrapper';
import { Container } from '@/components/Container';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { quebra } from '@/content/quebra';

export const Quebra = () => {
    return (
        <SectionWrapper id="quebra" className="bg-transparent py-4 md:py-8 relative" overflowVisible>

            {/* Glow Laranja Superior (Suave e Ambiental - Sem Cortes) */}
            <div
                className="absolute -left-[200px] -top-[700px] w-[1100px] h-[1400px] bg-[radial-gradient(circle_at_top_left,rgba(255,120,0,0.05)_0%,rgba(255,120,0,0.04)_30%,rgba(255,120,0,0.02)_55%,transparent_75%)] blur-[100px] z-0 pointer-events-none"
                aria-hidden="true"
            />


            {/* Feixe de Luz Direcional (Simulando entrada lateral de luz - Focado no Texto) */}
            <div
                className="absolute right-[5%] top-[50%] -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(255,120,0,0.2)_0%,rgba(255,120,0,0.08)_40%,transparent_80%)] blur-[35px] z-0 pointer-events-none"
                aria-hidden="true"
            />

            <Container className="flex flex-col items-center text-center space-y-8 max-w-4xl px-6 relative z-10">
                <div className="flex flex-col items-center space-y-4">
                    <RevealOnScroll delay={100} threshold={0.2}>
                        <h2 className="text-white font-medium text-2xl sm:text-3xl md:text-5xl tracking-tight leading-tight">
                            {quebra.title}
                        </h2>
                    </RevealOnScroll>

                    <RevealOnScroll delay={300} translateY={30} threshold={0.2}>
                        <div className="relative group">
                            {/* Brilho externo sutil que aumenta no hover */}
                            <div className="absolute -inset-4 bg-orange-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <span className="relative inline-block mt-2 px-6 md:px-8 py-3 md:py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(255,120,0,0.05)] transition-all duration-500 hover:shadow-[0_0_60px_rgba(255,120,0,0.15)] hover:bg-white/10 cursor-default">
                                <span className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                                    {quebra.highlight}
                                </span>
                            </span>
                        </div>
                    </RevealOnScroll>
                </div>

                <RevealOnScroll delay={500} threshold={0.2}>
                    <p className="text-white/60 text-lg md:text-xl font-light max-w-2xl leading-relaxed mx-auto">
                        {quebra.description}
                    </p>
                </RevealOnScroll>
            </Container>
        </SectionWrapper>
    );
};
