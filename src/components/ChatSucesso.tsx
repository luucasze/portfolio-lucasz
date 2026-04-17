"use client";

import React, { useEffect, useRef, useState } from 'react';

const chatSequence = [
    { id: 1, type: 'msg', from: 'cliente', text: 'Olá! Gostaria de um orçamento para uma identidade visual.', delay: 800 },
    { id: 2, type: 'msg', from: 'eu', text: 'Olá! Com certeza. Preparei uma proposta estratégica que resolve todos os pontos que conversamos. Segue o arquivo abaixo:', delay: 2400 },
    { id: 3, type: 'pdf', from: 'eu', text: 'PROPOSTA_COMERCIAL.pdf', size: '2.4 MB', delay: 3600 },
    { id: 4, type: 'seen', from: 'eu', text: 'Visualizado', delay: 4400 },
    { id: 5, type: 'msg', from: 'cliente', text: 'Nossa, gostei muito da forma que você apresentou. Transmitiu muita segurança! Vou fechar com você, vamos iniciar?', delay: 6000 },
];

export const ChatSucesso = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [visibleIds, setVisibleIds] = useState<number[]>([]);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started) {
                    setStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started) return;

        const timers = chatSequence.map((item) =>
            setTimeout(() => {
                setVisibleIds((prev) => [...prev, item.id]);
            }, item.delay)
        );

        return () => timers.forEach(clearTimeout);
    }, [started]);

    return (
        <div ref={containerRef} className="w-full h-full min-h-[500px] flex items-center justify-center relative">
            {/* Brilho Verde atrás do celular */}
            <div className={`absolute w-full h-full max-w-sm bg-primary/20 blur-[100px] rounded-full transition-opacity duration-1000 ${started ? 'opacity-100' : 'opacity-0'}`} />

            <div className={`w-full bg-[#111] rounded-[2rem] border transition-all duration-1000 overflow-hidden relative z-10 shadow-2xl ${started ? 'border-primary/30 shadow-primary/10' : 'border-white/5 shadow-black'}`}>

                {/* Barra de status do WhatsApp */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 bg-[#0f0f0f]">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-black">CQ</div>
                    <div className="flex-1">
                        <p className="text-white/80 text-sm font-medium">Cliente Qualificado</p>
                        <p className="text-[#25D366] text-xs font-normal">online</p>
                    </div>
                    <div className="flex gap-4 text-white/30">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                    </div>
                </div>

                {/* Feed de mensagens - Altura fixa sem scroll */}
                <div className="p-6 space-y-4 h-[580px] overflow-hidden bg-[#0b0b0b]/60 backdrop-blur-sm relative transition-all duration-500 scrollbar-hide">
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")' }}></div>

                    {chatSequence.map((item) => {
                        const visible = visibleIds.includes(item.id);
                        const isMe = item.from === 'eu';

                        if (item.type === 'seen') {
                            return (
                                <div key={item.id} className={`flex justify-end transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
                                    <div className="flex items-center gap-1">
                                        <span className="text-[10px] text-white/30 uppercase tracking-wider font-medium">Visualizado</span>
                                        <span className="text-[#34B7F1] text-[10px]">✓✓</span>
                                    </div>
                                </div>
                            );
                        }

                        if (item.type === 'pdf') {
                            return (
                                <div key={item.id} className={`flex justify-end transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                                    <div className="bg-[#005c4b] text-white rounded-2xl p-4 flex items-center gap-4 border border-white/10 shadow-lg max-w-[85%]">
                                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">{item.text}</p>
                                            <p className="text-[10px] text-white/40">{item.size}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div key={item.id} className={`flex transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${isMe ? 'justify-end' : 'justify-start'}`}>
                                <div className={`relative max-w-[85%] px-4 py-3 text-sm leading-6 shadow-xl
                                    ${isMe
                                        ? 'bg-[#005c4b] text-white rounded-2xl rounded-tr-none'
                                        : 'bg-[#202c33] text-white/90 rounded-2xl rounded-tl-none border border-white/5'
                                    }`}
                                >
                                    {item.text}
                                    <div className="flex justify-end mt-1">
                                        <span className="text-[9px] text-white/40">21:30</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Typing indicator */}
                    {started && visibleIds.length > 0 && !visibleIds.includes(5) && !visibleIds.includes(2) && visibleIds.includes(1) && (
                        <div className="flex justify-end">
                            <div className="bg-[#005c4b]/50 rounded-2xl rounded-tr-none px-4 py-3 flex gap-1.5 items-center">
                                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0ms]" />
                                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:150ms]" />
                                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:300ms]" />
                            </div>
                        </div>
                    )}

                    {/* Typing indicator Cliente */}
                    {started && visibleIds.includes(4) && !visibleIds.includes(5) && (
                        <div className="flex justify-start">
                            <div className="bg-[#202c33]/50 border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 flex gap-1.5 items-center">
                                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0ms]" />
                                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:150ms]" />
                                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:300ms]" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Barra de input fictícia */}
                <div className="px-4 py-3 bg-[#0f0f0f] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white/30 text-primary">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="flex-1 bg-[#202c33] rounded-full px-5 py-2.5 text-white/30 text-sm">
                        Mensagem
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black scale-90">
                        <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};
