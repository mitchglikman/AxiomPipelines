// ===========================
// Mobile Navigation Toggle
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    });

    // ===========================
    // Smooth Scroll Enhancement
    // ===========================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===========================
    // Navbar Scroll Effect
    // ===========================
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add shadow when scrolled
        if (currentScroll > 10) {
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // ===========================
    // Scroll Animation Observer
    // ===========================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // ===========================
    // Consultation Form Handling
    // ===========================
    const consultationForm = document.getElementById('consultation-form');

    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                firstName: document.getElementById('first-name').value,
                lastName: document.getElementById('last-name').value,
                email: document.getElementById('email').value
            };

            // Validate form
            if (!formData.firstName || !formData.lastName || !formData.email) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission (replace with actual API call)
            submitConsultationForm(formData);
        });
    }

    // ===========================
    // Form Submission Function
    // ===========================
    function submitConsultationForm(data) {
        const submitButton = consultationForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;

        // Show loading state
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;

        // Simulate API call (replace with actual endpoint)
        setTimeout(function() {
            // Success response
            showNotification('Thank you! We\'ll contact you within 24 hours to schedule your consultation.', 'success');
            consultationForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;

            // Log form data (for development - remove in production)
            console.log('Form submitted:', data);

            // TODO: Replace with actual API call
            // fetch('/api/consultation', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(data)
            // })
            // .then(response => response.json())
            // .then(data => {
            //     showNotification('Thank you! We\'ll contact you within 24 hours.', 'success');
            //     consultationForm.reset();
            // })
            // .catch(error => {
            //     showNotification('There was an error. Please try again.', 'error');
            // })
            // .finally(() => {
            //     submitButton.textContent = originalText;
            //     submitButton.disabled = false;
            // });
        }, 1500);
    }

    // ===========================
    // Notification System
    // ===========================
    function showNotification(message, type = 'info') {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            border-radius: 5px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 350px;
        `;

        // Add animation keyframes
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Append to body
        document.body.appendChild(notification);

        // Remove after 5 seconds
        setTimeout(function() {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(function() {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // ===========================
    // Service Cards Click Analytics
    // ===========================
    const serviceCards = document.querySelectorAll('.service-card-wrapper');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceName = this.querySelector('.service-title').textContent;
            console.log('Service clicked:', serviceName);
            
            // TODO: Add analytics tracking
            // gtag('event', 'service_click', {
            //     'service_name': serviceName
            // });
        });
    });

    // ===========================
    // CTA Button Tracking
    // ===========================
    const ctaButtons = document.querySelectorAll('.cta-button, .footer-cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('CTA clicked:', this.textContent);
            
            // TODO: Add analytics tracking
            // gtag('event', 'cta_click', {
            //     'button_text': this.textContent
            // });
        });
    });

    // ===========================
    // Initialize on Load
    // ===========================
    console.log('Axiom Pipelines website initialized');
    
    // Add initial visible class to hero content
    setTimeout(function() {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('visible');
        }
    }, 100);
});

// ===========================
// Utility Functions
// ===========================

// Debounce function for performance
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
