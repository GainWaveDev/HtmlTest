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
    muteBtn.addEventListener('click', function() {
      video.muted = !video.muted;
      const icon = muteBtn.querySelector('i');
      if (icon) {
        icon.className = video.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
      }
    });
    
    // Add keyboard support
    muteBtn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        video.muted = !video.muted;
      }
    });
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
      const message = this.querySelector('textarea');
      const submitBtn = this.querySelector('button[type="submit"]');
      
      let isValid = true;
      
      // Reset error states
      [name, email, message].forEach(input => {
        input.style.borderColor = '#e0e0e0';
      });
      
      // Validate name
      if (!name.value.trim()) {
        name.style.borderColor = '#ff4444';
        isValid = false;
      }
      
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value)) {
        email.style.borderColor = '#ff4444';
        isValid = false;
      }
      
      // Validate message
      if (!message.value.trim()) {
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
        const animatedElements = entry.target.querySelectorAll('.about-card, .feature-card, .value-box, .contact-item');
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

// Add loading animation for page transitions
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
  
  // Remove loading spinner if exists
  const loadingSpinner = document.getElementById('loading-spinner');
  if (loadingSpinner) {
    loadingSpinner.style.display = 'none';
  }
});