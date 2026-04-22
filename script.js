/**
 * Portfolio Website - Main JavaScript
 * Handles theme toggle, mobile navigation, and scroll animations
 */

// ========================================
// Theme Toggle with localStorage Persistence
// ========================================
const ThemeToggle = {
    init() {
        this.toggle = document.querySelector('.theme-toggle');
        this.html = document.documentElement;

        // Load saved theme or default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);

        this.toggle.addEventListener('click', () => this.toggleTheme());
    },

    toggleTheme() {
        const currentTheme = this.html.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    },

    setTheme(theme) {
        this.html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
};

// ========================================
// Mobile Navigation
// ========================================
const MobileNav = {
    init() {
        this.menuBtn = document.querySelector('.mobile-menu-btn');
        this.navLinks = document.querySelector('.nav-links');

        this.menuBtn.addEventListener('click', () => this.toggleMenu());

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Close menu on resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 968) {
                this.closeMenu();
            }
        });
    },

    toggleMenu() {
        this.menuBtn.classList.toggle('active');
        this.navLinks.classList.toggle('active');
    },

    closeMenu() {
        this.menuBtn.classList.remove('active');
        this.navLinks.classList.remove('active');
    }
};

// ========================================
// Scroll Animations using Intersection Observer
// ========================================
const ScrollAnimations = {
    init() {
        // Elements to animate
        const animatedElements = document.querySelectorAll(`
            .timeline-item,
            .skill-category,
            .project-card,
            .education-card,
            .contact-card
        `);

        // Set initial state
        animatedElements.forEach(el => {
            el.classList.add('fade-in');
        });

        // Create observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Unobserve after animation triggers (performance optimization)
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all animated elements
        animatedElements.forEach(el => observer.observe(el));

        // Navbar scroll effect
        this.initNavbarScroll();
    },

    initNavbarScroll() {
        const nav = document.querySelector('.nav');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Add shadow on scroll
            if (currentScroll > 50) {
                nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
            } else {
                nav.style.boxShadow = 'none';
            }

            lastScroll = currentScroll;
        });
    }
};

// ========================================
// Smooth Scroll for Navigation Links
// ========================================
const SmoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');

                // Skip if it's just "#"
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
};

// ========================================
// Active Navigation Link Highlight
// ========================================
const ActiveNavHighlight = {
    init() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.updateActiveLink(id);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-80px 0px -50% 0px'
        });

        sections.forEach(section => observer.observe(section));
    },

    updateActiveLink(id) {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });
    }
};

// ========================================
// Typing Effect for Hero Title (Optional Enhancement)
// ========================================
const TypingEffect = {
    init() {
        const title = document.querySelector('.hero-title');
        if (!title) return;

        const roles = [
            'Data Science & AI Engineer',
            'Machine Learning Specialist',
            'Deep Learning Expert',
            'Data Pipeline Architect'
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        // Only apply on larger screens to avoid layout issues
        if (window.innerWidth < 768) return;

        this.type(roles, roleIndex, charIndex, isDeleting, typingSpeed, title);
    },

    type(roles, roleIndex, charIndex, isDeleting, typingSpeed, element) {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            element.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            element.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before next word
        }

        setTimeout(() => {
            this.type(roles, roleIndex, charIndex, isDeleting, typingSpeed, element);
        }, typingSpeed);
    }
};

// ========================================
// Parallax Effect for Hero Blob
// ========================================
const ParallaxEffect = {
    init() {
        const blob = document.querySelector('.hero-blob');
        if (!blob) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroSection = document.querySelector('.hero');

            if (!heroSection) return;

            const heroOffset = heroSection.offsetTop;
            const heroHeight = heroSection.offsetHeight;
            const windowHeight = window.innerHeight;

            // Only apply parallax when hero is in view
            if (scrolled < heroOffset + heroHeight) {
                const progress = scrolled / (heroOffset + heroHeight);
                const translateY = progress * 100;
                blob.style.transform = `translateY(${translateY}px)`;
            }
        });
    }
};

// ========================================
// Download CV Button Analytics (Optional)
// ========================================
const DownloadTracker = {
    init() {
        const downloadBtn = document.querySelector('a[download]');
        if (!downloadBtn) return;

        downloadBtn.addEventListener('click', () => {
            // Track download event (could be extended with analytics)
            console.log('CV Download initiated');

            // Add visual feedback
            downloadBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                downloadBtn.style.transform = '';
            }, 150);
        });
    }
};

// ========================================
// Initialize All Modules
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    ThemeToggle.init();
    MobileNav.init();
    ScrollAnimations.init();
    SmoothScroll.init();
    ActiveNavHighlight.init();
    ParallaxEffect.init();
    DownloadTracker.init();

    // Optional: Uncomment to enable typing effect
    // TypingEffect.init();

    // Log initialization
    console.log('Portfolio website initialized');
});

// ========================================
// Utility: Debounce Function
// ========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// Utility: Throttle Function
// ========================================
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
