// =====================================================
// NAVBAR — scroll shadow + mobile menu
// =====================================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// =====================================================
// SCROLL REVEAL — Intersection Observer
// =====================================================
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings within the same parent
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 0.08}s`;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// =====================================================
// TYPEWRITER EFFECT
// =====================================================
const phrases = [
  'Apple Intelligence Engineer',
  'AI Agent Developer',
  'SwiftUI Specialist',
  'On-Device ML Builder',
  'SiriKit Integrator',
];

const typeEl = document.getElementById('typewriter');
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
let typingSpeed = 80;

function type() {
  const current = phrases[phraseIdx];

  if (isDeleting) {
    typeEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    typingSpeed = 40;
  } else {
    typeEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    typingSpeed = 80;
  }

  if (!isDeleting && charIdx === current.length) {
    typingSpeed = 2000; // pause at end
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    typingSpeed = 400;
  }

  setTimeout(type, typingSpeed);
}

// Start typewriter after hero loads
setTimeout(type, 1000);

// =====================================================
// ACTIVE NAV LINK — highlight on scroll
// =====================================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'var(--text)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// =====================================================
// SMOOTH SCROLL for all anchor links
// =====================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 70;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// =====================================================
// STAT COUNTER ANIMATION
// =====================================================
function animateCount(el, target, suffix = '') {
  const isText = isNaN(parseInt(target));
  if (isText) return; // skip non-numeric like "iOS 18"
  let start = 0;
  const end = parseInt(target);
  const duration = 1500;
  const step = Math.ceil(end / (duration / 16));
  const timer = setInterval(() => {
    start += step;
    if (start >= end) {
      el.textContent = end + suffix;
      clearInterval(timer);
    } else {
      el.textContent = start + suffix;
    }
  }, 16);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numEl = entry.target.querySelector('.stat-number');
      if (!numEl) return;
      const raw = numEl.textContent.trim();
      const num = parseInt(raw);
      const suffix = raw.replace(num, '');
      if (!isNaN(num)) animateCount(numEl, num, suffix);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(el => statObserver.observe(el));
