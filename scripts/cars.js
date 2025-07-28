// Cars page JavaScript
const carsData = [
    {
        id: 1,
        name: "BMW 3 Series",
        category: "luxury",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: 89,
        features: ["5 Seats", "Automatic", "Air Conditioning", "GPS"],
        rating: 4.8,
        transmission: "automatic",
        description: "Experience luxury and performance with the BMW 3 Series. Perfect for business trips and special occasions.",
        specs: {
            "Engine": "2.0L Turbo",
            "Fuel Type": "Gasoline",
            "Mileage": "25 MPG",
            "Doors": "4",
            "Luggage": "3 Bags"
        }
    },
    {
        id: 2,
        name: "Toyota Camry",
        category: "economy",
        image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: 45,
        features: ["5 Seats", "Automatic", "Air Conditioning", "Bluetooth"],
        rating: 4.5,
        transmission: "automatic",
        description: "Reliable and fuel-efficient, the Toyota Camry is perfect for everyday driving and long trips.",
        specs: {
            "Engine": "2.5L 4-Cylinder",
            "Fuel Type": "Gasoline",
            "Mileage": "32 MPG",
            "Doors": "4",
            "Luggage": "2 Bags"
        }
    },
    {
        id: 3,
        name: "Mercedes-Benz S-Class",
        category: "luxury",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: 150,
        features: ["5 Seats", "Automatic", "Luxury Interior", "Chauffeur Available"],
        rating: 4.9,
        transmission: "automatic",
        description: "The pinnacle of luxury and comfort. The Mercedes S-Class offers an unparalleled driving experience.",
        specs: {
            "Engine": "3.0L V6 Turbo",
            "Fuel Type": "Gasoline",
            "Mileage": "22 MPG",
            "Doors": "4",
            "Luggage": "4 Bags"
        }
    },
    {
        id: 4,
        name: "Honda CR-V",
        category: "suv",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: 65,
        features: ["7 Seats", "AWD", "Cargo Space", "Safety Features"],
        rating: 4.6,
        transmission: "automatic",
        description: "Spacious and versatile, the Honda CR-V is perfect for families and adventure seekers.",
        specs: {
            "Engine": "1.5L Turbo",
            "Fuel Type": "Gasoline",
            "Mileage": "28 MPG",
            "Doors": "5",
            "Luggage": "5 Bags"
        }
    },
    {
        id: 5,
        name: "Porsche 911",
        category: "sports",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: 200,
        features: ["2 Seats", "Manual", "Sports Mode", "Premium Sound"],
        rating: 4.9,
        transmission: "manual",
        description: "Iconic sports car with legendary performance. The Porsche 911 delivers thrills on every drive.",
        specs: {
            "Engine": "3.0L Flat-6 Turbo",
            "Fuel Type": "Gasoline",
            "Mileage": "20 MPG",
            "Doors": "2",
            "Luggage": "1 Bag"
        }
    },
    {
        id: 6,
        name: "Ford Explorer",
        category: "suv",
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: 70,
        features: ["8 Seats", "4WD", "Towing Capacity", "Entertainment System"],
        rating: 4.4,
        transmission: "automatic",
        description: "Built for adventure, the Ford Explorer offers exceptional capability and comfort for large groups.",
        specs: {
            "Engine": "2.3L EcoBoost",
            "Fuel Type": "Gasoline",
            "Mileage": "24 MPG",
            "Doors": "5",
            "Luggage": "6 Bags"
        }
    },
    {
        id: 7,
        name: "Nissan Altima",
        category: "economy",
        image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: 40,
        features: ["5 Seats", "CVT", "Fuel Efficient", "Safety Shield"],
        rating: 4.3,
        transmission: "cvt",
        description: "Efficient and comfortable, the Nissan Altima offers great value for money with modern features.",
        specs: {
            "Engine": "2.5L 4-Cylinder",
            "Fuel Type": "Gasoline",
            "Mileage": "35 MPG",
            "Doors": "4",
            "Luggage": "2 Bags"
        }
    },
    {
        id: 8,
        name: "Ferrari 488",
        category: "sports",
        image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: 300,
        features: ["2 Seats", "Manual", "Turbo Engine", "Carbon Fiber"],
        rating: 5.0,
        transmission: "manual",
        description: "Pure Italian excellence. The Ferrari 488 delivers breathtaking performance and stunning design.",
        specs: {
            "Engine": "3.9L V8 Turbo",
            "Fuel Type": "Gasoline",
            "Mileage": "16 MPG",
            "Doors": "2",
            "Luggage": "1 Bag"
        }
    },
    {
        id: 9,
        name: "Audi A4",
        category: "luxury",
        image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: 95,
        features: ["5 Seats", "Automatic", "Quattro AWD", "Virtual Cockpit"],
        rating: 4.7,
        transmission: "automatic",
        description: "German engineering at its finest. The Audi A4 combines luxury, performance, and technology.",
        specs: {
            "Engine": "2.0L TFSI",
            "Fuel Type": "Gasoline",
            "Mileage": "27 MPG",
            "Doors": "4",
            "Luggage": "3 Bags"
        }
    },
    {
        id: 10,
        name: "Chevrolet Tahoe",
        category: "suv",
        image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: 85,
        features: ["9 Seats", "4WD", "Trailer Package", "Infotainment"],
        rating: 4.5,
        transmission: "automatic",
        description: "Full-size SUV with massive space and capability. Perfect for large families and group travel.",
        specs: {
            "Engine": "5.3L V8",
            "Fuel Type": "Gasoline",
            "Mileage": "20 MPG",
            "Doors": "5",
            "Luggage": "8 Bags"
        }
    },
    {
        id: 11,
        name: "Hyundai Elantra",
        category: "economy",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: 38,
        features: ["5 Seats", "Automatic", "SmartSense", "Wireless Charging"],
        rating: 4.4,
        transmission: "automatic",
        description: "Modern and efficient, the Hyundai Elantra offers excellent value with the latest technology.",
        specs: {
            "Engine": "2.0L 4-Cylinder",
            "Fuel Type": "Gasoline",
            "Mileage": "33 MPG",
            "Doors": "4",
            "Luggage": "2 Bags"
        }
    },
    {
        id: 12,
        name: "McLaren 720S",
        category: "sports",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: 450,
        features: ["2 Seats", "Automatic", "Carbon Fiber", "Active Aerodynamics"],
        rating: 5.0,
        transmission: "automatic",
        description: "Supercar excellence from McLaren. The 720S delivers otherworldly performance and cutting-edge technology.",
        specs: {
            "Engine": "4.0L V8 Twin-Turbo",
            "Fuel Type": "Gasoline",
            "Mileage": "15 MPG",
            "Doors": "2",
            "Luggage": "1 Bag"
        }
    }
];

