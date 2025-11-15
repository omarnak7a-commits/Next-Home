const PDFDocument = require('pdfkit');

class InvoiceGenerator {
  static generateInvoice(booking, user, property) {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ size: 'A4', margin: 50 });
        
        // Header
        doc.fontSize(20).text('Next Home Egypt', { align: 'center' });
        doc.fontSize(12).text('Student Housing Platform', { align: 'center' });
        doc.moveDown();
        
        // Invoice info
        doc.fontSize(14).text('فاتورة دفع / Payment Invoice', { align: 'center' });
        doc.moveDown();
        
        // Billing info
        doc.fontSize(12)
          .text(`رقم الفاتورة: ${booking.invoiceNumber}`, 50, doc.y)
          .text(`التاريخ: ${new Date().toLocaleDateString('ar-EG')}`, 50, doc.y + 20)
          .text(`العميل: ${user.name}`, 50, doc.y + 40)
          .text(`البريد الإلكتروني: ${user.email}`, 50, doc.y + 60);
        
        // Property details
        doc.moveDown();
        doc.fontSize(12)
          .text('تفاصيل الحجز:', 50, doc.y)
          .text(`الشقة: ${property.title}`, 50, doc.y + 20)
          .text(`الموقع: ${property.location} - ${property.city}`, 50, doc.y + 40)
          .text(`المدة: ${booking.duration} أشهر`, 50, doc.y + 60)
          .text(`الفترة: ${new Date(booking.checkIn).toLocaleDateString('ar-EG')} - ${
            new Date(booking.checkIn).setMonth(new Date(booking.checkIn).getMonth() + booking.duration)
          }`, 50, doc.y + 80);
        
        // Total amount
        doc.moveDown();
        doc.fontSize(14)
          .text(`المبلغ الإجمالي: ${booking.totalPrice} ج.م`, 50, doc.y)
          .text('Total Amount: EGP ' + booking.totalPrice, 50, doc.y + 20);
        
        // Footer
        doc.moveDown(2);
        doc.fontSize(10).text('شكراً لثقتكم بـ Next Home Egypt', { align: 'center' });
        doc.text('Thank you for choosing Next Home Egypt', { align: 'center' });
        
        // Buffer to store PDF
        let buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
          let pdfData = Buffer.concat(buffers);
          resolve(pdfData);
        });
        
        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = InvoiceGenerator;