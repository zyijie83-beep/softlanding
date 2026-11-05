/* SoftLanding 安落 — interactions
   Vanilla JS. No build step, no dependencies. */

(function () {
  'use strict';

  var COPY = {
    zh: {
      title: 'SoftLanding 安落 — 告别之后的安顿',
      desc: 'SoftLanding 安落：一位由 AI 辅助、由人交付的身后事管家。最初的九十天，一位管家，一张清单，一个价格。'
    },
    en: {
      title: 'SoftLanding — The after-loss concierge',
      desc: 'SoftLanding is an AI-assisted, human-delivered concierge for the first ninety days after a death. One guide, one checklist, one price.'
    }
  };

  /* ------------------------------------------------------------
     Language
     ------------------------------------------------------------ */
  function applyLang(lang) {
    if (lang !== 'en' && lang !== 'zh') lang = 'zh';
    document.documentElement.lang = lang;

    var pageTitle = document.documentElement.getAttribute(lang === 'zh' ? 'data-title-zh' : 'data-title-en');
    document.title = pageTitle || COPY[lang].title;
    var meta = document.querySelector('meta[name="description"]');
    if (meta && document.documentElement.hasAttribute('data-home')) {
      meta.setAttribute('content', COPY[lang].desc);
    }

    document.querySelectorAll('[data-lang]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang') === lang));
    });

    document.querySelectorAll('[data-ph-en]').forEach(function (el) {
      var value = lang === 'zh' ? el.getAttribute('data-ph-zh') : el.getAttribute('data-ph-en');
      if (value) el.setAttribute('placeholder', value);
    });

    document.querySelectorAll('select option[data-en]').forEach(function (opt) {
      var value = lang === 'zh' ? opt.getAttribute('data-zh') : opt.getAttribute('data-en');
      if (value) opt.textContent = value;
    });

    try { localStorage.setItem('cw-lang', lang); } catch (e) {}
  }

  try {
    if (new URLSearchParams(window.location.search).has('flat')) {
      document.documentElement.classList.add('flat');
    }
  } catch (e) {}

  var initialLang = document.documentElement.lang === 'en' ? 'en' : 'zh';
  applyLang(initialLang);

  document.querySelectorAll('[data-lang]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLang(btn.getAttribute('data-lang'));
    });
  });

  /* ------------------------------------------------------------
     Navigation, progress, mobile menu
     ------------------------------------------------------------ */
  var nav = document.getElementById('nav');
  var progress = document.getElementById('progress');
  var menu = document.getElementById('mobile-menu');
  var menuBtn = document.querySelector('.menu-btn');
  var menuClose = document.querySelector('.mobile__close');

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop || 0;
    if (nav) nav.classList.toggle('is-scrolled', y > 32);

    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = h > 0 ? Math.min(100, (y / h) * 100) + '%' : '0%';
    }
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  function openMenu() {
    if (!menu || !menuBtn) return;
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    if (menuClose) menuClose.focus();
  }

  function closeMenu(returnFocus) {
    if (!menu || !menuBtn) return;
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    if (returnFocus) menuBtn.focus({ preventScroll: true });
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      if (menu.classList.contains('is-open')) closeMenu(true);
      else openMenu();
    });
  }

  if (menuClose) {
    menuClose.addEventListener('click', function () { closeMenu(true); });
  }

  if (menu) {
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { closeMenu(false); });
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu && menu.classList.contains('is-open')) closeMenu(true);
  });

  /* Jump to an anchor on first load without a long smooth scroll. */
  function jumpToHash() {
    if (!window.location.hash) return;
    var target;
    try { target = document.querySelector(window.location.hash); } catch (e) { return; }
    if (!target) return;
    var top = target.getBoundingClientRect().top + window.pageYOffset - 82;
    var previous = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, Math.max(0, top));
    document.documentElement.style.scrollBehavior = previous;
  }
  window.addEventListener('load', function () { window.setTimeout(jumpToHash, 40); });

  /* ------------------------------------------------------------
     Scroll reveal
     ------------------------------------------------------------ */
  var reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });

    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ------------------------------------------------------------
     Scrollspy
     ------------------------------------------------------------ */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));

  if ('IntersectionObserver' in window && navLinks.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-38% 0px -52% 0px', threshold: 0 });

    sections.forEach(function (section) { spy.observe(section); });
  }

  /* ------------------------------------------------------------
     FAQ accordion
     ------------------------------------------------------------ */
  var faqButtons = document.querySelectorAll('.faq__q');

  faqButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq__item');
      var isOpen = btn.getAttribute('aria-expanded') === 'true';

      faqButtons.forEach(function (other) {
        other.setAttribute('aria-expanded', 'false');
        var otherItem = other.closest('.faq__item');
        if (otherItem) otherItem.classList.remove('is-open');
      });

      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        if (item) item.classList.add('is-open');
      }
    });
  });

  /* ------------------------------------------------------------
     Contact form — Netlify Forms (AJAX)
     ------------------------------------------------------------ */
  var form = document.getElementById('contact-form');
  var success = document.getElementById('form-success');
  var formError = document.getElementById('form-error');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (formError) formError.hidden = true;

      if (!form.checkValidity()) {
        if (typeof form.reportValidity === 'function') form.reportValidity();
        return;
      }

      var btn = form.querySelector('.form__submit');
      if (btn) btn.disabled = true;

      var data = new FormData(form);

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString()
      })
        .then(function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          form.classList.add('is-sent');
          if (success) {
            success.hidden = false;
            success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        })
        .catch(function () {
          if (formError) formError.hidden = false;
        })
        .finally(function () {
          if (btn) btn.disabled = false;
        });
    });
  }
})();
