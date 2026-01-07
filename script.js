// script.js - Main JavaScript for Gain Wave App
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize mobile menu toggle
  initMobileMenu();
  
  // Initialize video controls
  initVideoControls();
  
  // Initialize form handling
  initForms();
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize smooth scrolling
  initSmoothScroll();
  
  // Update copyright year
  updateCopyrightYear();
  
  // Initialize lazy loading
  initLazyLoading();
  
  // Initialize FAQ functionality if exists
  initFAQ();
  
  // Initialize calculator if exists
  initCalculator();
});

function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('show');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.className = navMenu.classList.contains('show') 
          ? 'fas fa-times' 
          : 'fas fa-bars';
      }
    });
    
    // Close menu when clicking outside on mobile
    document.addEventListener('click', function(event) {
      if (window.innerWidth <= 768) {
        if (navMenu && menuToggle && 
            !navMenu.contains(event.target) && 
            !menuToggle.contains(event.target)) {
          navMenu.classList.remove('show');
          const icon = menuToggle.querySelector('i');
          if (icon) {
            icon.className = 'fas fa-bars';
          }
        }
      }
    });
    
    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768 && navMenu) {
          navMenu.classList.remove('show');
          const icon = menuToggle.querySelector('i');
          if (icon) {
            icon.className = 'fas fa-bars';
          }
        }
      });
    });
  }
}

function initVideoControls() {
  const video = document.getElementById('gainVideo');
  const muteBtn = document.querySelector('.mute-btn');
  
  if (video && muteBtn) {
    // Ensure video is muted by default
    video.muted = true;
    
    muteBtn.addEventListener('click', function() {
      video.muted = !video.muted;
      const icon = muteBtn.querySelector('i');
      if (icon) {
        if (video.muted) {
          icon.className = 'fas fa-volume-mute';
          icon.setAttribute('aria-label', 'Unmute video');
        } else {
          icon.className = 'fas fa-volume-up';
          icon.setAttribute('aria-label', 'Mute video');
        }
      }
    });
    
    // Add keyboard support
    muteBtn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        video.muted = !video.muted;
      }
    });
    
    // Add aria-label for accessibility
    muteBtn.setAttribute('aria-label', video.muted ? 'Unmute video' : 'Mute video');
  }
}

function initForms() {
  const contactForm = document.querySelector('.contact-form form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic form validation
      const name = this.querySelector('input[type="text"]');
      const email = this.querySelector('input[type="email"]');
      const subject = this.querySelector('input[type="text"]');
      const message = this.querySelector('textarea');
      const submitBtn = this.querySelector('button[type="submit"]');
      
      let isValid = true;
      
      // Reset error states
      [name, email, subject, message].forEach(input => {
        if (input) {
          input.style.borderColor = '#e0e0e0';
        }
      });
      
      // Validate name
      if (name && !name.value.trim()) {
        name.style.borderColor = '#ff4444';
        isValid = false;
      }
      
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && (!email.value.trim() || !emailRegex.test(email.value))) {
        email.style.borderColor = '#ff4444';
        isValid = false;
      }
      
      // Validate subject
      if (subject && !subject.value.trim()) {
        subject.style.borderColor = '#ff4444';
        isValid = false;
      }
      
      // Validate message
      if (message && !message.value.trim()) {
        message.style.borderColor = '#ff4444';
        isValid = false;
      }
      
      if (!isValid) {
        return;
      }
      
      // Simulate form submission
      const originalText = submitBtn.textContent;
      const originalBg = submitBtn.style.background;
      
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = '#00c853';
        
        // Reset form
        this.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = originalBg;
          submitBtn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        
        // Animate child elements with delay
        const animatedElements = entry.target.querySelectorAll('.about-card, .feature-card, .value-box, .contact-item, .step-card');
        animatedElements.forEach((el, index) => {
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, index * 200);
        });
      }
    });
  }, observerOptions);
  
  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

function updateCopyrightYear() {
  const copyrightElements = document.querySelectorAll('.copyright');
  const currentYear = new Date().getFullYear();
  
  copyrightElements.forEach(element => {
    if (element.textContent.includes('2025')) {
      element.textContent = element.textContent.replace('2025', currentYear);
    }
    // Also update any other year placeholders
    const yearSpan = element.querySelector('#currentYear');
    if (yearSpan) {
      yearSpan.textContent = currentYear;
    }
  });
}

function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
          // Handle images
          if (element.tagName === 'IMG' && element.dataset.src) {
            element.src = element.dataset.src;
            element.classList.add('loaded');
          }
          
          // Handle background images
          if (element.dataset.bg) {
            element.style.backgroundImage = `url('${element.dataset.bg}')`;
            element.classList.add('bg-loaded');
          }
          
          lazyObserver.unobserve(element);
        }
      });
    });
    
    // Observe lazy-loaded elements
    document.querySelectorAll('[data-src], [data-bg]').forEach(element => {
      lazyObserver.observe(element);
    });
  }
}

function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (question) {
        question.addEventListener('click', () => {
          // Toggle current item
          const isActive = item.classList.contains('active');
          
          // Close all items
          faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
          });
          
          // Open current item if it wasn't active
          if (!isActive) {
            item.classList.add('active');
          }
        });
      }
    });
  }
}

