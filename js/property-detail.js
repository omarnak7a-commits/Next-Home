// Property detail page functionality
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('id');
    
    // Property data
    const properties = {
        '1': {
            title: 'شقة طلابية في القاهرة',
            location: 'القاهرة الجديدة - قريب من الجامعة الأمريكية',
            bedrooms: 'غرفتين نوم',
            bathrooms: 'حمامين',
            area: '80 متر مربع',
            price: '1800 ج.م',
            description: 'شقة طلابية مجهزة بالكامل تقع في منطقة سكنية آمنة قريبة من الجامعة الأمريكية في القاهرة الجديدة. تتميز الشقة بغرفتين نوم واسعتين، حمامين، مطبخ مجهز، وصالة كبيرة. الخدمات تشمل الإنترنت عالي السرعة، أمن على مدار الساعة، وخدمات نظافة أسبوعية.'
        },
        '2': {
            title: 'شقة طلابية في الإسكندرية',
            location: 'سموحة - قريب من جامعة الإسكندرية',
            bedrooms: 'غرفة نوم واحدة',
            bathrooms: 'حمام واحد',
            area: '60 متر مربع',
            price: '1200 ج.م',
            description: 'شقة طلابية مريحة تقع في حي سموحة السكني بالقرب من جامعة الإسكندرية. تتكون من غرفة نوم، حمام، مطبخ صغير، وصالة. مثالية للطلاب الباحثين عن سكن اقتصادي وآمن.'
        },
        '3': {
            title: 'شقة طلابية في المنصورة',
            location: 'الجامعة - قريب من جامعة المنصورة',
            bedrooms: 'ثلاث غرف نوم',
            bathrooms: 'حمامين',
            area: '100 متر مربع',
            price: '2200 ج.م',
            description: 'شقة فسيحة مناسبة لمجموعة من الطلاب تقع بالقرب من جامعة المنصورة. تحتوي على ثلاث غرف نوم واسعة، حمامين، مطبخ كبير، وصالة. مزودة بجميع وسائل الراحة الحديثة.'
        },
        '4': {
            title: 'شقة طلابية في أسيوط',
            location: 'حي الجامعة - قريب من جامعة أسيوط',
            bedrooms: 'غرفتين نوم',
            bathrooms: 'حمام واحد',
            area: '70 متر مربع',
            price: '1500 ج.م',
            description: 'شقة مريحة للطلاب تقع في حي الجامعة بأسيوط. تتميز بموقعها المثالي بالقرب من الحرم الجامعي وتوفر بيئة هادئة للدراسة والراحة.'
        },
        '5': {
            title: 'شقة طلابية في طنطا',
            location: 'وسط المدينة - قريب من جامعة طنطا',
            bedrooms: 'غرفة نوم واحدة',
            bathrooms: 'حمام واحد',
            area: '55 متر مربع',
            price: '1000 ج.م',
            description: 'شقة اقتصادية للطلاب في قلب مدينة طنطا. قريبة من جميع المرافق الأساسية والحرم الجامعي. مثالية للطلاب الباحثين عن سكن بسيط وآمن.'
        },
        '6': {
            title: 'شقة طلابية في الزقازيق',
            location: 'حي الجامعة - قريب من جامعة الزقازيق',
            bedrooms: 'غرفتين نوم',
            bathrooms: 'حمامين',
            area: '75 متر مربع',
            price: '1600 ج.م',
            description: 'شقة مجهزة بالكامل للطلاب في الزقازيق. تقع في منطقة سكنية هادئة بالقرب من الجامعة وتتميز بمساحتها المناسبة ومرافقها الحديثة.'
        }
    };
    
    // Update property details
    if (properties[propertyId]) {
        document.getElementById('propertyTitle').textContent = properties[propertyId].title;
        document.getElementById('propertyLocation').textContent = properties[propertyId].location;
        document.getElementById('bedrooms').textContent = properties[propertyId].bedrooms;
        document.getElementById('bathrooms').textContent = properties[propertyId].bathrooms;
        document.getElementById('area').textContent = properties[propertyId].area;
        document.getElementById('propertyPrice').textContent = properties[propertyId].price;
        document.getElementById('propertyDescription').textContent = properties[propertyId].description;
    }
    
    // Booking modal functionality
    const bookNowBtn = document.getElementById('bookNowBtn');
    const bookingModal = document.getElementById('bookingModal');
    const closeBooking = bookingModal.querySelector('.close');
    const bookingForm = document.getElementById('bookingForm');
    
    const invoiceModal = document.getElementById('invoiceModal');
    const closeInvoice = document.getElementById('closeInvoice');
    const invoiceCloseBtn = invoiceModal.querySelector('.close');
    
    // Open booking modal
    bookNowBtn.addEventListener('click', function() {
        bookingModal.style.display = 'block';
        document.getElementById('checkIn').min = new Date().toISOString().split('T')[0];
    });
    
    // Close modals
    closeBooking.addEventListener('click', function() {
        bookingModal.style.display = 'none';
    });
    
    closeInvoice.addEventListener('click', function() {
        invoiceModal.style.display = 'none';
    });
    
    invoiceCloseBtn.addEventListener('click', function() {
        invoiceModal.style.display = 'none';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === bookingModal) {
            bookingModal.style.display = 'none';
        }
        if (event.target === invoiceModal) {
            invoiceModal.style.display = 'none';
        }
    });
    
    // Handle booking form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const checkIn = document.getElementById('checkIn').value;
        const duration = document.getElementById('duration').value;
        const studentId = document.getElementById('studentId').value;
        
        // Generate invoice
        generateInvoice(propertyId, checkIn, duration, studentId);
        
        // Close booking modal
        bookingModal.style.display = 'none';
        // Show invoice modal
        invoiceModal.style.display = 'block';
    });
    
    // Generate invoice
    function generateInvoice(propertyId, checkIn, duration, studentId) {
        const property = properties[propertyId];
        const pricePerMonth = parseInt(property.price);
        const totalAmount = pricePerMonth * parseInt(duration);
        
        // Set invoice details
        document.getElementById('invoiceNumber').textContent = `NH-2025-${Math.floor(Math.random() * 1000)}`;
        document.getElementById('invoiceDate').textContent = new Date().toLocaleDateString('ar-EG');
        document.getElementById('invoiceProperty').textContent = property.title;
        document.getElementById('invoiceDuration').textContent = getDurationText(duration);
        document.getElementById('invoicePeriod').textContent = getPeriodText(checkIn, duration);
        document.getElementById('invoiceTotal').textContent = `${totalAmount} ج.م`;
    }
    
    function getDurationText(duration) {
        if (currentLanguage === 'arabic') {
            return `مدة الإقامة: ${duration} ${duration === '1' ? 'شهر' : 'أشهر'}`;
        } else {
            return `Duration: ${duration} ${duration === '1' ? 'month' : 'months'}`;
        }
    }
    
    function getPeriodText(checkIn, duration) {
        const startDate = new Date(checkIn);
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + parseInt(duration));
        
        if (currentLanguage === 'arabic') {
            return `الفترة: ${startDate.toLocaleDateString('ar-EG')} - ${endDate.toLocaleDateString('ar-EG')}`;
        } else {
            return `Period: ${startDate.toLocaleDateString('en-US')} - ${endDate.toLocaleDateString('en-US')}`;
        }
    }
});