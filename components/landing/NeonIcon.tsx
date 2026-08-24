import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const ACCENTS = {
  cyan: 'border-eq-brand/40 bg-eq-brand/12 text-eq-brand shadow-[0_0_24px_rgba(0,180,196,0.22)]',
  violet: 'border-violet-400/35 bg-violet-500/12 text-violet-300 shadow-[0_0_24px_rgba(139,92,246,0.2)]',
  amber: 'border-amber-400/35 bg-amber-400/10 text-amber-300 shadow-[0_0_24px_rgba(245,158,11,0.18)]',
  emerald: 'border-emerald-400/35 bg-emerald-400/10 text-emerald-300 shadow-[0_0_24px_rgba(16,185,129,0.18)]',
} as const;

type NeonIconProps = {
  icon: LucideIcon;
  accent?: keyof typeof ACCENTS;
  size?: 'sm' | 'md';
  className?: string;
};

export default function NeonIcon({ icon: Icon, accent = 'cyan', size = 'md', className }: NeonIconProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-2xl border backdrop-blur-md',
        size === 'sm' ? 'h-10 w-10' : 'h-12 w-12',
        ACCENTS[accent],
        className,
      )}
    >
      <Icon className={size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} />
    </span>
  );
}
