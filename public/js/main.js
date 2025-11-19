// Global variable for current language
let currentLanguage = 'arabic';

// Language toggle functionality
function toggleLanguage() {
    const body = document.body;
    const languageToggle = document.querySelector('.language-toggle');
    
    if (currentLanguage === 'arabic') {
        // Switch to English
        body.classList.remove('arabic');
        body.classList.add('english');
        currentLanguage = 'english';
        languageToggle.textContent = 'EN';
    } else {
        // Switch to Arabic
        body.classList.remove('english');
        body.classList.add('arabic');
        currentLanguage = 'arabic';
        languageToggle.textContent = 'عربي';
    }
    
    // Update content for current language
    updateContent(currentLanguage);
}

// Update content based on language
function updateContent(language) {
    // Update navigation links
    const navHome = document.getElementById('navHome');
    const navProperties = document.getElementById('navProperties');
    const navAbout = document.getElementById('navAbout');
    const navContact = document.getElementById('navContact');
    
    if (language === 'arabic') {
        if (navHome) navHome.textContent = 'الرئيسية';
        if (navProperties) navProperties.textContent = 'الشقق';
        if (navAbout) navAbout.textContent = 'عن المنصة';
        if (navContact) navContact.textContent = 'اتصل بنا';
    } else {
        if (navHome) navHome.textContent = 'Home';
        if (navProperties) navProperties.textContent = 'Properties';
        if (navAbout) navAbout.textContent = 'About';
        if (navContact) navContact.textContent = 'Contact';
    }
    
    // Update footer links
    const footerHome = document.getElementById('footerHome');
    const footerProperties = document.getElementById('footerProperties');
    const footerAbout = document.getElementById('footerAbout');
    const footerContact = document.getElementById('footerContact');
    
    if (language === 'arabic') {
        if (footerHome) footerHome.textContent = 'الرئيسية';
        if (footerProperties) footerProperties.textContent = 'الشقق';
        if (footerAbout) footerAbout.textContent = 'عن المنصة';
        if (footerContact) footerContact.textContent = 'اتصل بنا';
    } else {
        if (footerHome) footerHome.textContent = 'Home';
        if (footerProperties) footerProperties.textContent = 'Properties';
        if (footerAbout) footerAbout.textContent = 'About';
        if (footerContact) footerContact.textContent = 'Contact';
    }
}

// Dark/Light Mode Toggle
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        if (themeToggle) themeToggle.textContent = '☀️';
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        if (themeToggle) themeToggle.textContent = '🌙';
    }
}

// Update authentication UI
function updateAuthUI() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authBtn = document.getElementById('authBtn');
    const profileIcon = document.getElementById('profileIcon');
    const notificationsBtn = document.getElementById('notificationsBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    
    if (currentUser) {
        if (authBtn) {
            authBtn.textContent = 'تسجيل الخروج';
            authBtn.onclick = function(e) {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                alert('تم تسجيل الخروج بنجاح!');
                updateAuthUI();
                window.location.href = 'index.html';
            };
        }
        
        if (profileIcon) {
            profileIcon.style.display = 'flex';
            profileIcon.onclick = function() {
                window.location.href = 'profile.html';
            };
        }
        
        if (notificationsBtn) {
            notificationsBtn.style.display = 'block';
            const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
            if (bookings.length > 0) {
                const notificationBadge = document.getElementById('notificationBadge');
                notificationBadge.textContent = bookings.length;
                notificationBadge.style.display = 'block';
            }
        }
    } else {
        if (authBtn) {
            authBtn.textContent = 'تسجيل الدخول';
            authBtn.onclick = function(e) {
                e.preventDefault();
                window.location.href = 'login.html';
            };
        }
        
        if (profileIcon) {
            profileIcon.style.display = 'none';
        }
        
        if (notificationsBtn) {
            notificationsBtn.style.display = 'none';
        }
    }
    
    if (settingsBtn) {
        settingsBtn.onclick = function() {
            window.location.href = 'settings.html';
        };
    }
}

// Check if user is logged in for protected pages
// Check if user is logged in for protected pages
function checkAuthForProtectedPages() {
    const currentPage = window.location.pathname.split('/').pop();
    const protectedPages = ['profile.html']; // صفحة البروفايل بس المحمية
    const currentUser = localStorage.getItem('currentUser');
    
    if (protectedPages.includes(currentPage) && !currentUser) {
        if (currentPage !== 'login.html' && currentPage !== 'register.html') {
            alert('يجب تسجيل الدخول أولاً!');
            window.location.href = 'login.html';
        }
    }
}

