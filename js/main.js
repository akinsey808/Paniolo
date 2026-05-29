"use strict";

// ── Page load fade-in
document.addEventListener('DOMContentLoaded', function() {
  document.body.classList.add('loaded');
});

// ── Nav scroll
var nav = document.querySelector('body > nav');
if (nav) {
  var onScroll = function() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── Mobile hamburger
var toggle = document.querySelector('.nav-toggle');
var navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', function(e) {
    e.stopPropagation();
    var isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    var bars = toggle.querySelectorAll('span');
    if (isOpen) {
      // Proper X: top bar rotates down-right, bottom bar rotates up-right, middle disappears
      if (bars[0]) bars[0].style.cssText = 'transform:translateY(6.5px) rotate(45deg)';
      if (bars[1]) bars[1].style.cssText = 'opacity:0;transform:scaleX(0)';
      if (bars[2]) bars[2].style.cssText = 'transform:translateY(-6.5px) rotate(-45deg)';
    } else {
      for (var i = 0; i < bars.length; i++) { bars[i].removeAttribute('style'); }
    }
  });

  var links = navLinks.querySelectorAll('a');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function() {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      var bars = toggle.querySelectorAll('span');
      for (var j = 0; j < bars.length; j++) { bars[j].removeAttribute('style'); }
    });
  }

  document.addEventListener('click', function(e) {
    if (nav && !nav.contains(e.target)) {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      var bars = toggle.querySelectorAll('span');
      for (var i = 0; i < bars.length; i++) { bars[i].removeAttribute('style'); }
    }
  });
}

// ── Scroll reveal
if ('IntersectionObserver' in window) {
  var revealObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var delay = parseInt(entry.target.getAttribute('data-delay') || '0', 10);
        setTimeout(function() { entry.target.classList.add('visible'); }, delay);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  var revealEls = document.querySelectorAll('.reveal');
  for (var ri = 0; ri < revealEls.length; ri++) {
    revealEls[ri].setAttribute('data-delay', String(ri * 55));
    revealObs.observe(revealEls[ri]);
  }
}

// ── Counter animation
function animateCounter(el, target, suffix, prefix, decimals) {
  suffix = suffix || ''; prefix = prefix || ''; decimals = decimals || 0;
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
        animateCounter(el,
          parseFloat(el.getAttribute('data-count') || '0'),
          el.getAttribute('data-suffix') || '',
          el.getAttribute('data-prefix') || '',
          parseInt(el.getAttribute('data-decimals') || '0', 10)
        );
        counterObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  var countEls = document.querySelectorAll('[data-count]');
  for (var ci = 0; ci < countEls.length; ci++) { counterObs.observe(countEls[ci]); }
}

// ── Dynamic contact copy based on dropdown
var typeSelect = document.querySelector('#cf-type');
var contactPitch = document.querySelector('#contact-pitch');
var messageField = document.querySelector('#cf-message');

var pitchMap = {
  'engineering-team': 'Early access to the Paniolo CLI — harness builder, intelligence layer scaffolding, and white-glove onboarding for your codebase. Tell us about your current AI coding setup and the biggest gap between what your agents produce and what your standards require.',
  'vc': 'We are raising a pre-seed round. Paniolo is building the infrastructure layer for enterprise AI engineering — the picks-and-shovels play for the agent wave. Share your fund details and we will send the pitch deck and data room access.',
  'developer': 'Individual developers get CLI early access to build and evolve their own project intelligence layer. Tell us what you are building and which AI tools you currently use.',
  'enterprise': 'Enterprise teams get dedicated onboarding, custom harness templates, and a structured rollout plan. Tell us about your engineering org and current AI tooling.',
  'other': 'Tell us about yourself and what brought you to Paniolo. We will find the right way to work together.'
};

var placeholderMap = {
  'engineering-team': 'Describe your stack and where AI output falls short of your standards…',
  'vc': 'Share your fund name and investment focus…',
  'developer': 'Tell us what you are building and which AI coding tools you use…',
  'enterprise': 'Describe your engineering org size and current AI tooling…',
  'other': 'Tell us about yourself and what brought you here…'
};

if (typeSelect && contactPitch) {
  typeSelect.addEventListener('change', function() {
    var val = typeSelect.value;
    if (pitchMap[val]) {
      contactPitch.style.opacity = '0';
      setTimeout(function() {
        contactPitch.textContent = pitchMap[val];
        contactPitch.style.opacity = '1';
      }, 200);
    }
    if (messageField && placeholderMap[val]) {
      messageField.setAttribute('placeholder', placeholderMap[val]);
    }
  });
}

// ── Contact form submit
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

// ── Anchor scroll
var anchors = document.querySelectorAll('a[href^="#"]');
for (var ai = 0; ai < anchors.length; ai++) {
  anchors[ai].addEventListener('click', function(e) {
    var href = this.getAttribute('href');
    if (!href || href === '#') return;
    var target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      var navEl = document.querySelector('body > nav');
      var offset = (navEl ? navEl.offsetHeight : 64) + 16;
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
}
