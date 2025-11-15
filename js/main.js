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
        
        // Update content for English
        updateContent('english');
    } else {
        // Switch to Arabic
        body.classList.remove('english');
        body.classList.add('arabic');
        currentLanguage = 'arabic';
        languageToggle.textContent = 'عربي';
        
        // Update content for Arabic
        updateContent('arabic');
    }
}

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
    
    // Update home page content if on homepage
    if (document.getElementById('homePage')) {
        updateHomePage(language);
    }
    
    // Update properties page content if on properties page
    if (document.getElementById('propertiesPage')) {
        updatePropertiesPage(language);
    }
    
    // Update property detail page content if on detail page
    if (document.getElementById('propertyDetailPage')) {
        updatePropertyDetailPage(language);
    }
}

function updateHomePage(language) {
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero p');
    const heroBtn1 = document.querySelector('.hero-btns .btn:first-child');
    const heroBtn2 = document.querySelector('.hero-btns .btn:last-child');
    
    const sectionTitle = document.querySelector('.section-title h2');
    const sectionSubtitle = document.querySelector('.section-title p');
    
    const featureTitles = document.querySelectorAll('.feature-card h3');
    const featureTexts = document.querySelectorAll('.feature-card p');
    
    const propertyTitles = document.querySelectorAll('.property-info h3');
    const propertyPrices = document.querySelectorAll('.property-price');
    
    const footerTitle = document.querySelector('.footer-col:first-child h3');
    const footerText = document.querySelector('.footer-col:first-child p');
    
    if (language === 'arabic') {
        heroTitle.textContent = 'شقق مخصصة للطلاب المغتربين في جميع أنحاء مصر';
        heroSubtitle.textContent = 'ابحث عن سكن آمن ومريح قريب من جامعتك أو مدرستك مع Next Home. حلول سكنية مصممة خصيصًا لاحتياجات الطلاب.';
        heroBtn1.textContent = 'تصفح الشقق';
        heroBtn2.textContent = 'أنشئ حسابك الآن';
        
        sectionTitle.textContent = 'لماذا تختار Next Home؟';
        sectionSubtitle.textContent = 'منصة موثوقة مصممة خصيصًا لاحتياجات الطلاب المغتربين في مصر';
        
        featureTitles[0].textContent = 'شقق مخصصة للطلاب';
        featureTexts[0].textContent = 'شقق مجهزة بالكامل مع مرافق مصممة خصيصًا لاحتياجات الطلاب';
        
        featureTitles[1].textContent = 'أمان و رقابة';
        featureTexts[1].textContent = 'نظام أمان متكامل مع مشرفين ورقابة على مدار الساعة';
        
        featureTitles[2].textContent = 'قريب من الجامعات';
        featureTexts[2].textContent = 'شقق قريبة من الجامعات والمدارس الكبرى في جميع المحافظات';
        
        propertyTitles[0].textContent = 'شقة طلابية في القاهرة';
        propertyPrices[0].textContent = '1800 ج.م / شهر';
        
        propertyTitles[1].textContent = 'شقة طلابية في الإسكندرية';
        propertyPrices[1].textContent = '1200 ج.م / شهر';
        
        propertyTitles[2].textContent = 'شقة طلابية في المنصورة';
        propertyPrices[2].textContent = '2200 ج.م / شهر';
        
        footerTitle.textContent = 'Next Home';
        footerText.textContent = 'منصة رائدة لتوفير سكن آمن ومريح للطلاب المغتربين في جميع أنحاء مصر. نحن نربط الطلاب بالشقق المثالية القريبة من جامعاتهم ومدارسهم.';
    } else {
        heroTitle.textContent = 'Student Housing Across Egypt';
        heroSubtitle.textContent = 'Find safe and comfortable housing near your university or school with Next Home. Housing solutions designed specifically for student needs.';
        heroBtn1.textContent = 'Browse Properties';
        heroBtn2.textContent = 'Create Your Account';
        
        sectionTitle.textContent = 'Why Choose Next Home?';
        sectionSubtitle.textContent = 'A trusted platform specifically designed for the needs of students across Egypt';
        
        featureTitles[0].textContent = 'Student-Specific Apartments';
        featureTexts[0].textContent = 'Fully equipped apartments with facilities designed specifically for student needs';
        
        featureTitles[1].textContent = 'Security & Supervision';
        featureTexts[1].textContent = 'Comprehensive security system with supervisors and 24/7 monitoring';
        
        featureTitles[2].textContent = 'Near Universities';
        featureTexts[2].textContent = 'Apartments close to major universities and schools across all governorates';
        
        propertyTitles[0].textContent = 'Student Apartment in Cairo';
        propertyPrices[0].textContent = '1800 EGP / Month';
        
        propertyTitles[1].textContent = 'Student Apartment in Alexandria';
        propertyPrices[1].textContent = '1200 EGP / Month';
        
        propertyTitles[2].textContent = 'Student Apartment in Mansoura';
        propertyPrices[2].textContent = '2200 EGP / Month';
        
        footerTitle.textContent = 'Next Home';
        footerText.textContent = 'Leading platform for providing safe and comfortable housing for students across Egypt. We connect students with ideal apartments near their universities and schools.';
    }
}

