import { mockPayments, mockStudents, Payment, Student } from '@/lib/mock-data';

export interface RevenuePoint {
  month: string;
  revenue: number;
  pending: number;
}

export interface NewStudentInput {
  name: string;
  dateOfBirth: string;
  currentSchool: string;
  courses: string[];
  parentName: string;
  address: string;
  phone: string;
}

export interface NewPaymentInput {
  studentId: string;
  course: string;
  month: string;
  amount: number;
  paymentMethod: string;
  paymentDate: string;
  status?: Payment['status'];
}

export interface UpdatePaymentInput {
  course?: string;
  month?: string;
  amount?: number;
  paymentMethod?: string;
  paymentDate?: string;
  status?: Payment['status'];
}

const studentsStore: Student[] = [...mockStudents];
const paymentsStore: Payment[] = [...mockPayments];

const nextStudentId = () => {
  const maxId = studentsStore.reduce((max, student) => {
    const numericId = Number(student.id.replace('STU', ''));
    return Number.isNaN(numericId) ? max : Math.max(max, numericId);
  }, 0);

  return `STU${String(maxId + 1).padStart(3, '0')}`;
};

const nextPaymentId = () => {
  const maxId = paymentsStore.reduce((max, payment) => {
    const numericId = Number(payment.id.replace('PAY', ''));
    return Number.isNaN(numericId) ? max : Math.max(max, numericId);
  }, 0);

  return `PAY${String(maxId + 1).padStart(3, '0')}`;
};

const toMonthLabel = (date: Date) =>
  new Intl.DateTimeFormat('en-GB', {
    month: 'long',
    year: 'numeric',
  }).format(date);

const toShortMonth = (date: Date) =>
  new Intl.DateTimeFormat('en-GB', {
    month: 'short',
  }).format(date);

export const listStudents = () => [...studentsStore];

export const listPayments = () => [...paymentsStore];

export const createStudent = (input: NewStudentInput) => {
  const student: Student = {
    id: nextStudentId(),
    name: input.name,
    dateOfBirth: input.dateOfBirth,
    currentSchool: input.currentSchool,
    courses: input.courses,
    parentName: input.parentName,
    address: input.address,
    phone: input.phone,
    status: 'Active',
    registrationDate: new Date().toISOString().slice(0, 10),
  };

  studentsStore.push(student);

  return student;
};

export const createPayment = (input: NewPaymentInput) => {
  const student = studentsStore.find((item) => item.id === input.studentId);

  const payment: Payment = {
    id: nextPaymentId(),
    studentId: input.studentId,
    studentName: student?.name ?? 'Unknown Student',
    course: input.course,
    month: input.month,
    amount: input.amount,
    status: input.status ?? 'Paid',
    paymentDate: input.paymentDate,
    paymentMethod: input.paymentMethod,
  };

  paymentsStore.push(payment);

  return payment;
};

export const getPaymentById = (paymentId: string) =>
  paymentsStore.find((payment) => payment.id === paymentId);

export const updatePayment = (paymentId: string, input: UpdatePaymentInput) => {
  const payment = paymentsStore.find((item) => item.id === paymentId);

  if (!payment) {
    return null;
  }

  if (input.course !== undefined) {
    payment.course = input.course;
  }

  if (input.month !== undefined) {
    payment.month = input.month;
  }

  if (input.amount !== undefined) {
    payment.amount = input.amount;
  }

  if (input.paymentMethod !== undefined) {
    payment.paymentMethod = input.paymentMethod;
  }

  if (input.paymentDate !== undefined) {
    payment.paymentDate = input.paymentDate;
  }

  if (input.status !== undefined) {
    payment.status = input.status;
  }

  return payment;
};

export const deletePayment = (paymentId: string) => {
  const index = paymentsStore.findIndex((payment) => payment.id === paymentId);

  if (index === -1) {
    return null;
  }

  const [removedPayment] = paymentsStore.splice(index, 1);
  return removedPayment;
};

export const buildRevenueData = (monthsToInclude = 6): RevenuePoint[] => {
  const monthDates = Array.from({ length: monthsToInclude }, (_, index) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (monthsToInclude - index - 1));
    date.setDate(1);
    return date;
  });

  return monthDates.map((date) => {
    const monthLabel = toMonthLabel(date);
    const revenue = paymentsStore
      .filter((payment) => payment.month === monthLabel && payment.status === 'Paid')
      .reduce((sum, payment) => sum + payment.amount, 0);

    const pending = paymentsStore
      .filter(
        (payment) =>
          payment.month === monthLabel &&
          (payment.status === 'Pending' || payment.status === 'Overdue')
      )
      .reduce((sum, payment) => sum + payment.amount, 0);

    return {
      month: toShortMonth(date),
      revenue,
      pending,
    };
  });
};

export const getDashboardSnapshot = () => {
  const currentMonth = toMonthLabel(new Date());

  return {
    totalStudents: studentsStore.filter((student) => student.status === 'Active').length,
    pendingPayments: paymentsStore.filter(
      (payment) => payment.status === 'Pending' || payment.status === 'Overdue'
    ).length,
    totalRevenue: paymentsStore
      .filter((payment) => payment.status === 'Paid' && payment.month === currentMonth)
      .reduce((sum, payment) => sum + payment.amount, 0),
    automatedReminders: 28,
    revenueData: buildRevenueData(6),
    students: listStudents(),
  };
};