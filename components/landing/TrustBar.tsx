'use client';

import { Building2, Landmark, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function TrustBar() {
  const t = useTranslations('HomePage.Trust');
  const items = [
    { icon: ShieldCheck, label: t('cnad') },
    { icon: Landmark, label: t('salvador') },
    { icon: Building2, label: t('assets') },
  ];

  return (
    <section className="border-y border-white/10 bg-eq-paper">
      <div className="eq-shell grid gap-6 py-6 sm:grid-cols-3">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3 text-sm text-eq-muted">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-eq-brand/10 text-eq-brand">
              <Icon className="h-4 w-4" />
            </span>
            <span className="font-medium text-eq-ink">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
