'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/Badge';
import { hero } from '@/content/hero';

const MagneticButton = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!buttonRef.current) return;
        const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - (left + width / 2);
        const y = e.clientY - (top + height / 2);
        setPosition({ x, y });
    };

    const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

    return (
        <button
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
                document.getElementById('decisao')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`group relative px-6 py-3 rounded-md bg-primary text-white font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(252,79,0,0.25)] overflow-hidden ${className}`}
            style={{
                transform: `translate(${position.x * 0.2}px, ${position.y * 0.2}px)`,
                transition: position.x === 0 ? 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)' : 'transform 0.1s ease-out'
            }}
        >
            <div className="absolute inset-0 bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <span className="relative z-10">{children}</span>
        </button>
    );
};

export const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const heroTextRef = useRef<HTMLDivElement>(null);
    const videoWrapperRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const mobileVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const heroText = heroTextRef.current;
        const videoWrapper = videoWrapperRef.current;
        const video = videoRef.current;

        if (!section || !heroText || !videoWrapper || !video) return;

        const onScroll = () => {
            const scrollY = window.scrollY;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight - window.innerHeight;
            if (sectionHeight <= 0) return;

            const rawProgress = (scrollY - sectionTop) / sectionHeight;
            const progress = Math.min(1, Math.max(0, rawProgress));

            const isMobile = window.innerWidth < 768;
            const textProgress = isMobile ? Math.min(1, progress * 3.5) : Math.min(1, progress * 2.5);
            heroText.style.opacity = String(Math.max(0, 1 - textProgress));
            heroText.style.transform = `translateY(${-(progress * 120)}px)`;

            const baseMargin = isMobile ? -10 : -20;
            videoWrapper.style.marginTop = `${baseMargin - textProgress * 24}px`;

            const videoFadeOut = progress > 0.88 ? 1 - ((progress - 0.88) / 0.12) : 1;
            videoWrapper.style.opacity = Math.max(0, videoFadeOut).toString();

            // Ajuste agressivo de subida e centralização vertical inicial
            const videoTranslateY = -progress * 110;
            const videoScale = isMobile ? 1 + progress * 0.32 : 1 + progress * 0.22;
            videoWrapper.style.transform = `translateY(${videoTranslateY}px) scale(${videoScale})`;
            videoWrapper.style.transition = 'none';

            if (video.duration && !isNaN(video.duration)) {
                const START_OFFSET = 1.0;
                const remaining = video.duration - START_OFFSET;
                video.currentTime = START_OFFSET + Math.min(remaining * 0.70, progress * remaining * 0.85);
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        video.pause();
        if (video.readyState < 1) video.load();
        onScroll();

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    // Scroll handler MOBILE: controla currentTime do vídeo pelo scroll
    useEffect(() => {
        const mobileVid = mobileVideoRef.current;
        const section = sectionRef.current;
        if (!mobileVid || !section) return;

        const onMobileScroll = () => {
            if (window.innerWidth >= 768) return; // só mobile
            const scrollY = window.scrollY;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (sectionHeight <= 0) return;

            const rawProgress = (scrollY - sectionTop) / sectionHeight;
            const progress = Math.min(1, Math.max(0, rawProgress));

            if (mobileVid.duration && !isNaN(mobileVid.duration)) {
                const START_OFFSET = 1.0;
                const remaining = mobileVid.duration - START_OFFSET;
                // Ajustado suavemente para 1.4x para garantir abertura total antes da transição com offset de 1s
                mobileVid.currentTime = START_OFFSET + (progress * remaining * 1.4);
            }
        };

        // Garante primeiro frame visível
        const ensureFirstFrame = () => {
            mobileVid.pause();
            mobileVid.currentTime = 1.0;
        };
        if (mobileVid.readyState >= 1) {
            ensureFirstFrame();
        } else {
            mobileVid.addEventListener('loadedmetadata', ensureFirstFrame, { once: true });
        }

        window.addEventListener('scroll', onMobileScroll, { passive: true });
        return () => window.removeEventListener('scroll', onMobileScroll);
    }, []);

    return (
        <section
            id="hero"
            ref={sectionRef}
            className="relative z-10 h-[110vh] md:h-[240vh] overflow-x-hidden w-screen box-border"
            style={{ background: '#000000' }}
        >
            {/* Mobile: Ajustado mais 6% para baixo (total pt-24) */}
            <div
                className="flex flex-col items-center justify-start px-6 pb-2 pt-24 gap-8 md:hidden sticky top-[40px] min-h-[110vh] z-[1]"
            >
                {/* TEXTO MOBILE - Aumentado 30% */}
                <div className="flex flex-col items-center text-center max-w-xl">
                    <Badge className="mb-6 scale-110">{hero.badge}</Badge>
                    <h1 className="text-center leading-tight">
                        <span className="block text-white text-3xl font-medium tracking-tight">
                            Você trabalha. Entrega.
                        </span>
                        <span className="block mt-1">
                            <span className="text-white/80 text-3xl font-medium tracking-tight">e no fim</span>
                            <span className="text-primary text-4xl font-semibold ml-2 tracking-tighter">não recebe.</span>
                        </span>
                    </h1>
                    <p className="text-white/50 text-base font-light mt-4">
                        Você já percebeu isso?
                    </p>
                    <div className="mt-6 scale-110">
                        <MagneticButton>Quero resolver isso</MagneticButton>
                    </div>
                </div>

                {/* VÍDEO MOBILE - Aumentado +30% proporcionalmente */}
                <div className="w-full">
                    <video
                        ref={mobileVideoRef}
                        muted
                        autoPlay
                        playsInline
                        preload="auto"
                        className="w-full object-contain block pointer-events-none scale-150 origin-top"
                        style={{ aspectRatio: '16/9', maxHeight: '80vh' }}
                    >
                        <source src="/videos/hero/video%20caixa%20abrindo.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>

            {/* DESKTOP: sticky + parallax scroll - intacto */}
            <div
                className="hidden md:flex"
                style={{
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    background: '#000000',
                    overflow: 'hidden',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                {/* CONTEÚDO TEXTUAL DESKTOP */}
                <div
                    ref={heroTextRef}
                    className="pt-20 px-6 z-10 will-change-[opacity,transform] flex flex-col items-center text-center max-w-4xl relative"
                >
                    <Badge className="mb-8">{hero.badge}</Badge>
                    <h1 className="text-center leading-tight">
                        <span className="block text-white text-5xl lg:text-6xl font-medium tracking-tight">
                            Você trabalha. Entrega.
                        </span>
                        <span className="block mt-2">
                            <span className="text-white/80 text-5xl lg:text-6xl font-medium tracking-tight">e no fim</span>
                            <span className="text-primary text-6xl lg:text-7xl font-semibold ml-2 tracking-tighter">não recebe.</span>
                        </span>
                    </h1>
                    <p className="text-white/50 text-base font-light mt-6 max-w-xl">Você já percebeu isso?</p>
                    <div className="mt-8">
                        <MagneticButton>Quero resolver isso</MagneticButton>
                    </div>
                </div>

                {/* VÍDEO DESKTOP */}
                <div
                    ref={videoWrapperRef}
                    className="flex-1 min-h-0 w-full max-w-4xl mx-auto flex items-center justify-center z-[1] will-change-transform"
                    style={{ transformOrigin: 'center bottom' }}
                >
                    <video
                        ref={videoRef}
                        muted
                        playsInline
                        preload="auto"
                        className="w-full max-h-[60vh] h-auto object-contain block bg-black pointer-events-none"
                    >
                        <source src="/videos/hero/video%20caixa%20abrindo.mp4" type="video/mp4" />
                    </video>
                </div>

                {/* GRADIENTE INFERIOR */}
                <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent z-[5] pointer-events-none" />
            </div>
        </section>
    );
};