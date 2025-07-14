// Portfolio JavaScript - Animations and Interactions

document.addEventListener('DOMContentLoaded', function() {
    // Typing animation
    initTypingAnimation();
    
    // Smooth scrolling for navigation
    initSmoothScrolling();
    
    // Skills animation on scroll
    initSkillsAnimation();
    
    // Mobile navigation toggle
    initMobileNavigation();
    
    // Contact form handling
    initContactForm();
    
    // Navbar scroll effect
    initNavbarScrollEffect();
});

// Typing Animation
function initTypingAnimation() {
    const typingText = document.getElementById('typingText');
    const text = "First-class mind, actuarial edge.";
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            typingText.textContent = text.slice(0, index + 1);
            index++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 500);
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                scrollToSection(targetId);
            }
        });
    });
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Skills Animation
function initSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                
                // Animate the progress bar
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 200);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Mobile Navigation
function initMobileNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showNotification('Message sent successfully!', 'success');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// Navbar Scroll Effect
function initNavbarScrollEffect() {
    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.style.background = 'rgba(13, 15, 23, 0.95)';
        } else {
            nav.style.background = 'rgba(13, 15, 23, 0.8)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 24px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '600',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        backgroundColor: type === 'success' ? '#10b981' : '#ef4444'
    });
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add mobile navigation styles
const mobileNavStyles = `
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        top: 4rem;
        left: 0;
        right: 0;
        background: rgba(13, 15, 23, 0.98);
        backdrop-filter: blur(10px);
        flex-direction: column;
        padding: 2rem;
        transform: translateY(-100%);
        transition: transform 0.3s ease;
        border-bottom: 1px solid var(--border);
    }
    
    .nav-menu.active {
        display: flex;
        transform: translateY(0);
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
}
`;

// Inject mobile navigation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileNavStyles;
document.head.appendChild(styleSheet);
