'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Student } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';

interface StudentTableProps {
  students: Student[];
}

export function StudentTable({ students }: StudentTableProps) {
  return (
    <Card className="border-slate-200">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-200 bg-slate-50">
              <TableHead className="text-slate-600 font-semibold">ID</TableHead>
              <TableHead className="text-slate-600 font-semibold">Name</TableHead>
              <TableHead className="text-slate-600 font-semibold">
                Grade/Course
              </TableHead>
              <TableHead className="text-slate-600 font-semibold">
                Parent Name
              </TableHead>
              <TableHead className="text-slate-600 font-semibold">Phone</TableHead>
              <TableHead className="text-slate-600 font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id} className="border-slate-200">
                <TableCell className="font-medium text-slate-900">
                  {student.id}
                </TableCell>
                <TableCell className="text-slate-700">{student.name}</TableCell>
                <TableCell className="text-slate-700">
                  {student.courses.join(', ')}
                </TableCell>
                <TableCell className="text-slate-700">
                  {student.parentName}
                </TableCell>
                <TableCell className="text-slate-700">{student.phone}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      student.status === 'Active' ? 'default' : 'secondary'
                    }
                    className={
                      student.status === 'Active'
                        ? 'bg-green-100 text-green-700 hover:bg-green-100'
                        : 'bg-slate-100 text-slate-700'
                    }
                  >
                    {student.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