function updatePropertiesPage(language) {
    const sectionTitle = document.querySelector('.section-title h2');
    const sectionSubtitle = document.querySelector('.section-title p');
    
    const propertyTitles = document.querySelectorAll('.property-info h3');
    const propertyPrices = document.querySelectorAll('.property-price');
    
    if (language === 'arabic') {
        sectionTitle.textContent = 'جميع الشقق المتوفرة';
        sectionSubtitle.textContent = 'ابحث عن شقتك المثالية القريبة من جامعتك أو مدرستك';
        
        propertyTitles[0].textContent = 'شقة طلابية في القاهرة';
        propertyPrices[0].textContent = '1800 ج.م / شهر';
        
        propertyTitles[1].textContent = 'شقة طلابية في الإسكندرية';
        propertyPrices[1].textContent = '1200 ج.م / شهر';
        
        propertyTitles[2].textContent = 'شقة طلابية في المنصورة';
        propertyPrices[2].textContent = '2200 ج.م / شهر';
        
        propertyTitles[3].textContent = 'شقة طلابية في أسيوط';
        propertyPrices[3].textContent = '1500 ج.م / شهر';
        
        propertyTitles[4].textContent = 'شقة طلابية في طنطا';
        propertyPrices[4].textContent = '1000 ج.م / شهر';
        
        propertyTitles[5].textContent = 'شقة طلابية في الزقازيق';
        propertyPrices[5].textContent = '1600 ج.م / شهر';
    } else {
        sectionTitle.textContent = 'All Available Properties';
        sectionSubtitle.textContent = 'Find your ideal apartment near your university or school';
        
        propertyTitles[0].textContent = 'Student Apartment in Cairo';
        propertyPrices[0].textContent = '1800 EGP / Month';
        
        propertyTitles[1].textContent = 'Student Apartment in Alexandria';
        propertyPrices[1].textContent = '1200 EGP / Month';
        
        propertyTitles[2].textContent = 'Student Apartment in Mansoura';
        propertyPrices[2].textContent = '2200 EGP / Month';
        
        propertyTitles[3].textContent = 'Student Apartment in Assiut';
        propertyPrices[3].textContent = '1500 EGP / Month';
        
        propertyTitles[4].textContent = 'Student Apartment in Tanta';
        propertyPrices[4].textContent = '1000 EGP / Month';
        
        propertyTitles[5].textContent = 'Student Apartment in Zagazig';
        propertyPrices[5].textContent = '1600 EGP / Month';
    }
}

