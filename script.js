// =============================================
// LUCASZÉ DESIGN — v3.1 SCRIPTS
// =============================================

/* ---- NAVBAR SCROLL & HERO REVEAL ---- */
const navbar = document.getElementById('navbar');
const heroContent = document.querySelector('.hero-content');

function handleScrollEffects() {
  const scrollY = window.scrollY;
  // Navbar bg
  if (navbar) navbar.classList.toggle('scrolled', scrollY > 40);

  // Hero gradual reveal (Desktop only)
  if (heroContent && window.innerWidth > 768) {
    if (scrollY > 40) {
      heroContent.classList.add('revealed-scroll');
    }
  }
}

window.addEventListener('scroll', handleScrollEffects, { passive: true });
// Run on load in case page starts scrolled
handleScrollEffects();

/* ---- SMOOTH SCROLL — compensado para a navbar fixa ---- */
function smoothScrollTo(targetEl) {
  if (!targetEl) return;
  const navH = navbar ? navbar.offsetHeight : 70;
  const top = targetEl.getBoundingClientRect().top + window.scrollY - navH - 12;
  window.scrollTo({ top, behavior: 'smooth' });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    smoothScrollTo(target);
  });
});

/* ---- HAMBURGER ---- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
}
document.querySelectorAll('.nav-links a').forEach(l =>
  l.addEventListener('click', () => navLinks.classList.remove('open'))
);

/* ---- SCROLL REVEAL ---- */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = [...entry.target.parentElement.querySelectorAll('[data-reveal]')];
    const idx = siblings.indexOf(entry.target);
    setTimeout(() => entry.target.classList.add('revealed'), idx * 90);
    revealObs.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));

/* ---- FAQ ACCORDION ---- */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
    if (!isActive) item.classList.add('active');
  });
});

/* ---- MARQUEE INFINITO COM INÉRCIA (Reutilizável v4.0) ---- */
function initHorizontalMarquee(wrapperSelector, trackSelector, autoSpeed = 0.6) {
  const wrapper = document.querySelector(wrapperSelector);
  const track = document.querySelector(trackSelector);
  if (!wrapper || !track) return;

  let currentX = 0;
  let isDragging = false;
  let startX = 0;
  let velocity = 0;
  let lastX = 0;
  let rafId = null;

  // Largura de um set de itens para o loop
  let totalWidth = track.scrollWidth / 2;
  window.addEventListener('resize', () => { totalWidth = track.scrollWidth / 2; });

  function update() {
    if (!isDragging) {
      if (Math.abs(velocity) > 0.1) {
        currentX += velocity;
        velocity *= 0.95;
      } else {
        currentX += autoSpeed;
      }

      // Loop infinito
      if (currentX > 0) {
        currentX = -totalWidth;
      } else if (currentX < -totalWidth) {
        currentX = 0;
      }
    }

    track.style.transform = `translateX(${currentX}px)`;
    rafId = requestAnimationFrame(update);
  }

  function onStart(e) {
    if (e.target.closest('a, button')) return;
    isDragging = true;
    startX = (e.clientX || e.pageX) - currentX;
    velocity = 0;
    lastX = e.clientX || e.pageX;
    wrapper.setPointerCapture(e.pointerId);
  }

  function onMove(e) {
    if (!isDragging) return;
    const x = e.clientX || e.pageX;
    currentX = x - startX;

    velocity = x - lastX;
    lastX = x;

    // Ajuste de loop imediato durante o drag
    if (currentX > 0) {
      currentX -= totalWidth;
      startX += totalWidth;
    } else if (currentX < -totalWidth) {
      currentX += totalWidth;
      startX -= totalWidth;
    }
  }

  function onEnd(e) {
    isDragging = false;
    wrapper.releasePointerCapture(e.pointerId);
  }

  wrapper.addEventListener('pointerdown', onStart);
  wrapper.addEventListener('pointermove', onMove);
  wrapper.addEventListener('pointerup', onEnd);
  wrapper.addEventListener('pointercancel', onEnd);

  update();
}

// Inicializa os carrosséis
initHorizontalMarquee('.clones-carousel-wrapper', '.clones-carousel', 0.6);
initHorizontalMarquee('.proof-carousel-wrapper', '.proof-carousel', 0.4);


/* ---- BENEFIT TOGGLE — Seleção estilo checkbox (v4.0) ---- */
function toggleBenefit(el) {
  el.classList.toggle('active');
}

/* ---- HEART BURST animation when clicking like button on BA section ---- */
function triggerHeartBurst(btn) {
  const colors = ['var(--primary-orange)', '#fff', '#FC4F00', '#ffaa66'];
  for (let i = 0; i < 7; i++) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = '♥';
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    const hx = (Math.random() - 0.5) * 60;
    heart.style.setProperty('--hx', hx + 'px');
    heart.style.left = (Math.random() * 30 - 10) + 'px';
    heart.style.top = '0';
    heart.style.animationDelay = (i * 0.09) + 's';
    btn.appendChild(heart);
    setTimeout(() => heart.remove(), 1500);
  }
}


/* ============================================================
   GLOBAL PARTICLE SYSTEM — constelações por todo o site
   ============================================================ */