// API call helper
async function apiCall(url, options = {}) {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const config = {
        ...defaultOptions,
        ...options
    };
    
    try {
        const response = await fetch(url, config);
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Load saved theme
    loadSavedTheme();
    
    // Check authentication for protected pages
    checkAuthForProtectedPages();
    
    // Update auth UI
    updateAuthUI();
    // إضافة رابط "إضافة شقة" للمستخدمين المسجلين
const navList = document.getElementById('navList');
if (currentUser && navList && !document.getElementById('navAddProperty')) {
    const addPropertyItem = document.createElement('li');
    addPropertyItem.id = 'navAddProperty';
    addPropertyItem.innerHTML = '<a href="add-property.html">إضافة شقة</a>';
    navList.appendChild(addPropertyItem);
} else {
    const addPropertyItem = document.getElementById('navAddProperty');
    if (addPropertyItem) {
        addPropertyItem.remove();
    }
}
    
    // Language toggle
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Load properties on home page
    if (document.getElementById('homePage')) {
        loadProperties();
    }
    
    // Load all properties for properties page
function loadAllProperties() {
    // Load properties from localStorage first
    let properties = JSON.parse(localStorage.getItem('properties') || '[]');
    
    // Add demo properties if no properties exist
    if (properties.length === 0) {
        properties = [
            { id: '1', title: 'شقة طلابية في القاهرة', location: 'القاهرة الجديدة', university: 'الجامعة الأمريكية', bedrooms: 'غرفتين نوم', bathrooms: 'حمامين', price: '1800 ج.م / شهر' },
            { id: '2', title: 'شقة طلابية في الإسكندرية', location: 'سموحة', university: 'جامعة الإسكندرية', bedrooms: 'غرفة نوم واحدة', bathrooms: 'حمام واحد', price: '1200 ج.م / شهر' },
            { id: '3', title: 'شقة طلابية في المنصورة', location: 'الجامعة', university: 'جامعة المنصورة', bedrooms: 'ثلاث غرف نوم', bathrooms: 'حمامين', price: '2200 ج.م / شهر' }
        ];
    }
    
    const propertiesGrid = document.getElementById('propertiesGrid');
    if (propertiesGrid) {
        propertiesGrid.innerHTML = '';
        properties.forEach(property => {
            const propertyCard = document.createElement('div');
            propertyCard.className = 'property-card card-hover';
            propertyCard.onclick = () => window.location.href = `property-detail.html?id=${property.id}`;
            
            // تحديد عدد غرف النوم و الحمامات للعرض
            let bedroomsText = property.bedrooms;
            let bathroomsText = property.bathrooms;
            
            // لو البيانات من localStorage (رقم) وليس نص
            if (typeof property.bedrooms === 'number') {
                bedroomsText = `${property.bedrooms} ${property.bedrooms === 1 ? 'غرفة نوم' : 'غرف نوم'}`;
            }
            if (typeof property.bathrooms === 'number') {
                bathroomsText = `${property.bathrooms} ${property.bathrooms === 1 ? 'حمام' : 'حمامات'}`;
            }
            
            propertyCard.innerHTML = `
                <div class="property-img">
                    <i class="fas fa-home"></i>
                </div>
                <div class="property-info">
                    <h3>${property.title}</h3>
                    <div class="property-meta">
                        <span><i class="fas fa-map-marker-alt"></i> ${property.location}</span>
                        <span><i class="fas fa-university"></i> ${property.university}</span>
                    </div>
                    <div class="property-meta">
                        <span>${bedroomsText}</span>
                        <span>${bathroomsText}</span>
                    </div>
                    <div class="property-price">${property.price} ج.م / شهر</div>
                </div>
            `;
            
            propertiesGrid.appendChild(propertyCard);
        });
    }
}
    
    // Home page button navigation
    const heroRegisterBtn = document.getElementById('heroRegisterBtn');
    if (heroRegisterBtn) {
        heroRegisterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'register.html';
        });
    }
    
    const heroPropertiesBtn = document.getElementById('heroPropertiesBtn');
    if (heroPropertiesBtn) {
        heroPropertiesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'properties.html';
        });
    }
});

// Load properties for home page
function loadProperties() {
    // For demo purposes, we'll use static data
    const properties = [
        { id: '1', title: 'شقة طلابية في القاهرة', location: 'القاهرة الجديدة', university: 'الجامعة الأمريكية', bedrooms: 'غرفتين نوم', bathrooms: 'حمامين', price: '1800 ج.م / شهر' },
        { id: '2', title: 'شقة طلابية في الإسكندرية', location: 'سموحة', university: 'جامعة الإسكندرية', bedrooms: 'غرفة نوم واحدة', bathrooms: 'حمام واحد', price: '1200 ج.م / شهر' },
        { id: '3', title: 'شقة طلابية في المنصورة', location: 'الجامعة', university: 'جامعة المنصورة', bedrooms: 'ثلاث غرف نوم', bathrooms: 'حمامين', price: '2200 ج.م / شهر' }
    ];
    
    // Remove skeleton and load actual properties
    const propertiesGrid = document.getElementById('propertiesGrid');
    if (propertiesGrid) {
        // Wait a bit to show skeleton loading effect
        setTimeout(() => {
            propertiesGrid.innerHTML = '';
            properties.forEach(property => {
                const propertyCard = document.createElement('div');
                propertyCard.className = 'property-card card-hover';
                propertyCard.onclick = () => window.location.href = `property-detail.html?id=${property.id}`;
                
                propertyCard.innerHTML = `
                    <div class="property-img">
                        <i class="fas fa-home"></i>
                    </div>
                    <div class="property-info">
                        <h3>${property.title}</h3>
                        <div class="property-meta">
                            <span><i class="fas fa-map-marker-alt"></i> ${property.location}</span>
                            <span><i class="fas fa-university"></i> ${property.university}</span>
                        </div>
                        <div class="property-meta">
                            <span>${property.bedrooms}</span>
                            <span>${property.bathrooms}</span>
                        </div>
                        <div class="property-price">${property.price}</div>
                    </div>
                `;
                
                propertiesGrid.appendChild(propertyCard);
            });
        }, 800); // Show skeleton for 0.8 seconds
    }
}

// Load all properties for properties page
function loadAllProperties() {
    // Same as loadProperties but can be expanded
    loadProperties();
} 