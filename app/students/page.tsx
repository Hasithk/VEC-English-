import { StudentTable } from '@/components/students/student-table';
import { RegisterStudentForm } from '@/components/students/register-student-form';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { listStudents } from '@/lib/backend';
import Link from 'next/link';

interface StudentsPageProps {
  searchParams?: {
    category?: string;
    q?: string;
  };
}

export default function StudentsPage({ searchParams }: StudentsPageProps) {
  const students = listStudents();
  const categories = Array.from(
    new Set(students.flatMap((student) => student.courses))
  ).sort((a, b) => a.localeCompare(b));

  const selectedCategory = searchParams?.category || '';
  const rawSearchQuery = (searchParams?.q || '').trim();
  const searchQuery = rawSearchQuery.toLowerCase();

  const studentsByCategory = selectedCategory
    ? students.filter((student) => student.courses.includes(selectedCategory))
    : [];

  const filteredStudents = searchQuery
    ? studentsByCategory.filter((student) => {
        const haystack = [student.id, student.name, student.phone, student.parentName]
          .join(' ')
          .toLowerCase();
        return haystack.includes(searchQuery);
      })
    : studentsByCategory;

  const queryWithCategory = (category: string) => {
    const params = new URLSearchParams();
    params.set('category', category);
    if (searchQuery) {
      params.set('q', searchQuery);
    }
    return `/students?${params.toString()}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Students</h1>
          <p className="mt-2 text-slate-600">
            Manage student registrations and directory
          </p>
        </div>
        <RegisterStudentForm />
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-slate-700">
          Select Grade / Course
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = category === selectedCategory;

            return (
              <Link
                key={category}
                href={queryWithCategory(category)}
                className={
                  isActive
                    ? 'rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-white'
                    : 'rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200'
                }
              >
                {category}
              </Link>
            );
          })}
        </div>
      </div>

      {selectedCategory ? (
        <>
          <form className="flex items-center gap-4" action="/students" method="get">
            <input type="hidden" name="category" value={selectedCategory} />
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                name="q"
                defaultValue={rawSearchQuery}
                placeholder={`Search ${selectedCategory} students...`}
                className="pl-10"
              />
            </div>
          </form>

          <StudentTable students={filteredStudents} />
        </>
      ) : (
        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-600">
          Choose a Grade or Course above to view the student table.
        </div>
      )}
    </div>
  );
}
