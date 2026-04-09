// ===== SLIDESHOW FUNCTIONALITY =====
let currentSlide = 0;
const totalSlides = 5;
let autoplayTimer;
let wrapper = null;

function initSlideshow() {
    wrapper = document.getElementById('slidesWrapper');
    if (!wrapper) return; // Exit if not on homepage
    
    // Create dots
    const dotsContainer = document.getElementById('slideDots');
    if (dotsContainer && dotsContainer.children.length === 0) {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    startAutoplay();
}

function goToSlide(index) {
    if (!wrapper) return;
    currentSlide = (index + totalSlides) % totalSlides;
    wrapper.style.transform = `translateX(-${currentSlide * 20}%)`;
    const dots = document.querySelectorAll('.dot');
    dots.forEach((d, i) => {
        d.classList.toggle('active', i === currentSlide);
    });
}

function changeSlide(direction) {
    goToSlide(currentSlide + direction);
    resetAutoplay();
}

function startAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    const savedAutoplay = localStorage.getItem('autoplay') !== 'false';
    if (savedAutoplay) {
        autoplayTimer = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 4500);
    }
}

function resetAutoplay() {
    if (autoplayTimer) {
        clearInterval(autoplayTimer);
        startAutoplay();
    }
}

// ===== USER DATA STORAGE =====
let users = JSON.parse(localStorage.getItem('users')) || [];

// ===== MODAL FUNCTIONS =====
function openLoginModal() {
    closeRegisterModal();
    closeForgotPasswordModal();
    closeResetPasswordModal();
    closeSettingsModal();
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.classList.add('active');
        const alertDiv = document.querySelector('#loginModal .alert');
        if (alertDiv) alertDiv.style.display = 'none';
    }
}

function closeLoginModal() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.classList.remove('active');
    }
}

function openRegisterModal() {
    closeLoginModal();
    closeForgotPasswordModal();
    closeResetPasswordModal();
    closeSettingsModal();
    const registerModal = document.getElementById('registerModal');
    if (registerModal) {
        registerModal.classList.add('active');
        const alertDiv = document.getElementById('registerAlertMessage');
        if (alertDiv) alertDiv.style.display = 'none';
    }
}

function closeRegisterModal() {
    const registerModal = document.getElementById('registerModal');
    if (registerModal) {
        registerModal.classList.remove('active');
    }
}

function switchToLogin() {
    closeRegisterModal();
    openLoginModal();
}

function switchToRegister() {
    closeLoginModal();
    openRegisterModal();
}

// ===== FORGOT PASSWORD MODAL FUNCTIONS =====
function openForgotPasswordModal() {
    closeLoginModal();
    closeRegisterModal();
    closeResetPasswordModal();
    const forgotModal = document.getElementById('forgotPasswordModal');
    if (forgotModal) {
        forgotModal.classList.add('active');
        const alertDiv = document.getElementById('forgotAlertMessage');
        if (alertDiv) alertDiv.style.display = 'none';
        const forgotEmail = document.getElementById('forgotEmail');
        if (forgotEmail) forgotEmail.value = '';
    }
}

function closeForgotPasswordModal() {
    const forgotModal = document.getElementById('forgotPasswordModal');
    if (forgotModal) {
        forgotModal.classList.remove('active');
    }
}

function switchToLoginFromForgot() {
    closeForgotPasswordModal();
    openLoginModal();
}

// ===== RESET PASSWORD MODAL FUNCTIONS =====
let pendingResetEmail = null;
let pendingResetToken = null;

function openResetPasswordModal(email, token) {
    pendingResetEmail = email;
    pendingResetToken = token;
    const resetModal = document.getElementById('resetPasswordModal');
    if (resetModal) {
        const emailDisplay = document.getElementById('resetEmailDisplay');
        if (emailDisplay) emailDisplay.value = email;
        resetModal.classList.add('active');
        const alertDiv = document.getElementById('resetAlertMessage');
        if (alertDiv) alertDiv.style.display = 'none';
        const newPassword = document.getElementById('newPasswordModal');
        const confirmPassword = document.getElementById('confirmPasswordModal');
        if (newPassword) newPassword.value = '';
        if (confirmPassword) confirmPassword.value = '';
        const strengthDiv = document.getElementById('passwordStrengthModal');
        if (strengthDiv) strengthDiv.innerHTML = '';
    }
}

