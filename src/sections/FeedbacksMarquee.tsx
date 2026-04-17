"use client";

import React from 'react';
import { feedbacks } from '@/content/feedbacks';
import { ChatSucesso } from '@/components/ChatSucesso';

// Duplicamos o array para criar o efeito de loop infinito sem sobressaltos
const allCards = [...feedbacks, ...feedbacks];

const AvatarCircle = ({ initials }: { initials: string }) => (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
        {initials}
    </div>
);

const FeedbackCard = ({ item }: { item: typeof feedbacks[0] }) => (
    <div className="flex-shrink-0 w-[320px] md:w-[360px] bg-[#111] border border-white/8 rounded-2xl p-6 flex flex-col gap-4 shadow-lg mx-3">
        {/* Cabeçalho */}
        <div className="flex items-center gap-3">
            <AvatarCircle initials={item.avatar} />
            <div>
                <p className="text-white text-sm font-semibold">{item.name}</p>
                <p className="text-white/30 text-xs">{item.handle}</p>
            </div>
        </div>

        {/* Texto */}
        <p className="text-white/70 text-sm leading-relaxed flex-1">{item.text}</p>

        {/* Data */}
        <p className="text-white/20 text-xs">{item.date}</p>
    </div>
);

export const FeedbacksMarquee = () => {
    return (
        <section id="feedbacks" className="w-full py-20 bg-background overflow-hidden fade-section">
            {/* Título */}
            <div className="text-center mb-12 px-6">
                <p className="text-white/30 text-xs font-semibold tracking-[0.25em] uppercase mb-3">Feedbacks</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                    Quem usou, <span className="text-[#ff5a00]">não volta atrás.</span>
                </h2>
            </div>

            {/* Marquee — edge to edge */}
            <div className="relative w-full">
                {/* Fades nas bordas para efeito de "infinito" */}
                <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                {/* Track animado */}
                <div className="flex marquee-track will-change-transform">
                    {allCards.map((item, index) => (
                        <FeedbackCard key={`${item.id}-${index}`} item={item} />
                    ))}
                </div>
            </div>

            {/* Nova Seção de Sucesso - Resultado do Kit */}
            <div className="mt-32 max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        O resultado de quem <span className="text-[#25D366]">utiliza o Kit.</span>
                    </h3>
                    <p className="text-gray text-lg md:text-xl font-light max-w-2xl mx-auto">
                        Deixe de ser ignorado e passe a transmitir a autoridade que o seu trabalho merece.
                    </p>
                </div>

                <div className="relative">
                    <ChatSucesso />
                </div>
            </div>

            <style jsx>{`
                .marquee-track {
                    animation: marquee-scroll 40s linear infinite;
                    width: max-content;
                }

                .marquee-track:hover {
                    animation-play-state: paused;
                }

                @keyframes marquee-scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        /* Move exatamente metade (o array original) para criar o loop perfeito */
                        transform: translateX(-50%);
                    }
                }
            `}</style>
        </section>
    );
};
