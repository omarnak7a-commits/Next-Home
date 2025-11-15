// Global variable for current language and auth token
let currentLanguage = 'arabic';
let authToken = localStorage.getItem('token');

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
        navHome.textContent = 'الرئيسية';
        navProperties.textContent = 'الشقق';
        navAbout.textContent = 'عن المنصة';
        navContact.textContent = 'اتصل بنا';
    } else {
        navHome.textContent = 'Home';
        navProperties.textContent = 'Properties';
        navAbout.textContent = 'About';
        navContact.textContent = 'Contact';
    }
    
    // Update footer links
    const footerHome = document.getElementById('footerHome');
    const footerProperties = document.getElementById('footerProperties');
    const footerAbout = document.getElementById('footerAbout');
    const footerContact = document.getElementById('footerContact');
    
    if (language === 'arabic') {
        footerHome.textContent = 'الرئيسية';
        footerProperties.textContent = 'الشقق';
        footerAbout.textContent = 'عن المنصة';
        footerContact.textContent = 'اتصل بنا';
    } else {
        footerHome.textContent = 'Home';
        footerProperties.textContent = 'Properties';
        footerAbout.textContent = 'About';
        footerContact.textContent = 'Contact';
    }
}

// Handle auth buttons
document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const langToggle = document.getElementById('langToggle');
    
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'login.html';
        });
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'register.html';
        });
    }
    
    // Check if user is logged in
    if (authToken) {
        // Update auth buttons
        if (loginBtn) {
            loginBtn.textContent = 'حسابي';
            loginBtn.onclick = function(e) {
                e.preventDefault();
                window.location.href = 'profile.html';
            };
        }
        if (registerBtn) {
            registerBtn.textContent = 'تسجيل الخروج';
            registerBtn.onclick = function(e) {
                e.preventDefault();
                localStorage.removeItem('token');
                window.location.reload();
            };
        }
    }
});

// API call helper
async function apiCall(url, options = {}) {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    if (authToken) {
        defaultOptions.headers['Authorization'] = `Bearer ${authToken}`;
    }
    
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