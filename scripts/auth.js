// Authentication JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeAuth();
});

function initializeAuth() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (loginForm) {
        initializeLoginForm();
    }
    
    if (signupForm) {
        initializeSignupForm();
    }
    
    initializeSocialButtons();
}

// Login Form
function initializeLoginForm() {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    form.addEventListener('submit', handleLogin);
    
    // Real-time validation
    emailInput.addEventListener('blur', () => validateEmail(emailInput));
    passwordInput.addEventListener('blur', () => validatePassword(passwordInput));
}

// Signup Form
function initializeSignupForm() {
    const form = document.getElementById('signupForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    form.addEventListener('submit', handleSignup);
    
    // Password strength checking
    passwordInput.addEventListener('input', () => checkPasswordStrength(passwordInput));
    
    // Real-time validation
    document.getElementById('firstName').addEventListener('blur', (e) => validateName(e.target));
    document.getElementById('lastName').addEventListener('blur', (e) => validateName(e.target));
    document.getElementById('email').addEventListener('blur', (e) => validateEmail(e.target));
    document.getElementById('phone').addEventListener('blur', (e) => validatePhone(e.target));
    passwordInput.addEventListener('blur', () => validatePassword(passwordInput));
    confirmPasswordInput.addEventListener('blur', () => validateConfirmPassword(confirmPasswordInput, passwordInput));
}

// Handle Login
async function handleLogin(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const loginData = {
        email: formData.get('email'),
        password: formData.get('password'),
        remember: formData.get('remember') === 'on'
    };
    
    // Validate form
    if (!validateLoginForm(loginData)) {
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    setLoadingState(submitBtn, true);
    
    try {
        // Simulate API call
        await simulateLogin(loginData);
        
        showNotification('Login successful! Redirecting...', 'success');
        
        // Store user session
        if (loginData.remember) {
            localStorage.setItem('rememberUser', 'true');
        }
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('userEmail', loginData.email);
        
        // Redirect after delay
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1500);
        
    } catch (error) {
        showNotification(error.message, 'error');
    } finally {
        setLoadingState(submitBtn, false);
    }
}

// Handle Signup
async function handleSignup(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const signupData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        terms: formData.get('terms') === 'on',
        newsletter: formData.get('newsletter') === 'on'
    };
    
    // Validate form
    if (!validateSignupForm(signupData)) {
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    setLoadingState(submitBtn, true);
    
    try {
        // Simulate API call
        await simulateSignup(signupData);
        
        showNotification('Account created successfully! Please check your email for verification.', 'success');
        
        // Store user data
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('userEmail', signupData.email);
        localStorage.setItem('userName', `${signupData.firstName} ${signupData.lastName}`);
        
        // Redirect after delay
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 2000);
        
    } catch (error) {
        showNotification(error.message, 'error');
    } finally {
        setLoadingState(submitBtn, false);
    }
}

// Validation Functions
function validateLoginForm(data) {
    let isValid = true;
    
    if (!data.email || !isValidEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        isValid = false;
    }
    
    if (!data.password || data.password.length < 6) {
        showNotification('Password must be at least 6 characters long.', 'error');
        isValid = false;
    }
    
    return isValid;
}

function validateSignupForm(data) {
    let isValid = true;
    
    if (!data.firstName || data.firstName.length < 2) {
        showNotification('First name must be at least 2 characters long.', 'error');
        isValid = false;
    }
    
    if (!data.lastName || data.lastName.length < 2) {
        showNotification('Last name must be at least 2 characters long.', 'error');
        isValid = false;
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        isValid = false;
    }
    
    if (!data.phone || !isValidPhone(data.phone)) {
        showNotification('Please enter a valid phone number.', 'error');
        isValid = false;
    }
    
    if (!data.password || data.password.length < 8) {
        showNotification('Password must be at least 8 characters long.', 'error');
        isValid = false;
    }
    
    if (data.password !== data.confirmPassword) {
        showNotification('Passwords do not match.', 'error');
        isValid = false;
    }
    
    if (!data.terms) {
        showNotification('You must agree to the Terms of Service.', 'error');
        isValid = false;
    }
    
    return isValid;
}

// Individual field validation
function validateName(input) {
    const value = input.value.trim();
    const isValid = value.length >= 2;
    
    updateFieldState(input, isValid);
    
    if (!isValid && value.length > 0) {
        showFieldError(input, 'Name must be at least 2 characters long.');
    } else {
        hideFieldError(input);
    }
    
    return isValid;
}

function validateEmail(input) {
    const value = input.value.trim();
    const isValid = isValidEmail(value);
    
    updateFieldState(input, isValid);
    
    if (!isValid && value.length > 0) {
        showFieldError(input, 'Please enter a valid email address.');
    } else {
        hideFieldError(input);
    }
    
    return isValid;
}

