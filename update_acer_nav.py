from pathlib import Path
import re

nav_html = '''<!-- ===== MAIN NAVBAR ===== -->
<nav class="navbar">
    <a href="home.html" class="logo">
        <div class="logo-icon"><img src="logo.png" alt="logo"></div>
        <div class="logo-text">Eswatini<br><span>Technocrats Center</span></div>
    </a>
    <ul class="nav-links">
        <li class="nav-item"><a href="home.html">Home</a></li>
        <li class="nav-item"><a href="about.html">About Us</a></li>
        <li class="nav-item"><a href="shop.html">Shop</a></li>
        <li class="nav-item">
            <a href="services.html">Services <i class="fas fa-chevron-down"></i></a>
            <ul class="dropdown">
                <li><a href="laptop-repairs.html">Laptop & Computer Repairs</a></li>
                <li><a href="pos.html">Point of Sale</a></li>
                <li><a href="software-installations.html">Softwares Installations</a></li>
                <li><a href="networking.html">Networking</a></li>
                <li><a href="tech-support.html">Tech Support</a></li>
            </ul>
        </li>
        <li class="nav-item">
            <a href="Security and access.html">Security & Access <i class="fas fa-chevron-down"></i></a>
            <ul class="dropdown">
                <li><a href="physical-security.html">Physical Security</a></li>
                <li><a href="it-security.html">IT Security</a></li>
                <li><a href="identity-access.html">Identity & Access</a></li>
                <li><a href="monitoring.html">Monitoring</a></li>
            </ul>
        </li>
        <li class="nav-item"><a href="dealer.html">Dealer</a></li>
        <li class="nav-item"><a href="contact.html">Contact</a></li>
    </ul>
    <div class="nav-actions-right">
        <button class="search-icon-btn" id="searchIconBtn"><i class="fas fa-search"></i></button>
        <button class="settings-icon-btn" id="settingsBtn"><i class="fas fa-cog"></i></button>
        <div class="auth-buttons">
            <button class="login-icon-btn" id="loginBtn"><i class="fas fa-sign-in-alt"></i><span>Login</span></button>
            <button class="register-icon-btn" id="registerBtn"><i class="fas fa-user-plus"></i><span>Register</span></button>
        </div>
        <div class="hamburger" id="hamburger"><span></span><span></span><span></span></div>
    </div>
</nav>

<!-- ===== SECONDARY NAVIGATION ===== -->
<div class="secondary-nav">
    <div class="secondary-nav-container">
        <ul class="secondary-nav-menu">
            <li><a href="shop.html" id="nav-home"><i class="fas fa-home"></i><span> Shop</span></a></li>
            <li><a href="#" id="nav-all"><i class="fas fa-box"></i><span> All Products</span></a></li>
            <li><a href="Refurbished.html" id="nav-refurbished"><i class="fas fa-sync-alt"></i><span> Refurbished</span></a></li>
            <li><a href="#" id="nav-events"><i class="fas fa-calendar-alt"></i><span> Events</span></a></li>
        </ul>
        <div class="cart-icon">
            <a href="Cart.html">
                <i class="fas fa-shopping-cart"></i> Cart
                <span class="cart-count-badge" id="cartCount">0</span>
            </a>
        </div>
    </div>
</div>

<div class="secondary-nav-spacer"></div>

<!-- MOBILE MENU -->
<div class="mobile-menu" id="mobileMenu">
    <div class="mobile-nav-item"><div class="mobile-nav-link" onclick="location.href='home.html'">Home</div></div>
    <div class="mobile-nav-item"><div class="mobile-nav-link" onclick="location.href='about.html'">About Us</div></div>
    <div class="mobile-nav-item"><div class="mobile-nav-link" onclick="location.href='shop.html'">Shop</div></div>
    <div class="mobile-nav-item"><div class="mobile-nav-link" onclick="location.href='services.html'">Services</div></div>
    <div class="mobile-nav-item"><div class="mobile-nav-link" onclick="location.href='Security and access.html'">Security & Access</div></div>
    <div class="mobile-nav-item"><div class="mobile-nav-link" onclick="location.href='dealer.html'">Dealer</div></div>
    <div class="mobile-nav-item"><div class="mobile-nav-link" onclick="location.href='contact.html'">Contact</div></div>
</div>
'''

css_block = '''
/* ===== SECONDARY NAVIGATION ===== */
.secondary-nav {
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    background: var(--white);
    border-bottom: 1px solid #e0e0e0;
    z-index: 999;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.secondary-nav-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
}

.secondary-nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
    margin: 0;
    padding: 0;
}

.secondary-nav-menu li a {
    text-decoration: none;
    color: var(--dark);
    font-weight: 500;
    font-size: 14px;
    padding: 0.5rem 0;
    transition: all 0.3s;
    position: relative;
    cursor: pointer;
}

.secondary-nav-menu li a:hover {
    color: var(--green);
}

.secondary-nav-menu li a.active {
    color: var(--green);
    border-bottom: 2px solid var(--green);
}

.secondary-nav-menu li a i {
    margin-right: 6px;
    font-size: 12px;
}

.cart-icon {
    position: relative;
    cursor: pointer;
}

.cart-icon a {
    text-decoration: none;
    color: var(--dark);
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
}

.cart-icon a:hover {
    color: var(--green);
}

.cart-count-badge {
    background: var(--green);
    color: var(--black);
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 12px;
    font-weight: bold;
    margin-left: 5px;
}

.secondary-nav-spacer {
    height: 120px;
}
'''

style_path = Path('style.css')
style_text = style_path.read_text(encoding='utf-8')
if '/* ===== SECONDARY NAVIGATION ===== */' not in style_text:
    insert_pos = style_text.rfind('/* ===== SLIDESHOW ===== */')
    if insert_pos == -1:
        style_text += '\n' + css_block
    else:
        style_text = style_text[:insert_pos] + css_block + style_text[insert_pos:]
    style_path.write_text(style_text, encoding='utf-8')
    print('Updated style.css with secondary nav CSS')

header_pattern = re.compile(r'<header.*?</header>', re.S)

for path in sorted(Path('.').glob('acer-*.html')):
    text = path.read_text(encoding='utf-8')
    original = text
    text = re.sub(r'^<<<<<<<.*?$|^=======.*?$|^>>>>>>>.*?$', '', text, flags=re.M)
    if header_pattern.search(text):
        text = header_pattern.sub(nav_html, text, count=1)
    else:
        body_index = text.find('<body>')
        if body_index != -1:
            insert_point = text.find('>', body_index) + 1
            if insert_point > 0:
                text = text[:insert_point] + '\n' + nav_html + text[insert_point:]
    if text != original:
        path.write_text(text, encoding='utf-8')
        print(f'Updated {path.name}')