function updatePropertyDetailPage(language) {
    // This will be handled by property-detail.js
    // But we need to update the modal buttons
    const bookBtn = document.getElementById('bookNowBtn');
    const bookingFormTitle = document.querySelector('#bookingModal h2');
    const checkInLabel = document.querySelector('label[for="checkIn"]');
    const durationLabel = document.querySelector('label[for="duration"]');
    const studentIdLabel = document.querySelector('label[for="studentId"]');
    const confirmBtn = document.querySelector('#bookingForm button');
    
    const invoiceHeader = document.querySelector('.invoice-header h2');
    const printBtn = document.querySelector('.invoice-footer .btn:first-child');
    const closeInvoiceBtn = document.querySelector('#closeInvoice');
    
    if (language === 'arabic') {
        if (bookBtn) bookBtn.textContent = 'احجز الآن';
        if (bookingFormTitle) bookingFormTitle.textContent = 'احجز الشقة';
        if (checkInLabel) checkInLabel.textContent = 'تاريخ البدء';
        if (durationLabel) durationLabel.textContent = 'مدة الإقامة (أشهر)';
        if (studentIdLabel) studentIdLabel.textContent = 'رقم الطالب الجامعي';
        if (confirmBtn) confirmBtn.textContent = 'تأكيد الحجز';
        
        if (invoiceHeader) invoiceHeader.textContent = 'فاتورة دفع';
        if (printBtn) printBtn.textContent = 'اطبع الفاتورة';
        if (closeInvoiceBtn) closeInvoiceBtn.textContent = 'إغلاق';
    } else {
        if (bookBtn) bookBtn.textContent = 'Book Now';
        if (bookingFormTitle) bookingFormTitle.textContent = 'Book Apartment';
        if (checkInLabel) checkInLabel.textContent = 'Check-in Date';
        if (durationLabel) durationLabel.textContent = 'Duration (Months)';
        if (studentIdLabel) studentIdLabel.textContent = 'Student ID';
        if (confirmBtn) confirmBtn.textContent = 'Confirm Booking';
        
        if (invoiceHeader) invoiceHeader.textContent = 'Payment Invoice';
        if (printBtn) printBtn.textContent = 'Print Invoice';
        if (closeInvoiceBtn) closeInvoiceBtn.textContent = 'Close';
    }
}

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener for language toggle
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
    
    // Auth button navigation
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    
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
    
    // Hero button navigation
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

// Add these functions to your existing main.js file

function updateAboutPage(language) {
    const pageTitle = document.querySelector('.section-title h2');
    const pageSubtitle = document.querySelector('.section-title p');
    
    const missionTitle = document.querySelector('.about-text h3:nth-child(1)');
    const visionTitle = document.querySelector('.about-text h3:nth-child(3)');
    
    const statsTitle = document.querySelector('.section-title:nth-child(2) h2');
    const statsSubtitle = document.querySelector('.section-title:nth-child(2) p');
    
    const teamTitle = document.querySelector('.section-title:nth-child(3) h2');
    const teamSubtitle = document.querySelector('.section-title:nth-child(3) p');
    
    const statCards = document.querySelectorAll('.stat-card p');
    const teamMembers = document.querySelectorAll('.team-member p');
    
    if (language === 'arabic') {
        pageTitle.textContent = 'عن منصة Next Home';
        pageSubtitle.textContent = 'منصة رائدة لتوفير سكن آمن ومريح للطلاب المغتربين في جميع أنحاء مصر';
        
        missionTitle.textContent = 'رسالتنا ورؤيتنا';
        visionTitle.textContent = 'لماذا Next Home؟';
        
        statsTitle.textContent = 'إحصائياتنا';
        statsSubtitle.textContent = 'نحن فخورون بالتأثير الذي أحدثناه في حياة الطلاب';
        
        teamTitle.textContent = 'فريقنا';
        teamSubtitle.textContent = 'مجموعة من المحترفين المتفانين لخدمة الطلاب';
        
        // Stats
        statCards[0].textContent = 'طالب سعيد';
        statCards[1].textContent = 'شقة متوفرة';
        statCards[2].textContent = 'مدينة في مصر';
        statCards[3].textContent = 'نسبة رضا العملاء';
        
        // Team roles
        teamMembers[0].textContent = 'المؤسس والرئيس التنفيذي';
        teamMembers[1].textContent = 'مدير العمليات';
        teamMembers[2].textContent = 'مدير التكنولوجيا';
        teamMembers[3].textContent = 'مدير خدمة العملاء';
    } else {
        pageTitle.textContent = 'About Next Home';
        pageSubtitle.textContent = 'A leading platform providing safe and comfortable housing for students across Egypt';
        
        missionTitle.textContent = 'Our Mission & Vision';
        visionTitle.textContent = 'Why Next Home?';
        
        statsTitle.textContent = 'Our Statistics';
        statsSubtitle.textContent = 'We are proud of the impact we have made in students\' lives';
        
        teamTitle.textContent = 'Our Team';
        teamSubtitle.textContent = 'A group of dedicated professionals serving students';
        
        // Stats
        statCards[0].textContent = 'Happy Students';
        statCards[1].textContent = 'Available Apartments';
        statCards[2].textContent = 'Cities in Egypt';
        statCards[3].textContent = 'Customer Satisfaction';
        
        // Team roles
        teamMembers[0].textContent = 'Founder & CEO';
        teamMembers[1].textContent = 'Operations Manager';
        teamMembers[2].textContent = 'Technology Director';
        teamMembers[3].textContent = 'Customer Service Manager';
    }
}