// State management
let filteredCars = [...carsData];
let currentPage = 1;
let itemsPerPage = 9;
let currentView = 'grid';
let selectedCar = null;

// DOM Elements
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const transmissionFilter = document.getElementById('transmissionFilter');
const sortFilter = document.getElementById('sortFilter');
const clearFiltersBtn = document.getElementById('clearFilters');
const carsGrid = document.getElementById('carsGrid');
const resultsCount = document.getElementById('resultsCount');
const pagination = document.getElementById('pagination');
const viewButtons = document.querySelectorAll('.view-btn');
const modal = document.getElementById('carModal');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    displayCars();
});

function initializePage() {
    // Initialize navbar
    initializeNavbar();
    
    // Set initial filters from URL parameters if any
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('category')) {
        categoryFilter.value = urlParams.get('category');
    }
}

function setupEventListeners() {
    // Search and filters
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    categoryFilter.addEventListener('change', handleFilters);
    priceFilter.addEventListener('change', handleFilters);
    transmissionFilter.addEventListener('change', handleFilters);
    sortFilter.addEventListener('change', handleFilters);
    clearFiltersBtn.addEventListener('click', clearAllFilters);
    
    // View toggle
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            viewButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentView = this.dataset.view;
            updateView();
        });
    });
    
    // Modal close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
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
}

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredCars = [...carsData];
    } else {
        filteredCars = carsData.filter(car => 
            car.name.toLowerCase().includes(searchTerm) ||
            car.category.toLowerCase().includes(searchTerm) ||
            car.features.some(feature => feature.toLowerCase().includes(searchTerm))
        );
    }
    
    applyFilters();
    currentPage = 1;
    displayCars();
}

function handleFilters() {
    applyFilters();
    currentPage = 1;
    displayCars();
}

function applyFilters() {
    let filtered = [...carsData];
    
    // Search filter
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) {
        filtered = filtered.filter(car => 
            car.name.toLowerCase().includes(searchTerm) ||
            car.category.toLowerCase().includes(searchTerm) ||
            car.features.some(feature => feature.toLowerCase().includes(searchTerm))
        );
    }
    
    // Category filter
    const category = categoryFilter.value;
    if (category) {
        filtered = filtered.filter(car => car.category === category);
    }
    
    // Price filter
    const priceRange = priceFilter.value;
    if (priceRange) {
        const [min, max] = priceRange.split('-').map(Number);
        filtered = filtered.filter(car => {
            if (max === 999) {
                return car.price >= min;
            }
            return car.price >= min && car.price <= max;
        });
    }
    
    // Transmission filter
    const transmission = transmissionFilter.value;
    if (transmission) {
        filtered = filtered.filter(car => car.transmission === transmission);
    }
    
    // Sort
    const sortBy = sortFilter.value;
    switch (sortBy) {
        case 'name':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
    }
    
    filteredCars = filtered;
}

function clearAllFilters() {
    searchInput.value = '';
    categoryFilter.value = '';
    priceFilter.value = '';
    transmissionFilter.value = '';
    sortFilter.value = 'name';
    
    filteredCars = [...carsData];
    currentPage = 1;
    displayCars();
}

