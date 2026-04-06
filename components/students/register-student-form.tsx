'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserPlus } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

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

const phoneCountryCodes = [
  { code: '+94', country: 'LK' },
  { code: '+1', country: 'US' },
  { code: '+91', country: 'IN' },
  { code: '+86', country: 'CN' },
];

export function RegisterStudentForm() {
  const [open, setOpen] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [countryCode, setCountryCode] = useState('+94');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleCourseToggle = (course: string) => {
    setSelectedCourses((prev) =>
      prev.includes(course)
        ? prev.filter((c) => c !== course)
        : [...prev, course]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedCourses.length === 0) {
      toast({
        title: 'Select at least one course',
        description: 'A student must be enrolled in at least one course.',
        variant: 'destructive',
      });
      return;
    }

    const formData = new FormData(e.currentTarget);
    const phone = String(formData.get('phone') ?? '').trim();

    setIsSubmitting(true);

    let response: Response;
    try {
      response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: String(formData.get('studentName') ?? '').trim(),
          dateOfBirth: String(formData.get('dateOfBirth') ?? '').trim(),
          currentSchool: String(formData.get('currentSchool') ?? '').trim(),
          courses: selectedCourses,
          parentName: String(formData.get('parentName') ?? '').trim(),
          address: String(formData.get('address') ?? '').trim(),
          phone: `${countryCode} ${phone}`,
        }),
      });
    } catch {
      toast({
        title: 'Registration failed',
        description: 'Network error while saving student.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    if (!response.ok) {
      toast({
        title: 'Registration failed',
        description: 'Please check student details and try again.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    toast({
      title: 'Student registered',
      description: 'The student was saved to the backend successfully.',
    });

    e.currentTarget.reset();
    setSelectedCourses([]);
    setCountryCode('+94');
    setOpen(false);
    router.refresh();
    setIsSubmitting(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-sky-500 hover:bg-sky-600">
          <UserPlus className="mr-2 h-4 w-4" />
          Register New Student
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Register New Student</SheetTitle>
          <SheetDescription>
            Fill in the student details to complete registration.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="studentName">Student Name</Label>
            <Input
              id="studentName"
              name="studentName"
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentSchool">Current School</Label>
            <Input
              id="currentSchool"
              name="currentSchool"
              placeholder="Enter school name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Courses Enrolled</Label>
            <div className="grid grid-cols-2 gap-3 rounded-lg border border-slate-200 p-4">
              {courseOptions.map((course) => (
                <div key={course} className="flex items-center space-x-2">
                  <Checkbox
                    id={course}
                    checked={selectedCourses.includes(course)}
                    onCheckedChange={() => handleCourseToggle(course)}
                  />
                  <label
                    htmlFor={course}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {course}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="parentName">Parent Name</Label>
            <Input
              id="parentName"
              name="parentName"
              placeholder="Enter parent/guardian name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              placeholder="Enter full address"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="flex gap-2">
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {phoneCountryCodes.map((item) => (
                    <SelectItem key={item.code} value={item.code}>
                      {item.code} ({item.country})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                id="phone"
                name="phone"
                placeholder="77 123 4567"
                className="flex-1"
                required
              />
            </div>
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
              {isSubmitting ? 'Saving...' : 'Register Student'}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
