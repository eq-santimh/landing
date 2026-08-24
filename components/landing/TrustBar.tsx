'use client';

import { Landmark, ShieldCheck, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function TrustBar() {
  const t = useTranslations('HomePage.Trust');
  const items = [
    { icon: ShieldCheck, label: t('cnad') },
    { icon: Landmark, label: t('salvador') },
    { icon: Users, label: t('team') },
  ];

  return (
    <section className="border-y border-white/10 bg-eq-paper">
      <div className="eq-shell flex gap-4 overflow-x-auto py-5 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:py-6 [&::-webkit-scrollbar]:hidden">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex min-w-[16.5rem] items-center gap-3 text-sm text-eq-muted sm:min-w-0">
            <span className="eq-icon-halo flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#7ee7f0]/55 bg-eq-brand/10 text-eq-brand">
              <Icon className="h-4 w-4" />
            </span>
            <span className="font-medium text-eq-ink">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
