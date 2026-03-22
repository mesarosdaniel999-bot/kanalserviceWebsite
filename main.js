document.addEventListener('DOMContentLoaded', function () {

  // ── MOBILE NAV ──────────────────────
  var toggle  = document.querySelector('.nav-toggle');
  var menu    = document.getElementById('navMenu');
  var overlay = document.getElementById('navOverlay');
  var close   = document.getElementById('navClose');

  if (toggle && menu && overlay && close) {
    function openNav() {
      menu.classList.add('nav-menu--open');
      overlay.classList.add('nav-overlay--visible');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeNav() {
      menu.classList.remove('nav-menu--open');
      overlay.classList.remove('nav-overlay--visible');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', openNav);
    close.addEventListener('click', closeNav);
    overlay.addEventListener('click', closeNav);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  // ── FAQ ACCORDION ───────────────────
  var faqItems = document.querySelectorAll('.faq-question');

  if (faqItems.length > 0) {
    faqItems.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item   = btn.closest('.faq-item');
        var answer = item.querySelector('.faq-answer');
        var icon   = btn.querySelector('.faq-icon');
        var isOpen = btn.getAttribute('aria-expanded') === 'true';

        // Close all open items
        document.querySelectorAll('.faq-item').forEach(function (i) {
          i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          i.querySelector('.faq-answer').hidden = true;
          i.querySelector('.faq-icon').textContent = '+';
          i.classList.remove('faq-item--open');
        });

        // If it was closed, open it
        if (!isOpen) {
          btn.setAttribute('aria-expanded', 'true');
          answer.hidden = false;
          icon.textContent = '\u00d7'; // ×
          item.classList.add('faq-item--open');
        }
      });
    });
  }

  // ── CONTACT FORM ────────────────────
  var form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name        = document.getElementById('name').value.trim();
      var phone       = document.getElementById('phone').value.trim();
      var message     = document.getElementById('message').value.trim();
      var datenschutz = document.getElementById('datenschutz').checked;

      if (!name || !phone || !message || !datenschutz) {
        alert('Bitte füllen Sie alle Pflichtfelder aus und bestätigen Sie die Datenschutzerklärung.');
        return;
      }

      form.hidden = true;
      document.getElementById('formSuccess').hidden = false;

      // ── TO SEND REAL EMAILS ──────────
      // Option 1 – Formspree (free, no backend needed):
      //   1. Sign up at https://formspree.io
      //   2. Create a form, copy your endpoint e.g. https://formspree.io/f/xyzabcde
      //   3. Change the <form> action attribute to that URL and method="POST"
      //   4. Remove the e.preventDefault() above and this block
      //
      // Option 2 – Netlify Forms (free if hosting on Netlify):
      //   1. Add netlify attribute to the <form> tag
      //   2. Netlify detects and handles it automatically
      // ────────────────────────────────
    });
  }

});