(function initParticles() {
  console.log("Iniciando Sistema de Partículas v2.0...");
  const canvas = document.getElementById('bgParticles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, mouse = { x: -999, y: -999 };
  const PARTICLE_COUNT = 45;
  const particles = [];
  const asteroids = [];
  const effects = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Track mouse relative to entire viewport
  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });
  window.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });

  // Particle class
  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.ox = this.x; // origin x
      this.oy = this.y; // origin y
      this.size = Math.random() * 2 + 0.5;
      this.alpha = Math.random() * 0.7 + 0.2;
      this.color = Math.random() < 0.1 ? '#FC4F00' : '#ffffff'; /* Reduzido de 0.3 para 0.1 */
      this.speed = Math.random() * 0.15 + 0.05;
      this.angle = Math.random() * Math.PI * 2;
      this.drift = (Math.random() - 0.5) * 0.005;
    }
    update() {
      // Slow drift animation
      this.angle += this.drift;
      const isMobile = window.innerWidth < 768;
      const speedFactor = isMobile ? 0.15 : 1; // Flutuação super gentil no mobile (15% da veloc original)
      const driftX = Math.cos(this.angle) * this.speed * speedFactor;
      const driftY = Math.sin(this.angle) * this.speed * speedFactor;

      // Mouse repulsion: particles flee from cursor
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Desliga repulsão no mobile porque o "touch" salva as coords do dedo e fica metralhando as bolinhas
      const repulseRadius = isMobile ? 0 : 90;

      if (dist < repulseRadius && !isMobile) {
        const force = (repulseRadius - dist) / repulseRadius;
        this.x += (dx / dist) * force * 3.5;
        this.y += (dy / dist) * force * 3.5;
      } else {
        // Return to origin gently
        this.x += (this.ox - this.x) * 0.015 + driftX;
        this.y += (this.oy - this.y) * 0.015 + driftY;
      }

      // Wrap edges e atualiza a origem elástica pra não atirar as bolinhas feito elástico ao fazer resize de tela mobile
      if (this.x < 0) { this.x = W; this.ox = W; }
      if (this.x > W) { this.x = 0; this.ox = 0; }
      if (this.y < 0) { this.y = H; this.oy = H; }
      if (this.y > H) { this.y = 0; this.oy = 0; }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
    }
  }

  // Asteroid class
  class Asteroid {
    constructor(fx, fy, fvx, fvy, fsz) {
      if (fx !== undefined) {
        this.x = fx; this.y = fy;
        this.vx = fvx; this.vy = fvy;
        this.size = fsz;
        this.angle = 0;
        this.spin = (Math.random() - 0.5) * 0.04;
        this.points = [];
        const numPoints = 8 + Math.floor(Math.random() * 4);
        for (let i = 0; i < numPoints; i++) {
          const a = (i / numPoints) * Math.PI * 2;
          const r = this.size * (0.8 + Math.random() * 0.4);
          this.points.push({ x: Math.cos(a) * r, y: Math.sin(a) * r });
        }
      } else {
        this.reset();
      }
    }
    reset() {
      const side = Math.floor(Math.random() * 4);
      if (side === 0) { // Top
        this.x = Math.random() * W; this.y = -50;
        this.vx = (Math.random() - 0.5) * 2; this.vy = Math.random() * 1.5 + 1;
      } else if (side === 1) { // Right
        this.x = W + 50; this.y = Math.random() * H;
        this.vx = -(Math.random() * 1.5 + 1); this.vy = (Math.random() - 0.5) * 2;
      } else if (side === 2) { // Bottom
        this.x = Math.random() * W; this.y = H + 50;
        this.vx = (Math.random() - 0.5) * 2; this.vy = -(Math.random() * 1.5 + 1);
      } else { // Left
        this.x = -50; this.y = Math.random() * H;
        this.vx = Math.random() * 1.5 + 1; this.vy = (Math.random() - 0.5) * 2;
      }
      this.size = Math.random() * 10 + 4;
      this.angle = 0;
      this.spin = (Math.random() - 0.5) * 0.03;
      this.points = [];
      const numPoints = 6 + Math.floor(Math.random() * 4);
      for (let i = 0; i < numPoints; i++) {
        const a = (i / numPoints) * Math.PI * 2;
        const r = this.size * (0.8 + Math.random() * 0.4);
        this.points.push({ x: Math.cos(a) * r, y: Math.sin(a) * r });
      }
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.angle += this.spin;
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.beginPath();
      ctx.moveTo(this.points[0].x, this.points[0].y);
      for (let i = 1; i < this.points.length; i++) {
        ctx.lineTo(this.points[i].x, this.points[i].y);
      }
      ctx.closePath();
      ctx.fillStyle = '#222';
      ctx.strokeStyle = '#444';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(0,0,0,1)';
      ctx.filter = 'blur(0.4px)';
      ctx.fill();
      ctx.restore();
    }
    isOffScreen() {
      return this.x < -150 || this.x > W + 150 || this.y < -150 || this.y > H + 150;
    }
  }

  // Collision Effect class (Upgraded for "Impactful" feel)
  class Effect {
    constructor(x, y, isInitial = false) {
      if (isInitial) console.log("Evento Inicial: Ponto de Impacto!");
      this.x = x; this.y = y;
      this.life = 1.0;
      this.decay = isInitial ? 0.015 : 0.03;
      this.particles = [];
      const count = isInitial ? 20 : 10;
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = Math.random() * (isInitial ? 4 : 2) + 0.5;
        this.particles.push({
          x: 0, y: 0,
          vx: Math.cos(a) * s, vy: Math.sin(a) * s,
          size: Math.random() * (isInitial ? 2.5 : 1.5) + 0.5
        });
      }
    }
    update() {
      this.life -= this.decay;
      this.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
      });
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      // Flash sutil mas perceptível
      if (this.life > 0.7) {
        ctx.beginPath();
        const flashSize = 45 * (1 - (1 - this.life) * 3);
        ctx.arc(0, 0, Math.max(0, flashSize), 0, Math.PI * 2);
        ctx.fillStyle = Math.random() > 0.4 ? '#FC4F00' : '#ffffff';
        ctx.globalAlpha = (this.life - 0.7) * 3;
        ctx.fill();
      }
      // Detritos
      ctx.globalAlpha = this.life;
      this.particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = '#FC4F00';
        ctx.fill();
      });
      ctx.restore();
    }
  }

  const MAX_DIST = 90;
  function drawConnections() {
    ctx.lineWidth = 0.4;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          ctx.globalAlpha = (1 - d / MAX_DIST) * 0.08;
          ctx.strokeStyle = '#FC4F00';
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  // Init particles
  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

  // Initial Sequence & Collision Recurrence Manager
  let initialSequenceStage = 0;
  let initialTimer = 0;
  let nextCollisionTimer = Math.random() * (7200 - 3000) + 3000; // 50s a 120s (60fps)

  function triggerScheduledCollision() {
    console.log("Evento Agendado: Iniciando Sequência de Colisão...");
    const isHorizontal = Math.random() > 0.5;
    if (isHorizontal) {
      console.log("Evento Agendado: Asteroide 1 (Spawn)");
      const yBase = Math.random() * (H * 0.6) + H * 0.2;
      asteroids.push(new Asteroid(-100, yBase, 5, 0.5, 12));
      setTimeout(() => {
        console.log("Evento Agendado: Asteroide 2 (Spawn)");
        asteroids.push(new Asteroid(W + 100, yBase + 20, -5.2, -0.6, 12));
      }, 800);
    } else {
      console.log("Evento Agendado: Asteroide 1 (Spawn)");
      const xBase = Math.random() * (W * 0.6) + W * 0.2;
      asteroids.push(new Asteroid(xBase, -100, 0.5, 5, 12));
      setTimeout(() => {
        console.log("Evento Agendado: Asteroide 2 (Spawn)");
        asteroids.push(new Asteroid(xBase + 20, H + 100, -0.6, -5.2, 12));
      }, 800);
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    initialTimer++;

    // Lógica do Momento Wow Inicial
    if (initialSequenceStage === 0 && initialTimer > 60) { // ~1s
      console.log("Evento Inicial: Asteroide 1 (Spawn)");
      asteroids.push(new Asteroid(-100, H * 0.4, 5.5, 1.2, 14));
      initialSequenceStage = 1;
    } else if (initialSequenceStage === 1 && initialTimer > 90) { // ~1.5s
      console.log("Evento Inicial: Asteroide 2 (Spawn)");
      asteroids.push(new Asteroid(W + 100, H * 0.6, -5.5, -1.2, 14));
      initialSequenceStage = 2;
    }

    // Colisões Recorrentes (50s a 120s)
    if (initialSequenceStage === 2) {
      nextCollisionTimer--;
      if (nextCollisionTimer <= 0) {
        triggerScheduledCollision();
        nextCollisionTimer = Math.random() * (7200 - 3000) + 3000;
      }

      // Spawn extra raro (aleatório)
      if (asteroids.length < 3 && Math.random() < 0.003) {
        asteroids.push(new Asteroid());
      }
    }

    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });

    // Colisões
    for (let i = 0; i < asteroids.length; i++) {
      for (let j = i + 1; j < asteroids.length; j++) {
        const a1 = asteroids[i];
        const a2 = asteroids[j];
        const dx = a1.x - a2.x;
        const dy = a1.y - a2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < a1.size + a2.size) {
          const isInitialCollision = (initialSequenceStage === 2 && initialTimer < 240);
          effects.push(new Effect((a1.x + a2.x) / 2, (a1.y + a2.y) / 2, isInitialCollision));
          asteroids.splice(j, 1);
          asteroids.splice(i, 1);
          i--; break;
        }
      }
    }

    for (let i = asteroids.length - 1; i >= 0; i--) {
      asteroids[i].update();
      asteroids[i].draw();
      if (asteroids[i].isOffScreen()) asteroids.splice(i, 1);
    }

    for (let i = effects.length - 1; i >= 0; i--) {
      effects[i].update();
      effects[i].draw();
      if (effects[i].life <= 0) effects.splice(i, 1);
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ---- MASCOT PARALLAX ---- */
const mascot = document.getElementById('heroMascot');
let baseFloat = 0;
document.getElementById('hero')?.addEventListener('mousemove', e => {
  if (!mascot) return;
  const rect = document.getElementById('hero').getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const xOff = (mouseX / rect.width - 0.5) * 22;
  const yOff = (mouseY / rect.height - 0.5) * 12;

  // Cabeça mascote (Parallax suave)
  mascot.style.transform = `rotate(${xOff * 0.12}deg) translate(${xOff * 0.6}px, ${yOff * 0.6}px)`;

  // Ícones flutuantes (Parallax + Repulsão Individual)
  const icons = document.querySelectorAll('.float-icon');
  icons.forEach((icon, i) => {
    const iconRect = icon.getBoundingClientRect();
    const iconX = (iconRect.left + iconRect.width / 2) - rect.left;
    const iconY = (iconRect.top + iconRect.height / 2) - rect.top;

    const dx = iconX - mouseX;
    const dy = iconY - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    let repulseX = 0, repulseY = 0;
    const threshold = 180;
    if (dist < threshold) {
      const force = (threshold - dist) / threshold;
      repulseX = (dx / dist) * force * 50; // Força de fuga
      repulseY = (dy / dist) * force * 50;
    }

    const parallaxFactor = 1.5 + (i * 0.5);
    const finalX = (xOff * parallaxFactor) + repulseX;
    const finalY = (yOff * parallaxFactor) + repulseY;

    icon.style.setProperty('--px', `${finalX}px`);
    icon.style.setProperty('--py', `${finalY}px`);
  });

  // Repulsão nos Foguetinhos de fundo
  document.querySelectorAll('.flying-rocket').forEach(rocket => {
    const rRect = rocket.getBoundingClientRect();
    const rX = (rRect.left + rRect.width / 2) - rect.left;
    const rY = (rRect.top + rRect.height / 2) - rect.top;
    const dx = rX - mouseX;
    const dy = rY - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 150) {
      const force = (150 - dist) / 150;
      rocket.style.marginLeft = `${(dx / dist) * force * 40}px`;
      rocket.style.marginTop = `${(dy / dist) * force * 40}px`;
    } else {
      rocket.style.marginLeft = '0';
      rocket.style.marginTop = '0';
    }
  });

}, { passive: true });
document.getElementById('hero')?.addEventListener('mouseleave', () => {
  if (mascot) {
    mascot.style.transform = '';
    document.querySelectorAll('.float-icon').forEach(icon => {
      icon.style.setProperty('--px', '0px');
      icon.style.setProperty('--py', '0px');
    });
  }
});

