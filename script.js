// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');
if(mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        mobileBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if(navLinks.classList.contains('active')) {
            mobileBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Smooth scroll for anchor links with header offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Popup Modal Logic
const offerModal = document.getElementById('offer-modal');
const closeOffer = document.getElementById('close-offer');
let hasShownModal = false;

const showModal = () => {
    if (!hasShownModal && offerModal) {
        offerModal.classList.add('active');
        hasShownModal = true;
    }
};

if (closeOffer) {
    closeOffer.addEventListener('click', () => {
        offerModal.classList.remove('active');
    });
}

if (offerModal) {
    offerModal.addEventListener('click', (e) => {
        if (e.target === offerModal) {
            offerModal.classList.remove('active');
        }
    });
}

// Handle Offer Form Submit
const offerForm = document.getElementById('offer-form');
if (offerForm) {
    offerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        btn.innerText = 'Access Granted!';
        btn.style.backgroundColor = '#4CAF50';
        btn.style.color = '#fff';
        setTimeout(() => {
            offerModal.classList.remove('active');
        }, 1500);
    });
}

// Show modal when reaching the third section (Services)
const servicesSection = document.getElementById('services');
let scrollTriggered = false;

const popupObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // More sensitive trigger for mobile (less scroll needed)
        const scrollThreshold = window.innerWidth < 768 ? 100 : 300;
        const intersectionThreshold = entry.isIntersecting;

        if (intersectionThreshold && !scrollTriggered && window.scrollY > scrollThreshold) {
            showModal();
            scrollTriggered = true;
            popupObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });



if (servicesSection) {
    popupObserver.observe(servicesSection);
}


// FAQ Accordion Logic
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(item => {
    item.addEventListener('click', function() {
        const parent = this.parentElement;
        const isActive = parent.classList.contains('active');
        
        // Close all items first
        document.querySelectorAll('.faq-item').forEach(other => {
            other.classList.remove('active');
        });
        
        // If the clicked item wasn't active, open it
        if (!isActive) {
            parent.classList.add('active');
        }
    });
});

// Testimonial Slider Logic
const testCards = document.querySelectorAll('.testimonial-card');
const testDots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prev-test');
const nextBtn = document.getElementById('next-test');
let currentTest = 0;
let autoSlideInterval;

function showTestimonial(index) {
    if (!testCards.length) return;
    
    testCards.forEach(card => card.classList.remove('active'));
    testDots.forEach(dot => dot.classList.remove('active'));
    
    testCards[index].classList.add('active');
    testDots[index].classList.add('active');
    currentTest = index;
}

function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
        let next = (currentTest + 1) % testCards.length;
        showTestimonial(next);
    }, 8000);
}

if (testCards.length > 0) {
    testDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
            startAutoSlide();
        });
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            let prev = (currentTest - 1 + testCards.length) % testCards.length;
            showTestimonial(prev);
            startAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            let next = (currentTest + 1) % testCards.length;
            showTestimonial(next);
            startAutoSlide();
        });
    }

    startAutoSlide();
}

// Scroll Reveal Animation
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section, .service-card-premium, .fleet-card, .why-card, .route-card').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});
