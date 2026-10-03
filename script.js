/**
 * AI & Machine Learning Club OCT — Interactive Client Scripts
 * Typing animation, counter observer, mobile navigation, and micro-interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. Dynamic Typing Tagline Animation
  // =========================================================================
  const typingElement = document.getElementById('typing-tagline');
  const phrases = [
    'Inspire with AI.',
    'Build Production ML.',
    'Ship Open Source.',
    'Democratize Tech.'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    if (!typingElement) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at full phrase
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400; // Pause before typing next phrase
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  // =========================================================================
  // 2. Animated Stats Counter (Intersection Observer)
  // =========================================================================
  const statValues = document.querySelectorAll('.stat-value');
  let hasAnimatedStats = false;

  const countUp = (element, target) => {
    let start = 0;
    const duration = 1800;
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = target >= 100 ? `${target}+` : (target === 12 ? '12+' : target === 10 ? '10+' : `${target}+`);
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start) + (target >= 10 ? '+' : '');
      }
    }, stepTime);
  };

  const statsSection = document.getElementById('stats-banner');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimatedStats) {
          hasAnimatedStats = true;
          statValues.forEach(stat => {
            const count = parseInt(stat.getAttribute('data-count'), 10);
            if (!isNaN(count)) {
              countUp(stat, count);
            }
          });
        }
      });
    }, { threshold: 0.2 });

    observer.observe(statsSection);
  }

  // =========================================================================
  // 3. Mobile Navigation Menu Toggle
  // =========================================================================
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
      mobileBtn.setAttribute('aria-expanded', !isExpanded);
      
      if (!isExpanded) {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = 'rgba(9, 13, 22, 0.98)';
        navMenu.style.padding = '1.5rem';
        navMenu.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
      } else {
        navMenu.style.display = '';
      }
    });

    // Close menu when clicking any nav link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navMenu.style.display = '';
          mobileBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // =========================================================================
  // 4. Navbar Background Blur on Scroll
  // =========================================================================
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.background = 'rgba(9, 13, 22, 0.92)';
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
    } else {
      header.style.background = 'rgba(9, 13, 22, 0.75)';
      header.style.boxShadow = 'none';
    }
  });

  // =========================================================================
  // 5. Interactive Card Glow Tracking (Micro-interaction)
  // =========================================================================
  const interactiveCards = document.querySelectorAll('.module-card, .project-card, .workshop-card');
  interactiveCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
});
