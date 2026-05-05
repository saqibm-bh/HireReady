import { Card, CardContent } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
}

export function StatsCard({ title, value, subtitle, icon: Icon }: StatsCardProps) {
  return (
    <Card className="glass-panel border-border/50 shadow-sm hover:shadow-md transition-all group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{title}</p>
            <p className="text-3xl font-black text-foreground font-heading tracking-tight">{value}</p>
            {subtitle && (
              <p className="mt-1 text-sm text-muted-foreground/80">{subtitle}</p>
            )}
          </div>
          {Icon && (
            <div className="p-3 rounded-xl bg-sienna/5 text-sienna group-hover:bg-sienna group-hover:text-warm-white transition-all">
              <Icon className="h-6 w-6" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
