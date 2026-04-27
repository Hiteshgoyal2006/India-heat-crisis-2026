/* ═══════════════════════════════════════════
   India Heat Crisis 2026 — Shared JavaScript
═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Active nav link (auto-detects current page) ── */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* ── Mobile hamburger nav ── */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
    navMenu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
      })
    );
  }

  /* ── Reading progress bar ── */
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
    }, { passive: true });
  }

  /* ── Back-to-top button ── */
  const btt = document.getElementById('backToTop');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('show', window.scrollY > 450);
    }, { passive: true });
    btt.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
  }

  /* ── Ticker: pause on hover ── */
  const tickerTrack = document.querySelector('.ticker-track');
  if (tickerTrack) {
    tickerTrack.addEventListener('mouseenter', () =>
      tickerTrack.style.animationPlayState = 'paused'
    );
    tickerTrack.addEventListener('mouseleave', () =>
      tickerTrack.style.animationPlayState = 'running'
    );
  }

  /* ── Number counter animation ── */
  function countUp(el) {
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '';
    const dur    = 1800;
    const inc    = target / (dur / (1000 / 60));
    let val      = 0;
    const tick   = setInterval(() => {
      val += inc;
      if (val >= target) { val = target; clearInterval(tick); }
      el.textContent = Math.floor(val) + suffix;
    }, 1000 / 60);
  }

  /* ── Scroll-reveal: cards, bars, counters ── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('visible');
      el.querySelectorAll('[data-target]').forEach(countUp);
      el.querySelectorAll('.bar-fill').forEach(b => {
        b.style.width = b.dataset.width + '%';
      });
      io.unobserve(el);
    });
  }, { threshold: 0.14 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ── Home page only ── */
  const homeHero = document.getElementById('home-hero');
  if (homeHero) {

    /* Hero stats count up on load */
    window.addEventListener('load', () => {
      setTimeout(() => {
        homeHero.querySelectorAll('[data-target]').forEach(countUp);
      }, 700);
    });

    /* Typewriter effect on "Heat Epicenter" */
    const hotSpan = document.querySelector('.hero-heading .hot');
    if (hotSpan) {
      const fullText = hotSpan.textContent.trim();
      hotSpan.textContent = '';

      /* blinking cursor */
      const cursor = document.createElement('span');
      cursor.className = 'cursor-blink';
      cursor.textContent = '|';
      hotSpan.insertAdjacentElement('afterend', cursor);

      let i = 0;
      setTimeout(() => {
        const type = setInterval(() => {
          if (i < fullText.length) {
            hotSpan.textContent += fullText[i++];
          } else {
            clearInterval(type);
            setTimeout(() => cursor.remove(), 800);
          }
        }, 65);
      }, 1000);
    }
  }

})();
