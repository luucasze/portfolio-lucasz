"use client";

import React, { useEffect, useRef } from 'react';
import { ChatVendas } from '@/components/ChatVendas';

export const Produto = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);

    // Fade-in + autoplay quando entrar na viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Efeito magnético no botão
    useEffect(() => {
        const btn = btnRef.current;
        if (!btn) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.06)`;
        };

        const handleMouseLeave = () => {
            btn.style.transform = 'translate(0px, 0px) scale(1)';
        };

        btn.addEventListener('mousemove', handleMouseMove);
        btn.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            btn.removeEventListener('mousemove', handleMouseMove);
            btn.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="produto"
            className="produto-section fade-section relative w-full bg-[#080808] py-28 md:py-40 overflow-hidden"
        >
            {/* Glow ambiental de fundo */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff5a00]/3 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-stretch gap-16 lg:gap-24">

                {/* ESQUERDA: Vídeo Premium */}
                <div className="produto-video-wrap relative flex-1 w-full max-w-xl mx-auto lg:mx-0 opacity-0 translate-y-8 transition-all duration-1000 ease-out">
                    {/* Container inset esticando 100% da altura gerada pelo flex da direita */}
                    <div className="lg:absolute lg:inset-0 relative h-full lg:h-auto group">
                        {/* Glow laranja pulsante */}
                        <div className="absolute -inset-3 bg-[#ff5a00]/5 rounded-[2.5rem] blur-xl animate-pulse-slow pointer-events-none" />

                        {/* Frame do chat expandido para os limites do pai absoluto */}
                        <div className="relative lg:absolute inset-0 h-full lg:h-auto overflow-hidden">
                            <ChatVendas />
                        </div>
                    </div>
                </div>

                {/* DIREITA: Copy Premium */}
                <div className="produto-text flex-1 relative flex flex-col justify-center space-y-8 text-center lg:text-left opacity-0 translate-y-8 transition-all duration-1000 delay-200 ease-out pt-6 lg:pt-0">

                    {/* Label topo flutuante para n ditar a grid top level */}
                    <span className="lg:absolute lg:-top-11 lg:left-0 inline-block text-[#ff5a00] text-sm font-semibold tracking-[0.25em] uppercase">
                        Kit Defesa
                    </span>

                    {/* Headline principal pareado top com box video */}
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-white mt-0">
                        Você não precisa<br />
                        de mais clientes.<br />
                        <span className="text-[#ff5a00]">Você precisa de estrutura.</span>
                    </h2>

                    {/* Parágrafos */}
                    <div className="space-y-4 text-white/60 text-lg md:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0">
                        <p>
                            Se você vive de design, já sabe onde perde dinheiro.
                            Não é falta de habilidade.
                        </p>
                        <p className="text-white/80 font-medium">
                            É falta de processo.
                        </p>

                        {/* Botão com correcao de left margin no lg para alinhar */}
                        <div className="pt-4 lg:-ml-8 flex justify-center lg:justify-start">
                            <button
                                ref={btnRef}
                                onClick={() => {
                                    document.getElementById('decisao')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="magnetic-btn relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg text-white transition-all duration-300 ease-out w-fit"
                                style={{
                                    background: 'linear-gradient(135deg, #ff5a00, #ff3d00)',
                                    boxShadow: '0 0 30px rgba(255,90,0,0.3), 0 4px 20px rgba(0,0,0,0.4)',
                                    willChange: 'transform',
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                                        '0 0 60px rgba(255,90,0,0.7), 0 6px 30px rgba(0,0,0,0.5)';
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                                        '0 0 30px rgba(255,90,0,0.3), 0 4px 20px rgba(0,0,0,0.4)';
                                }}
                            >
                                <span>O Kit Defesa resolve isso.</span>
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* Estilos do fade-in via IntersectionObserver */}
            <style jsx>{`
                .produto-section.in-view .produto-video-wrap,
                .produto-section.in-view .produto-text {
                    opacity: 1;
                    transform: translateY(0);
                }

                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.6; }
                    50% { opacity: 1; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 3s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};
