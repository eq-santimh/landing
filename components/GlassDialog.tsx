'use client';

import * as React from 'react';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type GlassVariant = 'pure' | 'glow' | 'aurora';

interface GlassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  variant?: GlassVariant;
  className?: string;
}

const VARIANTS: Record<GlassVariant, string> = {
  pure: 'bg-[#14131c] border border-white/10 shadow-xl text-eq-ink',
  glow: 'bg-[#14131c] border border-white/10 shadow-2xl text-eq-ink',
  aurora: 'bg-[#14131c] border border-white/10 shadow-xl text-eq-ink',
};

export function GlassDialog({
  open,
  onOpenChange,
  children,
  variant = 'pure',
  className,
}: GlassDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-[#09080d]/40 backdrop-blur-sm" />

      <DialogContent className={cn('rounded-2xl', VARIANTS[variant], className)}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
