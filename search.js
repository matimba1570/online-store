// ===== SEARCH MODAL FUNCTIONALITY =====
// Search Database - Contains all searchable content from the website
const searchData = [
    // Services
    { title: "Laptop & Computer Repairs", category: "services", keywords: "laptop computer repair fix hardware motherboard screen battery", icon: "fas fa-laptop-code", url: "laptop-repairs.html" },
    { title: "Point of Sale Systems", category: "services", keywords: "pos sales system retail cash register payment terminal", icon: "fas fa-cash-register", url: "pos.html" },
    { title: "Software Installations", category: "services", keywords: "software installation windows office antivirus drivers", icon: "fas fa-download", url: "software-installations.html" },
    { title: "Networking Solutions", category: "services", keywords: "network setup router wifi switch cable infrastructure", icon: "fas fa-network-wired", url: "networking.html" },
    { title: "Tech Support & IT Consulting", category: "services", keywords: "support helpdesk it consulting troubleshooting maintenance", icon: "fas fa-headset", url: "tech-support.html" },
    
    // Shop / Products
    { title: "Gaming Laptops", category: "shop", keywords: "gaming laptop high performance alienware asus acer", icon: "fas fa-gamepad", url: "#" },
    { title: "Business Desktop PCs", category: "shop", keywords: "desktop business office computer workstation dell hp", icon: "fas fa-desktop", url: "#" },
    { title: "Laptop Accessories", category: "shop", keywords: "charger mouse bag cooling pad keyboard headset", icon: "fas fa-mouse", url: "#" },
    { title: "Point of Sale Sets", category: "shop", keywords: "pos set printer scanner cash drawer", icon: "fas fa-cash-register", url: "#" },
    { title: "Laptop Housing & Parts", category: "shop", keywords: "laptop housing case screen keyboard battery fan", icon: "fas fa-microchip", url: "#" },
    { title: "Computer Small Parts", category: "shop", keywords: "ram ssd hard drive processor cooling fan", icon: "fas fa-memory", url: "#" },
    { title: "Dell Laptop Batteries", category: "shop", keywords: "dell battery laptop xps pro max vostro inspiron latitude", icon: "fas fa-battery-half", url: "batteries.html" },
    { title: "Dell XPS Batteries", category: "shop", keywords: "dell xps battery laptop replacement external internal", icon: "fas fa-battery-full", url: "xps2.html" },
    { title: "Dell Pro Batteries", category: "shop", keywords: "dell pro battery laptop replacement external internal", icon: "fas fa-battery-three-quarters", url: "xps2.html" },
    { title: "Dell Pro Max Batteries", category: "shop", keywords: "dell pro max battery laptop replacement external internal", icon: "fas fa-battery-half", url: "promax.html" },
    { title: "Dell Vostro Batteries", category: "shop", keywords: "dell vostro battery laptop replacement external internal", icon: "fas fa-battery-quarter", url: "vostro.html" },
    { title: "Dell Inspiron Batteries", category: "shop", keywords: "dell inspiron battery laptop replacement external internal", icon: "fas fa-battery-empty", url: "inspiron.html" },
    { title: "Dell Latitude Batteries", category: "shop", keywords: "dell latitude battery laptop replacement external internal", icon: "fas fa-battery-half", url: "latitude.html" },
    
    // Events & Specials
    { title: "Monthly Tech Specials", category: "events", keywords: "specials discounts monthly offers deals promotion", icon: "fas fa-calendar-alt", url: "#" },
    { title: "Combo Deals", category: "events", keywords: "combo bundle deals package discount savings", icon: "fas fa-gift", url: "#" },
    { title: "Black Friday Specials", category: "events", keywords: "black friday sale huge discounts november", icon: "fas fa-tag", url: "#" },
    
    // Programs & Courses
    { title: "Coding Bootcamp", category: "programs", keywords: "coding programming web development javascript python", icon: "fas fa-code", url: "#" },
    { title: "AI & Data Science Course", category: "programs", keywords: "artificial intelligence data science machine learning ml", icon: "fas fa-brain", url: "#" },
    { title: "Cybersecurity Workshop", category: "programs", keywords: "security ethical hacking cyber protection network security", icon: "fas fa-shield-alt", url: "#" },
    { title: "Full Stack Development", category: "programs", keywords: "full stack frontend backend react node", icon: "fas fa-layer-group", url: "#" },
    
    // Pages
    { title: "Home Page", category: "pages", keywords: "home main landing welcome", icon: "fas fa-home", url: "#" },
    { title: "About Technocrats Center", category: "pages", keywords: "about mission vision team history founders", icon: "fas fa-building", url: "#" },
    { title: "Contact & Location", category: "pages", keywords: "contact address phone email location map", icon: "fas fa-address-card", url: "#contact" },
    { title: "Innovation Hub", category: "pages", keywords: "innovation hub lab makerspace creativity", icon: "fas fa-lightbulb", url: "#" }
];

