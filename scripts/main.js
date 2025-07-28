// Car data
const cars = [
    {
        id: 1,
        name: "BMW 3 Series",
        category: "luxury",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: 89,
        features: ["5 Seats", "Automatic", "Air Conditioning", "GPS"],
        rating: 4.8
    },
    {
        id: 2,
        name: "Toyota Camry",
        category: "economy",
        image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: 45,
        features: ["5 Seats", "Automatic", "Air Conditioning", "Bluetooth"],
        rating: 4.5
    },
    {
        id: 3,
        name: "Mercedes-Benz S-Class",
        category: "luxury",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: 150,
        features: ["5 Seats", "Automatic", "Luxury Interior", "Chauffeur"],
        rating: 4.9
    },
    {
        id: 4,
        name: "Honda CR-V",
        category: "suv",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: 65,
        features: ["7 Seats", "AWD", "Cargo Space", "Safety Features"],
        rating: 4.6
    },
    {
        id: 5,
        name: "Porsche 911",
        category: "sports",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: 200,
        features: ["2 Seats", "Manual", "Sports Mode", "Premium Sound"],
        rating: 4.9
    },
    {
        id: 6,
        name: "Ford Explorer",
        category: "suv",
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: 70,
        features: ["8 Seats", "4WD", "Towing Capacity", "Entertainment System"],
        rating: 4.4
    },
    {
        id: 7,
        name: "Nissan Altima",
        category: "economy",
        image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: 40,
        features: ["5 Seats", "CVT", "Fuel Efficient", "Safety Shield"],
        rating: 4.3
    },
    {
        id: 8,
        name: "Ferrari 488",
        category: "sports",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: 300,
        features: ["2 Seats", "Manual", "Turbo Engine", "Carbon Fiber"],
        rating: 5.0
    }
];

// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const categoryButtons = document.querySelectorAll('.category-btn');
const carsGrid = document.getElementById('cars-grid');
const bookingForm = document.querySelector('.booking-form');
const contactForm = document.querySelector('.contact-form');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeNavbar();
    displayCars('all');
    initializeForms();
    initializeAnimations();
    setMinDate();
});

// Navbar functionality
function initializeNavbar() {
    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Display cars function
function displayCars(category) {
    let filteredCars = category === 'all' ? cars : cars.filter(car => car.category === category);
    
    carsGrid.innerHTML = '';
    
    filteredCars.forEach(car => {
        const carCard = createCarCard(car);
        carsGrid.appendChild(carCard);
    });
    
    // Add animation
    setTimeout(() => {
        document.querySelectorAll('.car-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in-up');
            }, index * 100);
        });
    }, 100);
}

// Create car card element
function createCarCard(car) {
    const carCard = document.createElement('div');
    carCard.className = 'car-card';
    
    const stars = '★'.repeat(Math.floor(car.rating)) + '☆'.repeat(5 - Math.floor(car.rating));
    
    carCard.innerHTML = `
        <div class="car-image">
            <img src="${car.image}" alt="${car.name}" loading="lazy">
        </div>
        <div class="car-info">
            <h3>${car.name}</h3>
            <div class="car-category">${car.category.charAt(0).toUpperCase() + car.category.slice(1)}</div>
            <div class="car-rating">
                <span class="stars">${stars}</span>
                <span class="rating-number">${car.rating}</span>
            </div>
            <div class="car-features">
                ${car.features.map(feature => `
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>${feature}</span>
                    </div>
                `).join('')}
            </div>
            <div class="car-price">
                <div class="price">$${car.price}<span>/day</span></div>
                <button class="btn-primary" onclick="bookCar(${car.id})">
                    <i class="fas fa-calendar-check"></i>
                    Book Now
                </button>
            </div>
        </div>
    `;
    
    return carCard;
}

// Category filter functionality
categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get category and display cars
        const category = this.getAttribute('data-category');
        displayCars(category);
    });
});

// Book car function
function bookCar(carId) {
    const car = cars.find(c => c.id === carId);
    if (car) {
        // Store selected car in localStorage
        localStorage.setItem('selectedCar', JSON.stringify(car));
        
        // Scroll to booking form
        document.querySelector('.search-section').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Show success message
        showNotification(`${car.name} selected! Please fill out the booking form below.`, 'success');
    }
}

// Form initialization
function initializeForms() {
    // Booking form
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }
    
    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

