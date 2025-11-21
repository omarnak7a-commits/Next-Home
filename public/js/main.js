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

// Load saved theme
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const body = document.body;
    
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    }
}

// Update authentication UI
function updateAuthUI() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authBtn = document.getElementById('authBtn');
    const profileIcon = document.getElementById('profileIcon');
    const notificationsBtn = document.getElementById('notificationsBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const addPropertyBtn = document.getElementById('addPropertyBtn');
    if (notificationsBtn) {
    notificationsBtn.style.display = 'block';
    notificationsBtn.onclick = function() {
        window.location.href = 'notifications.html';
    };
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    if (bookings.length > 0) {
        const notificationBadge = document.getElementById('notificationBadge');
        notificationBadge.textContent = bookings.length;
        notificationBadge.style.display = 'block';
    }
}
    if (currentUser) {
        // User is logged in
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
        
        // Show "Add Property" button for logged in users
        if (addPropertyBtn) {
            addPropertyBtn.style.display = 'block';
            addPropertyBtn.onclick = function() {
                window.location.href = 'add-property.html';
            };
        }
    } else {
        // User is not logged in
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
        
        if (addPropertyBtn) {
            addPropertyBtn.style.display = 'none';
        }
    }
    
    // Settings button functionality
    if (settingsBtn) {
        settingsBtn.onclick = function() {
            window.location.href = 'settings.html';
        };
    }
}

// Check if user is logged in for protected pages
function checkAuthForProtectedPages() {
    const currentPage = window.location.pathname.split('/').pop();
    const protectedPages = ['profile.html', 'property-detail.html', 'add-property.html'];
    const currentUser = localStorage.getItem('currentUser');
    
    if (protectedPages.includes(currentPage) && !currentUser) {
        if (currentPage !== 'login.html' && currentPage !== 'register.html') {
            alert('يجب تسجيل الدخول أولاً!');
            window.location.href = 'login.html';
        }
    }
}

// Load properties for home page with skeleton loading
function loadProperties() {
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
        }, 800); // Show skeleton for 0.8 seconds
    }
}

// Load all properties for properties page
function loadAllProperties() {
    loadProperties(); // Same as home page for now
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Load saved theme
    loadSavedTheme();
    
    // Check authentication for protected pages
    checkAuthForProtectedPages();
    
    // Update auth UI
    updateAuthUI();
    
    // Language toggle
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
    
    // Load properties on home page
    if (document.getElementById('homePage')) {
        loadProperties();
    }
    
    // Load properties on properties page
    if (document.getElementById('propertiesPage')) {
        loadAllProperties();
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
    
    // Update navbar active state
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '' && link.getAttribute('href') === 'index.html') ||
            (currentPage === 'index.html' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
});
// إضافة إشعار جديد
function addNotification(title, message, icon = 'fas fa-bell') {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const newNotification = {
        id: Date.now(),
        title: title,
        message: message,
        icon: icon,
        timestamp: new Date().toISOString(),
        read: false
    };
    
    notifications.unshift(newNotification); // أضف في البداية
    localStorage.setItem('notifications', JSON.stringify(notifications));
    
    // تحديث شارة الإشعارات
    updateNotificationBadge();
}

// تحديث شارة الإشعارات
function updateNotificationBadge() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;
    
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const unreadCount = notifications.filter(n => !n.read).length;
    
    const notificationBadge = document.getElementById('notificationBadge');
    if (notificationBadge) {
        if (unreadCount > 0) {
            notificationBadge.textContent = unreadCount > 99 ? '99+' : unreadCount;
            notificationBadge.style.display = 'block';
        } else {
            notificationBadge.style.display = 'none';
        }
    }
    
    // تحديث زر الإشعارات
    const notificationsBtn = document.getElementById('notificationsBtn');
    if (notificationsBtn) {
        notificationsBtn.style.display = 'block';
    }
}

