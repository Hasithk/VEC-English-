# EduPay Manage - Admin Dashboard

A modern, responsive Admin Dashboard for English Language Institute management.

## Features

### 1. Dashboard (Overview)
- 4 Summary Cards: Total Students, Pending Payments, Total Revenue, Automated Reminders Sent
- Revenue vs. Pending payments bar chart (6 months)
- Recent Registrations table (last 5 students)

### 2. Students Management
- Comprehensive student directory with data table
- Register New Student form with:
  - Student Name, Date of Birth, Current School
  - Multi-select course enrollment (Grade 1-11, ESOL, IELTS)
  - Parent Name, Address, Phone Number (with country code)
- Search functionality
- Active/Inactive status badges

### 3. Payments Management
- Payment status tracking (Paid, Pending, Overdue)
- Add Payment modal for recording new fees
- Download Receipt functionality for paid invoices
- Filter by status and month
- Payment details: Student, Course, Month, Amount, Status

### 4. Communications (WhatsApp Automation)
- Overdue payments dashboard
- Master toggle for "Enable Daily Automated WhatsApp Reminders"
- Manual "Send WhatsApp Reminder" button per student
- Alert banner showing overdue payment count

### 5. Settings
- Institute Information management
- WhatsApp Integration settings
- Payment configuration (course fees, currency)

## Tech Stack

- Next.js 13 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- Lucide React Icons
- Recharts (for data visualization)

## Project Structure

```
app/
├── dashboard/          # Dashboard page with overview
├── students/           # Student management
├── payments/           # Payment tracking
├── communications/     # WhatsApp automation
└── settings/           # Settings page

components/
├── sidebar.tsx         # Main navigation sidebar
├── dashboard/          # Dashboard-specific components
├── students/           # Student-specific components
├── payments/           # Payment-specific components
└── communications/     # Communication-specific components

lib/
└── mock-data.ts        # Mock data for demonstration
```

## Design System

- Primary Color: Sky Blue (#0ea5e9)
- Neutral Colors: Slate/Gray palette
- Success: Green
- Warning: Amber
- Error: Red
- Typography: Inter font family

## Getting Started

```bash
npm install
npm run db:setup
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Authentication Setup

1. Copy `.env.example` to `.env.local`.
2. Set `NEXTAUTH_SECRET` to a secure random value.
3. Set `DATABASE_URL` to your Supabase Postgres connection string.
4. Set `DIRECT_URL` to the same Supabase Postgres connection string or the direct connection string from Supabase.
5. Run `npm run db:generate` then `npm run db:push` to create the schema, and `npm run db:seed` to seed users.
5. Start the app and sign in at `/login`.

Demo credentials:

- Super Admin: `superadmin@edupay.com` / `SuperAdmin#123`
- Main Admin: `mainadmin@edupay.com` / `MainAdmin#123`
- Admin User: `adminuser@edupay.com` / `AdminUser#123`

Role access:

- Super Admin: Full access
- Main Admin: Full app access including settings
- Admin User: Dashboard, Students, Payments, Communications (no Settings)

## Next Steps for Production

1. **Database Integration**: Connect to Supabase
   - Create tables for students, payments, communications
   - Implement RLS policies
   - Update components to fetch real data

2. **API Routes**: Create Next.js API routes for:
   - Student registration
   - Payment recording
   - WhatsApp integration

3. **Authentication**: Extend current authentication setup
   - Add first-login forced password change flow
   - Add user deactivation/activation lifecycle controls

4. **WhatsApp Integration**: Connect WhatsApp Business API
   - Configure webhooks
   - Implement message templates
   - Set up automation cron jobs

5. **PDF Generation**: Add receipt generation
   - Invoice templates
   - Download functionality

## Mobile Responsiveness

All tables are horizontally scrollable on mobile devices. The sidebar navigation adapts for smaller screens with proper touch interactions.

## Color Palette

- Primary: `#0ea5e9` (Sky 500)
- Background: White
- Foreground: Slate 900
- Borders: Slate 200
- Muted: Slate 100
- Accent: Sky 100
