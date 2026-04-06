export interface Student {
  id: string;
  name: string;
  dateOfBirth: string;
  currentSchool: string;
  courses: string[];
  parentName: string;
  address: string;
  phone: string;
  status: 'Active' | 'Inactive';
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
    address: '123 Oak Street, Manchester',
    phone: '+44 7700 900123',
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
    address: '45 Park Lane, London',
    phone: '+44 7700 900124',
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
    address: '78 High Street, Birmingham',
    phone: '+44 7700 900125',
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
    address: '22 Church Road, Leeds',
    phone: '+44 7700 900126',
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
    address: '56 Queen Street, Liverpool',
    phone: '+44 7700 900127',
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
    address: '89 King Street, Bristol',
    phone: '+44 7700 900128',
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
    address: '34 Station Road, Sheffield',
    phone: '+44 7700 900129',
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
    address: '67 Market Street, Newcastle',
    phone: '+44 7700 900130',
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
    month: 'April 2024',
    amount: 120,
    status: 'Paid',
    paymentDate: '2024-04-01',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'PAY002',
    studentId: 'STU002',
    studentName: 'James Chen',
    course: 'Grade 7',
    month: 'April 2024',
    amount: 100,
    status: 'Pending',
  },
  {
    id: 'PAY003',
    studentId: 'STU003',
    studentName: 'Sophia Martinez',
    course: 'Grade 10',
    month: 'April 2024',
    amount: 120,
    status: 'Overdue',
  },
  {
    id: 'PAY004',
    studentId: 'STU004',
    studentName: 'Oliver Brown',
    course: 'Grade 6',
    month: 'April 2024',
    amount: 95,
    status: 'Paid',
    paymentDate: '2024-04-03',
    paymentMethod: 'Cash',
  },
  {
    id: 'PAY005',
    studentId: 'STU005',
    studentName: 'Ava Johnson',
    course: 'Grade 8',
    month: 'April 2024',
    amount: 110,
    status: 'Overdue',
  },
  {
    id: 'PAY006',
    studentId: 'STU007',
    studentName: 'Isabella Garcia',
    course: 'Grade 7',
    month: 'April 2024',
    amount: 100,
    status: 'Pending',
  },
  {
    id: 'PAY007',
    studentId: 'STU008',
    studentName: 'Liam Anderson',
    course: 'Grade 10',
    month: 'April 2024',
    amount: 120,
    status: 'Paid',
    paymentDate: '2024-04-02',
    paymentMethod: 'Card',
  },
  {
    id: 'PAY008',
    studentId: 'STU001',
    studentName: 'Emma Wilson',
    course: 'IELTS',
    month: 'April 2024',
    amount: 150,
    status: 'Paid',
    paymentDate: '2024-04-01',
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
