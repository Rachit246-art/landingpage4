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

// Form submission simulation for Quick Charter Form
const quickForm = document.getElementById('quick-charter-form');
if (quickForm) {
    quickForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerText = 'Sending Request...';
        btn.style.opacity = '0.8';
        
        setTimeout(() => {
            btn.innerText = 'Quote Request Received';
            btn.style.backgroundColor = '#4CAF50';
            btn.style.borderColor = '#4CAF50';
            btn.style.color = '#fff';
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = '';
                btn.style.borderColor = '';
                btn.style.color = '';
                btn.style.opacity = '1';
                e.target.reset();
            }, 3000);
        }, 1500);
    });
}

// Popup Modal Logic
const offerModal = document.getElementById('offer-modal');
const closeOffer = document.getElementById('close-offer');
let hasShownModal = false;

// Function to show modal
const showModal = () => {
    if (!hasShownModal && offerModal) {
        offerModal.classList.add('active');
        hasShownModal = true;
    }
};

// Close modal when X is clicked
if (closeOffer) {
    closeOffer.addEventListener('click', () => {
        offerModal.classList.remove('active');
    });
}

// Close modal when clicking outside
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

// Show modal delay after page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(showModal, 3000); // 3 second delay for better UX
});

// Exit intent: Show modal when cursor leaves the window area
document.addEventListener('mouseout', (e) => {
    if (e.clientY <= 0) {
        showModal();
    }
});
