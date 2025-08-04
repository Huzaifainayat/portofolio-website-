// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Advanced typing text animation with rotating phrases
    const typingText = document.querySelector('.typing-text');
    let phrases = [];
    
    if (typingText) {
        try {
            phrases = JSON.parse(typingText.getAttribute('data-text-rotate'));
        } catch (e) {
            phrases = ["Interactive Experience."];
        }
        
        let currentPhraseIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100; // milliseconds per character
        
        // Create a span for the cursor
        const cursorSpan = document.createElement('span');
        cursorSpan.classList.add('cursor');
        cursorSpan.innerHTML = '|';
        typingText.parentNode.insertBefore(cursorSpan, typingText.nextSibling);
        
        function typeText() {
            const currentPhrase = phrases[currentPhraseIndex];
            
            if (isDeleting) {
                // Deleting text
                typingText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = 50; // Faster when deleting
            } else {
                // Typing text
                typingText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 100; // Normal speed when typing
            }
            
            // Position the cursor after the text
        // Use requestAnimationFrame to ensure DOM has updated
        requestAnimationFrame(() => {
            const textRect = typingText.getBoundingClientRect();
            const parentRect = typingText.parentNode.getBoundingClientRect();
            cursorSpan.style.left = `${textRect.right - parentRect.left}px`;
            cursorSpan.style.top = `${textRect.top - parentRect.top}px`;
            cursorSpan.style.height = `${textRect.height}px`;
        });
            
            // If we've completed typing the current phrase
            if (!isDeleting && currentCharIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 1000; // Pause at the end
            } 
            // If we've deleted the entire phrase
            else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                typingSpeed = 500; // Pause before starting new phrase
            }
            
            setTimeout(typeText, typingSpeed);
        }
        
        // Start the typing animation
        setTimeout(typeText, 1000); // Initial delay
    }
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    const navLink = document.querySelectorAll('nav a');
    navLink.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });
    
    // Add smooth scrolling for all anchor links including the contact button
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Highlight active navigation link based on scroll position
        const sections = document.querySelectorAll('section[id], #hero');
        const navLinks = document.querySelectorAll('nav a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Add hover effects to skill logos
    const skillLogos = document.querySelectorAll('.skill-icon img, .skill-icons img');
    
    skillLogos.forEach(logo => {
        logo.addEventListener('mouseover', function() {
            // Add a subtle glow effect
            this.style.filter = 'drop-shadow(0 0 8px rgba(246, 165, 0, 0.7))';
            this.style.transform = 'scale(1.2)';
        });
        
        logo.addEventListener('mouseout', function() {
            // Reset to original state
            this.style.filter = '';
            this.style.transform = 'scale(1)';
        });
    });
    
    // Animate project cards on scroll
    const projectCards = document.querySelectorAll('.project-card');
    const seeMoreBtn = document.querySelector('.see-more-btn');
    
    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll animations
    function handleScrollAnimations() {
        projectCards.forEach(card => {
            if (isInViewport(card)) {
                card.style.animationPlayState = 'running';
                card.classList.add('show');
            }
        });
        
        const seeMoreContainer = document.querySelector('.see-more-container');
        if (seeMoreContainer && isInViewport(seeMoreContainer)) {
            seeMoreContainer.classList.add('animate');
            seeMoreContainer.classList.add('show');
        }
        
        // Animate contact section elements
        const contactInfo = document.querySelector('.contact-info');
        const contactForm = document.querySelector('.contact-form-container');
        
        if (contactInfo && contactForm) {
            if (isInViewport(contactInfo)) {
                contactInfo.style.opacity = '1';
            }
            
            if (isInViewport(contactForm)) {
                contactForm.style.opacity = '1';
            }
        }
    }
    
    // Initial check on page load
    handleScrollAnimations();
    
    // Check on scroll
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Add click functionality to project buttons
    const projectBtns = document.querySelectorAll('.project-btn');
    
    projectBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Prevent default behavior
            e.preventDefault();
            
            // Add a click effect
            this.classList.add('clicked');
            
            // Remove the effect after animation completes
            setTimeout(() => {
                this.classList.remove('clicked');
                
                // Get the href attribute
                const href = this.getAttribute('href');
                
                // If it's a real link (not just '#'), navigate to it
                if (href && href !== '#') {
                    window.open(href, '_blank');
                }
            }, 300);
        });
    });
    
    // Add functionality to See More button
    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add pulse animation
            this.classList.add('pulse');
            
            // Remove the effect after animation completes
            setTimeout(() => {
                this.classList.remove('pulse');
                
                // Get the href attribute
                const href = this.getAttribute('href');
                
                // If it's a real link (not just '#'), navigate to it
                if (href && href !== '#') {
                    window.location.href = href;
                }
            }, 500);
        });
    }
    
    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if the href is an anchor link
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 70, // Adjust for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Form input animation
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const icon = group.querySelector('.form-icon');
        
        if (input && icon) {
            input.addEventListener('focus', () => {
                icon.classList.add('icon-focus');
                group.classList.add('group-focus');
            });
            
            input.addEventListener('blur', () => {
                icon.classList.remove('icon-focus');
                group.classList.remove('group-focus');
            });
        }
    });
    
    // Add a ripple effect to the submit button
    const submitBtn = document.querySelector('.submit-btn');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            if (!this.classList.contains('disabled')) {
                const x = e.clientX - this.getBoundingClientRect().left;
                const y = e.clientY - this.getBoundingClientRect().top;
                
                const ripple = document.createElement('span');
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
        });
    }
    
    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const sendAnotherBtn = document.getElementById('sendAnother');
    
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const subjectError = document.getElementById('subjectError');
        const messageError = document.getElementById('messageError');
        
        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('.btn-icon');
        
        // Input focus effects
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        formInputs.forEach(input => {
            // Add focus effect
            input.addEventListener('focus', () => {
                input.parentElement.querySelector('.form-icon').style.color = '#ffffff';
            });
            
            // Remove focus effect
            input.addEventListener('blur', () => {
                input.parentElement.querySelector('.form-icon').style.color = '#f6a500';
                
                // Validate on blur
                validateInput(input);
            });
            
            // Clear error on input
            input.addEventListener('input', () => {
                const errorElement = document.getElementById(input.id + 'Error');
                if (errorElement) {
                    errorElement.style.opacity = '0';
                }
            });
        });
        
        // Validation function
        function validateInput(input) {
            const id = input.id;
            const value = input.value.trim();
            let errorElement;
            
            switch(id) {
                case 'name':
                    errorElement = nameError;
                    if (value === '') {
                        showError(errorElement, 'Please enter your name');
                        return false;
                    }
                    break;
                    
                case 'email':
                    errorElement = emailError;
                    if (value === '') {
                        showError(errorElement, 'Please enter your email');
                        return false;
                    } else if (!isValidEmail(value)) {
                        showError(errorElement, 'Please enter a valid email address');
                        return false;
                    }
                    break;
                    
                case 'subject':
                    errorElement = subjectError;
                    if (value === '') {
                        showError(errorElement, 'Please enter a subject');
                        return false;
                    }
                    break;
                    
                case 'message':
                    errorElement = messageError;
                    if (value === '') {
                        showError(errorElement, 'Please enter your message');
                        return false;
                    } else if (value.length < 10) {
                        showError(errorElement, 'Message must be at least 10 characters');
                        return false;
                    }
                    break;
            }
            
            return true;
        }
        
        // Show error message
        function showError(element, message) {
            if (element) {
                element.textContent = message;
                element.style.opacity = '1';
            }
        }
        
        // Email validation regex
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        // Form submission
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate all inputs
            const isNameValid = validateInput(nameInput);
            const isEmailValid = validateInput(emailInput);
            const isSubjectValid = validateInput(subjectInput);
            const isMessageValid = validateInput(messageInput);
            
            if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
                // Show loading state
                submitBtn.disabled = true;
                btnText.textContent = 'Sending...';
                btnIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                
                // Simulate form submission (replace with actual form submission)
                setTimeout(() => {
                    // Reset form
                    contactForm.reset();
                    
                    // Show success message
                    if (formSuccess) {
                        formSuccess.classList.add('active');
                    }
                    
                    // Reset button state
                    submitBtn.disabled = false;
                    btnText.textContent = 'Send Message';
                    btnIcon.innerHTML = '<i class="fas fa-paper-plane"></i>';
                }, 2000);
            }
        });
        
        // Send another message button
        if (sendAnotherBtn) {
            sendAnotherBtn.addEventListener('click', () => {
                if (formSuccess) {
                    formSuccess.classList.remove('active');
                }
            });
        }
    }
});