function updateContactPage(language) {
    const pageTitle = document.querySelector('.section-title h2');
    const pageSubtitle = document.querySelector('.section-title p');
    
    const contactInfoTitle = document.querySelector('.contact-info h3');
    const contactFormTitle = document.querySelector('.contact-form h3');
    const mapTitle = document.querySelector('.section-title:nth-child(2) h2');
    const mapSubtitle = document.querySelector('.section-title:nth-child(2) p');
    
    const contactItems = document.querySelectorAll('.contact-item .contact-details h4');
    const formLabels = document.querySelectorAll('.form-group label');
    const subjectOptions = document.querySelectorAll('#subject option');
    const submitBtn = document.querySelector('.contact-form button');
    
    if (language === 'arabic') {
        pageTitle.textContent = 'اتصل بنا';
        pageSubtitle.textContent = 'نحن هنا لمساعدتك! تواصل معنا لأي استفسار أو دعم';
        
        contactInfoTitle.textContent = 'معلومات التواصل';
        contactFormTitle.textContent = 'أرسل لنا رسالة';
        mapTitle.textContent = 'موقعنا';
        mapSubtitle.textContent = 'زرنا في مكتبنا الرئيسي';
        
        // Contact info labels
        contactItems[0].textContent = 'عنوان المكتب';
        contactItems[1].textContent = 'الهاتف';
        contactItems[2].textContent = 'البريد الإلكتروني';
        contactItems[3].textContent = 'ساعات العمل';
        
        // Form labels
        formLabels[0].textContent = 'الاسم الكامل';
        formLabels[1].textContent = 'البريد الإلكتروني';
        formLabels[2].textContent = 'الموضوع';
        formLabels[3].textContent = 'الرسالة';
        
        // Subject options
        subjectOptions[0].textContent = 'اختر الموضوع';
        subjectOptions[1].textContent = 'استفسار عام';
        subjectOptions[2].textContent = 'استفسار عن الحجز';
        subjectOptions[3].textContent = 'شكوى';
        subjectOptions[4].textContent = 'دعم فني';
        subjectOptions[5].textContent = 'شراكة تجارية';
        
        submitBtn.textContent = 'إرسال الرسالة';
    } else {
        pageTitle.textContent = 'Contact Us';
        pageSubtitle.textContent = 'We are here to help! Contact us for any inquiry or support';
        
        contactInfoTitle.textContent = 'Contact Information';
        contactFormTitle.textContent = 'Send us a message';
        mapTitle.textContent = 'Our Location';
        mapSubtitle.textContent = 'Visit us at our main office';
        
        // Contact info labels
        contactItems[0].textContent = 'Office Address';
        contactItems[1].textContent = 'Phone';
        contactItems[2].textContent = 'Email';
        contactItems[3].textContent = 'Working Hours';
        
        // Form labels
        formLabels[0].textContent = 'Full Name';
        formLabels[1].textContent = 'Email Address';
        formLabels[2].textContent = 'Subject';
        formLabels[3].textContent = 'Message';
        
        // Subject options
        subjectOptions[0].textContent = 'Select Subject';
        subjectOptions[1].textContent = 'General Inquiry';
        subjectOptions[2].textContent = 'Booking Inquiry';
        subjectOptions[3].textContent = 'Complaint';
        subjectOptions[4].textContent = 'Technical Support';
        subjectOptions[5].textContent = 'Business Partnership';
        
        submitBtn.textContent = 'Send Message';
    }
}

// Update the updateContent function to handle all pages
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
    
    // Update home page content if on homepage
    if (document.getElementById('homePage')) {
        updateHomePage(language);
    }
    
    // Update properties page content if on properties page
    if (document.getElementById('propertiesPage')) {
        updatePropertiesPage(language);
    }
    
    // Update property detail page content if on detail page
    if (document.getElementById('propertyDetailPage')) {
        updatePropertyDetailPage(language);
    }
    
    // Update about page content if on about page
    if (document.getElementById('aboutPage')) {
        updateAboutPage(language);
    }
    
    // Update contact page content if on contact page
    if (document.getElementById('contactPage')) {
        updateContactPage(language);
    }
}