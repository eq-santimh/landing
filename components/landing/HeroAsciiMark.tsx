import { buildAsciiDots } from '@/lib/asciiMark';
import { cn } from '@/lib/utils';

const DOTS = buildAsciiDots();

type HeroAsciiMarkProps = {
  className?: string;
  label: string;
};

export default function HeroAsciiMark({ className, label }: HeroAsciiMarkProps) {
  return (
    <div className={cn('relative overflow-hidden rounded-[28px] bg-black', className)}>
      <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[#00b4c4]/18 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-8 h-32 w-32 rounded-full bg-[#7ee7f0]/10 blur-3xl" />
      <svg
        viewBox="0 0 120 120"
        role="img"
        aria-label={label}
        className="eq-ascii-mark relative z-10 h-full w-full"
      >
        <defs>
          <filter id="eq-ascii-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.55" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {DOTS.map((dot) => {
          const variant = dot.onSeam
            ? 'eq-ascii-dot--seam'
            : dot.inCore
              ? 'eq-ascii-dot--core'
              : dot.oddRow
                ? 'eq-ascii-dot--scan'
                : dot.inTeal
                  ? 'eq-ascii-dot--teal'
                  : 'eq-ascii-dot--field';

          return (
            <circle
              key={`${dot.row}-${dot.col}`}
              className={cn('eq-ascii-dot', variant)}
              cx={dot.cx}
              cy={dot.cy}
              r={dot.r}
              fill={dot.onSeam ? 'none' : '#00b4c4'}
              stroke={dot.onSeam ? '#7ee7f0' : 'none'}
              strokeWidth={dot.onSeam ? 0.45 : 0}
              filter="url(#eq-ascii-glow)"
              style={{
                transformOrigin: `${dot.cx}px ${dot.cy}px`,
                animationDelay: `${((dot.row * 17 + dot.col * 11) % 48) * 40}ms`,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