function validatePhone(input) {
    const value = input.value.trim();
    const isValid = isValidPhone(value);
    
    updateFieldState(input, isValid);
    
    if (!isValid && value.length > 0) {
        showFieldError(input, 'Please enter a valid phone number.');
    } else {
        hideFieldError(input);
    }
    
    return isValid;
}

function validatePassword(input) {
    const value = input.value;
    const isValid = value.length >= 8;
    
    updateFieldState(input, isValid);
    
    if (!isValid && value.length > 0) {
        showFieldError(input, 'Password must be at least 8 characters long.');
    } else {
        hideFieldError(input);
    }
    
    return isValid;
}

function validateConfirmPassword(confirmInput, passwordInput) {
    const confirmValue = confirmInput.value;
    const passwordValue = passwordInput.value;
    const isValid = confirmValue === passwordValue && confirmValue.length > 0;
    
    updateFieldState(confirmInput, isValid);
    
    if (!isValid && confirmValue.length > 0) {
        showFieldError(confirmInput, 'Passwords do not match.');
    } else {
        hideFieldError(confirmInput);
    }
    
    return isValid;
}

// Helper validation functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Password strength checker
function checkPasswordStrength(input) {
    const password = input.value;
    const strengthMeter = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    
    if (!strengthMeter || !strengthText) return;
    
    let strength = 0;
    let strengthLabel = '';
    
    // Length check
    if (password.length >= 8) strength += 1;
    
    // Lowercase check
    if (/[a-z]/.test(password)) strength += 1;
    
    // Uppercase check
    if (/[A-Z]/.test(password)) strength += 1;
    
    // Number check
    if (/\d/.test(password)) strength += 1;
    
    // Special character check
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
    
    // Update strength meter
    strengthMeter.className = 'strength-fill';
    
    switch (strength) {
        case 0:
        case 1:
            strengthMeter.classList.add('weak');
            strengthLabel = 'Weak';
            break;
        case 2:
            strengthMeter.classList.add('fair');
            strengthLabel = 'Fair';
            break;
        case 3:
        case 4:
            strengthMeter.classList.add('good');
            strengthLabel = 'Good';
            break;
        case 5:
            strengthMeter.classList.add('strong');
            strengthLabel = 'Strong';
            break;
    }
    
    strengthText.textContent = password.length > 0 ? `Password strength: ${strengthLabel}` : 'Password strength';
}

// Field state management
function updateFieldState(input, isValid) {
    input.classList.remove('valid', 'invalid');
    if (input.value.length > 0) {
        input.classList.add(isValid ? 'valid' : 'invalid');
    }
}

function showFieldError(input, message) {
    hideFieldError(input);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    
    input.parentNode.appendChild(errorDiv);
}

function hideFieldError(input) {
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

// Password toggle functionality
function togglePassword(inputId) {
    const input = inputId ? document.getElementById(inputId) : document.getElementById('password');
    const toggle = input.parentNode.querySelector('.password-toggle i');
    
    if (input.type === 'password') {
        input.type = 'text';
        toggle.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        toggle.className = 'fas fa-eye';
    }
}

// Social login initialization
function initializeSocialButtons() {
    const googleBtn = document.querySelector('.google-btn');
    const facebookBtn = document.querySelector('.facebook-btn');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', handleGoogleLogin);
    }
    
    if (facebookBtn) {
        facebookBtn.addEventListener('click', handleFacebookLogin);
    }
}

// Social login handlers
function handleGoogleLogin() {
    showNotification('Google login integration coming soon!', 'info');
    // In a real app, this would integrate with Google OAuth
}

function handleFacebookLogin() {
    showNotification('Facebook login integration coming soon!', 'info');
    // In a real app, this would integrate with Facebook Login
}

// Loading state management
function setLoadingState(button, isLoading) {
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

// Simulate API calls
async function simulateLogin(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate different responses
            if (data.email === 'demo@driveeasy.com' && data.password === 'demo123') {
                resolve({ success: true, user: { email: data.email, name: 'Demo User' } });
            } else if (data.email === 'admin@driveeasy.com' && data.password === 'admin123') {
                resolve({ success: true, user: { email: data.email, name: 'Admin User', role: 'admin' } });
            } else {
                // For demo purposes, accept any valid email/password combination
                resolve({ success: true, user: { email: data.email, name: 'User' } });
            }
        }, 1500);
    });
}

async function simulateSignup(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate email already exists check
            if (data.email === 'existing@example.com') {
                reject(new Error('An account with this email already exists.'));
            } else {
                resolve({ 
                    success: true, 
                    user: { 
                        email: data.email, 
                        name: `${data.firstName} ${data.lastName}`,
                        phone: data.phone
                    } 
                });
            }
        }, 2000);
    });
}

// Notification system
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
        top: 20px;
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

// Add notification animations
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