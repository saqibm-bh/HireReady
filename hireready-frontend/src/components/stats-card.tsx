import { Card, CardContent } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
}

export function StatsCard({ title, value, icon: Icon, subtitle }: StatsCardProps) {
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-[#6B7280]">{title}</p>
            <p className="mt-2 text-3xl font-bold text-[#1C1C1E]">{value}</p>
            {subtitle && (
              <p className="mt-1 text-sm text-[#6B7280]">{subtitle}</p>
            )}
          </div>
          <div className="rounded-lg bg-[#F3F4F6] p-3">
            <Icon className="h-6 w-6 text-[#6B7280]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
