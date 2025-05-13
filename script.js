document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library with enhanced settings
    AOS.init({
        duration: 800,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)', // Smooth easing
        once: false, // Allow animations to occur each time element scrolls into view
        mirror: true, // Mirror animations when scrolling back up
        delay: 100, // Small delay for staggered effect
        anchorPlacement: 'top-bottom' // Trigger animation when the top of the element hits the bottom of the viewport
    });

    // Mobile menu toggle with animation
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            // Toggle menu visibility
            mobileMenu.classList.toggle('hidden');
            
            // Animate the menu icon
            this.classList.toggle('open');
            
            // Add slide-down animation to mobile menu
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.style.maxHeight = '0';
                setTimeout(() => {
                    mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
                }, 10);
            } else {
                mobileMenu.style.maxHeight = '0';
            }
        });
    }

    // Get all sections that need to be observed
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Function to update active navigation link
    function updateActiveLink(current) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });

        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }

    // Intersection Observer for section visibility
    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: "-50% 0px", // Trigger when section is 50% in view
        threshold: 0 // Trigger as soon as any part of the element is visible
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateActiveLink(entry.target.id);
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }

            // Scroll to the target section
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // In a real scenario, you'd send this data to a server
            console.log('Form submission:', { name, email, message });
            
            // Show thank you message
            showFlashMessage('Thanks! Your message has been sent.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Function to show flash message with enhanced styling
    function showFlashMessage(message) {
        // Check if a message already exists and remove it
        const existingMessage = document.querySelector('.flash-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message element with icon
        const flashMessage = document.createElement('div');
        flashMessage.className = 'flash-message';
        
        // Add success icon
        const messageContent = `
            <div class="flex items-center">
                <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>${message}</span>
            </div>
        `;
        
        flashMessage.innerHTML = messageContent;
        document.body.appendChild(flashMessage);
        
        // Add animation effects
        flashMessage.style.transform = 'translateY(-20px)';
        flashMessage.style.opacity = '0';
        
        // Make visible with animation
        setTimeout(() => {
            flashMessage.classList.add('visible');
            flashMessage.style.transform = 'translateY(0)';
            flashMessage.style.opacity = '1';
        }, 10);
        
        // Remove after 3 seconds with exit animation
        setTimeout(() => {
            flashMessage.style.transform = 'translateY(-10px)';
            flashMessage.style.opacity = '0';
            setTimeout(() => {
                flashMessage.remove();
            }, 500); // Wait for fade out transition
        }, 3000);
    }
});
