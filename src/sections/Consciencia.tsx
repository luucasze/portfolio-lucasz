import React from 'react';
import { SectionWrapper } from '@/components/SectionWrapper';
import { Container } from '@/components/Container';
import { Badge } from '@/components/Badge';
import { HighlightText } from '@/components/HighlightText';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { consciencia } from '@/content/consciencia';

export const Consciencia = () => {
    return (
        <SectionWrapper id="consciencia" className="fade-section bg-transparent relative overflow-hidden">
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/2 blur-[80px] rounded-full -translate-y-1/2 z-0 pointer-events-none" />

            <Container className="py-20 md:py-32 relative z-10 flex flex-col items-center">
                <RevealOnScroll>
                    <div className="flex flex-col items-center">
                        <Badge className="mb-8">{consciencia.badge}</Badge>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center max-w-3xl mb-16 leading-tight">
                            {consciencia.title}<HighlightText>{consciencia.highlight}</HighlightText> {consciencia.subtitle}
                        </h2>
                    </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
                    {consciencia.options.map((opt, index) => (
                        <RevealOnScroll key={opt.id} delay={index * 150} translateY={30}>
                            <div className={`p-8 md:p-12 rounded-3xl border h-full transition-all duration-500 cursor-default backdrop-blur-xl ${index === 1
                                ? 'border-primary bg-primary/10 relative overflow-hidden transform md:-translate-y-4 shadow-[0_20px_50px_rgba(252,79,0,0.1)] hover:bg-primary/20 hover:shadow-[0_0_60px_rgba(252,79,0,0.4)] hover:scale-[1.03]'
                                : 'border-white/10 bg-white/5 hover:border-primary/40 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(252,79,0,0.2)] hover:scale-[1.03]'
                                }`}>
                                {index === 1 && (
                                    <div className="absolute top-0 right-0 bg-primary text-white px-5 py-1.5 rounded-bl-2xl text-xs font-medium tracking-widest">
                                        ÚNICA SAÍDA
                                    </div>
                                )}
                                <h3 className={`text-2xl md:text-3xl font-medium mb-6 ${index === 1 ? 'text-primary' : 'text-white'}`}>{opt.title}</h3>
                                <p className="text-gray text-lg md:text-xl leading-relaxed font-normal">{opt.description}</p>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </Container>
        </SectionWrapper>
    );
};
