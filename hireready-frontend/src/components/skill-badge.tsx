import { cn } from '@/lib/utils';

interface SkillBadgeProps {
  skill: string;
  variant?: 'filled' | 'outlined';
  size?: 'sm' | 'md';
}

export function SkillBadge({ skill, variant = 'filled', size = 'md' }: SkillBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        size === 'sm' ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        variant === 'filled'
          ? "bg-[#2D2D2D] text-white"
          : "border border-[#6B7280] text-[#6B7280]"
      )}
    >
      {skill}
    </span>
  );
}