function closeResetPasswordModal() {
    const resetModal = document.getElementById('resetPasswordModal');
    if (resetModal) {
        resetModal.classList.remove('active');
    }
    pendingResetEmail = null;
    pendingResetToken = null;
}

function switchToLoginFromReset() {
    closeResetPasswordModal();
    openLoginModal();
}

// ===== SETTINGS MODAL FUNCTIONS =====
function openSettingsModal() {
    closeLoginModal();
    closeRegisterModal();
    closeForgotPasswordModal();
    closeResetPasswordModal();
    const settingsModal = document.getElementById('settingsModal');
    if (settingsModal) {
        settingsModal.classList.add('active');
        loadSettingsIntoForm();
        updateThemeCheckmarks();
    }
}

function closeSettingsModal() {
    const settingsModal = document.getElementById('settingsModal');
    if (settingsModal) {
        settingsModal.classList.remove('active');
    }
}

// ===== VERIFICATION MODAL =====
function showVerificationModal(email) {
    const modal = document.getElementById('verificationModal');
    const emailSpan = document.getElementById('verificationEmail');
    if (emailSpan) emailSpan.textContent = email;
    if (modal) modal.classList.add('active');
}

function closeVerificationModal() {
    const modal = document.getElementById('verificationModal');
    if (modal) modal.classList.remove('active');
}

function closeToast() {
    const toast = document.getElementById('successToast');
    if (toast) toast.classList.remove('show');
}

// ===== THEME MANAGEMENT =====
function setTheme(theme, showToastMessage = true) {
    if (theme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        localStorage.setItem('theme', 'system');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
    
    updateThemeCheckmarks();
    
    if (showToastMessage) {
        const toast = document.getElementById('successToast');
        if (toast) {
            const toastMessage = toast.querySelector('p');
            if (toastMessage) {
                toastMessage.innerHTML = `Theme changed to ${theme === 'system' ? 'System Default' : theme + ' mode'}`;
            }
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 2000);
        }
    }
}

