'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import './portfolio.css';

export default function Portfolio() {
    useEffect(() => {
        // Reset scroll position on mount
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
    }, []);

    return (
        <>
            <header id="mainHeader">
                <nav id="navbar">
                    <div className="nav-inner">
                        <a href="#hero" className="nav-logo js-smooth" aria-label="Ir para o topo - Lucaszé Design">
                            <img src="/assets/branding/logo_lucasze_com_ze_laranja.webp" alt="Logotipo Lucaszé Design" />
                        </a>
                        <ul className="nav-links">
                            <li className="nav-lang-item desktop-only">
                                <div className="nav-lang-switcher">
                                    <button onClick={() => (window as any).changeLanguage?.('pt')} className="lang-btn active" id="btn-pt-desktop">PT</button>
                                    <button onClick={() => (window as any).changeLanguage?.('en')} className="lang-btn" id="btn-en-desktop">EN</button>
                                </div>
                            </li>
                            <li><a href="#projetos" className="js-smooth" data-i18n="nav-projects">Projetos</a></li>
                            {/* LINK PARA KIT DEFESA (APENA TEXTO, CONFORME SOLICITADO) */}
                            <li><a href="/kit-defesa" style={{ color: 'var(--primary-orange)', fontWeight: 'bold' }}>Kit Defesa</a></li>
                            <li><a href="#carrosseis" className="js-smooth" data-i18n="nav-carousels">Carrosséis</a></li>
                            <li><a href="#videos" className="js-smooth" data-i18n="nav-videos">Vídeos</a></li>
                            <li><a href="#sobre" className="js-smooth" data-i18n="nav-about">Sobre</a></li>
                            <li><a href="https://wa.me/5563992770792" target="_blank" className="nav-cta" data-i18n="nav-cta" data-magnetic>Fale Comigo</a></li>
                        </ul>
                        <div className="nav-lang-switcher header-lang mobile-only">
                            <button onClick={() => (window as any).changeLanguage?.('pt')} className="lang-btn active" id="btn-pt-mobile">PT</button>
                            <button onClick={() => (window as any).changeLanguage?.('en')} className="lang-btn" id="btn-en-mobile">EN</button>
                        </div>
                        <button className="hamburger" id="hamburger" aria-label="Abrir menu">
                            <span></span><span></span><span></span>
                        </button>
                    </div>
                </nav>
            </header>

            <main>
                <canvas id="bgParticles"></canvas>
                <div id="universe-atmosphere"></div>

                <section id="hero">
                    <div className="hero-orb hero-orb-1"></div>
                    <div className="hero-orb hero-orb-2"></div>
                    <div className="hero-orb hero-orb-3"></div>

                    <div className="hero-top-text" data-reveal>
                        <h1 className="hero-top-title" data-i18n="hero-title">OI, SOU <span className="neon-name">LUCASZÉ</span></h1>
                    </div>

                    <div className="hero-mascot" id="heroMascot" data-reveal>
                        <img src="/assets/branding/cabeca_3d_hero.webp" alt="Mascote 3D" className="mascot-png mascot-mobile" />
                        <div className="mascot-desktop">
                            {/* Desktop layers for eye tracking effect */}
                            <img src="/assets/branding/cabeca_3d_olho_separado/globo_ocular_esquerdo.webp" alt="" className="eye-layer eye-globe-l" />
                            <img src="/assets/branding/cabeca_3d_olho_separado/globo_ocular_direito.webp" alt="" className="eye-layer eye-globe-r" />
                            <img src="/assets/branding/cabeca_3d_olho_separado/pupila_esquerda.webp" alt="" className="eye-layer pupil pupil-l" />
                            <img src="/assets/branding/cabeca_3d_olho_separado/pupila_direita.webp" alt="" className="eye-layer pupil pupil-r" />
                            <img src="/assets/branding/cabeca_3d_olho_separado/cabeca_3d_sem_os_olhos.webp" alt="" className="mascot-png mascot-head" />
                        </div>
                    </div>
                    <div className="mascot-glow"></div>

                    <div className="hero-content">
                        <p className="hero-eyebrow" data-i18n="hero-eyebrow">Designer Estratégico</p>
                        <p className="hero-sub" data-i18n="hero-sub">Designer estratégico focado em transformar percepção em valor.</p>
                        <p className="hero-sub-support" data-i18n="hero-sub-support">Se sua marca parece amadora, você está perdendo vendas todos os dias.</p>
                        <div className="hero-actions">
                            <a href="https://wa.me/5563992770792" target="_blank" className="btn-cta-glass" id="btn-hero-cta" data-magnetic>
                                <span className="btn-cta-inner">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.554 4.104 1.524 5.826L0 24l6.337-1.508A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.001-1.368l-.361-.214-3.741.981.998-3.648-.235-.374A9.817 9.817 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
                                    </svg>
                                    <span data-i18n="hero-cta">Fale comigo</span>
                                </span>
                            </a>
                            <a href="#projetos" className="btn-ghost js-smooth" data-i18n="hero-projects" data-magnetic>Ver Projetos</a>
                        </div>
                    </div>
                </section>

                {/* Dynamic content sections */}
                <section id="processo">
                    <div className="process-header" data-reveal>
                        <span className="section-tag" data-i18n="p-tag-1">01 . Método</span>
                        <h2 data-i18n="p-title-1">Não é execução.<br /><span className="highlight">É estratégia.</span></h2>
                        <p data-i18n="p-sub-1">Cada projeto passa por um processo pensado para transformar percepção em resultado real.</p>
                    </div>
                    <div className="process-nodes" id="processNodes">
                        <div className="node-card active" id="node-1" data-step="1">
                            <div className="node-icon">
                                <svg viewBox="0 0 40 40" fill="none">
                                    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M13 20a7 7 0 1 0 14 0 7 7 0 0 0-14 0z" stroke="currentColor" strokeWidth="1.5" />
                                    <circle cx="20" cy="20" r="2.5" fill="currentColor" />
                                </svg>
                            </div>
                            <div className="node-number">01</div>
                            <h3 data-i18n="n-title-1">Entender</h3>
                            <p data-i18n="n-desc-1">Antes de criar qualquer coisa, mergulho no seu negócio.</p>
                        </div>
                        <div className="node-connector"></div>
                        <div className="node-card" id="node-2" data-step="2">
                            <div className="node-icon">
                                <svg viewBox="0 0 40 40" fill="none">
                                    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M12 14h16M12 20h16M12 26h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div className="node-number">02</div>
                            <h3 data-i18n="n-title-2">Planejar</h3>
                            <p data-i18n="n-desc-2">Definimos a melhor rota para atingir seu objetivo.</p>
                        </div>
                        <div className="node-connector"></div>
                        <div className="node-card" id="node-3" data-step="3">
                            <div className="node-icon">
                                <svg viewBox="0 0 40 40" fill="none">
                                    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M20 12v16M12 20h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div className="node-number">03</div>
                            <h3 data-i18n="n-title-3">Executar</h3>
                            <p data-i18n="n-desc-3">Criação focada em design e estratégia.</p>
                        </div>
                        <div className="node-connector"></div>
                        <div className="node-card" id="node-4" data-step="4">
                            <div className="node-icon">
                                <svg viewBox="0 0 40 40" fill="none">
                                    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M12 20l5 5 11-11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="node-number">04</div>
                            <h3 data-i18n="n-title-4">Entregar</h3>
                            <p data-i18n="n-desc-4">Resultado final pronto para performar.</p>
                        </div>
                    </div>
                </section>

                {/* Rest of the sections migrated with dangerouslySetInnerHTML for fidelity */}
                <div dangerouslySetInnerHTML={{
                    __html: `
          <section id="servicos">
            <div class="section-header" data-reveal>
              <span class="section-tag">02 . O que eu faço</span>
              <h2 data-i18n="s-title">O QUE EU CONSTRUO PARA SUA <span class="highlight">MARCA</span></h2>
              <p data-i18n="s-sub">Não entrego apenas design. Eu desenvolvo estruturas visuais pensadas para aumentar seu valor percebido e facilitar a venda.</p>
            </div>
            <div class="services-grid">
              <div class="service-card" data-reveal="scale">
                <div class="service-icon-box">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                </div>
                <div class="service-content">
                  <h3 data-i18n="s-item-1-t">Identidade visual estratégica</h3>
                  <p data-i18n="s-item-1-d">Sua marca deixa de parecer comum e passa a transmitir autoridade.</p>
                </div>
              </div>
              <div class="service-card" data-reveal="scale">
                <div class="service-icon-box">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                </div>
                <div class="service-content">
                  <h3 data-i18n="s-item-2-t">Criativos para tráfego pago</h3>
                  <p data-i18n="s-item-2-d">Peças pensadas para parar o scroll e gerar clique.</p>
                </div>
              </div>
              <div class="service-card" data-reveal="scale">
                <div class="service-icon-box">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                </div>
                <div class="service-content">
                  <h3 data-i18n="s-item-3-t">Landing pages e páginas de venda</h3>
                  <p data-i18n="s-item-3-d">Estrutura visual focada em conversão, não só estética.</p>
                </div>
              </div>
              <div class="service-card service-card-center" data-reveal="scale">
                <div class="service-icon-box">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                </div>
                <div class="service-content">
                  <h3 data-i18n="s-item-4-t">Conteúdo para redes sociais</h3>
                  <p data-i18n="s-item-4-d">Postagens que constroem presença e despertam interesse.</p>
                </div>
              </div>
              <div class="service-card service-card-center" data-reveal="scale">
                <div class="service-icon-box">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22 8.5 12 15.5 2 8.5"/><polyline points="2 15.5 12 8.5 22 15.5"/><line x1="12" y1="2" x2="12" y2="8.5"/></svg>
                </div>
                <div class="service-content">
                  <h3 data-i18n="s-item-5-t">Estrutura visual de infoprodutos</h3>
                  <p data-i18n="s-item-5-d">Do eBook à apresentação, tudo com aparência profissional e vendável.</p>
                </div>
              </div>
            </div>
          </section>

          <section id="projetos">
            <div class="section-header" data-reveal>
              <span class="section-tag">03 . Projetos</span>
              <h2 data-i18n="p-title-2">Trabalhos que <span class="highlight">Converteram</span></h2>
              <p data-i18n="p-sub-2">Do briefing à entrega, cada projeto pensado com estratégia.</p>
            </div>
            <div class="projects-grid">
              <article class="project-card" data-reveal="left" data-project="lavô">
                <div class="project-media">
                  <img src="/assets/projects/campanha_vem_pra_lavo/sujou_vem_pra_lavo_banner_feed.webp" class="project-img" loading="lazy">
                  <div class="project-overlay"><button class="btn-ghost-sm" onclick="openProjectModal('lavô')" data-i18n="p-btn-view-campaign">Ver Campanha</button></div>
                </div>
                <div class="project-info">
                  <h3 data-i18n="p-name-lavo">Campanha "Vem Pra Lavô"</h3>
                  <p data-i18n="p-desc-lavo">Identidade visual e estratégia para redes sociais.</p>
                  <div class="project-tags"><span>Social Media</span><span>Branding</span><span>Conversão</span></div>
                </div>
              </article>
              <article class="project-card" data-reveal="right" data-project="coxinhas">
                <div class="project-media">
                  <img src="/assets/projects/mais_coxinhas/feed_02_03.webp" class="project-img" loading="lazy">
                  <div class="project-overlay"><button class="btn-ghost-sm" onclick="openProjectModal('coxinhas')" data-i18n="p-btn-view">Ver Projeto</button></div>
                </div>
                <div class="project-info">
                  <h3 data-i18n="p-name-coxinhas">Mais Coxinhas</h3>
                  <p data-i18n="p-desc-coxinhas">Direção de arte e fotografia para food service.</p>
                  <div class="project-tags"><span>Fotografia</span><span>Direção de Arte</span><span>Gastronomia</span></div>
                </div>
              </article>
            </div>
          </section>

          <section id="carrosseis">
            <div class="section-header" data-reveal>
              <span class="section-tag">03 . Carrosséis</span>
              <h2 data-i18n="p-title-3">Conteúdo que <span class="highlight">Prende o Olhar</span></h2>
              <p data-i18n="p-sub-3">Deslize para navegar como no Instagram.</p>
            </div>
            <div class="carousel-showcase">
              <!-- Carousel 1 -->
              <article class="ig-post-wrapper" data-reveal>
                <div class="ig-post-header">
                  <img src="/assets/branding/perfil.webp" class="ig-avatar-img">
                  <div class="ig-meta"><strong>lucaszedesign</strong><small>Estratégia Visual</small></div>
                </div>
                <div class="ig-slider ig-portrait" id="slider-1">
                  <div class="ig-slides" id="slides-1">
                    <img src="/assets/carousels/carrossel_lucasze_vida_de_freela/pag_1_capa.webp">
                    <img src="/assets/carousels/carrossel_lucasze_vida_de_freela/pag_2.webp">
                    <img src="/assets/carousels/carrossel_lucasze_vida_de_freela/pag_3.webp">
                  </div>
                  <button class="ig-arrow ig-prev" onclick="slideIg('slides-1','dots-1',-1)">&#8249;</button>
                  <button class="ig-arrow ig-next" onclick="slideIg('slides-1','dots-1',1)">&#8250;</button>
                  <div class="ig-dots" id="dots-1"></div>
                </div>
                <div class="ig-post-footer"><span class="ig-label">Vida de Freela . Lucaszé</span></div>
              </article>
            </div>
          </section>

          <section id="videos">
            <div class="section-header" data-reveal>
              <span class="section-tag">04 . Vídeos</span>
              <h2 data-i18n="p-title-4">Reels que <span class="highlight">Param o Scroll</span></h2>
              <p data-i18n="p-sub-4">Conteúdo em movimento. Arraste para explorar.</p>
            </div>
            <div class="video-reel-wrapper">
              <div class="video-reel-track">
                <article class="video-reel-card">
                  <video src="/assets/videos/reels_lucaszedesign/posicionamento_lucaszedesign.mp4" muted loop playsinline class="reel-video"></video>
                  <div class="reel-label"><span>Posicionamento</span></div>
                </article>
              </div>
            </div>
          </section>

          <section id="sobre">
            <div class="about-wrapper">
              <div class="about-photo-col" data-reveal="left">
                <div class="about-photo-frame">
                  <img src="/assets/branding/lucas_foto_1_essa_foto_vai_na_parte_sobre_mim_.webp" loading="lazy" />
                </div>
              </div>
              <div class="about-text-col" data-reveal="right">
                <span class="section-tag">09 . Sobre Mim</span>
                <h2 data-i18n="p-title-5">Não sou só designer.<br><span class="highlight">Sou estrategista visual.</span></h2>
                <p class="about-lead">Desde 2019 atuo com design, comunicação e marketing digital.</p>
              </div>
            </div>
          </section>

          <section id="contato">
            <div class="contact-inner" data-reveal>
              <span class="section-tag">10 . Contato</span>
              <h2 class="contact-title">Sua marca parece o valor<br><span class="highlight">que você quer cobrar?</span></h2>
              <div class="contact-actions">
                <a href="https://wa.me/5563992770792" target="_blank" class="btn-cta-glass primary" data-magnetic>
                  <span class="btn-cta-inner">Fale comigo no WhatsApp</span>
                </a>
              </div>
            </div>
          </section>
        ` }} />
            </main>

            <footer id="mainFooter">
                <div className="footer-inner">
                    <img src="/assets/branding/logo_lucasze_com_ze_laranja.webp" alt="Lucaszé Design" className="footer-logo" />
                    <p>© 2025 Lucaszé Design . Estratégia, Percepção e Resultados Digitais.</p>
                </div>
            </footer>

            <div id="projectModal" className="modal-overlay" onClick={(e) => (window as any).closeModal?.(e)}>
                <div className="modal-box">
                    <button className="modal-close" onClick={() => {
                        const modal = document.getElementById('projectModal');
                        if (modal) modal.classList.remove('active');
                        document.body.style.overflow = '';
                    }}>✕</button>
                    <div className="modal-slides-wrapper" id="modalContent"></div>
                </div>
            </div>

            <Script src="/portfolio-script.js" strategy="afterInteractive" />
        </>
    );
}
