// ============================================
// LOADER
// ============================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);
});

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.nav');
    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// HAMBURGER MENU
// ============================================
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        menu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// ============================================
// SEARCH BOX TOGGLE
// ============================================
const searchIcon = document.querySelector('.search-icon');
const searchBox = document.querySelector('.search-box');

if (searchIcon && searchBox) {
    searchIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        searchBox.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!searchBox.contains(e.target) && !searchIcon.contains(e.target)) {
            searchBox.classList.remove('active');
        }
    });
}

// ============================================
// HERO SLIDER
// ============================================
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const slider = document.getElementById('slider');

function updateSlider() {
    if (slider) {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
}

function changeSlide(direction) {
    currentIndex += direction;
    
    if (currentIndex < 0) {
        currentIndex = slides.length - 1;
    } else if (currentIndex >= slides.length) {
        currentIndex = 0;
    }
    
    updateSlider();
}

function currentSlide(index) {
    currentIndex = index;
    updateSlider();
}

// Auto-play slider
let autoPlay = setInterval(() => {
    changeSlide(1);
}, 5000);

// Pause on hover
if (slider) {
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoPlay);
    });

    slider.addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => {
            changeSlide(1);
        }, 5000);
    });
}

// ============================================
// SHOPPING CART FUNCTIONALITY
// ============================================
let cart = [];
let cartCount = 0;

function updateCartCount() {
    const cartBadges = document.querySelectorAll('.cart-badge, .cart-count');
    cartBadges.forEach(badge => {
        badge.textContent = cartCount;
        if (cartCount > 0) {
            badge.style.display = 'flex';
        }
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    cartCount++;
    updateCartCount();
    showToast(`${productName} added to cart! 🎉`);
    
    // Add animation to cart icon
    const cartIcon = document.querySelector('.cart-icon-wrapper');
    cartIcon.style.animation = 'none';
    setTimeout(() => {
        cartIcon.style.animation = 'cartPulse 0.3s ease';
    }, 10);
}

// ============================================
// WISHLIST FUNCTIONALITY
// ============================================
const wishlistButtons = document.querySelectorAll('.add-wishlist');

wishlistButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const icon = this.querySelector('i');
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            this.style.color = '#d0021b';
            showToast('Added to wishlist! ❤️');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            this.style.color = '';
            showToast('Removed from wishlist');
        }
    });
});

// ============================================
// QUICK VIEW FUNCTIONALITY
// ============================================
const quickViewButtons = document.querySelectorAll('.quick-view');

quickViewButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        showToast('Quick view feature coming soon! 👀');
    });
});

// ============================================
// SMOOTH SCROLL FOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// ============================================
// NEWSLETTER SUBSCRIPTION
// ============================================
const subscribeButtons = document.querySelectorAll('.subscribe-btn, .newsletter-form button');

subscribeButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const input = this.previousElementSibling || this.parentElement.querySelector('input');
        const email = input?.value;
        
        if (email && validateEmail(email)) {
            showToast('Successfully subscribed! 🎉');
            if (input) input.value = '';
        } else {
            showToast('Please enter a valid email address');
        }
    });
});

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ============================================
// RATING STARS INTERACTION
// ============================================
const ratings = document.querySelectorAll('.rating');

ratings.forEach(rating => {
    rating.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    rating.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ============================================
// PROMO CARDS INTERACTION
// ============================================
const promoCards = document.querySelectorAll('.promo-card');

promoCards.forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('h2').textContent;
        showToast(`Exploring ${title}... 🛍️`);
    });
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c👟 Welcome to Stylish!', 'font-size: 20px; font-weight: bold; color: #d0021b;');
console.log('%cBuilt with ❤️ and attention to detail', 'font-size: 14px; color: #666;');