function updateThemeCheckmarks() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.querySelectorAll('.theme-option').forEach(option => {
        const themeValue = option.getAttribute('data-theme');
        if (themeValue === savedTheme) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

// ===== FONT SIZE MANAGEMENT =====
function setFontSize(size) {
    const root = document.documentElement;
    const sizeValue = parseInt(size);
    
    if (isNaN(sizeValue)) return;
    
    root.style.setProperty('--font-size-base', sizeValue + 'px');
    root.style.setProperty('--font-size-small', (sizeValue * 0.875) + 'px');
    root.style.setProperty('--font-size-medium', sizeValue + 'px');
    root.style.setProperty('--font-size-large', (sizeValue * 1.125) + 'px');
    root.style.setProperty('--font-size-xl', (sizeValue * 1.25) + 'px');
    root.style.setProperty('--h1-size', Math.max(32, sizeValue * 3.5) + 'px');
    root.style.setProperty('--h2-size', Math.max(28, sizeValue * 2.75) + 'px');
    root.style.setProperty('--h3-size', Math.max(20, sizeValue * 1.75) + 'px');
    root.style.setProperty('--h4-size', Math.max(16, sizeValue * 1.25) + 'px');
    root.style.setProperty('--nav-size', (sizeValue * 0.875) + 'px');
    root.style.setProperty('--button-size', (sizeValue * 0.9375) + 'px');
    root.style.setProperty('--small-text', (sizeValue * 0.75) + 'px');
    
    localStorage.setItem('fontSize', sizeValue);
    updateFontSizeUI(sizeValue);
}

function updateFontSizeUI(sizeValue) {
    const fontSizeValue = document.getElementById('fontSizeValue');
    if (fontSizeValue) {
        if (sizeValue <= 14) fontSizeValue.textContent = 'Small';
        else if (sizeValue <= 16) fontSizeValue.textContent = 'Medium';
        else if (sizeValue <= 18) fontSizeValue.textContent = 'Large';
        else fontSizeValue.textContent = 'Extra Large';
    }
    
    const fontSizeSlider = document.getElementById('fontSizeSlider');
    if (fontSizeSlider) fontSizeSlider.value = sizeValue;
    
    const fontPresets = document.querySelectorAll('.font-preset');
    fontPresets.forEach(preset => {
        const presetSize = parseInt(preset.getAttribute('data-size'));
        if (presetSize === sizeValue) preset.classList.add('active');
        else preset.classList.remove('active');
    });
}

function loadSavedFontSize() {
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
    else setFontSize(16);
}

// ===== REDUCED MOTION =====
function setReducedMotion(enabled) {
    if (enabled) {
        document.documentElement.classList.add('reduced-motion');
        localStorage.setItem('reducedMotion', 'true');
    } else {
        document.documentElement.classList.remove('reduced-motion');
        localStorage.setItem('reducedMotion', 'false');
    }
}

// ===== HIGH CONTRAST =====
function setHighContrast(enabled) {
    if (enabled) {
        document.documentElement.setAttribute('data-high-contrast', 'true');
        localStorage.setItem('highContrast', 'true');
    } else {
        document.documentElement.removeAttribute('data-high-contrast');
        localStorage.setItem('highContrast', 'false');
    }
}

// ===== LOAD SETTINGS =====
function loadSettingsIntoForm() {
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        const fontSizeSelect = document.getElementById('fontSizeSelect');
        if (fontSizeSelect) fontSizeSelect.value = savedFontSize;
    }
    
    const savedReducedMotion = localStorage.getItem('reducedMotion') === 'true';
    const reducedMotionToggle = document.getElementById('reducedMotionToggle');
    if (reducedMotionToggle) reducedMotionToggle.checked = savedReducedMotion;
    
    const savedHighContrast = localStorage.getItem('highContrast') === 'true';
    const highContrastToggle = document.getElementById('highContrastToggle');
    if (highContrastToggle) highContrastToggle.checked = savedHighContrast;
}

function resetAllSettings() {
    if (confirm('Reset all settings to default?')) {
        localStorage.removeItem('theme');
        localStorage.removeItem('fontSize');
        localStorage.removeItem('reducedMotion');
        localStorage.removeItem('highContrast');
        localStorage.removeItem('autoplay');
        
        document.documentElement.setAttribute('data-theme', 'light');
        setFontSize(16);
        document.documentElement.classList.remove('reduced-motion');
        document.documentElement.removeAttribute('data-high-contrast');
        
        const reducedMotionToggle = document.getElementById('reducedMotionToggle');
        if (reducedMotionToggle) reducedMotionToggle.checked = false;
        const highContrastToggle = document.getElementById('highContrastToggle');
        if (highContrastToggle) highContrastToggle.checked = false;
        
        updateThemeCheckmarks();
        
        // Restart autoplay if needed
        startAutoplay();
        
        const toast = document.getElementById('successToast');
        if (toast) {
            const toastMessage = toast.querySelector('p');
            if (toastMessage) toastMessage.innerHTML = 'All settings reset to default';
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
        }
    }
}

// ===== REGISTRATION HANDLER =====
function generateToken() {
    return Math.random().toString(36).substr(2) + Date.now().toString(36);
}

function showModalAlert(alertDiv, message, type) {
    if (!alertDiv) return;
    alertDiv.innerHTML = message;
    alertDiv.className = `alert ${type}`;
    alertDiv.style.display = 'block';
    setTimeout(() => {
        if (alertDiv) alertDiv.style.display = 'none';
    }, 5000);
}

document.getElementById('registerForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const fullName = document.getElementById('regFullName').value;
  const email = document.getElementById('regEmail').value;
  const phone = document.getElementById('regPhone').value;
  const password = document.getElementById('regPassword').value;
  const confirm = document.getElementById('regConfirmPassword').value;
  if (password !== confirm) {
    alert('Passwords do not match');
    return;
  }
  let users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.find(u => u.email === email)) {
    alert('Email already registered');
    return;
  }
  const newUser = { id: Date.now(), fullName, email, phone, password, verified: false };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  alert('Registration successful! You can now login.');
  closeRegisterModal();
  document.getElementById('registerForm').reset();
});



