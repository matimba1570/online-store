from pathlib import Path

base = Path(r'C:\Users\huawei\Documents\online-store')
modal_block = '''
<!-- ===== SEARCH MODAL ===== -->
<div class="search-modal" id="searchModal">
    <div class="search-modal-content">
        <div class="search-modal-header">
            <h3><i class="fas fa-search"></i> Search Eswatini Technocrats</h3>
            <button class="close-modal" id="closeModalBtn"><i class="fas fa-times"></i></button>
        </div>
        <div class="search-modal-body">
            <div class="search-category-row">
                <select id="categoryFilter" class="category-select">
                    <option value="all">All Categories</option>
                    <option value="services">Services</option>
                    <option value="shop">Shop / Products</option>
                    <option value="events">Events</option>
                    <option value="programs">Programs</option>
                    <option value="pages">Pages</option>
                </select>
                <div class="search-input-wrapper">
                    <input type="text" id="searchInputModal" placeholder="Type to search... e.g., laptop, repair, POS..." autocomplete="off">
                    <button id="searchSubmitBtn"><i class="fas fa-arrow-right"></i> Search</button>
                </div>
            </div>
            <div id="suggestionsContainer" class="suggestions-list">
                <div class="no-results">🔍 Start typing to see matching results...</div>
            </div>
        </div>
    </div>
</div>

<!-- ===== LOGIN MODAL ===== -->
<div class="auth-modal" id="loginModal">
    <div class="auth-modal-content">
        <div class="auth-modal-header">
            <h3><i class="fas fa-sign-in-alt"></i> Login to Your Account</h3>
            <button class="close-auth-modal" onclick="closeLoginModal()"><i class="fas fa-times"></i></button>
        </div>
        <div class="auth-modal-body">
            <form id="loginForm">
                <div class="form-group">
                    <label><i class="fas fa-envelope"></i> Email Address</label>
                    <input type="email" id="loginEmail" required placeholder="Enter your email">
                </div>
                <div class="form-group">
                    <label><i class="fas fa-lock"></i> Password</label>
                    <input type="password" id="loginPassword" required placeholder="Enter your password">
                </div>
                <div class="form-options">
                    <label class="remember-me">
                        <input type="checkbox"> Remember me
                    </label>
                    <a href="#" onclick="openForgotPasswordModal(); return false;" class="forgot-password-link">Forgot Password?</a>
                </div>
                <button type="submit" class="auth-submit-btn">Login <i class="fas fa-arrow-right"></i></button>
            </form>
            <div class="auth-divider"><span>or</span></div>
            <p class="auth-switch">Don't have an account? <a href="#" onclick="switchToRegister()">Register here</a></p>
        </div>
    </div>
</div>

<!-- ===== REGISTER MODAL ===== -->
<div class="auth-modal" id="registerModal">
    <div class="auth-modal-content">
        <div class="auth-modal-header">
            <h3><i class="fas fa-user-plus"></i> Create Your Account</h3>
            <button class="close-auth-modal" onclick="closeRegisterModal()"><i class="fas fa-times"></i></button>
        </div>
        <div class="auth-modal-body">
            <div id="registerAlertMessage" class="alert" style="display: none;"></div>
            <form id="registerForm">
                <div class="form-group">
                    <label><i class="fas fa-user"></i> Full Name</label>
                    <input type="text" id="regFullName" required placeholder="Enter your full name">
                </div>
                <div class="form-group">
                    <label><i class="fas fa-envelope"></i> Email Address</label>
                    <input type="email" id="regEmail" required placeholder="Enter your email">
                </div>
                <div class="form-group">
                    <label><i class="fas fa-phone"></i> Phone Number</label>
                    <input type="tel" id="regPhone" placeholder="Enter your phone number">
                </div>
                <div class="form-group">
                    <label><i class="fas fa-lock"></i> Password</label>
                    <input type="password" id="regPassword" required placeholder="Create a password (min 6 characters)">
                </div>
                <div class="form-group">
                    <label><i class="fas fa-check-circle"></i> Confirm Password</label>
                    <input type="password" id="regConfirmPassword" required placeholder="Confirm your password">
                </div>
                <div class="form-group">
                    <label class="terms-label">
                        <input type="checkbox" id="agreeTerms" required>
                        I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                    </label>
                </div>
                <button type="submit" class="auth-submit-btn">Register <i class="fas fa-paper-plane"></i></button>
            </form>
            <div class="auth-divider"><span>or</span></div>
            <p class="auth-switch">Already have an account? <a href="#" onclick="switchToLogin()">Login here</a></p>
        </div>
    </div>
</div>

<!-- ===== FORGOT PASSWORD MODAL ===== -->
<div class="auth-modal" id="forgotPasswordModal">
    <div class="auth-modal-content">
        <div class="auth-modal-header">
            <h3><i class="fas fa-key"></i> Lost Password</h3>
            <button class="close-auth-modal" onclick="closeForgotPasswordModal()"><i class="fas fa-times"></i></button>
        </div>
        <div class="auth-modal-body">
            <div class="forgot-title" style="margin-bottom: 20px;">
                <p style="color: var(--gray); font-size: 14px;">Lost your password? Please enter your email address. You will receive a link to create a new password via email.</p>
            </div>
            <div id="forgotAlertMessage" class="alert" style="display: none;"></div>
            <form id="forgotPasswordFormModal">
                <div class="form-group">
                    <label><i class="fas fa-envelope"></i> Email Address *</label>
                    <input type="email" id="forgotEmail" required placeholder="Enter your registered email">
                </div>
                <button type="submit" class="auth-submit-btn"><i class="fas fa-paper-plane"></i> Reset Password</button>
            </form>
            <div class="auth-divider"><span>or</span></div>
            <p class="auth-switch"><a href="#" onclick="switchToLoginFromForgot(); return false;">← Back to Login</a></p>
        </div>
    </div>
</div>

<!-- ===== RESET PASSWORD MODAL ===== -->
<div class="auth-modal" id="resetPasswordModal">
    <div class="auth-modal-content">
        <div class="auth-modal-header">
            <h3><i class="fas fa-lock-open"></i> Create New Password</h3>
            <button class="close-auth-modal" onclick="closeResetPasswordModal()"><i class="fas fa-times"></i></button>
        </div>
        <div class="auth-modal-body">
            <div id="resetAlertMessage" class="alert" style="display: none;"></div>
            <form id="resetPasswordFormModal">
                <div class="form-group">
                    <label><i class="fas fa-envelope"></i> Email Address</label>
                    <input type="email" id="resetEmailDisplay" readonly style="background: #f5f5f5;">
                </div>
                <div class="form-group">
                    <label><i class="fas fa-lock"></i> New Password *</label>
                    <input type="password" id="newPasswordModal" required placeholder="Enter new password (min 6 characters)">
                    <div class="password-strength" id="passwordStrengthModal"></div>
                </div>
                <div class="form-group">
                    <label><i class="fas fa-check-circle"></i> Confirm New Password *</label>
                    <input type="password" id="confirmPasswordModal" required placeholder="Confirm your new password">
                </div>
                <button type="submit" class="auth-submit-btn"><i class="fas fa-save"></i> Reset Password</button>
            </form>
            <div class="auth-divider"><span>or</span></div>
            <p class="auth-switch"><a href="#" onclick="switchToLoginFromReset(); return false;">← Back to Login</a></p>
        </div>
    </div>
</div>

<!-- ===== SUCCESS TOAST ===== -->
<div id="successToast" class="success-toast">
    <div class="toast-content">
        <i class="fas fa-check-circle"></i>
        <div>
            <h4>Success!</h4>
            <p>Message here</p>
        </div>
        <button onclick="closeToast()"><i class="fas fa-times"></i></button>
    </div>
</div>

<!-- ===== VERIFICATION MODAL ===== -->
<div class="verification-modal" id="verificationModal">
    <div class="verification-content">
        <div class="verification-icon"><i class="fas fa-envelope-open-text"></i></div>
        <h3>Verify Your Email Address</h3>
        <p>We've sent a verification link to <strong id="verificationEmail"></strong></p>
        <p class="verification-instruction">Please check your email and click the verification link to activate your account.</p>
        <div class="verification-buttons">
            <button onclick="resendVerification()" class="btn-resend"><i class="fas fa-redo"></i> Resend Email</button>
            <button onclick="closeVerificationModal()" class="btn-close-verify">Close</button>
        </div>
    </div>
</div>
'''

files = sorted(base.glob('acer*.html'))
updated = []
for f in files:
    text = f.read_text(encoding='utf-8')
    if 'id="searchModal"' in text or 'id="loginModal"' in text:
        continue
    idx = text.rfind('</body>')
    if idx == -1:
        print(f'NO BODY CLOSE: {f}')
        continue
    new_text = text[:idx] + modal_block + '\n' + text[idx:]
    f.write_text(new_text, encoding='utf-8')
    updated.append(str(f.name))

print('Updated', len(updated), 'files:')
for name in updated:
    print(name)
