'use client';

import { useEffect } from 'react';
import { Hero } from '@/sections/Hero';
import { Problemas } from '@/sections/Problemas';
import { Quebra } from '@/sections/Quebra';
import { Consciencia } from '@/sections/Consciencia';
import { Produto } from '@/sections/Produto';
import { Inclusos } from '@/sections/Inclusos';
import { Realidade } from '@/sections/Realidade';
import { FeedbacksMarquee } from '@/sections/FeedbacksMarquee';
import { Decisao } from '@/sections/Decisao';
import { CTA } from '@/sections/CTA';
import { FAQ } from '@/sections/FAQ';
import { CountdownBar } from '@/components/CountdownBar';
import { MainContent } from '@/components/MainContent';

export default function KitDefesaPage() {
    useEffect(() => {
        // Sempre começa do topo (incluindo reload no mobile)
        if (typeof window !== 'undefined') {
            window.history.scrollRestoration = 'manual';
            window.scrollTo(0, 0);
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0, rootMargin: '200px 0px 0px 0px' }
        );

        // Função para observar elementos, chamada imediatamente e após um pequeno delay para garantir hidratação
        const observeElements = () => {
            document.querySelectorAll('.fade-section').forEach((el) => observer.observe(el));
        };

        observeElements();
        const timeoutId = setTimeout(observeElements, 500);

        return () => {
            observer.disconnect();
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <main className="flex min-h-screen flex-col w-full">
            <CountdownBar />
            <div style={{ paddingTop: '40px' }}>
                <Hero />
                <MainContent>
                    {/* Mobile: Problemas com z-index alto desliza por cima do Hero sticky */}
                    {/* Desktop: mantém o -50vh original para sobreposição de scroll */}
                    <div className="md:hidden relative z-20">
                        <Problemas />
                    </div>
                    <div style={{ marginTop: '-50vh' }} className="hidden md:block">
                        <Problemas />
                    </div>
                    <Quebra />
                    <Consciencia />
                    <Produto />
                    <Inclusos />
                    <Realidade />
                    <FeedbacksMarquee />
                    <Decisao />
                    <FAQ />
                    <CTA />
                    <footer className="w-full bg-black py-8 text-center text-white/40 text-sm md:text-base border-t border-white/5 relative z-50">
                        <p>&copy; {new Date().getFullYear()} lucaszédesign. Todos os direitos reservados.</p>
                        <p className="mt-4">
                            <a href="/" className="hover:text-white transition-colors underline decoration-white/20 underline-offset-4">Voltar para o Portfólio</a>
                        </p>
                    </footer>
                </MainContent>
            </div>
        </main>
    );
}