function displayCars() {
    // Show loading
    carsGrid.innerHTML = '<div class="loading-spinner"><div class="spinner"></div></div>';
    
    setTimeout(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const carsToShow = filteredCars.slice(startIndex, endIndex);
        
        // Update results count
        resultsCount.textContent = filteredCars.length;
        
        if (carsToShow.length === 0) {
            displayNoResults();
            return;
        }
        
        carsGrid.innerHTML = '';
        
        carsToShow.forEach((car, index) => {
            const carCard = createCarCard(car);
            carsGrid.appendChild(carCard);
            
            // Add staggered animation
            setTimeout(() => {
                carCard.classList.add('fade-in-up');
            }, index * 100);
        });
        
        updatePagination();
        updateView();
    }, 300);
}

function createCarCard(car) {
    const carCard = document.createElement('div');
    carCard.className = 'car-card';
    carCard.onclick = () => openModal(car);
    
    const stars = '★'.repeat(Math.floor(car.rating)) + '☆'.repeat(5 - Math.floor(car.rating));
    
    carCard.innerHTML = `
        <div class="car-image">
            <img src="${car.image}" alt="${car.name}" loading="lazy">
            ${car.rating >= 4.8 ? '<div class="car-badge">Premium</div>' : ''}
        </div>
        <div class="car-info">
            <h3>${car.name}</h3>
            <div class="car-category">${car.category.charAt(0).toUpperCase() + car.category.slice(1)}</div>
            <div class="car-rating">
                <span class="stars">${stars}</span>
                <span class="rating-number">${car.rating}</span>
            </div>
            <div class="car-features">
                ${car.features.slice(0, 3).map(feature => `
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>${feature}</span>
                    </div>
                `).join('')}
            </div>
            <div class="car-price">
                <div class="price">$${car.price}<span>/day</span></div>
                <button class="btn-primary book-btn" onclick="event.stopPropagation(); bookCar(${car.id})">
                    <i class="fas fa-calendar-check"></i>
                    Book Now
                </button>
            </div>
        </div>
    `;
    
    return carCard;
}

function displayNoResults() {
    carsGrid.innerHTML = `
        <div class="no-results">
            <i class="fas fa-search"></i>
            <h3>No cars found</h3>
            <p>Try adjusting your search criteria or filters to find more results.</p>
            <button class="btn-primary" onclick="clearAllFilters()">Clear All Filters</button>
        </div>
    `;
    
    pagination.innerHTML = '';
}

function updateView() {
    if (currentView === 'list') {
        carsGrid.classList.add('list-view');
    } else {
        carsGrid.classList.remove('list-view');
    }
}

function updatePagination() {
    const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <button ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">
            <i class="fas fa-chevron-left"></i>
        </button>
    `;
    
    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    if (startPage > 1) {
        paginationHTML += `<button onclick="changePage(1)">1</button>`;
        if (startPage > 2) {
            paginationHTML += `<span>...</span>`;
        }
    }
    
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button class="${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">
                ${i}
            </button>
        `;
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHTML += `<span>...</span>`;
        }
        paginationHTML += `<button onclick="changePage(${totalPages})">${totalPages}</button>`;
    }
    
    // Next button
    paginationHTML += `
        <button ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">
            <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    pagination.innerHTML = paginationHTML;
}

function changePage(page) {
    currentPage = page;
    displayCars();
    
    // Scroll to top of cars section
    document.querySelector('.cars-section').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function openModal(car) {
    selectedCar = car;
    
    // Update modal content
    document.getElementById('modalCarName').textContent = car.name;
    document.getElementById('modalCarImage').src = car.image;
    document.getElementById('modalCarCategory').textContent = car.category.charAt(0).toUpperCase() + car.category.slice(1);
    
    const stars = '★'.repeat(Math.floor(car.rating)) + '☆'.repeat(5 - Math.floor(car.rating));
    document.getElementById('modalCarStars').textContent = stars;
    document.getElementById('modalCarRating').textContent = car.rating;
    
    document.getElementById('modalCarDescription').innerHTML = `<p>${car.description}</p>`;
    
    // Features
    const featuresHTML = car.features.map(feature => `
        <div class="feature">
            <i class="fas fa-check"></i>
            <span>${feature}</span>
        </div>
    `).join('');
    document.getElementById('modalCarFeatures').innerHTML = featuresHTML;
    
    // Specs
    const specsHTML = Object.entries(car.specs).map(([label, value]) => `
        <div class="spec-item">
            <span class="spec-label">${label}</span>
            <span class="spec-value">${value}</span>
        </div>
    `).join('');
    document.getElementById('modalCarSpecs').innerHTML = specsHTML;
    
    document.getElementById('modalCarPrice').textContent = `$${car.price}`;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    selectedCar = null;
}

function bookModalCar() {
    if (selectedCar) {
        bookCar(selectedCar.id);
        closeModal();
    }
}

function bookCar(carId) {
    const car = carsData.find(c => c.id === carId);
    if (car) {
        // Store selected car
        localStorage.setItem('selectedCar', JSON.stringify(car));
        
        // Show notification
        showNotification(`${car.name} selected! Redirecting to booking...`, 'success');
        
        // Redirect to home page with booking form
        setTimeout(() => {
            window.location.href = '../index.html#search';
        }, 1500);
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

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

// Add notification styles
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
`;

document.head.appendChild(notificationStyles);