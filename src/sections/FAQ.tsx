"use client";

import React, { useState } from 'react';
import { faqItems } from '@/content/faq';

const PlusIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="10" y1="4" x2="10" y2="16" />
        <line x1="4" y1="10" x2="16" y2="10" />
    </svg>
);

const MinusIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="4" y1="10" x2="16" y2="10" />
    </svg>
);

export const FAQ = () => {
    const [openId, setOpenId] = useState<number | null>(1);

    const toggle = (id: number) => {
        setOpenId(prev => (prev === id ? null : id));
    };

    return (
        <section id="faq" className="w-full bg-[#0a0a0a] py-24 md:py-36 fade-section">
            <div className="max-w-3xl mx-auto px-6">

                {/* Cabeçalho */}
                <div className="text-center mb-14">
                    <p className="text-[#ff5a00] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
                        Dúvidas
                    </p>
                    <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                        Perguntas Frequentes
                    </h2>
                </div>

                {/* Accordion */}
                <div className="space-y-3">
                    {faqItems.map((item) => {
                        const isOpen = openId === item.id;
                        return (
                            <div
                                key={item.id}
                                className={`rounded-2xl border transition-all duration-300 overflow-hidden
                                    ${isOpen
                                        ? 'border-[#ff5a00]/50 bg-[#ff5a00]/8 shadow-[0_0_30px_rgba(255,90,0,0.08)]'
                                        : 'border-white/8 bg-white/3 hover:border-white/15'
                                    }`}
                            >
                                {/* Pergunta (clicável) */}
                                <button
                                    onClick={() => toggle(item.id)}
                                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                                    aria-expanded={isOpen}
                                >
                                    <span className={`font-semibold text-base md:text-lg transition-colors duration-200
                                        ${isOpen ? 'text-[#ff5a00]' : 'text-white'}`}>
                                        {item.question}
                                    </span>

                                    {/* Ícone + / − */}
                                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                                        ${isOpen
                                            ? 'bg-[#ff5a00] text-white rotate-0'
                                            : 'bg-white/8 text-white/50 hover:bg-white/15'
                                        }`}>
                                        {isOpen ? <MinusIcon /> : <PlusIcon />}
                                    </span>
                                </button>

                                {/* Resposta (expande/colapsa) */}
                                <div
                                    className={`transition-all duration-300 ease-in-out overflow-hidden
                                        ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <p className="px-6 pb-6 text-white/60 text-base leading-relaxed">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};
