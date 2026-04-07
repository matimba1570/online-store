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

document.getElementById('registerForm').addEventListener('submit', async (e) => {
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

  try {
    const response = await fetch('https://lucila-duckier-arlo.ngrok-free.dev/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, phone, password }),
    });
    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      // Optionally close modal and show verification info
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error('Registration error:', error);
    alert('Server error. Please try again later.');
  }
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
       
