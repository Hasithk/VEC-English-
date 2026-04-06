export interface Student {
  id: string;
  name: string;
  dateOfBirth: string;
  currentSchool: string;
  courses: string[];
  parentName: string;
  address: string;
  phone: string;
  status: 'Active' | 'Inactive' | 'Dropout';
  registrationDate: string;
}

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  course: string;
  month: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  paymentDate?: string;
  paymentMethod?: string;
}

export const mockStudents: Student[] = [
  {
    id: 'STU001',
    name: 'Emma Wilson',
    dateOfBirth: '2010-05-15',
    currentSchool: 'Lincoln High School',
    courses: ['Grade 9', 'IELTS'],
    parentName: 'Robert Wilson',
    address: '123 Lake Road, Colombo 05',
    phone: '+94 77 900 0123',
    status: 'Active',
    registrationDate: '2024-03-15',
  },
  {
    id: 'STU002',
    name: 'James Chen',
    dateOfBirth: '2012-08-22',
    currentSchool: 'St. Mary\'s School',
    courses: ['Grade 7', 'ESOL'],
    parentName: 'Li Chen',
    address: '45 Temple Road, Kandy',
    phone: '+94 77 900 0124',
    status: 'Active',
    registrationDate: '2024-03-18',
  },
  {
    id: 'STU003',
    name: 'Sophia Martinez',
    dateOfBirth: '2009-11-30',
    currentSchool: 'Riverside Academy',
    courses: ['Grade 10'],
    parentName: 'Carlos Martinez',
    address: '78 Galle Road, Galle',
    phone: '+94 77 900 0125',
    status: 'Active',
    registrationDate: '2024-03-20',
  },
  {
    id: 'STU004',
    name: 'Oliver Brown',
    dateOfBirth: '2013-02-14',
    currentSchool: 'Greenwood Primary',
    courses: ['Grade 6', 'ESOL'],
    parentName: 'Sarah Brown',
    address: '22 Peradeniya Road, Kandy',
    phone: '+94 77 900 0126',
    status: 'Active',
    registrationDate: '2024-03-25',
  },
  {
    id: 'STU005',
    name: 'Ava Johnson',
    dateOfBirth: '2011-07-08',
    currentSchool: 'Valley School',
    courses: ['Grade 8'],
    parentName: 'Michael Johnson',
    address: '56 Main Street, Matara',
    phone: '+94 77 900 0127',
    status: 'Active',
    registrationDate: '2024-04-01',
  },
  {
    id: 'STU006',
    name: 'Noah Davis',
    dateOfBirth: '2010-09-19',
    currentSchool: 'Oakwood High',
    courses: ['Grade 9', 'IELTS'],
    parentName: 'Jennifer Davis',
    address: '89 Negombo Road, Ja-Ela',
    phone: '+94 77 900 0128',
    status: 'Inactive',
    registrationDate: '2024-02-10',
  },
  {
    id: 'STU007',
    name: 'Isabella Garcia',
    dateOfBirth: '2012-04-25',
    currentSchool: 'Hillside School',
    courses: ['Grade 7'],
    parentName: 'Maria Garcia',
    address: '34 Hospital Road, Jaffna',
    phone: '+94 77 900 0129',
    status: 'Active',
    registrationDate: '2024-03-28',
  },
  {
    id: 'STU008',
    name: 'Liam Anderson',
    dateOfBirth: '2009-12-03',
    currentSchool: 'Central High School',
    courses: ['Grade 10', 'IELTS'],
    parentName: 'David Anderson',
    address: '67 Court Road, Kurunegala',
    phone: '+94 77 900 0130',
    status: 'Active',
    registrationDate: '2024-04-02',
  },
];

export const mockPayments: Payment[] = [
  {
    id: 'PAY001',
    studentId: 'STU001',
    studentName: 'Emma Wilson',
    course: 'Grade 9',
    month: 'April 2026',
    amount: 120,
    status: 'Paid',
    paymentDate: '2026-04-01',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'PAY002',
    studentId: 'STU002',
    studentName: 'James Chen',
    course: 'Grade 7',
    month: 'April 2026',
    amount: 100,
    status: 'Pending',
  },
  {
    id: 'PAY003',
    studentId: 'STU003',
    studentName: 'Sophia Martinez',
    course: 'Grade 10',
    month: 'April 2026',
    amount: 120,
    status: 'Overdue',
  },
  {
    id: 'PAY004',
    studentId: 'STU004',
    studentName: 'Oliver Brown',
    course: 'Grade 6',
    month: 'April 2026',
    amount: 95,
    status: 'Paid',
    paymentDate: '2026-04-03',
    paymentMethod: 'Cash',
  },
  {
    id: 'PAY005',
    studentId: 'STU005',
    studentName: 'Ava Johnson',
    course: 'Grade 8',
    month: 'April 2026',
    amount: 110,
    status: 'Overdue',
  },
  {
    id: 'PAY006',
    studentId: 'STU007',
    studentName: 'Isabella Garcia',
    course: 'Grade 7',
    month: 'April 2026',
    amount: 100,
    status: 'Pending',
  },
  {
    id: 'PAY007',
    studentId: 'STU008',
    studentName: 'Liam Anderson',
    course: 'Grade 10',
    month: 'April 2026',
    amount: 120,
    status: 'Paid',
    paymentDate: '2026-04-02',
    paymentMethod: 'Card',
  },
  {
    id: 'PAY008',
    studentId: 'STU001',
    studentName: 'Emma Wilson',
    course: 'IELTS',
    month: 'April 2026',
    amount: 150,
    status: 'Paid',
    paymentDate: '2026-04-01',
    paymentMethod: 'Bank Transfer',
  },
];

export const revenueData = [
  { month: 'Nov', revenue: 4200, pending: 450 },
  { month: 'Dec', revenue: 3800, pending: 620 },
  { month: 'Jan', revenue: 4600, pending: 380 },
  { month: 'Feb', revenue: 4200, pending: 520 },
  { month: 'Mar', revenue: 5100, pending: 290 },
  { month: 'Apr', revenue: 4800, pending: 420 },
];
