'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export function AutomationSettings() {
  const [automationEnabled, setAutomationEnabled] = useState(true);
  const { toast } = useToast();

  const handleToggle = (enabled: boolean) => {
    setAutomationEnabled(enabled);
    toast({
      title: enabled ? 'Automation Enabled' : 'Automation Disabled',
      description: enabled
        ? 'Daily WhatsApp reminders will be sent automatically'
        : 'Daily WhatsApp reminders have been paused',
    });
  };

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">
          WhatsApp Automation Settings
        </CardTitle>
        <CardDescription>
          Configure automated payment reminder notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="automation" className="text-base font-medium">
              Enable Daily Automated WhatsApp Reminders
            </Label>
            <p className="text-sm text-slate-500">
              Send automatic reminders to students with overdue payments every
              day at 9:00 AM
            </p>
          </div>
          <Switch
            id="automation"
            checked={automationEnabled}
            onCheckedChange={handleToggle}
            className="data-[state=checked]:bg-sky-500"
          />
        </div>

        <div className="rounded-lg bg-slate-50 p-4 space-y-2">
          <h4 className="text-sm font-medium text-slate-900">
            Automation Status
          </h4>
          <div className="flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${
                automationEnabled ? 'bg-green-500' : 'bg-slate-400'
              }`}
            />
            <p className="text-sm text-slate-600">
              {automationEnabled
                ? 'Active - Reminders will be sent daily'
                : 'Paused - Manual reminders only'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
