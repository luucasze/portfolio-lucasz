"use client";

import React, { useEffect, useRef, useState } from 'react';
import { SectionWrapper } from '@/components/SectionWrapper';
import { Container } from '@/components/Container';
import { Badge } from '@/components/Badge';
import { HighlightText } from '@/components/HighlightText';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { realidade } from '@/content/realidade';

// Sequência do drama do chat
const chatSequence = [
    // msg: mensagem, from: 'eu' | 'cliente', delay ms desde o início, tipo 'msg' | 'seen' | 'block'
    { id: 1, type: 'msg', from: 'eu', text: 'Oi, o projeto foi entregue na sexta. Quando vc consegue fazer o pagamento?', delay: 400 },
    { id: 2, type: 'seen', from: 'eu', text: 'Visualizado', delay: 1800 },
    { id: 3, type: 'msg', from: 'eu', text: 'Vc tá vendo minhas mensagens?', delay: 3000 },
    { id: 4, type: 'msg', from: 'cliente', text: 'Aprende a usar contrato primeiro. Não vou pagar não.', delay: 4400 },
    { id: 5, type: 'block', from: 'sistema', text: 'Você foi bloqueado.', delay: 5800 },
];

export const Realidade = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visibleIds, setVisibleIds] = useState<number[]>([]);
    const [started, setStarted] = useState(false);

    // Dispara a animação quando a seção entrar na viewport
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started) {
                    setStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.4 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [started]);

    // Quando started, vai adicionando cada mensagem no tempo certo
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
        <SectionWrapper id="realidade" className="fade-section bg-background">
            <Container className="py-20 md:py-32 flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

                {/* ESQUERDA: Texto */}
                <div className="flex-1 space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
                    <RevealOnScroll delay={0}><Badge>{realidade.badge}</Badge></RevealOnScroll>
                    <RevealOnScroll delay={100}>
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                            {realidade.title}<HighlightText>{realidade.highlight}</HighlightText>
                        </h2>
                    </RevealOnScroll>
                    <RevealOnScroll delay={200}>
                        <p className="text-gray text-xl leading-relaxed max-w-xl font-normal">
                            {realidade.description}
                        </p>
                    </RevealOnScroll>
                </div>

                {/* DIREITA: Chat Animado */}
                <div ref={sectionRef} className="flex-1 w-full max-w-lg">
                    <RevealOnScroll delay={300} translateY={40}>
                        <div className="bg-[#111] rounded-3xl border border-white/5 shadow-xl overflow-hidden">

                            {/* Barra de status do celular */}
                            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 bg-[#0f0f0f]">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/40">C</div>
                                <div>
                                    <p className="text-white/80 text-sm font-medium">Cliente</p>
                                    <p className="text-white/30 text-xs">WhatsApp</p>
                                </div>
                            </div>

                            {/* Feed de mensagens */}
                            <div className="p-5 space-y-3 min-h-[260px]">
                                {chatSequence.map((item) => {
                                    const visible = visibleIds.includes(item.id);

                                    if (item.type === 'block') {
                                        return (
                                            <div
                                                key={item.id}
                                                className={`flex justify-center transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                                            >
                                                <div className="flex items-center gap-2 bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-medium px-4 py-2 rounded-full">
                                                    <span>🚫</span>
                                                    <span>Você foi bloqueado por este contato.</span>
                                                </div>
                                            </div>
                                        );
                                    }

                                    if (item.type === 'seen') {
                                        return (
                                            <div
                                                key={item.id}
                                                className={`flex justify-end transition-all duration-400 ${visible ? 'opacity-100' : 'opacity-0'}`}
                                            >
                                                <span className="text-[10px] text-white/30 pr-1">✓✓ Visualizado</span>
                                            </div>
                                        );
                                    }

                                    const isMe = item.from === 'eu';

                                    return (
                                        <div
                                            key={item.id}
                                            className={`flex transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'} ${isMe ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm
                                                ${isMe
                                                    ? 'bg-[#2a5c3f] text-white rounded-br-sm'
                                                    : 'bg-[#1e1e1e] text-white/80 rounded-bl-sm border border-white/5'
                                                }`}
                                            >
                                                {item.text}
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Typing indicator enquanto aguarda próxima mensagens */}
                                {started && !visibleIds.includes(5) && visibleIds.length > 0 && !visibleIds.includes(4) && (
                                    <div className="flex justify-start">
                                        <div className="bg-[#1e1e1e] border border-white/5 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
                                            <span className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce [animation-delay:0ms]" />
                                            <span className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce [animation-delay:150ms]" />
                                            <span className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce [animation-delay:300ms]" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </Container>
        </SectionWrapper>
    );
};