/* ============================================================
   PROCESS NODES — desbloqueio APENAS no hover sequencial
   ============================================================ */
let maxUnlocked = 1; // começa no node 1 ativo

function unlockNode(step) {
  const card = document.getElementById(`node-${step}`);
  if (!card) return;
  card.classList.remove('locked');

  if (step === 1) {
    card.classList.add('active');
  } else {
    card.classList.add('unlocked');
    card.classList.add('active'); // visível + laranja
  }

  // Animate connector
  if (step > 1) {
    const path = document.getElementById(`path-${step - 1}-${step}`);
    const energy = document.getElementById(`energy-${step - 1}-${step}`);
    if (path) {
      path.style.strokeDashoffset = '0';
      if (energy) {
        energy.style.opacity = '1';
        let pos = 0;
        const anim = setInterval(() => {
          pos += 2;
          energy.style.left = `${pos}%`;
          if (pos >= 100) { clearInterval(anim); energy.style.opacity = '0'; }
        }, 8);
      }
    }
  }
}

// Iniciar com node 1 visível
unlockNode(1);

// Hover só ativa o PRÓXIMO node se ainda não foi ativado
[1, 2, 3].forEach(step => {
  const card = document.getElementById(`node-${step}`);
  if (!card) return;
  card.addEventListener('mouseenter', () => {
    if (maxUnlocked < step + 1) {
      maxUnlocked = step + 1;
      unlockNode(step + 1);
    }
  });
});

/* ---- INSTAGRAM SLIDERS ---- */
const sliderStates = {};

function initSlider(slidesId, dotsId) {
  const slides = document.getElementById(slidesId);
  if (!slides) return;
  const count = slides.children.length;
  sliderStates[slidesId] = { current: 0, total: count };

  const dotsEl = document.getElementById(dotsId);
  if (dotsEl) {
    dotsEl.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(slidesId, dotsId, i));
      dotsEl.appendChild(dot);
    }
  }

  // Swipe inteligente v2.0 com Pointer Events
  let isDown = false;
  let startX = 0;
  let startY = 0; // To detect vertical vs horizontal drag
  const sliderEl = slides.parentElement;
  sliderEl.style.touchAction = 'pan-y'; // Allow vertical scrolling, prevent horizontal browser scroll

  sliderEl.addEventListener('pointerdown', e => {
    // Ignore if clicking on interactive elements within the slider
    if (e.target.closest('button, a, input, textarea, [data-interactive]')) return;
    isDown = true;
    startX = e.clientX;
    startY = e.clientY;
    sliderEl.setPointerCapture(e.pointerId);
    sliderEl.style.cursor = 'grabbing';
  });

  sliderEl.addEventListener('pointermove', e => {
    if (!isDown) return;
    e.preventDefault(); // Prevent text selection and default horizontal scroll
    const diffX = startX - e.clientX;
    const diffY = startY - e.clientY;

    // If movement is predominantly horizontal, prevent vertical scroll
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) { // Add a small threshold
      sliderEl.style.touchAction = 'none'; // Temporarily disable all touch actions
    } else {
      sliderEl.style.touchAction = 'pan-y'; // Re-enable vertical pan if not horizontal drag
    }
  });

  sliderEl.addEventListener('pointerup', e => {
    if (!isDown) return;
    isDown = false;
    const diff = startX - e.clientX;
    if (Math.abs(diff) > 50) { // Threshold for a swipe
      slideIg(slidesId, dotsId, diff > 0 ? 1 : -1);
    }
    sliderEl.releasePointerCapture(e.pointerId);
    sliderEl.style.cursor = 'grab';
    sliderEl.style.touchAction = 'pan-y'; // Reset touch-action
  });

  sliderEl.addEventListener('pointercancel', () => {
    isDown = false;
    sliderEl.style.cursor = 'grab';
    sliderEl.style.touchAction = 'pan-y'; // Reset touch-action
  });
}

function goToSlide(slidesId, dotsId, index) {
  const slides = document.getElementById(slidesId);
  const state = sliderStates[slidesId];
  if (!slides || !state) return;
  state.current = Math.max(0, Math.min(index, state.total - 1));
  slides.style.transform = `translateX(-${state.current * 100}%)`;
  const dots = document.getElementById(dotsId);
  if (dots) dots.querySelectorAll('span').forEach((d, i) => d.classList.toggle('active', i === state.current));
}

function slideIg(slidesId, dotsId, dir) {
  const state = sliderStates[slidesId];
  if (!state) return;
  let next = state.current + dir;
  if (next < 0) next = state.total - 1;
  if (next >= state.total) next = 0;
  goToSlide(slidesId, dotsId, next);
}

['slides-1', 'slides-2', 'slides-3'].forEach((id, i) => initSlider(id, `dots-${i + 1}`));

/* ---- VIDEO DRAG SCROLL ---- */
const videoWrapper = document.getElementById('videoWrapper');
if (videoWrapper) {
  let isDown = false, startX = 0, scrollLeft = 0;
  videoWrapper.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - videoWrapper.offsetLeft;
    scrollLeft = videoWrapper.scrollLeft;
  });
  ['mouseleave', 'mouseup'].forEach(ev => videoWrapper.addEventListener(ev, () => isDown = false));
  videoWrapper.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    videoWrapper.scrollLeft = scrollLeft - (e.pageX - videoWrapper.offsetLeft - startX) * 1.3;
  });
}

/* ---- PLAY/PAUSE E AUTO-BOOT DE VOLUME ---- */
document.querySelectorAll('.video-reel-card').forEach(card => {
  const video = card.querySelector('.reel-video');
  if (!video) return;

  const vSlider = card.querySelector('.reel-volume');
  const aBtn = card.querySelector('.reel-audio-btn');

  if (vSlider) {
    vSlider.value = "0.5";
    video.volume = 0.5;
  }

  // Garante que o clique seja instantâneo no mobile
  if (aBtn) {
    ['click', 'touchstart'].forEach(evt => {
      aBtn.addEventListener(evt, (e) => {
        e.stopPropagation();
        if (evt === 'touchstart') e.preventDefault();
        toggleAudio(video.id, aBtn);
      }, { passive: false });
    });
  }

  // Listener para o Slider de Volume (input resolve o problema de 'não regular')
  if (vSlider) {
    ['input', 'touchstart', 'mousedown'].forEach(evt => {
      vSlider.addEventListener(evt, (e) => {
        e.stopPropagation(); // Impede o carrossel de 'roubar' o toque
        setVolume(video.id, vSlider.value);
      }, { passive: true });
    });
  }

  card.addEventListener('mouseenter', () => video.play().catch(() => { }));
  card.addEventListener('mouseleave', () => video.pause());
});

