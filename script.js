// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

// Update year in footer automatically
const yearElement = document.getElementById('year');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear.toString();
}

// Add animation to skill cards if on skills page
const skillCards = document.querySelectorAll('.skill-card');
if (skillCards.length > 0) {
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    skillCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// Same animation for project cards if on projects page
const projectCards = document.querySelectorAll('.project-card');
if (projectCards.length > 0) {
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    projectCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Handle mobile menu toggle if it exists
const navLinks = document.querySelector('.nav-links');
if (navLinks) {
    const toggleMenu = () => {
        navLinks.classList.toggle('open');
    };

    // Add click event for mobile menu if it exists
    const menuBtn = document.querySelector('.menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking on a link
    const navLinksArray = document.querySelectorAll('.nav-links a');
    navLinksArray.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });
}

// Handle contact form submission if it exists
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    // Add input validation on blur
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Validate name field
    nameInput.addEventListener('blur', function() {
        validateField(this, 'nameError', value => value.trim().length > 0);
    });
    
    // Validate message field
    messageInput.addEventListener('blur', function() {
        validateField(this, 'messageError', value => value.trim().length > 0);
    });
    
    // Generic validation function
    function validateField(field, errorId, validationFn) {
        const errorElement = document.getElementById(errorId);
        if (!validationFn(field.value)) {
            field.classList.add('invalid');
            errorElement.style.display = 'block';
            return false;
        } else {
            field.classList.remove('invalid');
            errorElement.style.display = 'none';
            return true;
        }
    }
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateField(nameInput, 'nameError', value => value.trim().length > 0);

        const isMessageValid = validateField(messageInput, 'messageError', value => value.trim().length > 0);
        
        // If all valid, show success message
        if (isNameValid && isEmailValid && isMessageValid) {
            // Hide the form
            contactForm.style.opacity = '0';
            
            // In a real application, you would send data to a server here
            
            // Show success message
            const successMessage = document.getElementById('successMessage');
            setTimeout(() => {
                successMessage.classList.add('show');
                contactForm.style.display = 'none';
            }, 300);
            
            // Reset form for next time
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.opacity = '1';
                successMessage.classList.remove('show');
                contactForm.style.display = 'block';
            }, 5000);
        }
    });
}

// Animation on scroll - Only initialize if IntersectionObserver is supported
if ('IntersectionObserver' in window) {
    const animatedElements = document.querySelectorAll('.animated');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// DOM yüklendikten sonra çalışacak kodlar
document.addEventListener('DOMContentLoaded', function() {
    // Handle mailto functionality
    const mailtoBtn = document.getElementById('mailtoBtn');
    if (mailtoBtn) {
        mailtoBtn.addEventListener('click', function() {
            const name = document.getElementById('name').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Form validation - show error messages instead of alert
            let isValid = true;
            
            if (!name) {
                const nameError = document.getElementById('nameError');
                const nameInput = document.getElementById('name');
                nameInput.classList.add('invalid');
                nameError.style.display = 'block';
                isValid = false;
            }
            
            if (!message) {
                const messageError = document.getElementById('messageError');
                const messageInput = document.getElementById('message');
                messageInput.classList.add('invalid');
                messageError.style.display = 'block';
                isValid = false;
            }
            
            if (!isValid) {
                return;
            }
            
            // Create mailto link with form data
            const subject = `İletişim Formu: ${name}`;
            const body = `İsim: ${name}%0D%0A%0D%0AMesaj:%0D%0A${message}`;
            const mailtoLink = `mailto:elasemrasava@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
            
            // Open default mail client
            window.location.href = mailtoLink;
            
            // Show success message
            const contactForm = document.getElementById('contactForm');
            const successMessage = document.getElementById('successMessage');
            
            contactForm.style.opacity = '0';
            setTimeout(() => {
                successMessage.classList.add('show');
                contactForm.style.display = 'none';
            }, 300);
            
            // Reset form for next time
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.opacity = '1';
                successMessage.classList.remove('show');
                contactForm.style.display = 'block';
            }, 5000);
        });
    }
});

// Animate skill bars when they come into view
const animateSkillBars = () => {
    const skillSections = document.querySelectorAll('.skills-section');
    
    if (skillSections.length > 0) {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const levelFills = entry.target.querySelectorAll('.level-fill');
                    
                    levelFills.forEach(fill => {
                        const targetWidth = fill.style.width;
                        // Reset width to 0 before animation
                        fill.style.width = '0';
                        
                        // Trigger animation after a small delay
                        setTimeout(() => {
                            fill.style.width = targetWidth;
                        }, 200);
                    });
                    
                    // Unobserve after animation starts
                    skillObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe each skills section
        skillSections.forEach(section => {
            skillObserver.observe(section);
        });
    }
};

// Run the skill bar animation when the page loads
if (document.querySelector('.skills-section')) {
    animateSkillBars();
} 