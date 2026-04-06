'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'SUPER_ADMIN' | 'MAIN_ADMIN' | 'ADMIN_USER';
  isActive: boolean;
}

interface UserManagementProps {
  currentRole: 'SUPER_ADMIN' | 'MAIN_ADMIN' | 'ADMIN_USER';
}

export function UserManagement({ currentRole }: UserManagementProps) {
  const { toast } = useToast();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'MAIN_ADMIN' | 'ADMIN_USER'>('ADMIN_USER');
  const [isLoading, setIsLoading] = useState(false);

  const loadUsers = async () => {
    const response = await fetch('/api/admin/users');
    if (response.ok) {
      setUsers(await response.json());
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const inviteUser = async () => {
    if (!name.trim() || !email.trim()) {
      toast({
        title: 'Name and email are required',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    const response = await fetch('/api/admin/users/invite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, role }),
    });

    const data = await response.json();
    setIsLoading(false);

    if (!response.ok) {
      toast({
        title: 'Invite failed',
        description: data?.message || 'Could not create user',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'User created',
      description: `Temporary password: ${data.temporaryPassword}`,
    });

    setName('');
    setEmail('');
    setRole('ADMIN_USER');
    loadUsers();
  };

  const resetPassword = async (userId: string) => {
    const response = await fetch('/api/admin/users/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast({
        title: 'Reset failed',
        description: data?.message || 'Could not reset password',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Password reset',
      description: `Temporary password: ${data.temporaryPassword}`,
    });
  };

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>
          Invite Admin Users and reset account passwords.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="newUserName">Name</Label>
            <Input
              id="newUserName"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Staff member name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newUserEmail">Email</Label>
            <Input
              id="newUserEmail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="staff@edupay.com"
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <Select
              value={role}
              onValueChange={(value: 'MAIN_ADMIN' | 'ADMIN_USER') => setRole(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currentRole === 'SUPER_ADMIN' ? (
                  <SelectItem value="MAIN_ADMIN">Main Admin</SelectItem>
                ) : null}
                <SelectItem value="ADMIN_USER">Admin User</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={inviteUser}
          className="bg-sky-500 hover:bg-sky-600"
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create User'}
        </Button>

        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between rounded-md border border-slate-200 p-3"
            >
              <div>
                <p className="text-sm font-medium text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500">
                  {user.email} - {user.role}
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => resetPassword(user.id)}
              >
                Reset Password
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