/* ---- AUDIO TOGGLE ---- */
function toggleAudio(videoId, btn) {
  const vid = document.getElementById(videoId);
  if (!vid) return;

  const isMutingNow = !vid.muted;

  if (!isMutingNow) {
    // DESMUTAR: Ordem crítica para Mobile (Volume -> Muted -> Play)
    // Força 50% AGRESSIVO para o usuário (conforme solicitado)
    vid.volume = 0.5;
    vid.muted = false;
    vid.play().catch(() => {
      vid.muted = false;
      vid.volume = 0.5;
      vid.play();
    });
  } else {
    // MUTAR
    vid.muted = true;
  }

  const iconMuted = btn.querySelector('.icon-muted');
  const iconSound = btn.querySelector('.icon-sound');
  const volSlider = btn.parentElement.querySelector('.reel-volume');
  const controlsGroup = btn.parentElement;

  if (!vid.muted) {
    if (iconMuted) iconMuted.style.display = 'none';
    if (iconSound) iconSound.style.display = 'block';
    if (volSlider && vid.volume > 0) volSlider.value = vid.volume;

    // Deixa os controles fixos ao dar play para o usuário ver o volume
    controlsGroup.classList.add('is-active');
    btn.style.background = 'rgba(255,107,0,0.8)';
  } else {
    if (iconMuted) iconMuted.style.display = 'block';
    if (iconSound) iconSound.style.display = 'none';

    controlsGroup.classList.remove('is-active');
    btn.style.background = '';
  }
}

function setVolume(videoId, val) {
  const vid = document.getElementById(videoId);
  if (!vid) return;

  const volume = parseFloat(val);
  vid.volume = volume;

  // Sincroniza o slider visual se ele existir
  const vSlider = document.querySelector(`.video-reel-card video[id="${videoId}"]`)?.parentElement.querySelector('.reel-volume');
  if (vSlider) vSlider.value = volume;

  // Sincroniza estado de Muted
  if (volume > 0) {
    if (vid.muted) vid.muted = false;
  } else {
    vid.muted = true;
  }

  // Atualiza ícones se o volume mudar via slider
  const card = vid.closest('.video-reel-card');
  if (card) {
    const btn = card.querySelector('.reel-audio-btn');
    if (btn) {
      const iconMuted = btn.querySelector('.icon-muted');
      const iconSound = btn.querySelector('.icon-sound');
      if (vid.muted) {
        iconMuted.style.display = 'block';
        iconSound.style.display = 'none';
      } else {
        iconMuted.style.display = 'none';
        iconSound.style.display = 'block';
      }
    }
  }
}

/* ---- MODAL ---- */
const projectData = {
  'lavô': [
    'assets/projects/campanha_vem_pra_lavo/sujou_vem_pra_lavo_banner_feed.webp',
    'assets/projects/campanha_vem_pra_lavo/sujou_vem_pra_lavo_feed.webp',
    'assets/projects/campanha_vem_pra_lavo/sujou_em_pra_lavo_cesto_feed.webp',
    'assets/projects/campanha_vem_pra_lavo/banner_9x3.webp',
  ],
  'coxinhas': [
    'assets/projects/mais_coxinhas/feed_02_03.webp',
    'assets/projects/mais_coxinhas/foto_angular.webp',
    'assets/projects/mais_coxinhas/fotografia_18_02.webp',
    'assets/projects/mais_coxinhas/imagem_completa.webp',
  ]
};

function openProjectModal(key) {
  const modal = document.getElementById('projectModal');
  const content = document.getElementById('modalContent');
  const imgs = projectData[key];
  if (!imgs || !content) return;
  content.innerHTML = imgs.map(src => `<img src="${src}" alt="Projeto" loading="lazy" />`).join('');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  const modal = document.getElementById('projectModal');
  if (e.target === modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.getElementById('projectModal')?.classList.remove('active');
    document.body.style.overflow = '';
  }
});

