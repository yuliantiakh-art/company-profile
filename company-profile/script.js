/**
 * Codex Digital Studio - Landing Page Interactivity
 * Author: Antigravity Code Assistant
 * Date: 2026-06-05
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       DARK & LIGHT THEME TOGGLE
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check saved theme or system preferences
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    let currentTheme = 'light';
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        currentTheme = 'dark';
    }
    
    setTheme(currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme');
        const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
    });

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update toggle icon
        if (theme === 'dark') {
            themeIcon.className = 'fa-solid fa-sun';
        } else {
            themeIcon.className = 'fa-solid fa-moon';
        }
    }


    /* ==========================================================================
       STICKY NAVBAR & ACTIVE NAVIGATION LINK SYNC
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        highlightActiveLink();
    });

    // Highlight active link based on scroll position
    function highlightActiveLink() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // offset for sticky nav
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }


    /* ==========================================================================
       MOBILE MENU DRAWER
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const drawerClose = document.getElementById('drawer-close');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const drawerLinks = document.querySelectorAll('.drawer-link, .btn-drawer-cta');

    mobileToggle.addEventListener('click', openDrawer);
    drawerClose.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);

    // Close drawer when clicking links
    drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    function openDrawer() {
        mobileDrawer.classList.add('open');
        drawerOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent main page scrolling
    }

    function closeDrawer() {
        mobileDrawer.classList.remove('open');
        drawerOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }


    /* ==========================================================================
       PORTFOLIO CATEGORY FILTER
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                // Add filter transition
                item.style.transform = 'scale(0.85)';
                item.style.opacity = '0';
                
                setTimeout(() => {
                    if (filterValue === 'all' || itemCategory === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.transform = 'scale(1)';
                            item.style.opacity = '1';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                }, 300);
            });
        });
    });


    /* ==========================================================================
       CONTACT FORM VALIDATION & SIMULATION
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('btn-submit-form');
    const successAlert = document.getElementById('successAlert');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Name Validation
        if (nameInput.value.trim() === '') {
            showError(nameInput);
            isValid = false;
        } else {
            clearError(nameInput);
        }
        
        // Email Validation
        if (emailInput.value.trim() === '') {
            showError(emailInput);
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            showError(emailInput);
            isValid = false;
        } else {
            clearError(emailInput);
        }
        
        // Subject Validation
        if (subjectInput.value.trim() === '') {
            showError(subjectInput);
            isValid = false;
        } else {
            clearError(subjectInput);
        }
        
        // Message Validation
        if (messageInput.value.trim() === '') {
            showError(messageInput);
            isValid = false;
        } else {
            clearError(messageInput);
        }
        
        if (isValid) {
            // Show loading animation
            submitBtn.classList.add('loading');
            
            // Simulate API request (1.5 seconds)
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                successAlert.classList.add('show');
                contactForm.reset();
                
                // Hide alert and reset state after 8 seconds
                setTimeout(() => {
                    successAlert.classList.remove('show');
                }, 8000);
                
            }, 1500);
        }
    });

    // Helper functions for validation
    function showError(inputElement) {
        const formGroup = inputElement.parentElement;
        formGroup.classList.add('invalid');
    }

    function clearError(inputElement) {
        const formGroup = inputElement.parentElement;
        formGroup.classList.remove('invalid');
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Clear validation styling when user starts typing
    const inputs = [nameInput, emailInput, subjectInput, messageInput];
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                clearError(input);
            }
        });
    });


    /* ==========================================================================
       NEWSLETTER FORM SUBMISSION
       ========================================================================== */
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value) {
                // Show simple feedback
                const origVal = emailInput.value;
                alert(`Terima kasih! Email Anda (${origVal}) telah berhasil didaftarkan untuk langganan berita.`);
                newsletterForm.reset();
            }
        });
    }
});