// DOM Elements
const searchModal = document.getElementById('searchModal');
const searchIconBtn = document.getElementById('searchIconBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const searchInput = document.getElementById('searchInputModal');
const categoryFilter = document.getElementById('categoryFilter');
const suggestionsContainer = document.getElementById('suggestionsContainer');
const searchSubmitBtn = document.getElementById('searchSubmitBtn');

/**
 * Highlights matching text in search results
 */
function highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark style="background: var(--green); color: var(--black); padding: 0 2px; border-radius: 3px;">$1</mark>');
}

/**
 * Filters search results based on input and category
 */
function filterSearchResults() {
    const query = searchInput.value.trim().toLowerCase();
    const selectedCat = categoryFilter.value;
    
    if (query === "") {
        return [];
    }
    
    return searchData.filter(item => {
        const matchesCategory = (selectedCat === 'all' || item.category === selectedCat);
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesKeywords = item.keywords.toLowerCase().includes(query);
        return matchesCategory && (matchesTitle || matchesKeywords);
    });
}

/**
 * Renders suggestions in the modal
 */
function renderSuggestions() {
    const query = searchInput.value.trim().toLowerCase();
    const items = filterSearchResults();
    
    if (query === "") {
        suggestionsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search" style="font-size: 24px; margin-bottom: 12px; display: block;"></i>
                <strong>Start typing to search</strong><br>
                <small style="color: var(--gray);">Try searching for: laptop, repair, POS, software, networking...</small>
            </div>
        `;
        return;
    }
    
    if (items.length === 0) {
        suggestionsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-exclamation-circle" style="font-size: 28px; margin-bottom: 12px; display: block; color: var(--green);"></i>
                <strong>No results found for "${highlightMatch(query, query)}"</strong><br>
                <small style="color: var(--gray);">Try different keywords or browse our categories</small>
            </div>
        `;
        return;
    }
    
    suggestionsContainer.innerHTML = items.map(item => `
        <div class="suggestion-item" data-url="${item.url}" data-title="${item.title}">
            <i class="${item.icon}"></i>
            <div class="suggestion-info">
                <div class="suggestion-title">${highlightMatch(item.title, query)}</div>
                <div class="suggestion-category">
                    <i class="fas fa-folder-open"></i> ${item.category.toUpperCase()}
                    <span style="margin-left: 12px;">
                        <i class="fas fa-tag"></i> ${item.keywords.split(' ').slice(0, 3).join(', ')}...
                    </span>
                </div>
            </div>
            <i class="fas fa-arrow-right" style="color: var(--green); opacity: 0.5;"></i>
        </div>
    `).join('');
    
    // Add click handlers to suggestion items
    document.querySelectorAll('.suggestion-item').forEach(el => {
        el.addEventListener('click', () => {
            const url = el.getAttribute('data-url');
            const title = el.getAttribute('data-title');
            navigateToResult(url, title);
        });
    });
}

/**
 * Navigates to the selected result
 */
function navigateToResult(url, title) {
    // Close the modal
    searchModal.classList.remove('active');
    
    // If URL exists and is not a placeholder
    if (url && url !== "#") {
        if (url.startsWith('#')) {
            // Scroll to section on current page
            const element = document.querySelector(url);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            } else {
                alert(`📌 ${title}\n\nThis section is coming soon!`);
            }
        } else {
            // Navigate to other page
            window.location.href = url;
        }
    } else {
        alert(`📌 ${title}\n\nThis page is under development. Check back soon!`);
    }
}

/**
 * Performs search when button is clicked
 */
function performSearch() {
    const query = searchInput.value.trim();
    if (query === "") {
        suggestionsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-info-circle"></i>
                Please enter a search term
            </div>
        `;
        return;
    }
    renderSuggestions();
}

/**
 * Opens the search modal
 */
function openSearchModal() {
    searchModal.classList.add('active');
    searchInput.focus();
    // Reset to initial state
    searchInput.value = "";
    categoryFilter.value = "all";
    suggestionsContainer.innerHTML = `
        <div class="no-results">
            <i class="fas fa-search" style="font-size: 24px; margin-bottom: 12px; display: block;"></i>
            <strong>Search our website</strong><br>
            <small style="color: var(--gray);">Try: laptop repairs, POS systems, software installation, networking, tech support</small>
        </div>
    `;
}

/**
 * Closes the search modal
 */
function closeSearchModal() {
    searchModal.classList.remove('active');
}

// ===== Event Listeners =====

// Open modal when search icon is clicked
if (searchIconBtn) {
    searchIconBtn.addEventListener('click', openSearchModal);
}

// Close modal with close button
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeSearchModal);
}

// Close modal when clicking outside the content
if (searchModal) {
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            closeSearchModal();
        }
    });
}

// Live search as user types
if (searchInput) {
    searchInput.addEventListener('input', renderSuggestions);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });
}

// Category filter change
if (categoryFilter) {
    categoryFilter.addEventListener('change', () => {
        if (searchInput.value.trim() !== "") {
            renderSuggestions();
        }
    });
}

// Search button click
if (searchSubmitBtn) {
    searchSubmitBtn.addEventListener('click', performSearch);
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal && searchModal.classList.contains('active')) {
        closeSearchModal();
    }
});

// Optional: Add keyboard shortcut Ctrl+K or Cmd+K to open search
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearchModal();
    }
});

console.log('🔍 Search modal initialized - Press Ctrl+K to search');
