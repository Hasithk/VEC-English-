import { Payment } from '@/lib/mock-data';
import { getStudentById } from '@/lib/backend';

export interface WhatsAppMessage {
  to: string;
  body: string;
}

/**
 * Generate a payment receipt in text format
 */
export const generatePaymentReceipt = (payment: Payment): string => {
  const student = getStudentById(payment.studentId);
  const receiptDate = new Date(payment.paymentDate || new Date()).toLocaleDateString('en-GB');
  
  return `
╔══════════════════════════════════════╗
║       EDUPAY - PAYMENT RECEIPT       ║
╚══════════════════════════════════════╝

📋 RECEIPT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Receipt ID: ${payment.id}
Date: ${receiptDate}
Status: ✓ PAID

👤 STUDENT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Student Name: ${student?.name || 'N/A'}
Student ID: ${payment.studentId}
Parent Name: ${student?.parentName || 'N/A'}

📚 COURSE & PAYMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Course: ${payment.course}
Month: ${payment.month}
Amount: LKR ${payment.amount.toFixed(2)}
Payment Method: ${payment.paymentMethod || 'N/A'}

💰 PAYMENT STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Status: ✓ PAYMENT RECEIVED
Amount Paid: LKR ${payment.amount.toFixed(2)}

Thank you for your payment! Your course access 
is now active.

For inquiries, please contact our support team.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              EDUPAY SYSTEM
    Thank you for supporting education!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `;
};

/**
 * Generate WhatsApp message body with payment receipt
 */
export const generateWhatsAppMessage = (payment: Payment): string => {
  const student = getStudentById(payment.studentId);
  const receiptDate = new Date(payment.paymentDate || new Date()).toLocaleDateString('en-GB');
  
  return `Hi ${student?.parentName || 'Parent'},

*Payment Received* ✅

Your payment for *${student?.name}* has been successfully received and processed.

*Receipt Details:*
• Receipt ID: ${payment.id}
• Student: ${student?.name}
• Course: ${payment.course}
• Month: ${payment.month}
• Amount: LKR ${payment.amount.toFixed(2)}
• Payment Date: ${receiptDate}
• Method: ${payment.paymentMethod || 'Online'}

Your child's course access is now active. Please login to your account to view course materials.

Thank you for choosing EDUPAY! 🎓

For any queries, please contact us.

---
EDUPAY Student Management System`;
};

/**
 * Send WhatsApp message using Twilio (mock implementation)
 * In production, configure with real Twilio credentials
 */
export const sendWhatsAppMessage = async (
  to: string,
  message: string
): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  try {
    // Check if WhatsApp credentials are configured
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;

    if (!accountSid || !authToken || !fromNumber) {
      console.warn('⚠️  WhatsApp/Twilio credentials not configured');
      console.log('To: ' + to);
      console.log('Message: ' + message);
      
      return {
        success: true,
        messageId: 'MOCK_' + Date.now(),
      };
    }

    // Make request to Twilio API
    const response = await fetch('https://api.twilio.com/2010-04-01/Accounts/' + accountSid + '/Messages.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(accountSid + ':' + authToken).toString('base64'),
      },
      body: new URLSearchParams({
        From: fromNumber,
        To: to,
        Body: message,
      }).toString(),
    });

    if (!response.ok) {
      const error = await response.text();
      return {
        success: false,
        error: `Twilio error: ${error}`,
      };
    }

    const data = await response.json() as { sid?: string };
    return {
      success: true,
      messageId: data.sid,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

/**
 * Send payment receipt via WhatsApp
 */
export const sendPaymentReceiptViaWhatsApp = async (
  payment: Payment
): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  try {
    const student = getStudentById(payment.studentId);
    
    if (!student) {
      return {
        success: false,
        error: 'Student not found',
      };
    }

    const message = generateWhatsAppMessage(payment);
    const whatsappNumber = student.phone.replace(/\s+/g, '');
    
    return await sendWhatsAppMessage(whatsappNumber, message);
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send WhatsApp message',
    };
  }
};
