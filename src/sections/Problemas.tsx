'use client';

import React from 'react';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { Container } from '@/components/Container';
import { SectionWrapper } from '@/components/SectionWrapper';
import { problemas } from '@/content/problemas';

const ProblemaCard = ({ item, index }: { item: any; index: number }) => {
    return (
        <RevealOnScroll delay={index * 150} threshold={0.2} translateY={20}>
            <div className="relative group bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-6 py-6 transition-all duration-300 hover:bg-white/10 cursor-default overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-[1px] before:bg-white/10 shadow-sm">
                <div className="flex flex-col space-y-3">
                    <span className="text-[10px] md:text-xs text-primary/90 font-bold uppercase tracking-[0.2em]">
                        PROBLEMA {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                    <div className="space-y-2">
                        <h3 className="text-xl md:text-2xl font-medium text-white leading-tight">
                            {item.text}
                        </h3>
                        <p className="text-white/50 text-sm md:text-base font-light leading-relaxed max-w-2xl">
                            {item.subtext}
                        </p>
                    </div>
                </div>
            </div>
        </RevealOnScroll>
    );
};

export const Problemas = () => {
    return (
        <SectionWrapper id="problemas" className="bg-transparent py-20 md:py-32 relative text-white" overflowVisible>
            {/* Luz Ambiente Sutil (Glow) */}


            <Container className="flex flex-col items-center max-w-4xl px-6 relative z-10">
                <div className="w-full space-y-16">
                    {/* Título Centralizado */}
                    <RevealOnScroll>
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1]">
                                {problemas.title} <span className="text-primary font-semibold">{problemas.highlight}</span>
                            </h2>
                        </div>
                    </RevealOnScroll>

                    {/* Lista de Cards Verticais */}
                    <div className="flex flex-col space-y-5">
                        {problemas.items.map((item, index) => (
                            <ProblemaCard
                                key={item.id}
                                item={item}
                                index={index}
                            />
                        ))}
                    </div>

                    {/* Footer Sutil */}
                    <RevealOnScroll delay={500}>
                        <div className="pt-8 text-center">
                            <p className="text-white/30 text-xs md:text-sm font-light max-w-md mx-auto uppercase tracking-widest leading-loose">
                                {problemas.footer}
                            </p>
                        </div>
                    </RevealOnScroll>
                </div>
            </Container>
        </SectionWrapper>
    );
};