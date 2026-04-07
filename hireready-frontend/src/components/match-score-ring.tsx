import { cn } from '@/lib/utils';

interface MatchScoreRingProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function MatchScoreRing({ score, size = 'md', showLabel = true }: MatchScoreRingProps) {
  const sizeConfig = {
    sm: { width: 48, stroke: 4, fontSize: 'text-xs' },
    md: { width: 80, stroke: 6, fontSize: 'text-lg' },
    lg: { width: 120, stroke: 8, fontSize: 'text-3xl' },
  };

  const config = sizeConfig[size];
  const radius = (config.width - config.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={config.width}
        height={config.width}
        className="-rotate-90 transform"
      >
        {/* Background circle */}
        <circle
          cx={config.width / 2}
          cy={config.width / 2}
          r={radius}
          fill="none"
          stroke="#E5E5E5"
          strokeWidth={config.stroke}
        />
        {/* Progress circle */}
        <circle
          cx={config.width / 2}
          cy={config.width / 2}
          r={radius}
          fill="none"
          stroke="#2D2D2D"
          strokeWidth={config.stroke}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-bold text-[#1C1C1E]", config.fontSize)}>
            {score}%
          </span>
          {size === 'lg' && (
            <span className="text-xs text-[#6B7280]">Match</span>
          )}
        </div>
      )}
    </div>
  );
}
