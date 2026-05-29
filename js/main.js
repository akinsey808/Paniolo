"use strict";

// ── Nav scroll
var nav = document.querySelector('nav');
if (nav) {
  var onScroll = function() {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── Mobile hamburger
var toggle = document.querySelector('.nav-toggle');
var navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', function() {
    var isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    var bars = toggle.querySelectorAll('span');
    if (isOpen) {
      if (bars[0]) bars[0].style.cssText = 'transform:rotate(45deg) translate(4px,4px)';
      if (bars[1]) bars[1].style.cssText = 'opacity:0';
      if (bars[2]) bars[2].style.cssText = 'transform:rotate(-45deg) translate(4px,-4px)';
    } else {
      for (var i = 0; i < bars.length; i++) {
        bars[i].removeAttribute('style');
      }
    }
  });

  var links = navLinks.querySelectorAll('a');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function() {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      var bars = toggle.querySelectorAll('span');
      for (var j = 0; j < bars.length; j++) {
        bars[j].removeAttribute('style');
      }
    });
  }

  document.addEventListener('click', function(e) {
    if (!nav.contains(e.target)) {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      var bars = toggle.querySelectorAll('span');
      for (var i = 0; i < bars.length; i++) {
        bars[i].removeAttribute('style');
      }
    }
  });
}

// ── Scroll reveal
if ('IntersectionObserver' in window) {
  var revealObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var delay = parseInt(entry.target.dataset.delay || '0', 10);
        setTimeout(function() {
          entry.target.classList.add('visible');
        }, delay);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  var revealEls = document.querySelectorAll('.reveal');
  for (var i = 0; i < revealEls.length; i++) {
    revealEls[i].dataset.delay = String(i * 60);
    revealObs.observe(revealEls[i]);
  }
}

// ── Counter animation
function animateCounter(el, target, suffix, prefix, decimals) {
  suffix = suffix || '';
  prefix = prefix || '';
  decimals = decimals || 0;
  var duration = 1600;
  var start = performance.now();
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
  function tick(now) {
    var p = Math.min((now - start) / duration, 1);
    el.textContent = prefix + (target * easeOut(p)).toFixed(decimals) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

if ('IntersectionObserver' in window) {
  var counterObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        animateCounter(
          el,
          parseFloat(el.dataset.count || '0'),
          el.dataset.suffix || '',
          el.dataset.prefix || '',
          parseInt(el.dataset.decimals || '0', 10)
        );
        counterObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  var countEls = document.querySelectorAll('[data-count]');
  for (var i = 0; i < countEls.length; i++) {
    counterObs.observe(countEls[i]);
  }
}

// ── Contact form
var form = document.querySelector('#contact-form');
var formSuccess = document.querySelector('#form-success');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var btn = form.querySelector('[type="submit"]');
    if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }
    setTimeout(function() {
      form.style.display = 'none';
      if (formSuccess) formSuccess.style.display = 'block';
    }, 900);
  });
}

// ── Smooth scroll
var anchors = document.querySelectorAll('a[href^="#"]');
for (var i = 0; i < anchors.length; i++) {
  anchors[i].addEventListener('click', function(e) {
    var href = this.getAttribute('href');
    if (!href || href === '#') return;
    var target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      var navEl = document.querySelector('nav');
      var offset = (navEl ? navEl.offsetHeight : 64) + 12;
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
}
