import { ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

type ComingSoonBadgeProps = {
  label: string;
  variant?: 'waitlist' | 'regulatory';
};

export default function ComingSoonBadge({ label, variant = 'waitlist' }: ComingSoonBadgeProps) {
  const isWaitlist = variant === 'waitlist';

  return (
    <span
      className={cn(
        'inline-flex max-w-full items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase sm:text-xs',
        isWaitlist
          ? 'border border-eq-brand/50 bg-eq-brand/15 text-eq-brand shadow-[0_0_18px_rgba(0,180,196,0.28)]'
          : 'border border-amber-300/35 bg-amber-400/10 text-amber-200 shadow-[0_0_16px_rgba(245,158,11,0.16)]',
      )}
    >
      {isWaitlist ? (
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inset-0 animate-ping rounded-full bg-eq-brand/80" />
          <span className="relative h-2 w-2 rounded-full bg-eq-brand" />
        </span>
      ) : (
        <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
      )}
      <span className="truncate">{label}</span>
    </span>
  );
}
