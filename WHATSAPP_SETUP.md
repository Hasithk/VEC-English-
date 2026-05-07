# WhatsApp Payment Receipt Feature

This feature automatically sends payment receipts via WhatsApp when a payment is marked as "Paid" in the EDUPAY system.

## Features

✅ **Automatic Receipt Sending** - When you mark a payment as "Paid", a WhatsApp message with the receipt is automatically sent to the student's parent/guardian  
✅ **Professional Receipt Format** - Formatted payment receipt with all details  
✅ **Manual Resend** - "WhatsApp" button in the Payment table to manually resend receipts  
✅ **Error Handling** - Graceful error handling if WhatsApp is not configured  

## Setup Instructions

### Step 1: Set Up Twilio Account

1. Go to [Twilio Console](https://www.twilio.com/console)
2. Sign up or log in to your Twilio account
3. Navigate to **Messaging** → **Services** → Create a Messaging Service
4. Enable WhatsApp capability
5. Add your phone number to the approved senders list (you'll need to verify your WhatsApp Business profile)

### Step 2: Get Your Credentials

In the Twilio Console:
- **Account SID**: Found in Account Info section (top right)
- **Auth Token**: Found in Account Info section
- **WhatsApp Number**: Your Twilio WhatsApp number (e.g., `whatsapp:+14015550123`)

### Step 3: Configure Environment Variables

Add these to your `.env.local` file:

```env
# WhatsApp / Twilio Configuration
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=whatsapp:+your_twilio_number
```

### Step 4: Deploy

After adding credentials, redeploy your application:

```bash
npm run build
npm start
```

## How It Works

### Automatic Sending
1. Admin marks a payment as "Paid"
2. Payment status is updated in the database
3. System generates a professional receipt
4. WhatsApp message is automatically sent to the student's phone number

### Manual Resend
1. Go to **Payments** page
2. Find a paid payment
3. Click the **"WhatsApp"** button
4. Receipt is resent to the student's WhatsApp number

## Receipt Format

The WhatsApp message includes:

```
Hi [Parent Name],

*Payment Received* ✅

Your payment for *[Student Name]* has been successfully received and processed.

*Receipt Details:*
• Receipt ID: [Receipt ID]
• Student: [Student Name]
• Course: [Course Name]
• Month: [Month]
• Amount: [Amount in LKR]
• Payment Date: [Date]
• Method: [Payment Method]

Your child's course access is now active...
```

## API Endpoints

### Send Receipt Manually
```
POST /api/payments/{paymentId}/send-receipt
```

**Response:**
```json
{
  "success": true,
  "messageId": "SMxxxxxxxxxxxxxxxxxxxxxxxx",
  "message": "Receipt sent successfully via WhatsApp"
}
```

## Testing Without Twilio

If you haven't set up Twilio yet, the system works in **mock mode**:
- Messages are logged to console
- No actual WhatsApp messages are sent
- UI shows success messages for testing

To enable automatic sending, add your Twilio credentials.

## Troubleshooting

### Messages not sending?
1. Check Twilio credentials are correct
2. Verify the phone number format includes country code (e.g., `+94771234567`)
3. Ensure your Twilio account has WhatsApp enabled
4. Check application logs for error messages

### Phone number format issues?
- Format should be: `+[country code][number]`
- Example for Sri Lanka: `+94771234567`
- The system automatically removes spaces from stored numbers

### Twilio quota exceeded?
- Upgrade your Twilio plan
- Check usage in Twilio Console
- Messages are rate-limited by Twilio free tier

## Future Enhancements

- [ ] SMS fallback if WhatsApp fails
- [ ] Receipt PDF generation for email/download
- [ ] Customizable receipt template
- [ ] Multi-language receipt support
- [ ] Scheduled reminder messages
- [ ] Receipt delivery status tracking

## Support

For Twilio issues: [Twilio Docs](https://www.twilio.com/docs)  
For EDUPAY issues: Contact your administrator
