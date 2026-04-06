import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getServerSession } from 'next-auth';
import { authOptions, APP_ROLES } from '@/lib/auth';
import { UserManagement } from '@/components/settings/user-management';

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="mt-2 text-slate-600">
          Manage your institute and account preferences
        </p>
      </div>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Institute Information</CardTitle>
          <CardDescription>
            Update your English Language Institute details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="instituteName">Institute Name</Label>
              <Input
                id="instituteName"
                defaultValue="EduPay Language Institute"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                defaultValue="admin@edupay.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              defaultValue="123 Education Street, London, UK"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue="+44 20 1234 5678" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" defaultValue="www.edupay.com" />
            </div>
          </div>
          <Button className="bg-sky-500 hover:bg-sky-600">
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>WhatsApp Integration</CardTitle>
          <CardDescription>
            Configure WhatsApp Business API settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="whatsappNumber">WhatsApp Business Number</Label>
            <Input id="whatsappNumber" defaultValue="+44 7700 900000" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="apiKey">WhatsApp API Key</Label>
            <Input
              id="apiKey"
              type="password"
              defaultValue="••••••••••••••••"
            />
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <p className="text-sm font-medium text-slate-900">Connected</p>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              WhatsApp Business API is active and ready to send messages
            </p>
          </div>
          <Button className="bg-sky-500 hover:bg-sky-600">
            Update Integration
          </Button>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Payment Settings</CardTitle>
          <CardDescription>
            Configure default payment amounts and terms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="basicFee">Basic Course Fee</Label>
              <Input id="basicFee" type="number" defaultValue="100" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ieltsFee">IELTS Course Fee</Label>
              <Input id="ieltsFee" type="number" defaultValue="150" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="esolFee">ESOL Course Fee</Label>
              <Input id="esolFee" type="number" defaultValue="120" />
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Input id="currency" defaultValue="LKR (Rs)" disabled />
          </div>
          <Button className="bg-sky-500 hover:bg-sky-600">
            Save Payment Settings
          </Button>
        </CardContent>
      </Card>

      {session?.user.role === APP_ROLES.SUPER_ADMIN ||
      session?.user.role === APP_ROLES.MAIN_ADMIN ? (
        <UserManagement currentRole={session.user.role} />
      ) : null}
    </div>
  );
}
