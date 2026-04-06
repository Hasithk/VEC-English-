'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

interface StudentTableProps {
  students: Student[];
}

export function StudentTable({ students }: StudentTableProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    course: '',
    parentName: '',
    phone: '',
    status: 'Active' as Student['status'],
  });

  const openEditDialog = (student: Student) => {
    setEditingStudent(student);
    setEditForm({
      name: student.name,
      course: student.courses[0] ?? '',
      parentName: student.parentName,
      phone: student.phone,
      status: student.status,
    });
  };

  const handleUpdateStudent = async () => {
    if (!editingStudent) {
      return;
    }

    if (!editForm.name || !editForm.course || !editForm.parentName || !editForm.phone) {
      toast({
        title: 'Missing required fields',
        description: 'Name, grade/course, parent name, and phone are required.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSaving(true);
      const response = await fetch(`/api/students/${editingStudent.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        throw new Error('Failed to update student');
      }

      toast({
        title: 'Student updated',
        description: 'Student details were updated successfully.',
      });

      setEditingStudent(null);
      router.refresh();
    } catch {
      toast({
        title: 'Update failed',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteStudent = async () => {
    if (!deletingStudent) {
      return;
    }

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/students/${deletingStudent.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete student');
      }

      toast({
        title: 'Student deleted',
        description: `${deletingStudent.name} was removed from the list.`,
      });

      setDeletingStudent(null);
      router.refresh();
    } catch {
      toast({
        title: 'Delete failed',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
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
                <TableHead className="text-slate-600 font-semibold text-right">
                  Actions
                </TableHead>
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
                      variant="default"
                      className={
                        student.status === 'Active'
                          ? 'bg-green-100 text-green-700 hover:bg-green-100'
                          : student.status === 'Inactive'
                          ? 'bg-slate-100 text-slate-700 hover:bg-slate-100'
                          : 'bg-red-100 text-red-700 hover:bg-red-100'
                      }
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(student)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeletingStudent(student)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog
        open={Boolean(editingStudent)}
        onOpenChange={(open) => {
          if (!open) {
            setEditingStudent(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogDescription>
              Update student details and status.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={editForm.name}
                onChange={(event) =>
                  setEditForm((prev) => ({ ...prev, name: event.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-course">Grade/Course</Label>
              <Input
                id="edit-course"
                value={editForm.course}
                onChange={(event) =>
                  setEditForm((prev) => ({ ...prev, course: event.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-parent">Parent Name</Label>
              <Input
                id="edit-parent"
                value={editForm.parentName}
                onChange={(event) =>
                  setEditForm((prev) => ({ ...prev, parentName: event.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone Number</Label>
              <Input
                id="edit-phone"
                value={editForm.phone}
                onChange={(event) =>
                  setEditForm((prev) => ({ ...prev, phone: event.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={editForm.status}
                onValueChange={(value: Student['status']) =>
                  setEditForm((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Dropout">Dropout</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditingStudent(null)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateStudent} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={Boolean(deletingStudent)}
        onOpenChange={(open) => {
          if (!open) {
            setDeletingStudent(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete student?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The student will be removed from the list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteStudent}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
