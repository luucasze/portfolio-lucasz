import React from 'react';
import { SectionWrapper } from '@/components/SectionWrapper';
import { Container } from '@/components/Container';
import { HighlightText } from '@/components/HighlightText';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { pilares } from '@/content/pilares';

export const Pilares = () => {
    return (
        <SectionWrapper id="pilares" className="fade-section bg-background">
            <Container className="py-20 md:py-32 flex flex-col items-center">
                <RevealOnScroll>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center max-w-4xl mb-20 leading-tight">
                        {pilares.title}<HighlightText>{pilares.highlight}</HighlightText>{pilares.subtitle}
                    </h2>
                </RevealOnScroll>

                <div className="flex flex-col gap-12 w-full max-w-4xl relative">
                    <div className="absolute left-8 sm:left-12 top-10 bottom-10 w-0.5 bg-white/10 hidden sm:block" />
                    {pilares.items.map((item, index) => (
                        <RevealOnScroll key={item.id} delay={index * 150} translateY={30}>
                            <div className="flex items-start gap-6 sm:gap-10 relative">
                                <div className="hidden sm:flex z-10 shrink-0 w-24 h-24 rounded-full bg-darkAccent border-2 border-primary items-center justify-center text-3xl font-black text-primary shadow-[0_0_30px_rgba(252,79,0,0.2)]">
                                    {index + 1}
                                </div>
                                <div className="bg-darkAccent p-8 md:p-12 rounded-3xl border border-white/5 flex-1 relative overflow-hidden group hover:border-primary/30 transition-colors">
                                    <div className="sm:hidden absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full flex items-start justify-end p-4 text-primary font-bold">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-medium mb-4">{item.title}</h3>
                                    <p className="text-gray text-lg md:text-xl leading-relaxed font-normal">{item.description}</p>
                                </div>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </Container>
        </SectionWrapper>
    );
};
