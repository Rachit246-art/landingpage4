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

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission simulation
document.getElementById('charter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.innerText;
    
    btn.innerText = 'Sending...';
    btn.style.opacity = '0.8';
    
    setTimeout(() => {
        btn.innerText = 'Request Received';
        btn.style.backgroundColor = '#4CAF50';
        btn.style.color = '#fff';
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = '';
            btn.style.color = '';
            btn.style.opacity = '1';
            e.target.reset();
        }, 3000);
    }, 1500);
});

// Popup Modal Logic
const offerModal = document.getElementById('offer-modal');
const closeOffer = document.getElementById('close-offer');
let hasShownModal = false;

// Function to show modal
const showModal = () => {
    if (!hasShownModal) {
        offerModal.classList.add('active');
        hasShownModal = true;
    }
};

// Close modal when X is clicked
closeOffer.addEventListener('click', () => {
    offerModal.classList.remove('active');
});

// Close modal when clicking outside
offerModal.addEventListener('click', (e) => {
    if (e.target === offerModal) {
        offerModal.classList.remove('active');
    }
});

// Handle Offer Form Submit
document.getElementById('offer-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.innerText = 'Unlocked!';
    btn.style.backgroundColor = '#4CAF50';
    btn.style.color = '#fff';
    setTimeout(() => {
        offerModal.classList.remove('active');
    }, 1500);
});

// Show modal immediately after page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(showModal, 500);
});

// Exit intent: Show modal when cursor leaves the window area
document.addEventListener('mouseout', (e) => {
    if (e.clientY <= 0) {
        showModal();
    }
});