/* ---- LIKE BUTTON & HEARTS ANIMATION ---- */
function likePost(e) {
  const btn = e.currentTarget;
  btn.classList.add('liked'); // Uma vez curtido, sempre curtido

  // Sempre solta os coraçõezinhos para manter a dopamina
  createHearts(e.clientX, e.clientY);

  // Reinicia a animação de "pulso" do svg se clicar várias vezes seguidas
  const svg = btn.querySelector('svg');
  if (svg) {
    svg.style.animation = 'none';
    svg.offsetHeight; // Força re-render (reflow)
    svg.style.animation = 'heartbeat 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  }
}

function createHearts(x, y) {
  const numHearts = 6;
  for (let i = 0; i < numHearts; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.innerHTML = `<svg viewBox="0 0 24 24" style="width:100%;height:100%;"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
      heart.className = 'flying-heart';

      // Cores: laranja ou branco
      heart.style.color = Math.random() > 0.5 ? '#FC4F00' : '#ffffff';

      // Starting position (near the mouse click)
      const startX = x - 20 + (Math.random() - 0.5) * 40;
      const startY = y - 20 + (Math.random() - 0.5) * 40;
      heart.style.left = `${startX}px`;
      heart.style.top = `${startY}px`;

      // Random rotation and size
      const rot = (Math.random() - 0.5) * 60;
      heart.style.setProperty('--rot', `${rot}deg`);

      const scale = Math.random() * 0.5 + 0.5; // 0.5 to 1.0
      heart.style.transform = `scale(${scale})`;

      document.body.appendChild(heart);

      // Remove after animation (1.2s)
      setTimeout(() => heart.remove(), 1200);
    }, i * 80); // Staggering
  }
}


/* ---- ISOLAR DRAG DO VOLUME REELS ---- */
document.querySelectorAll('.reel-volume').forEach(slider => {
  slider.addEventListener('mousedown', e => e.stopPropagation());
  slider.addEventListener('touchstart', e => e.stopPropagation());
  slider.addEventListener('mousemove', e => e.stopPropagation());
  slider.addEventListener('touchmove', e => e.stopPropagation());

  // Efeito UX sutil de segurar bolinha
  slider.addEventListener('mousedown', () => slider.style.cursor = 'grabbing');
  slider.addEventListener('mouseup', () => slider.style.cursor = 'grab');
});

/* ---- PARALLAX 3D DESKTOP OLHOS ---- */
document.addEventListener('mousemove', (e) => {
  if (window.innerWidth < 768) return; // Desativa no Mobile

  const pupils = document.querySelectorAll('.pupil');
  const head = document.querySelector('.mascot-desktop');
  if (pupils.length === 0 || !head) return;

  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // Utilizar o rosto intocado como centro âncora fixo pra não gerar bug fantasma do Offset de Translates
  const headRect = head.getBoundingClientRect();
  const cx = headRect.left + headRect.width / 2;
  const cy = headRect.top + headRect.height / 2;

  const dx = mouseX - cx;
  const dy = mouseY - cy;

  const angle = Math.atan2(dy, dx);
  const maxRadius = 14; /* Limite máximo em pixels do branco do olho */

  const distance = Math.sqrt(dx * dx + dy * dy);
  let ratio = distance / 350; // Quão longe vc quer q o cursor chegue pra ele virar full a pupila (350px é boa)
  if (ratio > 1) ratio = 1;

  const moveX = Math.cos(angle) * maxRadius * ratio;
  const moveY = Math.sin(angle) * maxRadius * ratio;

  pupils.forEach(pupil => {
    pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  const floatIcons = document.querySelectorAll('.float-icon');
  floatIcons.forEach((icon) => {
    // Utilizando Event Loop Local para causar repulsão magnética de Bounding Box idêntica às partículas de fundo
    const iRect = icon.getBoundingClientRect();
    const ix = iRect.left + iRect.width / 2;
    const iy = iRect.top + iRect.height / 2;

    const mx = mouseX - ix;
    const my = mouseY - iy;
    const mDist = Math.sqrt(mx * mx + my * my);

    let pushX = 0;
    let pushY = 0;

    // Se o mouse chegar num raio de 180 pixels, o ícone começa a "fugir" sutilmente, preservando o lugar dele quando sair de perto
    if (mDist < 180) {
      const force = (180 - mDist) / 180;
      pushX = -mx * force * 0.35;
      pushY = -my * force * 0.35;
    }

    const rot = icon.getAttribute('data-rot') || 0;
    icon.style.transform = `translate(${pushX}px, ${pushY}px) rotate(${rot}deg)`;
  });
});


/* ============================================================
   UNIVERSE ATMOSPHERE — Estrelas e Foguetes
   ============================================================ */
function initAtmosphere() {
  const container = document.getElementById('universe-atmosphere');
  if (!container) return;

  function spawnShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';

    const top = Math.random() * 70 + '%';
    const left = Math.random() * 40 + 60 + '%';

    // Trajetórias variadas mas consistentes (Sempre para baixo/esquerda)
    const tx_val = -(Math.random() * 400 + 800);
    const ty_val = (Math.random() * 300 + 400);
    const angle = Math.atan2(ty_val, tx_val) * (180 / Math.PI);

    const tx = tx_val + 'px';
    const ty = ty_val + 'px';
    const rot = angle + 'deg';
    const dur = (Math.random() * 0.3 + 0.5) + 's';

    star.style.setProperty('--top', top);
    star.style.setProperty('--left', left);
    star.style.setProperty('--rot', rot);
    star.style.setProperty('--dur', dur);
    star.style.setProperty('--tx', tx);
    star.style.setProperty('--ty', ty);

    container.appendChild(star);
    setTimeout(() => star.remove(), 1200);
  }

  function spawnRocket() {
    const rocket = document.createElement('div');
    rocket.className = 'flying-rocket';
    rocket.innerHTML = '🚀';

    const direction = Math.random();
    let top, left, tx_val, ty_val, rot;

    if (direction < 0.33) { // Horizontal (Esq -> Dir)
      top = Math.random() * 60 + 20 + '%';
      left = '-100px';
      tx_val = window.innerWidth + 200;
      ty_val = (Math.random() - 0.5) * 300;
    } else if (direction < 0.66) { // Vertical (Baixo -> Cima)
      top = '110%';
      left = Math.random() * 80 + 10 + '%';
      tx_val = (Math.random() - 0.5) * 300;
      ty_val = -(window.innerHeight + 200);
    } else { // Diagonal (Cima/Dir -> Baixo/Esq)
      top = '-100px';
      left = Math.random() * 50 + 50 + '%';
      tx_val = -(window.innerWidth + 200);
      ty_val = window.innerHeight + 200;
    }

    const angle = Math.atan2(ty_val, tx_val) * (180 / Math.PI);
    // Emoji 🚀 aponta naturalmente ~45deg para cima-direita (-45° em tela). 
    // Para apontar para 'angle', rotacionamos por angle + 45.
    rot = (angle + 45) + 'deg';

    const dur = (Math.random() * 4.2 + 6.8) + 's'; // Reduzido mais 5% (~15% total de aceleração)

    rocket.style.setProperty('--top', top);
    rocket.style.setProperty('--left', left);
    rocket.style.setProperty('--rot', rot);
    rocket.style.setProperty('--dur', dur);
    rocket.style.setProperty('--tx', tx_val + 'px');
    rocket.style.setProperty('--ty', ty_val + 'px');

    container.appendChild(rocket);
    setTimeout(() => rocket.remove(), 15000);
  }

  function scheduleNextStar() {
    setTimeout(() => {
      spawnShootingStar();
      scheduleNextStar();
    }, Math.random() * 3000 + 2000); // 2-5 segundos (mais frequente)
  }

  function scheduleNextRocket() {
    setTimeout(() => {
      spawnRocket();
      scheduleNextRocket();
    }, Math.random() * 10000 + 10000); // 10-20 segundos
  }

  scheduleNextStar();
  scheduleNextRocket();
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initAtmosphere);
// Caso o DOM já tenha carregado (devido ao carregamento do script no fim do body)
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initAtmosphere();
}

// ==================== MULTILINGUAL SYSTEM (i18n) ====================
const translations = {
  pt: {
    "site-title": "Lucaszé — Design que Vende | Design Estratégico & Branding",
    "meta-desc": "Lucaszé Design | Design estratégico com foco em percepção e resultado. Especialista em Branding, Social Media e Design de Conversão.",
    "meta-og-title": "Lucaszé — Design que Vende",
    "meta-og-desc": "Transformando marcas em negócios através de design estratégico e percepção de valor.",

    "nav-logo-aria": "Ir para o topo - Lucaszé Design",
    "nav-logo-alt": "Logotipo Lucaszé Design - Especialista em Design Estratégico",
    "nav-hamburger-aria": "Abrir menu de navegação",
    "nav-projects": "Projetos",
    "nav-carousels": "Carrosséis",
    "nav-videos": "Vídeos",
    "nav-about": "Sobre",
    "nav-cta": "Fale Comigo",

    "hero-title": "OI, SOU <span class='neon-name'>LUCASZÉ</span>",
    "hero-eyebrow": "Designer Estratégico",
    "hero-sub": "Designer estratégico focado em transformar percepção em valor.",
    "hero-sub-support": "Se sua marca parece amadora, você está perdendo vendas todos os dias.",
    "hero-cta": "Fale comigo",
    "hero-projects": "Ver Projetos",

    "p-tag-1": "01 . Método",
    "p-title-1": "Não é execução.<br><span class='highlight'>É estratégia.</span>",
    "p-sub-1": "Cada projeto passa por um processo pensado para transformar percepção em resultado real.",
    "n-title-1": "Entender",
    "n-desc-1": "Antes de criar qualquer coisa, mergulho no seu negócio. Quem você atende, o que você vende, como o mercado te enxerga hoje, e onde está o gap entre a sua entrega e como ela é percebida.",
    "n-hint-desktop": "Passe o mouse para continuar →",
    "n-hint-mobile": "Toque no card para continuar →",
    "n-title-2": "Analisar",
    "n-desc-2": "Com dados em mãos, identifico o que está travando a percepção de valor. Analiso seu conteúdo atual, a comunicação visual, o posicionamento e os concorrentes, para encontrar exatamente onde melhorar.",
    "n-title-3": "Criar",
    "n-desc-3": "Aqui começa a transformação. Desenvolvo materiais visuais focados em percepção, autoridade e conversão, que não são apenas bonitos, mas que fazem o cliente confiar antes mesmo de falar com você.",
    "n-title-4": "Entregar",
    "n-desc-4": "Material finalizado, pronto para publicar e converter. Você recebe arquivos otimizados, orientação de uso e, quando necessário, suporte para aplicação, garantindo que o resultado apareça de verdade.",

    "s-tag": "02 . O que eu faço",
    "s-title": "O QUE EU CONSTRUO PARA SUA <span class='highlight'>MARCA</span>",
    "s-sub": "Não entrego apenas design. Eu desenvolvo estruturas visuais pensadas para aumentar seu valor percebido e facilitar a venda.",
    "s-item-1-t": "Identidade visual estratégica",
    "s-item-1-d": "Sua marca deixa de parecer comum e passa a transmitir autoridade.",
    "s-item-2-t": "Criativos para tráfego pago",
    "s-item-2-d": "Peças pensadas para parar o scroll e gerar clique.",
    "s-item-3-t": "Landing pages e páginas de venda",
    "s-item-3-d": "Estrutura visual focada em conversão, não só estética.",
    "s-item-4-t": "Conteúdo para redes sociais",
    "s-item-4-d": "Postagens que constroem presença e despertam interesse.",
    "s-item-5-t": "Estrutura visual de infoprodutos",
    "s-item-5-d": "Do eBook à apresentação, tudo com aparência profissional e vendável.",

    "p-tag-2": "03 . Projetos",
    "p-title-2": "Trabalhos que <span class='highlight'>Converteram</span>",
    "p-sub-2": "Do briefing à entrega, cada projeto pensado com estratégia.",
    "p-btn-view": "Ver Projeto",
    "p-btn-view-campaign": "Ver Campanha",
    "p-name-lavo": "Campanha \"Vem Pra Lavô\"",
    "p-desc-lavo": "Identidade visual e estratégia para redes sociais. Um projeto focado em converter seguidores em clientes através de design de impacto.",
    "p-tag-social": "Social Media Design",
    "p-tag-branding": "Branding Estratégico",
    "p-tag-conv": "Conversão",
    "p-name-coxinhas": "Mais Coxinhas",
    "p-desc-coxinhas": "Direção de arte e fotografia para food service. Autoridade visual que gera desejo imediato de consumo.",
    "p-tag-photo": "Fotografia",
    "p-tag-art": "Direção de Arte",
    "p-tag-gastronomy": "Design Gastronômico",

    "p-tag-3": "03 . Carrosséis",
    "p-title-3": "Conteúdo que <span class='highlight'>Prende o Olhar</span>",
    "p-sub-3": "Deslize para navegar como no Instagram.",
    "ig-meta-sub": "Estratégia Visual",
    "ig-cap-1": "Vida de Freela . Lucaszé",
    "ig-cap-2": "Carrossel Surya",
    "ig-cap-3": "Carrossel Deixou, Lavou, Buscou",

    "p-title-4": "Reels que <span class='highlight'>Param o Scroll</span>",
    "p-sub-4": "Conteúdo em movimento. Arraste para explorar,<br>hover para assistir.",
    "vid-label-1": "Posicionamento",
    "vid-label-2": "Criatividade",
    "vid-label-3": "Festa",
    "vid-label-4": "Produto",
    "vid-label-5": "Equipe",
    "vid-hint-drag": "← arraste para explorar →",

    "ba-tag": "04 . Resultados",
    "ba-title": "A diferença não é estética.<br><span class='highlight'>É percepção.</span>",
    "ba-text": "O design não muda apenas o visual. Ele muda a forma como as pessoas veem e valorizam seu produto.",
    "ba-before-title": "Antes",
    "ba-before-desc": "Sua marca pode parecer confusa, amadora e barata.",
    "ba-after-title": "Depois",
    "ba-after-desc": "Ela se torna clara, profissional e desejável.",
    "ba-desc-2": "Landing pages que não convertem e perdem dinheiro.",
    "ba-after-desc-2": "Layouts premium que geram autoridade e vendas.",

    "cv-tag": "05 . Clones Virtuais",
    "cv-title": "Transforme sua imagem em uma <span class='highlight'>máquina de conteúdo</span>",
    "cv-sub": "Crio versões digitais suas para produzir conteúdo, anúncios e campanhas sem depender da sua presença constante.",
    "cv-item-1-d": "Produza posts, criativos e materiais todos os dias.",
    "cv-item-2-d": "Teste ideias rapidamente sem precisar gravar sempre.",
    "cv-item-3-d": "Sua marca ativa mesmo quando você não está.",
    "cv-item-4-d": "Consistência que fortalece sua imagem.",
    "cv-cta": "Quero escalar minha imagem",

    "work-tag": "06 . Parceria",
    "work-title": "Com quem eu <span class='highlight blink-glow'>trabalho</span>",
    "work-is-title": "É pra quem:",
    "work-is-1": "Quer vender mais através da imagem",
    "work-is-2": "Quer parecer profissional e confiável",
    "work-is-3": "Entende que design influencia diretamente nas vendas",
    "work-not-title": "Não é pra quem:",
    "work-not-1": "Quer apenas “arte bonita”",
    "work-not-2": "Busca o mais barato",
    "work-not-3": "Não valoriza estratégia",

    "proof-tag": "07 . Feedback",
    "proof-title": "Quem já trabalhou comigo <span class='highlight'>sente a diferença</span>",
    "proof-sub": "Mais do que estética, meus clientes percebem mudança na forma como são vistos, valorizados e escolhidos.",
    "proof-name-1": "Maria Clara ✨",
    "proof-text-1": "O Lucaszé não entrega só design, ele entrega um posicionamento. Meus leads mudaram de nível depois que refizemos a identidade visual. Agora as pessoas me respeitam antes mesmo de eu abrir a boca. 🚀🔥",
    "proof-name-2": "Joao Pedro",
    "proof-text-2": "O carrossel de clones virtuais que ele montou pra mim está convertendo 3x mais que meus anúncios antigos. Bizarro o resultado. Praticamente multipliquei minha presença sem precisar gravar nada novo. 🤯🧡",
    "proof-name-3": "Ana Beatriz",
    "proof-text-3": "Design que vende de verdade. Antes eu era só mais uma no mar de amadores, agora as pessoas param para me ouvir. O investimento se pagou na primeira semana fechando novos contratos. 📈✨",
    "proof-name-4": "Ricardo Vendas",
    "proof-text-4": "Trabalho insano. A landing page que ele fez no mês passado parou de ser só uma página bonita e começou a converter prospect de ticket alto direto no Whats. Estratégia pura! 🤝🔥",
    "proof-name-5": "Fernanda Estilo",
    "proof-text-5": "A identidade que o Lucas montou no ano passado ainda recebe elogios toda semana. Meus clientes sentem que a marca é muito mais cara do que eu cobro. O melhor investimento que fiz. 🏛️✨",
    "proof-name-6": "Matheus Ads",
    "proof-text-6": "Os criativos pro lançamento bateram recorde de CTR. O Lucas tem um olhar de marketing que faltava em outros designers que contratei. Ele entende de venda, não só de pixel. 📈⚡",

    "faq-tag": "08 . FAQ",
    "faq-title": "Dúvidas <span class='highlight'>Frequentes</span>",
    "faq-q1": "Quanto custa um projeto?",
    "faq-a1": "O valor varia de acordo com o objetivo e complexidade. Não trabalho com design barato, trabalho com resultado.",
    "faq-q2": "Você faz só design ou estratégia também?",
    "faq-a2": "Todo projeto é pensado com estratégia. O design é a execução final.",
    "faq-q3": "Quanto tempo leva?",
    "faq-a3": "Depende do projeto, mas sempre priorizo qualidade e impacto real.",
    "faq-q4": "Preciso aparecer?",
    "faq-a4": "Não necessariamente. Posso usar clones virtuais ou outras estratégias.",
    "faq-q5": "Você trabalha com qualquer cliente?",
    "faq-a5": "Não. Trabalho com quem está comprometido em crescer e evoluir a marca.",

    "p-tag-5": "09 . Sobre Mim",
    "p-title-5": "Não sou só designer.<br><span class='highlight'>Sou estrategista visual.</span>",
    "about-badge-1": "Desde 2019",
    "about-badge-2": "No mercado, com clientes reais",
    "about-lead": "Desde 2019 atuo com design, comunicação e marketing digital. Não comecei em sala de aula, comecei no mercado, com clientes reais, prazos reais e a pressão de gerar resultado de verdade.",
    "about-extra": "Não trabalho com achismo. Cada decisão visual tem um objetivo: aumentar percepção de valor e facilitar a venda.",
    "about-p3": "Hoje trabalho com foco em percepção de marca, posicionamento e conversão. Meu processo é pensado para que cada entrega impacte direto na forma como o seu cliente te enxerga, e nas suas vendas.",
    "about-manifesto-text": "União de criatividade, estratégia e tecnologia, materiais que não só parecem bons, mas que realmente convertem.",
    "about-tag-1": "Identidade Visual",
    "about-tag-2": "Social Media",
    "about-tag-3": "Campanha",
    "about-tag-4": "Carrosséis",
    "about-tag-5": "Reels e Vídeo",
    "about-tag-6": "Posicionamento",
    "about-tag-7": "Marketing Digital",

    "p-tag-6": "10 . Contato",
    "p-title-6": "Sua marca parece o valor<br><span class='highlight'>que você quer cobrar?</span>",
    "contact-sub": "Se não parece, o problema não é o seu produto. É a forma como ele está sendo percebido.",
    "contact-message": "Trabalho com poucos projetos por vez para garantir qualidade e resultado em cada entrega.",
    "contact-cta": "Me chama no WhatsApp",
    "contact-ig": "Ver Instagram",
    "contact-highlight": "Percepção não é detalhe. É o que define se você vende ou não.",
    "footer-p": "© 2025 Lucaszé Design . Estratégia, Percepção e Resultados Digitais.<br>Araguaína - TO",
    "footer-ig": "Instagram",
    "footer-wa": "WhatsApp"
  },
  en: {
    "site-title": "Lucaszé — Design that Sells | Strategic Design & Branding",
    "meta-desc": "Lucaszé Design | Strategic design focusing on perception and result. Expert in Branding, Social Media, and Conversion Design.",
    "meta-og-title": "Lucaszé — Design that Sells",
    "meta-og-desc": "Transforming brands into businesses through strategic design and value perception.",

    "nav-logo-aria": "Go to top - Lucaszé Design",
    "nav-logo-alt": "Lucaszé Design Logo - Strategic Design Specialist",
    "nav-hamburger-aria": "Open navigation menu",
    "nav-projects": "Projects",
    "nav-carousels": "Carousels",
    "nav-videos": "Videos",
    "nav-about": "About",
    "nav-cta": "Contact Me",

    "hero-title": "HI, I'M <span class='neon-name'>LUCASZÉ</span>",
    "hero-eyebrow": "Strategic Designer",
    "hero-sub": "Strategic designer focused on transforming perception into value.",
    "hero-sub-support": "If your brand looks amateur, you're losing sales every day.",
    "hero-cta": "Contact me",
    "hero-projects": "View Projects",

    "p-tag-1": "01 . Method",
    "p-title-1": "It's not execution.<br><span class='highlight'>It's strategy.</span>",
    "p-sub-1": "Every project goes through a process designed to transform perception into real result.",
    "n-title-1": "Understand",
    "n-desc-1": "Before creating anything, I dive into your business. Who you serve, what you sell, how the market sees you today, and where the gap is between your delivery and how it's perceived.",
    "n-hint-desktop": "Hover to continue →",
    "n-hint-mobile": "Tap the card to continue →",
    "n-title-2": "Analyze",
    "n-desc-2": "With data in hand, I identify what's blocking value perception. I analyze your current content, visual communication, positioning, and competitors to find exactly where to improve.",
    "n-title-3": "Create",
    "n-desc-3": "The transformation starts here. I develop visual materials focused on perception, authority, and conversion, which are not just beautiful but make the client trust before even talking to you.",
    "n-title-4": "Deliver",
    "n-desc-4": "Finished material, ready to publish and convert. You receive optimized files, usage guidance, and support for application when necessary, ensuring real results appears.",

    "s-tag": "02 . What I do",
    "s-title": "WHAT I BUILD FOR YOUR <span class='highlight'>BRAND</span>",
    "s-sub": "I don't just deliver design. I develop visual structures designed to increase your perceived value and facilitate sales.",
    "s-item-1-t": "Strategic visual identity",
    "s-item-1-d": "Your brand stops looking ordinary and starts conveying authority.",
    "s-item-2-t": "Ads for paid traffic",
    "s-item-2-d": "Pieces designed to stop the scroll and generate clicks.",
    "s-item-3-t": "Landing pages and sales pages",
    "s-item-3-d": "Visual structure focused on conversion, not just aesthetics.",
    "s-item-4-t": "Social media content",
    "s-item-4-d": "Posts that build presence and spark interest.",
    "s-item-5-t": "Infoproduct visual structure",
    "s-item-5-d": "From eBook to presentation, all with a professional and sellable appearance.",

    "p-tag-2": "03 . Projects",
    "p-title-2": "Works that <span class='highlight'>Converted</span>",
    "p-sub-2": "From briefing to delivery, every project designed with strategy.",
    "p-btn-view": "View Project",
    "p-btn-view-campaign": "View Campaign",
    "p-name-lavo": "Campaign \"Vem Pra Lavô\"",
    "p-desc-lavo": "Visual identity and social media strategy. A project focused on converting followers into clients through impact design.",
    "p-tag-social": "Social Media Design",
    "p-tag-branding": "Strategic Branding",
    "p-tag-conv": "Conversion",
    "p-name-coxinhas": "Mais Coxinhas",
    "p-desc-coxinhas": "Art direction and photography for food service. Visual authority that generates immediate consumption desire.",
    "p-tag-photo": "Photography",
    "p-tag-art": "Art Direction",
    "p-tag-gastronomy": "Gastronomic Design",

    "p-tag-3": "03 . Carousels",
    "p-title-3": "Content that <span class='highlight'>Catches the Eye</span>",
    "p-sub-3": "Swipe to navigate as on Instagram.",
    "ig-meta-sub": "Visual Strategy",
    "ig-cap-1": "Life of a Freela . Lucaszé",
    "ig-cap-2": "Surya Carousel",
    "ig-cap-3": "Deixou, Lavou, Buscou Carousel",

    "p-title-4": "Reels that <span class='highlight'>Stop the Scroll</span>",
    "p-sub-4": "Content in motion. Drag to explore,<br>hover to watch.",
    "vid-label-1": "Positioning",
    "vid-label-2": "Creativity",
    "vid-label-3": "Party",
    "vid-label-4": "Product",
    "vid-label-5": "Team",
    "vid-hint-drag": "← drag to explore →",

    "ba-tag": "04 . Results",
    "ba-title": "The difference isn't aesthetic.<br><span class='highlight'>It's perception.</span>",
    "ba-text": "Design doesn't just change the look. It changes the way people see and value your product.",
    "ba-before-title": "Before",
    "ba-before-desc": "Your brand may look confused, amateur, and cheap.",
    "ba-after-title": "After",
    "ba-after-desc": "It becomes clear, professional, and desirable.",
    "ba-desc-2": "Landing pages that don't convert and lose money.",
    "ba-after-desc-2": "Premium layouts that generate authority and sales.",

    "cv-tag": "05 . Virtual Clones",
    "cv-title": "Transform your image into a <span class='highlight'>content machine</span>",
    "cv-sub": "I create digital versions of you to produce content, ads, and campaigns without depending on your constant presence.",
    "cv-item-1-d": "Produce posts, creatives, and materials every day.",
    "cv-item-2-d": "Test ideas quickly without needing to record always.",
    "cv-item-3-d": "Your brand active even when you are not.",
    "cv-item-4-d": "Consistency that strengthens your image.",
    "cv-cta": "I want to scale my image",

    "work-tag": "06 . Partnership",
    "work-title": "Who I <span class='highlight blink-glow'>work with</span>",
    "work-is-title": "It's for those who:",
    "work-is-1": "Wants to sell more through image",
    "work-is-2": "Wants to look professional and reliable",
    "work-is-3": "Understands that design directly influences sales",
    "work-not-title": "It's not for those who:",
    "work-not-1": "Just wants 'pretty art'",
    "work-not-2": "Looks for the cheapest",
    "work-not-3": "Doesn't value strategy",

    "proof-tag": "07 . Feedback",
    "proof-title": "Those who worked with me <span class='highlight'>feel the difference</span>",
    "proof-sub": "More than aesthetics, my clients perceive a change in the way they are seen, valued, and chosen.",
    "proof-name-1": "Maria Clara ✨",
    "proof-text-1": "Lucaszé doesn't just deliver design, he delivers positioning. My leads reached a new level after we redid the visual identity. Now people respect me even before I open my mouth. 🚀🔥",
    "proof-name-2": "Joao Pedro",
    "proof-text-2": "The virtual clones carousel he set up for me is converting 3x more than my old ads. Bizarre results. I've practically multiplied my presence without having to record anything new. 🤯🧡",
    "proof-name-3": "Ana Beatriz",
    "proof-text-3": "Design that truly sells. I used to be just another one in a sea of amateurs, now people stop to listen to me. The investment paid for itself in the first week by closing new contracts. 📈✨",
    "proof-name-4": "Ricardo Sales",
    "proof-text-4": "Insane work. The landing page he made last month stopped being just a pretty page and started converting high-ticket prospects directly on WhatsApp. Pure strategy! 🤝🔥",
    "proof-name-5": "Fernanda Style",
    "proof-text-5": "The identity Lucas built last year still gets compliments every week. My clients feel the brand is much more expensive than what I charge. The best investment I've made. 🏛️✨",
    "proof-name-6": "Matheus Ads",
    "proof-text-6": "The creatives for the launch hit a CTR record. Lucas has a marketing eye that was missing in other designers I've hired. He understands sales, not just pixels. 📈⚡",

    "faq-tag": "08 . FAQ",
    "faq-title": "Frequently <span class='highlight'>Asked Questions</span>",
    "faq-q1": "How much does a project cost?",
    "faq-a1": "The value varies according to the objective and complexity. I don't work with cheap design, I work with result.",
    "faq-q2": "Do you do just design or strategy too?",
    "faq-a2": "Every project is designed with strategy. Design is the final execution.",
    "faq-q3": "How long does it take?",
    "faq-a3": "It depends on the project, but I always prioritize quality and real impact.",
    "faq-q4": "Do I need to appear?",
    "faq-a4": "Not necessarily. I can use virtual clones or other strategies.",
    "faq-q5": "Do you work with any client?",
    "faq-a5": "No. I work with those committed to growing and evolving the brand.",

    "p-tag-5": "09 . About Me",
    "p-title-5": "I'm not just a designer.<br><span class='highlight'>I'm a visual strategist.</span>",
    "about-badge-1": "Since 2019",
    "about-badge-2": "In the market, with real clients",
    "about-lead": "Since 2019 I've been active in design, communication, and digital marketing. I didn't start in the classroom, I started in the market, with real clients, real deadlines, and the pressure to generate real results.",
    "about-extra": "I don't work with guesswork. Every visual decision has a goal: to increase value perception and facilitate the sale.",
    "about-p3": "Today I work focusing on brand perception, positioning, and conversion. My process is designed so that each delivery impacts directly on how your client sees you, and on your sales.",
    "about-manifesto-text": "Union of creativity, strategy, and technology, materials that not only look good, but that really convert.",
    "about-tag-1": "Visual Identity",
    "about-tag-2": "Social Media",
    "about-tag-3": "Campaign",
    "about-tag-4": "Carousels",
    "about-tag-5": "Reels and Video",
    "about-tag-6": "Positioning",
    "about-tag-7": "Digital Marketing",

    "p-tag-6": "10 . Contact",
    "p-title-6": "Does your brand look like the value<br><span class='highlight'>you want to charge?</span>",
    "contact-sub": "If it doesn't, the problem isn't your product. It's the way it's being perceived.",
    "contact-message": "I work with few projects at a time to ensure quality and results in each delivery.",
    "contact-cta": "Message me on WhatsApp",
    "contact-ig": "Check Instagram",
    "contact-highlight": "Perception is not a detail. It's what defines whether you sell or not.",
    "footer-p": "© 2025 Lucaszé Design . Strategy, Perception and Digital Results.<br>Araguaína - TO",
    "footer-ig": "Instagram",
    "footer-wa": "WhatsApp"
  }
};

function changeLanguage(lang) {
  localStorage.setItem('preferredLang', lang);

  if (translations[lang] && translations[lang]['site-title']) {
    document.title = translations[lang]['site-title'];
  }

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n').trim();
    if (translations[lang] && translations[lang][key]) {
      const translation = translations[lang][key];
      if (el.tagName === 'META') {
        el.setAttribute('content', translation);
      } else if (key.endsWith('-alt')) {
        el.setAttribute('alt', translation);
      } else if (key.endsWith('-aria')) {
        el.setAttribute('aria-label', translation);
      } else if (key.endsWith('-ph')) {
        el.setAttribute('placeholder', translation);
      } else {
        el.innerHTML = translation;
      }
    }
  });

  // Atualiza botões (tanto desktop quanto mobile)
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll(`.lang-btn[id*="btn-${lang}"]`).forEach(btn => {
    btn.classList.add('active');
  });

  // Atualiza atributo lang do HTML e desativa tradução automática do navegador
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  document.documentElement.setAttribute('translate', 'no');
  console.log('Language changed to:', lang);
}

// Magnetic Button Effect (Refined V7 Global)
function initMagneticButtons() {
  const magnets = document.querySelectorAll('[data-magnetic]');

  magnets.forEach(btn => {
    btn.addEventListener('mousemove', function (e) {
      if (window.innerWidth <= 768) return;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Movimento premium sutil (fator 0.15)
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', function () {
      // Reseta suavemente via transição CSS
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

// Inicializa idioma e interações
function initLanguage() {
  let savedLang = localStorage.getItem('preferredLang');

  if (!savedLang) {
    // Detecta o idioma do navegador
    const userLang = navigator.language || navigator.userLanguage;
    savedLang = userLang.startsWith('pt') ? 'pt' : 'en';
  }

  changeLanguage(savedLang);
  if (typeof initBaDragInteractions === 'function') initBaDragInteractions();
  initMagneticButtons(); // Novo na V5
}

document.addEventListener('DOMContentLoaded', initLanguage);
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initLanguage();
}

/* ============================================================
   BEFORE/AFTER INTERACTIVE DRAGGABLE CARDS
   ============================================================ */
function initBaDragInteractions() {
  const container = document.querySelector('.ba-container');
  const cards = document.querySelectorAll('.ba-card');
  const svg = document.getElementById('ba-connections');
  if (!container || cards.length < 4 || !svg) return;

  const paths = [
    { start: cards[0], end: cards[1], path: document.getElementById('ba-path-1'), dotA: document.getElementById('ba-dot-1a'), dotB: document.getElementById('ba-dot-1b') },
    { start: cards[2], end: cards[3], path: document.getElementById('ba-path-2'), dotA: document.getElementById('ba-dot-2a'), dotB: document.getElementById('ba-dot-2b') }
  ];

  function updateConnections() {
    const cRect = container.getBoundingClientRect();

    paths.forEach(p => {
      const r1 = p.start.getBoundingClientRect();
      const r2 = p.end.getBoundingClientRect();

      // Coordenadas relativas ao container
      const x1 = r1.right - cRect.left;
      const y1 = r1.top + r1.height / 2 - cRect.top;

      const x2 = r2.left - cRect.left;
      const y2 = r2.top + r2.height / 2 - cRect.top;

      p.path.setAttribute('d', `M ${x1} ${y1} L ${x2} ${y2}`);
      p.dotA.setAttribute('cx', x1);
      p.dotA.setAttribute('cy', y1);
      p.dotB.setAttribute('cx', x2);
      p.dotB.setAttribute('cy', y2);
    });
  }

  // Inicializa posições com pequeno delay para garantir o render
  setTimeout(updateConnections, 500);
  window.addEventListener('resize', updateConnections);

  cards.forEach(card => {
    let isDragging = false;
    let startX, startY;
    let currentX = 0, currentY = 0;

    card.addEventListener('pointerdown', (e) => {
      if (window.innerWidth <= 768) return;
      if (e.target.closest('a, button')) return;
      e.preventDefault(); // Impedir seleção de texto e drag nativo de imagens

      isDragging = true;
      startX = e.clientX - currentX;
      startY = e.clientY - currentY;
      card.setPointerCapture(e.pointerId);
      card.classList.add('dragging');
      card.style.transition = 'none';
    });

    card.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      e.preventDefault();

      currentX = e.clientX - startX;
      currentY = e.clientY - startY;

      card.style.transform = `translate(${currentX}px, ${currentY}px)`;
      updateConnections();
    });

    const endDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;
      card.classList.remove('dragging');
      card.releasePointerCapture(e.pointerId);

      // Spring back animation
      currentX = 0;
      currentY = 0;
      card.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
      card.style.transform = 'translate(0, 0)';

      let startTime = null;
      function animate(time) {
        if (!startTime) startTime = time;
        updateConnections();
        if (time - startTime < 600) {
          requestAnimationFrame(animate);
        } else {
          updateConnections();
        }
      }
      requestAnimationFrame(animate);
    };

    card.addEventListener('pointerup', endDrag);
    card.addEventListener('pointercancel', endDrag);
  });
}

