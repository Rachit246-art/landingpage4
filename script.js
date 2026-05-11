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

// CHATBOT LOGIC
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInputContainer = document.getElementById('chatbot-input-container');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');

let chatState = {
    step: 'welcome',
    data: {}
};

const chatFlow = {
    welcome: {
        bot: "Welcome to RV Global Aviation. We specialize in premium private jet, helicopter, and international charter services for business leaders, VIP travelers, leisure trips, and urgent aviation requirements. <br><br> How may we assist you today?",
        buttons: ["Domestic Charter", "International Charter", "Helicopter Charter", "Corporate Travel", "Pilgrimage Charter", "Emergency Charter", "Speak to Aviation Expert"],
        nextStep: 'step1'
    },
    step1: {
        bot: "Please select your travel requirement.",
        buttons: ["One Way", "Round Trip", "Multi-City", "Same Day Return", "Urgent Departure"],
        nextStep: 'step2'
    },
    step2: {
        bot: "Please enter your departure city or airport.",
        inputType: 'text',
        nextStep: 'step3'
    },
    step3: {
        bot: "Please enter your destination city or airport.",
        inputType: 'text',
        nextStep: 'step4'
    },
    step4: {
        bot: "When would you like to fly?",
        inputType: 'date',
        nextStep: 'step5'
    },
    step5: {
        bot: "Please select your preferred departure timing.",
        buttons: ["Early Morning", "Morning", "Afternoon", "Evening", "Flexible Timing"],
        nextStep: 'step6'
    },
    step6: {
        bot: "How many passengers will be traveling?",
        buttons: ["1-3 Passengers", "4-6 Passengers", "7-10 Passengers", "10+ Passengers"],
        nextStep: 'step7'
    },
    step7: {
        bot: "Please select the purpose of your charter.",
        buttons: ["Business Travel", "Leisure / Family", "Religious Trip", "Wedding / Event", "Medical Emergency", "VIP Movement", "Corporate Team Travel"],
        nextStep: 'step8'
    },
    step8: {
        bot: "Do you have a preferred aircraft category?",
        buttons: ["Light Jet", "Mid-Size Jet", "Heavy Jet", "Turbo Prop", "Helicopter", "Suggest Best Option"],
        nextStep: 'step9'
    },
    step9: {
        bot: "Would you require any additional premium services?",
        buttons: ["Luxury Ground Transfer", "In-Flight Catering", "Hotel Assistance", "Visa Assistance", "Concierge Services", "Fast Track Airport Assistance", "No Additional Services"],
        nextStep: 'step10'
    },
    step10: {
        bot: "Please select your preferred charter experience.",
        buttons: ["Most Efficient Option", "Premium Comfort", "Ultra Luxury Experience"],
        nextStep: 'step11'
    },
    step11: {
        bot: "Please share your details so our aviation specialist can prepare aircraft availability and charter quotations.",
        inputType: 'form',
        nextStep: 'final'
    },
    final: {
        bot: "Thank you for choosing RV Global Aviation. <br><br> Your charter request has been successfully submitted. Our aviation specialist will contact you shortly with suitable aircraft options, availability, and estimated charter pricing. <br><br> For urgent departures, our team prioritizes immediate assistance."
    }
};

function addMessage(text, type) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${type}-message`;
    msgDiv.innerHTML = text;
    chatbotMessages.appendChild(msgDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function addButtons(buttons) {
    const btnContainer = document.createElement('div');
    btnContainer.className = 'chat-buttons';
    buttons.forEach(btnText => {
        const btn = document.createElement('button');
        btn.className = 'chat-btn';
        btn.innerText = btnText;
        btn.onclick = () => handleUserInput(btnText);
        btnContainer.appendChild(btn);
    });
    chatbotMessages.appendChild(btnContainer);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function addForm() {
    const form = document.createElement('form');
    form.className = 'chat-form';
    form.innerHTML = `
        <input type="text" id="chat-name" placeholder="Full Name" required>
        <input type="tel" id="chat-phone" placeholder="Mobile Number" required>
        <input type="email" id="chat-email" placeholder="Email Address" required>
        <input type="text" id="chat-company" placeholder="Company Name (Optional)">
        <button type="submit" class="chat-submit">Get Charter Quote</button>
    `;
    form.onsubmit = (e) => {
        e.preventDefault();
        const data = {
            name: document.getElementById('chat-name').value,
            phone: document.getElementById('chat-phone').value,
            email: document.getElementById('chat-email').value,
            company: document.getElementById('chat-company').value
        };
        handleUserInput(`Submitted: ${data.name}`, data);
    };
    chatbotMessages.appendChild(form);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function processStep(stepKey) {
    const step = chatFlow[stepKey];
    if (!step) return;

    chatState.step = stepKey;
    
    // Add bot message
    setTimeout(() => {
        addMessage(step.bot, 'bot');
        
        // Handle next interaction type
        if (step.buttons) {
            addButtons(step.buttons);
            chatbotInputContainer.classList.add('hidden');
        } else if (step.inputType === 'text') {
            chatbotInputContainer.classList.remove('hidden');
            chatbotInput.type = 'text';
            chatbotInput.focus();
        } else if (step.inputType === 'date') {
            chatbotInputContainer.classList.remove('hidden');
            chatbotInput.type = 'date';
            chatbotInput.focus();
        } else if (step.inputType === 'form') {
            addForm();
            chatbotInputContainer.classList.add('hidden');
        } else {
            chatbotInputContainer.classList.add('hidden');
        }
    }, 500);
}

function handleUserInput(input, formData = null) {
    // Add user message
    addMessage(input, 'user');
    
    // Store data if needed
    chatState.data[chatState.step] = formData || input;
    
    // Process next step
    const currentStep = chatFlow[chatState.step];
    if (currentStep && currentStep.nextStep) {
        if (chatState.step === 'step11') {
            sendLeadEmail(chatState.data);
        }
        processStep(currentStep.nextStep);
    }
}

function sendLeadEmail(data) {
    // Format the data for the email
    const emailParams = {
        customer_name: data.step11.name,
        customer_phone: data.step11.phone,
        customer_email: data.step11.email,
        company: data.step11.company || 'N/A',
        service_type: data.welcome,
        charter_type: data.step1,
        departure: data.step2,
        destination: data.step3,
        travel_date: data.step4,
        preferred_time: data.step5,
        passengers: data.step6,
        purpose: data.step7,
        aircraft: data.step8,
        additional_services: data.step9,
        experience: data.step10
    };

    console.log("Sending Lead Data:", emailParams);

    // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with actual IDs from EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });
}

chatbotToggle.onclick = () => {
    chatbotWindow.classList.toggle('active');
    if (chatbotWindow.classList.contains('active') && chatbotMessages.children.length === 0) {
        processStep('welcome');
    }
};

// Handle external triggers
document.querySelectorAll('.trigger-chatbot').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        chatbotWindow.classList.add('active');
        if (chatbotMessages.children.length === 0) {
            processStep('welcome');
        }
    });
});

chatbotClose.onclick = () => {
    chatbotWindow.classList.remove('active');
};

chatbotSend.onclick = () => {
    const val = chatbotInput.value.trim();
    if (val) {
        chatbotInput.value = '';
        handleUserInput(val);
    }
};

chatbotInput.onkeypress = (e) => {
    if (e.key === 'Enter') {
        chatbotSend.click();
    }
};