// Login Form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email);
        
        if (!user) { alert('Email not found. Please register first.'); return; }
        if (btoa(password) !== user.password) { alert('Incorrect password.'); return; }
        if (!user.verified) { alert('Please verify your email first.'); return; }
        
        alert(`Welcome back, ${user.fullName}!`);
        closeLoginModal();
        loginForm.reset();
    });
}

// Forgot Password Form
const forgotForm = document.getElementById('forgotPasswordFormModal');
if (forgotForm) {
    forgotForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('forgotEmail').value.trim();
        const alertDiv = document.getElementById('forgotAlertMessage');
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email);
        
        if (!user) {
            showModalAlert(alertDiv, 'No account found with this email address.', 'error');
            return;
        }
        
        const resetToken = generateToken();
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 3600000;
        localStorage.setItem('users', JSON.stringify(users));
        
        const resetLink = `${window.location.origin}${window.location.pathname}?reset=${resetToken}&email=${encodeURIComponent(email)}`;
        
        showModalAlert(alertDiv, `✓ Password reset email sent to ${email}.`, 'success');
        document.getElementById('forgotEmail').value = '';
        
        setTimeout(() => {
            if (confirm(`Test Mode: Simulate opening reset modal for ${email}?`)) {
                closeForgotPasswordModal();
                openResetPasswordModal(email, resetToken);
            }
        }, 2000);
    });
}

// Reset Password Form
const resetForm = document.getElementById('resetPasswordFormModal');
if (resetForm) {
    const newPasswordInput = document.getElementById('newPasswordModal');
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', () => {
            const strength = checkPasswordStrength(newPasswordInput.value);
            const strengthDiv = document.getElementById('passwordStrengthModal');
            if (strengthDiv) {
                strengthDiv.innerHTML = strength.message;
                strengthDiv.className = `password-strength strength-${strength.level}`;
            }
        });
    }
    
    resetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('newPasswordModal').value;
        const confirm = document.getElementById('confirmPasswordModal').value;
        const alertDiv = document.getElementById('resetAlertMessage');
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.email === pendingResetEmail);
        
        if (password.length < 6) {
            showModalAlert(alertDiv, 'Password must be at least 6 characters.', 'error');
            return;
        }
        if (password !== confirm) {
            showModalAlert(alertDiv, 'Passwords do not match.', 'error');
            return;
        }
        if (userIndex !== -1 && users[userIndex].resetToken === pendingResetToken && users[userIndex].resetTokenExpiry > Date.now()) {
            users[userIndex].password = btoa(password);
            delete users[userIndex].resetToken;
            delete users[userIndex].resetTokenExpiry;
            localStorage.setItem('users', JSON.stringify(users));
            showModalAlert(alertDiv, '✓ Password reset successful!', 'success');
            setTimeout(() => {
                closeResetPasswordModal();
                openLoginModal();
            }, 2000);
        } else {
            showModalAlert(alertDiv, 'Invalid or expired reset link.', 'error');
        }
    });
}

function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    
    if (strength <= 2) return { level: 'weak', message: '⚠️ Weak password' };
    if (strength <= 4) return { level: 'medium', message: '👍 Medium password' };
    return { level: 'strong', message: '✅ Strong password!' };
}

// ===== MOBILE MENU =====
function toggleMobile() {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.toggle('open');
}

