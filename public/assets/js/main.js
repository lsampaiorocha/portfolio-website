// Shared interactions: mobile nav toggle, smooth scroll, active link highlight
(function () {
  const mobileToggle = document.querySelector('[data-nav-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', String(!expanded));
    });
  }

  // Close mobile menu on link click
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (target instanceof HTMLElement && target.matches('[data-mobile-menu] a')) {
      mobileMenu && mobileMenu.classList.remove('open');
      mobileToggle && mobileToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Smooth scroll for hash links
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const link = target.closest('a[href^="#"]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.length < 2) return;
    const el = document.querySelector(href);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', href);
  });

  // ScrollSpy: update active nav link based on section in view
  const sectionIds = ['about','projects','experience','skills','education','contact'];
  const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
  const mobileLinks = Array.from(document.querySelectorAll('[data-mobile-menu] a'));
  const allLinks = navLinks.concat(mobileLinks);
  const sections = sectionIds
    .map(id => ({ id, el: document.getElementById(id) }))
    .filter(s => s.el);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      if (!id) return;
      if (entry.isIntersecting) {
        allLinks.forEach(a => {
          const href = a.getAttribute('href');
          if (!href) return;
          if (href === `#${id}`) {
            a.classList.add('active');
          } else if (href.startsWith('#')) {
            a.classList.remove('active');
          }
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px', threshold: 0.01 });

  sections.forEach(s => observer.observe(s.el));

  // Contact form handler (no backend, just mailto fallback)
  // No contact form; direct email CTA used
  // Email button removed - no longer needed

  // Obfuscate email text display
  const emailTexts = document.querySelectorAll('.js-email-text');
  emailTexts.forEach(el => {
    const user = el.getAttribute('data-email-user');
    const domain = el.getAttribute('data-email-domain');
    if (user && domain) {
      el.textContent = `${user}@${domain}`;
    }
  });
})();



