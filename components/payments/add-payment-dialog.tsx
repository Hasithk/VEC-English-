'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, ChevronsUpDown, Check } from 'lucide-react';
import { Student } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';

const currentYear = new Date().getFullYear();
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
].map((month) => `${month} ${currentYear}`);

const paymentMethods = ['Cash', 'Card', 'Bank Transfer', 'Cheque'];

const courseOptions = [
  'Grade 1',
  'Grade 2',
  'Grade 3',
  'Grade 4',
  'Grade 5',
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Grade 9',
  'Grade 10',
  'Grade 11',
  'ESOL',
  'IELTS',
];

interface AddPaymentDialogProps {
  students: Student[];
}

export function AddPaymentDialog({ students }: AddPaymentDialogProps) {
  const [open, setOpen] = useState(false);
  const [openStudentSearch, setOpenStudentSearch] = useState(false);
  const [openCourseSearch, setOpenCourseSearch] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [course, setCourse] = useState('');
  const [month, setMonth] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const activeStudents = students.filter((student) => student.status === 'Active');
  const selectedStudent = activeStudents.find((student) => student.id === studentId);

  const suggestedCourses = Array.from(
    new Set([...(selectedStudent?.courses ?? []), ...courseOptions])
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const amount = Number(formData.get('amount') ?? '0');
    const paymentDate = String(formData.get('paymentDate') ?? '').trim();

    if (!studentId || !month || !paymentMethod || !course || !paymentDate || amount <= 0) {
      toast({
        title: 'Missing details',
        description: 'Please complete all payment fields before submitting.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId,
          course,
          month,
          amount,
          paymentMethod,
          paymentDate,
          status: 'Paid',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save payment');
      }

      toast({
        title: 'Payment recorded',
        description: 'The payment was successfully added to the backend.',
      });

      e.currentTarget.reset();
      setStudentId('');
      setCourse('');
      setMonth('');
      setPaymentMethod('');
      router.refresh();
      setOpen(false);
    } catch {
      toast({
        title: 'Could not record payment',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-sky-500 hover:bg-sky-600">
          <Plus className="mr-2 h-4 w-4" />
          Add Payment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Record Payment</DialogTitle>
          <DialogDescription>
            Enter payment details to record a new fee payment.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="student">Select Student</Label>
            <Popover open={openStudentSearch} onOpenChange={setOpenStudentSearch}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openStudentSearch}
                  className="w-full justify-between"
                >
                  {selectedStudent
                    ? `${selectedStudent.name} (${selectedStudent.id})`
                    : 'Search and select student'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Type student name..." />
                  <CommandList>
                    <CommandEmpty>No student found.</CommandEmpty>
                    <CommandGroup>
                      {activeStudents.map((student) => (
                        <CommandItem
                          key={student.id}
                          value={`${student.name} ${student.id}`}
                          onSelect={() => {
                            setStudentId(student.id);
                            setOpenStudentSearch(false);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              student.id === studentId ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          {student.name} ({student.id})
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="month">Month</Label>
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger>
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="course">Course</Label>
            <Popover open={openCourseSearch} onOpenChange={setOpenCourseSearch}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openCourseSearch}
                  className="w-full justify-between"
                >
                  {course || 'Search and select class/course'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Type class/course..." />
                  <CommandList>
                    <CommandEmpty>No class found.</CommandEmpty>
                    <CommandGroup>
                      {suggestedCourses.map((item) => (
                        <CommandItem
                          key={item}
                          value={item}
                          onSelect={() => {
                            setCourse(item);
                            setOpenCourseSearch(false);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              item === course ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          {item}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (LKR)</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((method) => (
                  <SelectItem key={method} value={method}>
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentDate">Payment Date</Label>
            <Input id="paymentDate" name="paymentDate" type="date" required />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-sky-500 hover:bg-sky-600"
            >
              {isSubmitting ? 'Saving...' : 'Record Payment'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