// ===== KEYBOARD NAVIGATION FOR SLIDESHOW =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        if (typeof changeSlide !== 'undefined') changeSlide(-1);
    }
    if (e.key === 'ArrowRight') {
        if (typeof changeSlide !== 'undefined') changeSlide(1);
    }
});

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded - initializing');
    
    // Initialize slideshow if on homepage
    initSlideshow();
    
    // Button listeners
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) loginBtn.addEventListener('click', openLoginModal);
    
    const registerBtn = document.getElementById('registerBtn');
    if (registerBtn) registerBtn.addEventListener('click', openRegisterModal);
    
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) settingsBtn.addEventListener('click', openSettingsModal);
    
    const searchIconBtn = document.getElementById('searchIconBtn');
    if (searchIconBtn && typeof openSearchModal === 'function') {
        searchIconBtn.addEventListener('click', openSearchModal);
    }
    
    // Font size slider
    const fontSizeSlider = document.getElementById('fontSizeSlider');
    if (fontSizeSlider) {
        fontSizeSlider.addEventListener('input', (e) => setFontSize(parseInt(e.target.value)));
    }
    
    // Font presets
    const fontPresets = document.querySelectorAll('.font-preset');
    fontPresets.forEach(preset => {
        preset.addEventListener('click', () => {
            const size = parseInt(preset.getAttribute('data-size'));
            setFontSize(size);
        });
    });
    
    // Reduced motion toggle
    const reducedMotionToggle = document.getElementById('reducedMotionToggle');
    if (reducedMotionToggle) {
        reducedMotionToggle.addEventListener('change', (e) => setReducedMotion(e.target.checked));
    }
    
    // High contrast toggle
    const highContrastToggle = document.getElementById('highContrastToggle');
    if (highContrastToggle) {
        highContrastToggle.addEventListener('change', (e) => setHighContrast(e.target.checked));
    }
    
    // Load saved settings
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme, false);
    loadSavedFontSize();
    
    const savedReducedMotion = localStorage.getItem('reducedMotion') === 'true';
    if (savedReducedMotion) document.documentElement.classList.add('reduced-motion');
    const savedHighContrast = localStorage.getItem('highContrast') === 'true';
    if (savedHighContrast) document.documentElement.setAttribute('data-high-contrast', 'true');
    
    // Load saved autoplay setting
    const savedAutoplay = localStorage.getItem('autoplay') !== 'false';
    if (!savedAutoplay && autoplayTimer) {
        clearInterval(autoplayTimer);
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('auth-modal')) {
            e.target.classList.remove('active');
        }
        if (e.target.classList.contains('search-modal')) {
            e.target.classList.remove('active');
        }
    });
});

    // ===== GLOBALS =====
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

    // Shipping rates (simplified)
    const shippingRates = {
        'Eswatini': { 'standard': { name: 'Standard Delivery (3-5 days)', cost: 99.99 }, 'express': { name: 'Express Delivery (1-2 days)', cost: 249.99 }, 'pickup': { name: 'Store Pickup (Free)', cost: 0 } },
        'South Africa': { 'standard': { name: 'Standard Delivery (2-4 days)', cost: 89.99 }, 'express': { name: 'Express Delivery (Next day)', cost: 199.99 } },
        'International': { 'standard': { name: 'International Airmail (10-14 days)', cost: 499.99 }, 'express': { name: 'International Express (2-3 days)', cost: 899.99 } }
    };
    let currentDiscount = 0;

    // ===== UTILITIES =====
    function showToast(message) {
        const toast = document.getElementById('toast');
        const toastMsg = document.getElementById('toastMessage');
        toastMsg.textContent = message;
        toast.style.display = 'flex';
        setTimeout(() => toast.style.display = 'none', 3000);
    }

    function openModal(id) { document.getElementById(id).style.display = 'flex'; }
    function closeModal(id) { document.getElementById(id).style.display = 'none'; }

    // ===== CART RENDERING =====
    function renderCart() {
        const container = document.getElementById('cartItemsList');
        if (cart.length === 0) {
            container.innerHTML = `<div class="cart-empty"><i class="fas fa-shopping-cart"></i><h2>Your cart is empty</h2><a href="shop.html">Continue Shopping →</a></div>`;
            updateSummary();
            return;
        }
        let html = '';
        cart.forEach((item, idx) => {
            const itemTotal = item.price * item.quantity;
            html += `
                <div class="cart-item">
                    <img src="${item.image || 'https://placehold.co/100x100/00e676/ffffff?text=Product'}" class="cart-item-image">
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-category">${item.category || 'Product'}</div>
                        <div class="cart-item-specs">${item.specs || ''}</div>
                        <div class="cart-item-price">E${item.price.toFixed(2)}</div>
                    </div>
                    <div class="cart-item-controls">
                        <div class="quantity-control">
                            <button onclick="updateQuantity(${idx}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateQuantity(${idx}, 1)">+</button>
                        </div>
                        <div class="cart-item-total">E${itemTotal.toFixed(2)}</div>
                        <button class="remove-item" onclick="removeItem(${idx})">Remove</button>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
        updateSummary();
    }

    function updateQuantity(index, delta) {
        if (cart[index]) {
            cart[index].quantity += delta;
            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    }

    function removeItem(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    // ===== ORDER SUMMARY =====
    function updateSummary() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discount = currentDiscount;
        const shipping = getShippingCost();
        const taxable = subtotal - discount + shipping;
        const tax = taxable * 0.1;
        const total = taxable + tax;

        document.getElementById('subtotal').textContent = `E${subtotal.toFixed(2)}`;
        if (discount > 0) {
            document.getElementById('discountRow').style.display = 'flex';
            document.getElementById('discountAmount').textContent = `-E${discount.toFixed(2)}`;
        } else {
            document.getElementById('discountRow').style.display = 'none';
        }
        if (shipping > 0) {
            document.getElementById('shippingRow').style.display = 'flex';
            document.getElementById('shippingCost').textContent = `E${shipping.toFixed(2)}`;
        } else {
            document.getElementById('shippingRow').style.display = 'none';
        }
        document.getElementById('tax').textContent = `E${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `E${total.toFixed(2)}`;
    }

    function getShippingCost() {
        const country = document.getElementById('country')?.value;
        const method = document.querySelector('input[name="shipping"]:checked')?.value;
        if (!country || !method) return 0;
        const rates = shippingRates[country] || shippingRates['International'];
        return rates[method]?.cost || 0;
    }

    function updateShippingOptions() {
        const country = document.getElementById('country').value;
        const container = document.getElementById('shippingOptions');
        if (!country || !shippingRates[country]) {
            container.innerHTML = '<p>Select a country to see shipping options.</p>';
            return;
        }
        let html = '';
        for (let [method, details] of Object.entries(shippingRates[country])) {
            html += `
                <div class="shipping-option">
                    <label>
                        <input type="radio" name="shipping" value="${method}" onchange="updateSummary()">
                        ${details.name} <strong style="color:var(--green);">E${details.cost.toFixed(2)}</strong>
                    </label>
                </div>
            `;
        }
        container.innerHTML = html;
        // select first option
        const firstRadio = container.querySelector('input[type="radio"]');
        if (firstRadio) firstRadio.checked = true;
        updateSummary();
    }

    function applyDiscount() {
        const code = document.getElementById('discountCode').value.toUpperCase();
        const validCodes = { 'SAVE10': 0.10, 'SAVE20': 0.20, 'REFURB15': 0.15, 'TECH25': 0.25 };
        if (validCodes[code]) {
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            currentDiscount = subtotal * validCodes[code];
            showToast(`Discount applied! You saved E${currentDiscount.toFixed(2)}`);
        } else if (code === '') {
            currentDiscount = 0;
        } else {
            showToast('Invalid discount code.');
            return;
        }
        updateSummary();
    }

    // ===== AUTHENTICATION =====
    function login(email, password) {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            showToast(`Welcome back, ${user.fullName || user.email}!`);
            closeModal('loginModal');
            updateUIForLoggedIn();
            return true;
        }
        return false;
    }

    function register(fullName, email, phone, password) {
        if (users.find(u => u.email === email)) {
            showToast('Email already registered');
            return false;
        }
        const newUser = { id: Date.now(), fullName, email, phone, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        currentUser = newUser;
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        showToast('Registration successful!');
        closeModal('registerModal');
        updateUIForLoggedIn();
        return true;
    }

    function forgotPassword(email) {
        const user = users.find(u => u.email === email);
        if (user) {
            // Simulate sending email
            showToast(`Password reset link sent to ${email}`);
            closeModal('forgotPasswordModal');
        } else {
            showToast('Email not found');
        }
    }

    function updateUIForLoggedIn() {
        if (currentUser) {
            document.getElementById('loginRequiredMessage').style.display = 'none';
            document.getElementById('shippingSection').style.display = 'block';
            document.getElementById('paymentSection').style.display = 'block';
            // Pre-fill shipping name if available
            if (currentUser.fullName) document.getElementById('customerName').value = currentUser.fullName;
            if (currentUser.email) document.getElementById('customerEmail').value = currentUser.email;
            if (currentUser.phone) document.getElementById('customerPhone').value = currentUser.phone;
        } else {
            document.getElementById('loginRequiredMessage').style.display = 'block';
            document.getElementById('shippingSection').style.display = 'none';
            document.getElementById('paymentSection').style.display = 'none';
        }
    }
 // ===== CHECKOUT =====
    function proceedToCheckout() {
    const isLoggedIn = localStorage.getItem('user_logged_in') === 'true';
    
    if (!isLoggedIn) {
        // Show warning message and hide it after 5 seconds (optional)
        const warningDiv = document.getElementById('loginWarning');
        if (warningDiv) {
            warningDiv.style.display = 'block';
            setTimeout(() => {
                warningDiv.style.display = 'none';
            }, 5000);
        }
        // Also show toast notification
        showToast('Please login to proceed with checkout');
        return;
    }

        // Validate payment
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        if (paymentMethod === 'credit-card' || paymentMethod === 'debit-card') {
            if (!document.getElementById('cardName').value || !document.getElementById('cardNumber').value) {
                showToast('Please fill in card details');
                return;
            }
        } else if (paymentMethod === 'mtm-momo') {
            if (!document.getElementById('mtmPhone').value) {
                showToast('Please enter MTM phone number');
                return;
            }
        } else if (paymentMethod === 'intacash') {
            if (!document.getElementById('intacashAccount').value) {
                showToast('Please enter IntaCash account');
                return;
            }
        }

        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discount = currentDiscount;
        const shipping = getShippingCost();
        const tax = (subtotal - discount + shipping) * 0.1;
        const total = subtotal - discount + shipping + tax;

        alert(`Order Confirmed!\n\nSubtotal: E${subtotal.toFixed(2)}\nDiscount: -E${discount.toFixed(2)}\nShipping: E${shipping.toFixed(2)}\nTax: E${tax.toFixed(2)}\nTotal: E${total.toFixed(2)}\n\nThank you for your purchase!`);
        // Clear cart
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateUIForLoggedIn();
        // Optionally redirect to shop
        window.location.href = 'shop.html';
    }

    // ===== THEME & SETTINGS (same as main site) =====
    function setTheme(theme) {
        if (theme === 'system') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
        localStorage.setItem('theme', theme);
        showToast(`Theme changed to ${theme === 'system' ? 'System Default' : theme + ' mode'}`);
    }

    function setFontSize(size) {
        document.documentElement.style.fontSize = size + 'px';
        localStorage.setItem('fontSize', size);
        showToast(`Font size changed to ${size}px`);
    }

    function setReducedMotion(enabled) {
        if (enabled) document.documentElement.classList.add('reduced-motion');
        else document.documentElement.classList.remove('reduced-motion');
        localStorage.setItem('reducedMotion', enabled);
    }

    function setHighContrast(enabled) {
        if (enabled) document.documentElement.setAttribute('data-high-contrast', 'true');
        else document.documentElement.removeAttribute('data-high-contrast');
        localStorage.setItem('highContrast', enabled);
    }

    function resetAllSettings() {
        localStorage.removeItem('theme');
        localStorage.removeItem('fontSize');
        localStorage.removeItem('reducedMotion');
        localStorage.removeItem('highContrast');
        document.documentElement.removeAttribute('data-theme');
        document.documentElement.style.fontSize = '';
        document.documentElement.classList.remove('reduced-motion');
        document.documentElement.removeAttribute('data-high-contrast');
        showToast('All settings reset to default');
    }

    // ===== EVENT LISTENERS =====
    document.getElementById('searchIconBtn')?.addEventListener('click', () => openModal('searchModal'));
    document.getElementById('settingsBtn')?.addEventListener('click', () => openModal('settingsModal'));
    document.getElementById('loginBtn')?.addEventListener('click', () => openModal('loginModal'));
    document.getElementById('registerBtn')?.addEventListener('click', () => openModal('registerModal'));
    document.getElementById('checkoutBtn')?.addEventListener('click', proceedToCheckout);
    document.getElementById('loginRequiredLink')?.addEventListener('click', (e) => { e.preventDefault(); openModal('loginModal'); });
    document.getElementById('registerRequiredLink')?.addEventListener('click', (e) => { e.preventDefault(); openModal('registerModal'); });

    // Login form
    document.getElementById('loginForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        if (login(email, password)) {
            document.getElementById('loginForm').reset();
        } else {
            showToast('Invalid email or password');
        }
    });

    // Register form
    document.getElementById('registerForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullName = document.getElementById('regFullName').value;
        const email = document.getElementById('regEmail').value;
        const phone = document.getElementById('regPhone').value;
        const password = document.getElementById('regPassword').value;
        const confirm = document.getElementById('regConfirmPassword').value;
        const agree = document.getElementById('agreeTerms').checked;
        if (!fullName || !email || !password) { showToast('Please fill all required fields'); return; }
        if (password !== confirm) { showToast('Passwords do not match'); return; }
        if (password.length < 6) { showToast('Password must be at least 6 characters'); return; }
        if (!agree) { showToast('Please agree to the Terms of Service'); return; }
        register(fullName, email, phone, password);
        document.getElementById('registerForm').reset();
    });

    // Forgot password
    document.getElementById('forgotPasswordForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('forgotEmail').value;
        forgotPassword(email);
        document.getElementById('forgotPasswordForm').reset();
    });

    document.getElementById('forgotPasswordLink')?.addEventListener('click', (e) => { e.preventDefault(); closeModal('loginModal'); openModal('forgotPasswordModal'); });
    document.getElementById('backToLogin')?.addEventListener('click', (e) => { e.preventDefault(); closeModal('forgotPasswordModal'); openModal('loginModal'); });
    document.getElementById('switchToRegister')?.addEventListener('click', (e) => { e.preventDefault(); closeModal('loginModal'); openModal('registerModal'); });
    document.getElementById('switchToLogin')?.addEventListener('click', (e) => { e.preventDefault(); closeModal('registerModal'); openModal('loginModal'); });

    // Shipping country change
    document.getElementById('country')?.addEventListener('change', updateShippingOptions);

    // Payment method toggles
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const val = radio.value;
            document.getElementById('cardPaymentFields').style.display = (val === 'credit-card' || val === 'debit-card') ? 'block' : 'none';
            document.getElementById('mtmFields').style.display = (val === 'mtm-momo') ? 'block' : 'none';
            document.getElementById('intacashFields').style.display = (val === 'intacash') ? 'block' : 'none';
        });
    });

    // Settings checkboxes
    const reducedCheck = document.getElementById('reducedMotion');
    const contrastCheck = document.getElementById('highContrast');
    if (reducedCheck) reducedCheck.addEventListener('change', (e) => setReducedMotion(e.target.checked));
    if (contrastCheck) contrastCheck.addEventListener('change', (e) => setHighContrast(e.target.checked));

    // Load saved theme & font
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
    const savedReduced = localStorage.getItem('reducedMotion') === 'true';
    if (savedReduced && reducedCheck) reducedCheck.checked = true;
    const savedContrast = localStorage.getItem('highContrast') === 'true';
    if (savedContrast && contrastCheck) contrastCheck.checked = true;

    // Initialize
    renderCart();
    updateUIForLoggedIn();
    updateShippingOptions();

    // Close modals on outside click
    window.onclick = function(e) {
        if (e.target.classList.contains('auth-modal')) {
            e.target.style.display = 'none';
        }
    };

    function openModal(id) { document.getElementById(id).style.display = 'flex'; }

// Make functions available globally for onclick handlers
window.openLoginModal = openLoginModal;
window.closeLoginModal = closeLoginModal;
window.openRegisterModal = openRegisterModal;
window.closeRegisterModal = closeRegisterModal;
window.switchToLogin = switchToLogin;
window.switchToRegister = switchToRegister;
window.openForgotPasswordModal = openForgotPasswordModal;
window.closeForgotPasswordModal = closeForgotPasswordModal;
window.switchToLoginFromForgot = switchToLoginFromForgot;
window.openResetPasswordModal = openResetPasswordModal;
window.closeResetPasswordModal = closeResetPasswordModal;
window.switchToLoginFromReset = switchToLoginFromReset;
window.openSettingsModal = openSettingsModal;
window.closeSettingsModal = closeSettingsModal;
window.setTheme = setTheme;
window.setFontSize = setFontSize;
window.resetAllSettings = resetAllSettings;
window.closeVerificationModal = closeVerificationModal;
window.closeToast = closeToast;
window.toggleMobile = toggleMobile;
window.changeSlide = changeSlide;
window.goToSlide = goToSlide;
       
