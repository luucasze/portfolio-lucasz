"use client";

import React, { useEffect, useRef, useState } from 'react';
import { produtosScroll } from '@/content/produtos-scroll';

const TOTAL_TEXTS = produtosScroll.length;
const TOTAL_VIDEOS = produtosScroll.length - 1;

export const Inclusos = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const isAnimatingRef = useRef(false);
    const lastScrollY = useRef(0);
    const activeIndexRef = useRef(0);
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const [activeTextIndex, setActiveTextIndex] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current || isAnimatingRef.current) return;

            const currentScrollY = window.scrollY;
            const deltaY = currentScrollY - lastScrollY.current;
            lastScrollY.current = currentScrollY;

            const rect = sectionRef.current.getBoundingClientRect();
            // Só ativa se a seção estiver 'sticky' e visível
            const isInStickyZone = rect.top <= 10 && rect.bottom > window.innerHeight + 10;
            if (!isInStickyZone) return;

            // Threshold calibrado para mobile e desktop
            const threshold = window.innerWidth < 768 ? 10 : 25;

            if (deltaY > threshold && activeIndexRef.current < TOTAL_VIDEOS) {
                playNextVideo();
            }
        };

        const playNextVideo = () => {
            const index = activeIndexRef.current;
            const vid = videoRefs.current[index];
            if (!vid || isAnimatingRef.current) return;

            isAnimatingRef.current = true;
            vid.currentTime = 0;
            vid.play().catch(() => {
                isAnimatingRef.current = false;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleVideoEnd = (index: number) => {
        const nextIndex = index + 1;
        const vid = videoRefs.current[index];

        if (nextIndex <= TOTAL_VIDEOS - 1) {
            activeIndexRef.current = nextIndex;
            setActiveVideoIndex(nextIndex);
            setActiveTextIndex(nextIndex);

            const nextVid = videoRefs.current[nextIndex];
            if (nextVid) nextVid.currentTime = 0;
        } else {
            // Último vídeo: Trava no penúltimo frame conforme solicitado
            if (vid) {
                vid.currentTime = Math.max(0, vid.duration - 0.1);
                vid.pause();
            }
            // Garante que o último texto seja exibido
            setActiveTextIndex(TOTAL_TEXTS - 1);
        }

        isAnimatingRef.current = false;
    };

    useEffect(() => {
        videoRefs.current.forEach(vid => {
            if (vid) {
                vid.muted = true;
                vid.load();
                vid.pause();
                vid.currentTime = 0;
            }
        });
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-[500vh] w-full bg-black overflow-visible"
            id="inclusos"
        >
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black">
                <div className="w-full max-w-7xl px-6 flex flex-col md:flex-row items-center justify-center gap-0 md:gap-10 relative z-10 transform-gpu">

                    {/* VÍDEO COMPOSIÇÃO - Removida a borda conforme solicitado */}
                    <div className="w-full md:w-7/12 flex justify-center items-center">
                        <div className="relative w-full md:max-w-3xl aspect-video bg-black overflow-hidden shadow-2xl rounded-2xl">
                            {produtosScroll.slice(0, TOTAL_VIDEOS).map((produto, index) => {
                                const isActive = index === activeVideoIndex;
                                return (
                                    <video
                                        key={produto.id}
                                        ref={(el) => { videoRefs.current[index] = el; }}
                                        src={produto.video}
                                        onEnded={() => handleVideoEnd(index)}
                                        preload="auto"
                                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out pointer-events-none transform-gpu
                                            ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                        playsInline
                                        muted
                                        style={{ backfaceVisibility: 'hidden' }}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    {/* TEXTO - Restaurada proximidade (-mt-8) e alinhamento centralizado no mobile */}
                    <div className="w-full md:w-5/12 h-[220px] md:h-[400px] relative flex items-center z-20 -mt-8 md:mt-0 transform-gpu">
                        {produtosScroll.map((produto, index) => {
                            const isActive = index === activeTextIndex;

                            return (
                                <div
                                    key={produto.id}
                                    className={`absolute inset-0 flex flex-col justify-center items-center md:items-start transition-all duration-700
                                        ${isActive ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-6 pointer-events-none'}
                                    `}
                                >
                                    <h3 className="text-3xl md:text-5xl font-bold text-primary mb-3 md:mb-6 leading-tight text-center md:text-left tracking-tight">
                                        {produto.title}
                                    </h3>
                                    <p className="text-gray/70 text-base md:text-xl font-light leading-relaxed max-w-lg text-center md:text-left">
                                        {produto.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