// Handle booking form submission
function handleBookingSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const bookingData = {
        pickupLocation: document.getElementById('pickup-location').value,
        dropoffLocation: document.getElementById('dropoff-location').value,
        pickupDate: document.getElementById('pickup-date').value,
        pickupTime: document.getElementById('pickup-time').value,
        dropoffDate: document.getElementById('dropoff-date').value,
        dropoffTime: document.getElementById('dropoff-time').value
    };
    
    // Validate form
    if (validateBookingForm(bookingData)) {
        // Store booking data
        localStorage.setItem('bookingData', JSON.stringify(bookingData));
        
        // Show success message
        showNotification('Booking request submitted successfully! We will contact you shortly.', 'success');
        
        // Reset form
        e.target.reset();
        
        // Redirect to cars page or show available cars
        setTimeout(() => {
            displayAvailableCars(bookingData);
        }, 2000);
    }
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const contactData = {
        name: formData.get('name') || e.target.querySelector('input[type="text"]').value,
        email: formData.get('email') || e.target.querySelector('input[type="email"]').value,
        phone: formData.get('phone') || e.target.querySelector('input[type="tel"]').value,
        message: formData.get('message') || e.target.querySelector('textarea').value
    };
    
    // Validate contact form
    if (validateContactForm(contactData)) {
        // Show success message
        showNotification('Message sent successfully! We will get back to you soon.', 'success');
        
        // Reset form
        e.target.reset();
    }
}

// Validate booking form
function validateBookingForm(data) {
    if (!data.pickupLocation || !data.dropoffLocation) {
        showNotification('Please select pickup and drop-off locations.', 'error');
        return false;
    }
    
    if (!data.pickupDate || !data.dropoffDate) {
        showNotification('Please select pickup and drop-off dates.', 'error');
        return false;
    }
    
    if (!data.pickupTime || !data.dropoffTime) {
        showNotification('Please select pickup and drop-off times.', 'error');
        return false;
    }
    
    // Check if pickup date is not in the past
    const pickupDateTime = new Date(data.pickupDate + 'T' + data.pickupTime);
    const now = new Date();
    
    if (pickupDateTime <= now) {
        showNotification('Pickup date and time must be in the future.', 'error');
        return false;
    }
    
    // Check if drop-off is after pickup
    const dropoffDateTime = new Date(data.dropoffDate + 'T' + data.dropoffTime);
    
    if (dropoffDateTime <= pickupDateTime) {
        showNotification('Drop-off date and time must be after pickup.', 'error');
        return false;
    }
    
    return true;
}

// Validate contact form
function validateContactForm(data) {
    if (!data.name || data.name.length < 2) {
        showNotification('Please enter a valid name.', 'error');
        return false;
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    if (!data.message || data.message.length < 10) {
        showNotification('Please enter a message with at least 10 characters.', 'error');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Set minimum date for date inputs
function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    const pickupDate = document.getElementById('pickup-date');
    const dropoffDate = document.getElementById('dropoff-date');
    
    if (pickupDate) {
        pickupDate.min = today;
        pickupDate.addEventListener('change', function() {
            if (dropoffDate) {
                dropoffDate.min = this.value;
            }
        });
    }
    
    if (dropoffDate) {
        dropoffDate.min = today;
    }
}

// Display available cars based on booking criteria
function displayAvailableCars(bookingData) {
    // Filter cars based on availability (mock logic)
    const availableCars = cars.filter(car => {
        // In a real app, this would check actual availability
        return Math.random() > 0.2; // 80% availability rate
    });
    
    // Update cars grid
    carsGrid.innerHTML = '';
    
    if (availableCars.length === 0) {
        carsGrid.innerHTML = `
            <div class="no-cars-message">
                <i class="fas fa-car"></i>
                <h3>No cars available for your selected dates</h3>
                <p>Please try different dates or contact us for assistance.</p>
                <button class="btn-primary" onclick="location.reload()">Search Again</button>
            </div>
        `;
        return;
    }
    
    availableCars.forEach(car => {
        const carCard = createCarCard(car);
        carsGrid.appendChild(carCard);
    });
    
    // Scroll to cars section
    document.querySelector('.featured-cars').scrollIntoView({
        behavior: 'smooth'
    });
    
    // Add animation
    setTimeout(() => {
        document.querySelectorAll('.car-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in-up');
            }, index * 100);
        });
    }, 100);
}

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .car-card, .section-header').forEach(el => {
        observer.observe(el);
    });
}

// Add notification styles to head
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
        border-radius: 3px;
        margin-left: auto;
    }
    
    .notification-close:hover {
        background: rgba(255,255,255,0.2);
    }
    
    .no-cars-message {
        grid-column: 1 / -1;
        text-align: center;
        padding: 3rem;
        background: white;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    
    .no-cars-message i {
        font-size: 4rem;
        color: #667eea;
        margin-bottom: 1rem;
    }
    
    .no-cars-message h3 {
        font-size: 1.5rem;
        color: #333;
        margin-bottom: 1rem;
    }
    
    .no-cars-message p {
        color: #666;
        margin-bottom: 2rem;
    }
    
    .car-rating {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 1rem;
    }
    
    .stars {
        color: #ffc107;
        font-size: 1.2rem;
    }
    
    .rating-number {
        color: #666;
        font-size: 0.9rem;
        font-weight: 500;
    }
`;

document.head.appendChild(notificationStyles);