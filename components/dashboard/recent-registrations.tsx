import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

interface RecentRegistrationsProps {
  students: Student[];
}

export function RecentRegistrations({ students }: RecentRegistrationsProps) {
  const recentStudents = students
    .sort(
      (a, b) =>
        new Date(b.registrationDate).getTime() -
        new Date(a.registrationDate).getTime()
    )
    .slice(0, 5);

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">
          Recent Registrations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-slate-200">
              <TableHead className="text-slate-600">Student ID</TableHead>
              <TableHead className="text-slate-600">Name</TableHead>
              <TableHead className="text-slate-600">Course</TableHead>
              <TableHead className="text-slate-600">Parent</TableHead>
              <TableHead className="text-slate-600">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentStudents.map((student) => (
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
      </CardContent>
    </Card>
  );
}
