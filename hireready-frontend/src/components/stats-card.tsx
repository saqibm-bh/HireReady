import { Card, CardContent } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

export function StatsCard({ title, value, subtitle }: StatsCardProps) {
  return (
    <Card className="glass-panel">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-2 text-3xl font-bold text-foreground font-heading">{value}</p>
            {subtitle && (
              <p className="mt-1 text-sm text-muted-foreground/80">{subtitle}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