// دالة لحجز شقة مع إشعار
function bookPropertyWithNotification() {
    // تحقق من تسجيل الدخول
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        alert('يجب تسجيل الدخول أولاً لحجز شقة!');
        window.location.href = 'login.html';
        return;
    }
    
    // بيانات الشقة (من الصفحة الحالية)
    const propertyTitle = document.getElementById('propertyTitle')?.textContent || 'شقة غير معروفة';
    const propertyPrice = document.getElementById('propertyPrice')?.textContent || '0 ج.م';
    
    // استخراج السعر الرقمي
    const priceMatch = propertyPrice.match(/(\d+)/);
    const priceNum = priceMatch ? parseInt(priceMatch[1]) : 1800;
    const totalPrice = priceNum * 3; // لمدة 3 أشهر
    
    // إنشاء فاتورة
    const invoiceHtml = `
        <div style="font-family: Cairo, Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 2px solid #004d80; border-radius: 10px;">
            <h2 style="text-align: center; color: #004d80; margin-bottom: 20px;">فاتورة دفع</h2>
            <h3 style="text-align: center; color: #ffcc00; margin-bottom: 30px;">Next Home Egypt</h3>
            
            <div style="margin-bottom: 15px;">
                <strong>رقم الفاتورة:</strong> NH-${Date.now().toString().slice(-6)}
            </div>
            <div style="margin-bottom: 15px;">
                <strong>التاريخ:</strong> ${new Date().toLocaleDateString('ar-EG')}
            </div>
            <div style="margin-bottom: 15px;">
                <strong>الشقة:</strong> ${propertyTitle}
            </div>
            
            <div style="margin: 20px 0; padding: 15px; background: #f0f8ff; border-radius: 5px;">
                <h4>تفاصيل الدفع:</h4>
                <p><strong>السعر الشهري:</strong> ${priceNum} ج.م</p>
                <p><strong>المدة:</strong> 3 أشهر</p>
                <p><strong>إجمالي المبلغ:</strong> ${totalPrice} ج.م</p>
            </div>
            
            <div style="text-align: center; font-size: 20px; font-weight: bold; color: #2a9d8f; margin-top: 20px;">
                <strong>تم الدفع بنجاح! ✅</strong>
            </div>
            
            <div style="text-align: center; margin-top: 30px; color: #666;">
                شكراً لثقتكم بـ Next Home Egypt!
            </div>
        </div>
    `;
    
    // إظهار رسالة تأكيد
    alert('تم الدفع بنجاح! سيتم عرض الفاتورة الآن.');
    
    // عرض الفاتورة
    const invoiceWindow = window.open('', '_blank', 'width=700,height=600');
    invoiceWindow.document.write(`
        <!DOCTYPE html>
        <html dir="rtl">
        <head>
            <meta charset="UTF-8">
            <title>فاتورة Next Home</title>
            <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600&display=swap" rel="stylesheet">
            <style>
                body { margin: 0; padding: 20px; background: white; }
            </style>
        </head>
        <body>
            ${invoiceHtml}
            <div style="text-align: center; margin-top: 20px;">
                <button onclick="window.print()" style="padding: 10px 20px; background: #004d80; color: white; border: none; border-radius: 5px; cursor: pointer; font-family: Cairo, Arial, sans-serif;">طباعة الفاتورة</button>
                <button onclick="window.close()" style="padding: 10px 20px; background: #ffcc00; color: #004d80; border: none; border-radius: 5px; cursor: pointer; margin-right: 10px; font-family: Cairo, Arial, sans-serif;">إغلاق</button>
            </div>
        </body>
        </html>
    `);
    invoiceWindow.document.close();
    
    // حفظ الحجز
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push({
        id: Date.now(),
        userId: JSON.parse(currentUser).id,
        propertyId: propertyTitle,
        checkIn: new Date().toISOString(),
        duration: 3,
        totalPrice: totalPrice,
        createdAt: new Date().toISOString()
    });
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    // إضافة إشعار
    addNotification(
        'تم الحجز بنجاح!',
        `تم حجز شقة "${propertyTitle}" بنجاح. رقم الفاتورة: NH-${Date.now().toString().slice(-6)}`,
        'fas fa-check-circle'
    );
}