function initCalculator() {
  const calculatorInputs = document.querySelectorAll('.calc-input input');
  if (calculatorInputs.length > 0) {
    function calculateEarnings() {
      const levelA = parseInt(document.getElementById('levelA')?.value) || 0;
      const levelB = parseInt(document.getElementById('levelB')?.value) || 0;
      const levelC = parseInt(document.getElementById('levelC')?.value) || 0;
      const levelD = parseInt(document.getElementById('levelD')?.value) || 0;
      const levelE = parseInt(document.getElementById('levelE')?.value) || 0;
      
      // Commission rates
      const rateA = 10; // USDT per referral
      const rateB = 5;
      const rateC = 3;
      const rateD = 1;
      const rateE = 1;
      
      // Calculate earnings
      const earningsA = levelA * rateA;
      const earningsB = levelB * rateB;
      const earningsC = levelC * rateC;
      const earningsD = levelD * rateD;
      const earningsE = levelE * rateE;
      const totalEarnings = earningsA + earningsB + earningsC + earningsD + earningsE;
      
      // Update display if elements exist
      const estimatedEarnings = document.getElementById('estimatedEarnings');
      if (estimatedEarnings) {
        estimatedEarnings.textContent = totalEarnings.toLocaleString() + ' USDT';
        
        // Animate the total earnings
        estimatedEarnings.style.transform = 'scale(1.1)';
        setTimeout(() => {
          estimatedEarnings.style.transform = 'scale(1)';
        }, 300);
      }
      
      // Update level earnings
      const levelAEarnings = document.getElementById('levelAEarnings');
      const levelBEarnings = document.getElementById('levelBEarnings');
      const levelCEarnings = document.getElementById('levelCEarnings');
      const levelDEEarnings = document.getElementById('levelDEEarnings');
      
      if (levelAEarnings) levelAEarnings.textContent = earningsA.toLocaleString() + ' USDT';
      if (levelBEarnings) levelBEarnings.textContent = earningsB.toLocaleString() + ' USDT';
      if (levelCEarnings) levelCEarnings.textContent = earningsC.toLocaleString() + ' USDT';
      if (levelDEEarnings) levelDEEarnings.textContent = (earningsD + earningsE).toLocaleString() + ' USDT';
    }
    
    // Initialize calculator with default values
    calculateEarnings();
    
    // Add event listeners to inputs
    calculatorInputs.forEach(input => {
      input.addEventListener('input', calculateEarnings);
      input.addEventListener('change', calculateEarnings);
    });
    
    // Create preset buttons if container exists
    const presetButtonsContainer = document.getElementById('presetButtons');
    if (presetButtonsContainer) {
      const presets = [
        { name: 'Beginner', A: 5, B: 25, C: 125, D: 625, E: 3125 },
        { name: 'Intermediate', A: 10, B: 50, C: 250, D: 1250, E: 6250 },
        { name: 'Advanced', A: 25, B: 125, C: 625, D: 3125, E: 15625 },
        { name: 'Expert', A: 50, B: 250, C: 1250, D: 6250, E: 31250 }
      ];
      
      presets.forEach(preset => {
        const button = document.createElement('button');
        button.className = 'preset-btn';
        button.textContent = preset.name;
        button.onclick = () => {
          document.getElementById('levelA').value = preset.A;
          document.getElementById('levelB').value = preset.B;
          document.getElementById('levelC').value = preset.C;
          document.getElementById('levelD').value = preset.D;
          document.getElementById('levelE').value = preset.E;
          calculateEarnings();
        };
        presetButtonsContainer.appendChild(button);
      });
    }
  }
}

// Add loading animation for page transitions
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
  
  // Remove loading spinner
  const loadingSpinner = document.getElementById('loading-spinner');
  if (loadingSpinner) {
    setTimeout(() => {
      loadingSpinner.style.opacity = '0';
      setTimeout(() => {
        loadingSpinner.style.display = 'none';
      }, 300);
    }, 500);
  }
  
  // Initialize any page-specific animations
  initPageSpecificAnimations();
});

function initPageSpecificAnimations() {
  // Animate table rows on scroll for index.html
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const rows = entry.target.querySelectorAll('tr');
        rows.forEach((row, index) => {
          setTimeout(() => {
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
          }, index * 200);
        });
      }
    });
  }, observerOptions);
  
  // Observe table in index.html
  const table = document.querySelector('.referral-table');
  if (table) {
    const rows = table.querySelectorAll('tr');
    rows.forEach(row => {
      row.style.opacity = '0';
      row.style.transform = 'translateY(20px)';
      row.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    observer.observe(table);
  }
  
  // Animate level circles on scroll
  const circleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const circles = document.querySelectorAll('.level-circle');
        circles.forEach((circle, index) => {
          setTimeout(() => {
            circle.style.opacity = '1';
            circle.style.transform = 'scale(1)';
          }, index * 300);
        });
      }
    });
  }, { threshold: 0.3 });
  
  const flowSection = document.querySelector('.referral-flow');
  if (flowSection) {
    const circles = document.querySelectorAll('.level-circle');
    circles.forEach(circle => {
      circle.style.opacity = '0';
      circle.style.transform = 'scale(0.5)';
      circle.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    circleObserver.observe(flowSection);
  }
  
  // Animate feature cards
  const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.feature-card');
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 300);
        });
      }
    });
  }, { threshold: 0.2 });
  
  const featuresSection = document.querySelector('.features-grid');
  if (featuresSection) {
    const cards = featuresSection.querySelectorAll('.feature-card');
    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    featureObserver.observe(featuresSection);
  }
}

// Touch device improvements
if ('ontouchstart' in window) {
  document.addEventListener('DOMContentLoaded', function() {
    // Add touch feedback for buttons
    const buttons = document.querySelectorAll('button, .cta-btn, nav a, .preset-btn, .mute-btn');
    buttons.forEach(btn => {
      btn.addEventListener('touchstart', function() {
        this.style.opacity = '0.8';
      });
      btn.addEventListener('touchend', function() {
        this.style.opacity = '1';
      });
      btn.addEventListener('touchcancel', function() {
        this.style.opacity = '1';
      });
    });
    
    // Improve scrolling performance
    document.documentElement.style.setProperty('--webkit-overflow-scrolling', 'touch');
  });
}