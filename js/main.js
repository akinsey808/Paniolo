"use strict";

const nav = document.querySelector('nav');
if (nav) {
  const handleScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    const bars = toggle.querySelectorAll('span');
    if (isOpen) {
      bars[0] && (bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)');
      bars[1] && (bars[1].style.opacity = '0');
      bars[2] && (bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)');
    } else {
      bars.forEach(b => b.removeAttribute('style'));
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.querySelectorAll('span').forEach(b => b.removeAttribute('style'));
    });
  });
}

const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || '0', 10);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach((el, i) => { el.dataset.delay = String(i * 70); revealObs.observe(el); });

function animateCounter(el, target, suffix, prefix, decimals, duration) {
  suffix = suffix || '';
  prefix = prefix || '';
  decimals = decimals || 0;
  duration = duration || 1800;
  const start = performance.now();
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const tick = now => {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = prefix + (target * easeOut(progress)).toFixed(decimals) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const statNumbers = document.querySelectorAll('[data-count]');
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      animateCounter(el,
        parseFloat(el.dataset.count || '0'),
        el.dataset.suffix || '',
        el.dataset.prefix || '',
        parseInt(el.dataset.decimals || '0', 10)
      );
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObs.observe(el));

const form = document.querySelector('#contact-form');
const formSuccess = document.querySelector('#form-success');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }
    setTimeout(() => {
      form.style.display = 'none';
      if (formSuccess) formSuccess.style.display = 'block';
    }, 900);
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = (document.querySelector('nav')?.offsetHeight || 72) + 16;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    }
  });
});
